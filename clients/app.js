// db is initialized in shared/auth.js

let allClientsCache = [];
let currentViewId = null;

// UI Elements
const els = {
    btnNewClient: document.getElementById('btnNewClient'),
    clientModal: document.getElementById('clientModal'),
    btnCloseModal: document.getElementById('btnCloseModal'),
    btnCancel: document.getElementById('btnCancel'),
    clientForm: document.getElementById('clientForm'),
    modalTitle: document.getElementById('modalTitle'),
    clientsTableBody: document.getElementById('clientsTableBody'),
    emptyState: document.getElementById('emptyState'),
    btnDeleteClient: document.getElementById('btnDeleteClient'),
    
    // Services Checkboxes
    svcTailgate: document.getElementById('svc_tailgate_meetings'),
    optionsTailgate: document.getElementById('options_tailgate'),
    svcInspections: document.getElementById('svc_inspections'),
    optionsInspections: document.getElementById('options_inspections'),
    
    // View Modal
    viewModal: document.getElementById('viewModal'),
    btnCloseView: document.getElementById('btnCloseView'),
    btnEditFromView: document.getElementById('btnEditFromView'),
    viewContent: document.getElementById('viewContent'),
    
    // Filters
    searchClient: document.getElementById('searchClient'),
    filterServiceModel: document.getElementById('filterServiceModel'),
    filterService: document.getElementById('filterService'),

    // Audit Modal
    btnAudit: document.getElementById('btnAudit'),
    auditModal: document.getElementById('auditModal'),
    btnCloseAudit: document.getElementById('btnCloseAudit'),
    btnExitAudit: document.getElementById('btnExitAudit'),
    auditResults: document.getElementById('auditResults')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Real-time listener for Firebase Firestore (compat API)
    db.collection("clients").onSnapshot((snapshot) => {
        allClientsCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderTable();
    }, (error) => {
        console.error("Error fetching clients: ", error);
    });
});

els.btnNewClient.addEventListener('click', () => {
    els.clientForm.reset();
    document.getElementById('clientId').value = '';
    els.modalTitle.textContent = 'Add New Client';
    els.btnDeleteClient.style.display = 'none';
    
    els.optionsTailgate.classList.remove('active');
    els.optionsInspections.classList.remove('active');
    
    openModal(els.clientModal);
});

els.btnCloseModal.addEventListener('click', () => closeModal(els.clientModal));
els.btnCancel.addEventListener('click', () => closeModal(els.clientModal));
els.btnCloseView.addEventListener('click', () => closeModal(els.viewModal));
els.btnCloseAudit.addEventListener('click', () => closeModal(els.auditModal));
els.btnExitAudit.addEventListener('click', () => closeModal(els.auditModal));

els.btnDeleteClient.addEventListener('click', () => {
    const id = document.getElementById('clientId').value;
    if (id) {
        window.handleDelete(id);
    }
});

els.svcTailgate.addEventListener('change', (e) => {
    els.optionsTailgate.classList.toggle('active', e.target.checked);
});

els.svcInspections.addEventListener('change', (e) => {
    els.optionsInspections.classList.toggle('active', e.target.checked);
});

els.searchClient.addEventListener('input', renderTable);
els.filterServiceModel.addEventListener('change', renderTable);
els.filterService.addEventListener('change', renderTable);

els.clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const tailgateOpts = Array.from(document.querySelectorAll('input[name="opt_tailgate"]:checked')).map(cb => cb.value);
    const inspectionOpts = Array.from(document.querySelectorAll('input[name="opt_inspections"]:checked')).map(cb => cb.value);

    const clientData = {
        companyName: document.getElementById('companyName').value,
        clientType: document.getElementById('clientType').value,
        contactName: document.getElementById('contactName').value,
        businessContactNumber: document.getElementById('businessContactNumber').value,
        email: document.getElementById('email').value,
        meetingsContactName: document.getElementById('meetingsContactName').value,
        meetingsContactNumber: document.getElementById('meetingsContactNumber').value,
        officeAddress: document.getElementById('officeAddress').value,
        mailingAddress: document.getElementById('mailingAddress').value,
        meetingsAddress: document.getElementById('meetingsAddress').value,
        trainerAssigned: document.getElementById('trainerAssigned').value,
        contractStatus: document.getElementById('contractStatus').value,
        nextReviewDate: document.getElementById('nextReviewDate').value,
        notes: document.getElementById('clientNotes').value,
        priceFee: document.getElementById('priceFee').value,
        services: {
            tailgateMeetings: { enabled: els.svcTailgate.checked, options: tailgateOpts },
            inspections: { enabled: els.svcInspections.checked, options: inspectionOpts },
            allCompanySafetyPlans: document.getElementById('svc_all_company_safety_plans').checked,
            cupaIncluded: document.getElementById('svc_cupa_included').checked,
            pesticideHandler: document.getElementById('svc_pesticide_handler').checked,
            respiratorProgram: document.getElementById('svc_respirator_program').checked,
            forkliftCerts: document.getElementById('svc_forklift_certs').checked,
            spcc: document.getElementById('svc_spcc').checked,
            fireExtinguisher: document.getElementById('svc_fire_extinguisher').checked,
            reviewBinder: document.getElementById('svc_review_binder').checked
        }
    };

    const id = document.getElementById('clientId').value;
    try {
        if (id) {
            await db.collection("clients").doc(id).update(clientData);
        } else {
            await db.collection("clients").add(clientData);
        }
        closeModal(els.clientModal);
    } catch (error) {
        console.error("Error saving client: ", error);
        alert("There was an error saving the client to the database. Check console for details.");
    }
});

function renderTable() {
    let clients = [...allClientsCache];
    
    // Sort alphabetically by Company Name
    clients.sort((a, b) => {
        const nameA = (a.companyName || "").toLowerCase();
        const nameB = (b.companyName || "").toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Apply Search Filter (Company Name, Contact Name, or Meetings Contact Name)
    const searchQuery = els.searchClient.value.trim().toLowerCase();
    if (searchQuery) {
        clients = clients.filter(c => {
            const compName = (c.companyName || "").toLowerCase();
            const contactName = (c.contactName || "").toLowerCase();
            const meetContactName = (c.meetingsContactName || "").toLowerCase();
            return compName.includes(searchQuery) || 
                   contactName.includes(searchQuery) || 
                   meetContactName.includes(searchQuery);
        });
    }
    
    const selectedModel = els.filterServiceModel.value;
    const selectedService = els.filterService.value;
    
    if (selectedModel !== 'All') {
        clients = clients.filter(c => c.clientType === selectedModel);
    }
    
    if (selectedService !== 'All') {
        clients = clients.filter(c => {
            if (selectedService === 'Tailgate Safety Meetings') return c.services.tailgateMeetings.enabled;
            if (selectedService === 'Inspections') return c.services.inspections.enabled;
            
            const serviceMap = {
                'All Company Safety Plans': 'allCompanySafetyPlans',
                'CUPA Included': 'cupaIncluded',
                'Pesticide Handler Training': 'pesticideHandler',
                'Respirator Program': 'respiratorProgram',
                'Forklift Certifications': 'forkliftCerts',
                'SPCC': 'spcc',
                'Fire Extinguisher Inspections': 'fireExtinguisher',
                'Review Inspections Binder': 'reviewBinder'
            };
            return serviceMap[selectedService] ? c.services[serviceMap[selectedService]] === true : false;
        });
    }

    els.clientsTableBody.innerHTML = '';
    
    if (clients.length === 0) {
        els.emptyState.classList.remove('hidden');
        document.querySelector('table').style.display = 'none';
        return;
    }

    els.emptyState.classList.add('hidden');
    document.querySelector('table').style.display = 'table';

    clients.forEach(client => {
        const tr = document.createElement('tr');
        
        const meetingsContact = client.meetingsContactName ? `
            <div style="font-weight: 600;">${client.meetingsContactName}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">${client.meetingsContactNumber || ''}</div>
        ` : '<span style="color: var(--text-secondary);">N/A</span>';
        
        const staff = client.trainerAssigned ? `
            <div style="font-weight: 600;">${client.trainerAssigned}</div>
        ` : '<span style="color: var(--text-secondary);">Unassigned</span>';

        tr.innerHTML = `
            <td>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 1.1rem;">${client.companyName}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${client.email || 'No email'}</div>
            </td>
            <td>${client.clientType}</td>
            <td>
                <div>${client.contactName || 'N/A'}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">${client.businessContactNumber || ''}</div>
            </td>
            <td>${meetingsContact}</td>
            <td>${staff}</td>
            <td><span class="status-badge status-${client.contractStatus.replace(/\s+/g, '-')}">${client.contractStatus}</span></td>
            <td class="actions-cell">
                <button class="btn-secondary btn-sm" onclick="viewClient('${client.id}')">View</button>
                <button class="btn-primary btn-sm" onclick="editClient('${client.id}')">Edit</button>
            </td>
        `;
        els.clientsTableBody.appendChild(tr);
    });
}

function openModal(modal) {
    modal.classList.add('active');
}
window.openModal = openModal;

function closeModal(modal) {
    modal.classList.remove('active');
}
window.closeModal = closeModal;

// Since app.js is no longer a module, these functions can be standard globals
window.viewClient = function(id) {
    const client = allClientsCache.find(c => c.id === id);
    if (!client) return;

    currentViewId = id;
    let servicesHtml = '';
    
    if (client.services.tailgateMeetings.enabled) {
        servicesHtml += `
            <div class="service-item">
                <div class="service-item-title">Tailgate Safety Meetings</div>
                <div class="service-item-options">
                    ${client.services.tailgateMeetings.options.map(opt => `<span class="service-tag">${opt}</span>`).join('')}
                </div>
            </div>`;
    }
    
    if (client.services.inspections.enabled) {
        servicesHtml += `
            <div class="service-item">
                <div class="service-item-title">Inspections</div>
                <div class="service-item-options">
                    ${client.services.inspections.options.map(opt => `<span class="service-tag">${opt}</span>`).join('')}
                </div>
            </div>`;
    }

    const singleServices = [
        { key: 'allCompanySafetyPlans', label: 'All Company Safety Plans' },
        { key: 'cupaIncluded', label: 'CUPA Included' },
        { key: 'pesticideHandler', label: 'Pesticide Handler Training' },
        { key: 'respiratorProgram', label: 'Respirator Program' },
        { key: 'forkliftCerts', label: 'Forklift Certifications' },
        { key: 'spcc', label: 'SPCC' },
        { key: 'fireExtinguisher', label: 'Fire Extinguisher Inspections' },
        { key: 'reviewBinder', label: 'Review Inspections Binder' }
    ];

    singleServices.forEach(s => {
        if (client.services[s.key]) {
            servicesHtml += `
            <div class="service-item" style="padding: 0.75rem;">
                <div class="service-item-title" style="margin: 0;">${s.label}</div>
            </div>`;
        }
    });

    if (!servicesHtml) {
        servicesHtml = '<p style="color: var(--text-secondary)">No services contracted.</p>';
    }

    els.viewContent.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <div class="detail-label">Company Name</div>
                <div class="detail-value">${client.companyName}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Service Model</div>
                <div class="detail-value">${client.clientType}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Contract Status</div>
                <div class="detail-value"><span class="status-badge status-${client.contractStatus.replace(/\s+/g, '-')}">${client.contractStatus}</span></div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Next Review</div>
                <div class="detail-value">${client.nextReviewDate ? new Date(client.nextReviewDate).toLocaleDateString() : 'N/A'}</div>
            </div>
        </div>

        <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Contact Details</h3>
        <div class="detail-grid">
            <div class="detail-item">
                <div class="detail-label">Business Contact</div>
                <div class="detail-value">${client.contactName || 'N/A'}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${client.businessContactNumber || ''}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${client.email || ''}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Meetings Contact</div>
                <div class="detail-value">${client.meetingsContactName || 'N/A'}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${client.meetingsContactNumber || ''}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Staff Assigned</div>
                <div class="detail-value">${client.trainerAssigned || 'N/A'}</div>
            </div>
        </div>

        <h3 style="margin-bottom: 1rem; color: var(--primary-color); margin-top: 2rem;">Addresses</h3>
        <div class="detail-grid">
            <div class="detail-item">
                <div class="detail-label">Office Address</div>
                <div class="detail-value">${client.officeAddress || 'N/A'}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Mailing Address</div>
                <div class="detail-value">${client.mailingAddress || 'N/A'}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Meetings Location Address</div>
                <div class="detail-value">${client.meetingsAddress || 'N/A'}</div>
            </div>
        </div>

        <h3 style="margin-bottom: 1rem; color: var(--primary-color); margin-top: 2rem;">Contracted Services</h3>
        <div class="services-list">
            ${servicesHtml}
        </div>

        ${client.notes ? `
        <h3 style="margin-bottom: 1rem; color: var(--primary-color); margin-top: 2rem;">Client Notes</h3>
        <div class="detail-grid" style="grid-template-columns: 1fr; margin-bottom: 0;">
            <div class="detail-item" style="white-space: pre-wrap; line-height: 1.5;">${client.notes}</div>
        </div>
        ` : ''}

        ${client.priceFee ? `
        <h3 style="margin-bottom: 1rem; color: var(--primary-color); margin-top: 2rem;">Pricing & Fees</h3>
        <div class="detail-grid" style="grid-template-columns: 1fr; margin-bottom: 0;">
            <div class="detail-item">
                <div class="detail-label">Retainer / Meetings / CUPA Fee</div>
                <div class="detail-value" style="font-size: 1.25rem; color: #16a34a;">${client.priceFee}</div>
            </div>
        </div>
        ` : ''}
    `;

    openModal(els.viewModal);
};

window.editClient = function(id) {
    const client = allClientsCache.find(c => c.id === id);
    if (!client) return;

    els.clientForm.reset();
    els.modalTitle.textContent = 'Edit Client';
    els.btnDeleteClient.style.display = 'inline-flex';
    
    document.getElementById('clientId').value = client.id;
    document.getElementById('companyName').value = client.companyName;
    document.getElementById('clientType').value = client.clientType;
    document.getElementById('contactName').value = client.contactName || '';
    document.getElementById('businessContactNumber').value = client.businessContactNumber || '';
    document.getElementById('email').value = client.email || '';
    document.getElementById('meetingsContactName').value = client.meetingsContactName || '';
    document.getElementById('meetingsContactNumber').value = client.meetingsContactNumber || '';
    document.getElementById('officeAddress').value = client.officeAddress || '';
    document.getElementById('mailingAddress').value = client.mailingAddress || '';
    document.getElementById('meetingsAddress').value = client.meetingsAddress || '';
    document.getElementById('trainerAssigned').value = client.trainerAssigned || '';
    document.getElementById('contractStatus').value = client.contractStatus;
    document.getElementById('nextReviewDate').value = client.nextReviewDate || '';
    document.getElementById('clientNotes').value = client.notes || '';
    document.getElementById('priceFee').value = client.priceFee || '';

    const svcs = client.services;
    
    els.svcTailgate.checked = svcs.tailgateMeetings.enabled;
    els.optionsTailgate.classList.toggle('active', svcs.tailgateMeetings.enabled);
    document.querySelectorAll('input[name="opt_tailgate"]').forEach(cb => {
        cb.checked = svcs.tailgateMeetings.options.includes(cb.value);
    });

    els.svcInspections.checked = svcs.inspections.enabled;
    els.optionsInspections.classList.toggle('active', svcs.inspections.enabled);
    document.querySelectorAll('input[name="opt_inspections"]').forEach(cb => {
        cb.checked = svcs.inspections.options.includes(cb.value);
    });

    document.getElementById('svc_all_company_safety_plans').checked = svcs.allCompanySafetyPlans;
    document.getElementById('svc_cupa_included').checked = svcs.cupaIncluded;
    document.getElementById('svc_pesticide_handler').checked = svcs.pesticideHandler;
    document.getElementById('svc_respirator_program').checked = svcs.respiratorProgram;
    document.getElementById('svc_forklift_certs').checked = svcs.forkliftCerts;
    document.getElementById('svc_spcc').checked = svcs.spcc;
    document.getElementById('svc_fire_extinguisher').checked = svcs.fireExtinguisher || false;
    document.getElementById('svc_review_binder').checked = svcs.reviewBinder || false;

    openModal(els.clientModal);
};

window.handleDelete = async function(id) {
    if (confirm("Are you sure you want to delete this client?")) {
        try {
            await db.collection("clients").doc(id).delete();
            closeModal(els.clientModal);
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Error deleting client.");
        }
    }
};

els.btnEditFromView.addEventListener('click', () => {
    closeModal(els.viewModal);
    if (currentViewId) window.editClient(currentViewId);
});

// Admin Tools (Export / Import)
const btnExport = document.getElementById('btnExport');
const btnImport = document.getElementById('btnImport');
const csvFileInput = document.getElementById('csvFileInput');

btnExport.addEventListener('click', () => {
    if (allClientsCache.length === 0) {
        alert("No data to export.");
        return;
    }

    const headers = [
        "id", "companyName", "clientType", "contactName", "businessContactNumber", 
        "email", "meetingsContactName", "meetingsContactNumber", "trainerAssigned", 
        "contractStatus", "nextReviewDate", "notes", "priceFee",
        "officeAddress", "mailingAddress", "meetingsAddress",
        "svc_tailgate_enabled", "svc_tailgate_options",
        "svc_inspections_enabled", "svc_inspections_options",
        "svc_allCompanySafetyPlans", "svc_cupaIncluded", "svc_pesticideHandler",
        "svc_respiratorProgram", "svc_forkliftCerts", "svc_spcc", "svc_fireExtinguisher", "svc_reviewBinder"
    ];

    let csvContent = headers.join(",") + "\n";

    allClientsCache.forEach(c => {
        const row = [
            c.id || "",
            `"${(c.companyName || "").replace(/"/g, '""')}"`,
            `"${(c.clientType || "").replace(/"/g, '""')}"`,
            `"${(c.contactName || "").replace(/"/g, '""')}"`,
            `"${(c.businessContactNumber || "").replace(/"/g, '""')}"`,
            `"${(c.email || "").replace(/"/g, '""')}"`,
            `"${(c.meetingsContactName || "").replace(/"/g, '""')}"`,
            `"${(c.meetingsContactNumber || "").replace(/"/g, '""')}"`,
            `"${(c.trainerAssigned || "").replace(/"/g, '""')}"`,
            `"${(c.contractStatus || "").replace(/"/g, '""')}"`,
            `"${(c.nextReviewDate || "").replace(/"/g, '""')}"`,
            `"${(c.notes || "").replace(/"/g, '""')}"`,
            `"${(c.priceFee || "").replace(/"/g, '""')}"`,
            `"${(c.officeAddress || "").replace(/"/g, '""')}"`,
            `"${(c.mailingAddress || "").replace(/"/g, '""')}"`,
            `"${(c.meetingsAddress || "").replace(/"/g, '""')}"`,
            
            c.services.tailgateMeetings.enabled ? "true" : "false",
            `"${c.services.tailgateMeetings.options.join("|")}"`,
            
            c.services.inspections.enabled ? "true" : "false",
            `"${c.services.inspections.options.join("|")}"`,
            
            c.services.allCompanySafetyPlans ? "true" : "false",
            c.services.cupaIncluded ? "true" : "false",
            c.services.pesticideHandler ? "true" : "false",
            c.services.respiratorProgram ? "true" : "false",
            c.services.forkliftCerts ? "true" : "false",
            c.services.spcc ? "true" : "false",
            c.services.fireExtinguisher ? "true" : "false",
            c.services.reviewBinder ? "true" : "false"
        ];
        csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "clients_backup.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

btnImport.addEventListener('click', () => {
    csvFileInput.click();
});

function parseCSVRow(str) {
    const arr = [];
    let quote = false;
    let col = "";
    for (let i = 0; i < str.length; i++) {
        let cc = str[i], nc = str[i+1];
        if (cc === '"' && quote && nc === '"') { col += '"'; i++; continue; }
        if (cc === '"') { quote = !quote; continue; }
        if (cc === ',' && !quote) { arr.push(col); col = ""; continue; }
        col += cc;
    }
    arr.push(col);
    return arr;
}

csvFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        const text = event.target.result;
        const lines = text.split("\n").filter(l => l.trim() !== "");
        if (lines.length <= 1) return; 
        
        for (let i = 1; i < lines.length; i++) {
            const cols = parseCSVRow(lines[i]);
            if (cols.length < 25) continue;
            
            let officeAddr = "";
            let mailingAddr = "";
            let meetingsAddr = "";
            let tgEnabled = false;
            let tgOptions = [];
            let inspEnabled = false;
            let inspOptions = [];
            let allPlans = false;
            let cupa = false;
            let pesticide = false;
            let respirator = false;
            let forklift = false;
            let spcc = false;
            let fireExt = false;
            let reviewBinder = false;

            if (cols.length >= 28) {
                // New CSV format with address columns
                officeAddr = cols[13];
                mailingAddr = cols[14];
                meetingsAddr = cols[15];
                tgEnabled = cols[16] === "true";
                tgOptions = cols[17] ? cols[17].split("|") : [];
                inspEnabled = cols[18] === "true";
                inspOptions = cols[19] ? cols[19].split("|") : [];
                allPlans = cols[20] === "true";
                cupa = cols[21] === "true";
                pesticide = cols[22] === "true";
                respirator = cols[23] === "true";
                forklift = cols[24] === "true";
                spcc = cols[25] === "true";
                fireExt = cols[26] === "true";
                reviewBinder = cols[27] === "true";
            } else {
                // Backward compatible format
                tgEnabled = cols[13] === "true";
                tgOptions = cols[14] ? cols[14].split("|") : [];
                inspEnabled = cols[15] === "true";
                inspOptions = cols[16] ? cols[16].split("|") : [];
                allPlans = cols[17] === "true";
                cupa = cols[18] === "true";
                pesticide = cols[19] === "true";
                respirator = cols[20] === "true";
                forklift = cols[21] === "true";
                spcc = cols[22] === "true";
                fireExt = cols[23] === "true";
                reviewBinder = cols[24] === "true";
            }

            const clientData = {
                companyName: cols[1],
                clientType: cols[2],
                contactName: cols[3],
                businessContactNumber: cols[4],
                email: cols[5],
                meetingsContactName: cols[6],
                meetingsContactNumber: cols[7],
                officeAddress: officeAddr,
                mailingAddress: mailingAddr,
                meetingsAddress: meetingsAddr,
                trainerAssigned: cols[8],
                contractStatus: cols[9],
                nextReviewDate: cols[10],
                notes: cols[11],
                priceFee: cols[12],
                services: {
                    tailgateMeetings: {
                        enabled: tgEnabled,
                        options: tgOptions
                    },
                    inspections: {
                        enabled: inspEnabled,
                        options: inspOptions
                    },
                    allCompanySafetyPlans: allPlans,
                    cupaIncluded: cupa,
                    pesticideHandler: pesticide,
                    respiratorProgram: respirator,
                    forkliftCerts: forklift,
                    spcc: spcc,
                    fireExtinguisher: fireExt,
                    reviewBinder: reviewBinder
                }
            };

            const oldId = cols[0];
            try {
                if (oldId && oldId.trim() !== "") {
                    await db.collection("clients").doc(oldId).set(clientData);
                } else {
                    await db.collection("clients").add(clientData);
                }
            } catch (err) {
                console.error("Import error on row " + i, err);
            }
        }
        alert("Import complete!");
        csvFileInput.value = "";
    };
    reader.readAsText(file);
});

// Audit Clients logic
els.btnAudit.addEventListener('click', runAudit);

function runAudit() {
    const auditFields = [
        { key: 'companyName', label: 'Company Name' },
        { key: 'clientType', label: 'Service Model' },
        { key: 'contactName', label: 'Business Contact Name' },
        { key: 'businessContactNumber', label: 'Business Contact Number' },
        { key: 'email', label: 'Email' },
        { key: 'meetingsContactName', label: 'Meetings Contact Name' },
        { key: 'meetingsContactNumber', label: 'Meetings Contact Number' },
        { key: 'trainerAssigned', label: 'Staff Assigned' },
        { key: 'contractStatus', label: 'Contract Status' },
        { key: 'nextReviewDate', label: 'Next Review Date' },
        { key: 'priceFee', label: 'Retainer / Meetings / CUPA Fee' },
        { key: 'officeAddress', label: 'Office Address' },
        { key: 'mailingAddress', label: 'Mailing Address' },
        { key: 'meetingsAddress', label: 'Meetings Location Address' }
    ];

    els.auditResults.innerHTML = '';
    let incompleteClients = [];

    allClientsCache.forEach(client => {
        let missing = [];
        auditFields.forEach(field => {
            const val = client[field.key];
            if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
                missing.push(field.label);
            }
        });

        if (missing.length > 0) {
            incompleteClients.push({ client, missing });
        }
    });

    if (incompleteClients.length === 0) {
        els.auditResults.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #16a34a;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <div style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem;">Audit Complete!</div>
                <p style="color: var(--text-secondary);">All client profiles are complete. No missing information found.</p>
            </div>
        `;
    } else {
        incompleteClients.forEach(item => {
            const { client, missing } = item;
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'flex-start';
            div.style.marginBottom = '1.25rem';
            div.style.paddingBottom = '1.25rem';
            div.style.borderBottom = '1px solid var(--border-color)';
            
            const tagsHtml = missing.map(f => `
                <span style="background: #fef3c7; color: #b45309; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #fde047; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.25rem; display: inline-block;">
                    ${f}
                </span>
            `).join(' ');

            div.innerHTML = `
                <div style="flex: 1; padding-right: 1rem;">
                    <div style="font-weight: 700; color: var(--text-primary); font-size: 1.05rem; margin-bottom: 0.5rem;">${client.companyName}</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                        ${tagsHtml}
                    </div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="closeModal(document.getElementById('auditModal')); window.editClient('${client.id}')">Edit</button>
            `;
            els.auditResults.appendChild(div);
        });
    }

    openModal(els.auditModal);
}
