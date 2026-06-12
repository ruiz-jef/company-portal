/* auth.js - Firebase Initialization & Auth Guard for Company Portal */

const firebaseConfig = {
    apiKey: "AIzaSyBcA9TAGRinfH7wwDtI5sF0esr_Tuy8UTs",
    authDomain: "r-and-a-safety-dept-clients.firebaseapp.com",
    projectId: "r-and-a-safety-dept-clients",
    storageBucket: "r-and-a-safety-dept-clients.firebasestorage.app",
    messagingSenderId: "888213830759",
    appId: "1:888213830759:web:c1ae7ee03d813d4964a8c2",
    measurementId: "G-48S68RBVGV"
};

// Initialize Firebase compat SDK
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


/**
 * Checks if the email domain matches @ruizinc.net
 * @param {string} email 
 * @returns {boolean}
 */
function isValidCompanyDomain(email) {
    return email.toLowerCase().endsWith("@ruizinc.net");
}

/**
 * Guard pages and check authentication status
 * @param {number} depth - how many folders deep from the root the page is
 */
function initAuthGuard(depth = 0) {
    const prefix = "../".repeat(depth);
    const loginUrl = `${prefix}index.html`;
    const dashboardUrl = `${prefix}dashboard.html`;

    // Wait for auth to resolve
    auth.onAuthStateChanged((user) => {
        const isLoginPage = (depth === 0) && (
            window.location.pathname.endsWith('index.html') || 
            window.location.pathname.endsWith('/company-portal/') ||
            window.location.pathname.endsWith('/company-portal/index.html') ||
            window.location.pathname.split('/').pop() === ''
        );

        if (!user) {
            // Not logged in -> Redirect to login page if we aren't already there
            if (!isLoginPage) {
                window.location.href = loginUrl;
            }
        } else {
            // Logged in -> Verify email domain and verification status
            if (!isValidCompanyDomain(user.email)) {
                alert("Access Denied: Only accounts with @ruizinc.net emails are allowed.");
                auth.signOut().then(() => {
                    window.location.href = loginUrl;
                });
            } else if (!user.emailVerified) {
                // If they are on a guarded page and not verified, force logout
                if (!isLoginPage) {
                    alert("Please verify your email address. A verification link was sent to: " + user.email);
                    auth.signOut().then(() => {
                        window.location.href = loginUrl;
                    });
                }
            } else {
                // Verified user -> If on login page, redirect to dashboard
                if (isLoginPage) {
                    window.location.href = dashboardUrl;
                }
                
                // Populate user email in the navbar or user-badge if they exist
                const userEmailEl = document.getElementById('user-email');
                if (userEmailEl) {
                    userEmailEl.textContent = user.email;
                }

                // Run one-time client-side migration to fix 'Juan Villareal' spelling
                runJuanNameMigration();
            }
        }
    });
}

/**
 * Log in with Email and Password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<firebase.auth.UserCredential>}
 */
async function loginUser(email, password) {
    if (!isValidCompanyDomain(email)) {
        throw new Error("Access Denied: You must use a @ruizinc.net email address.");
    }
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    // Check if email is verified
    if (!userCredential.user.emailVerified) {
        // Sign out immediately to prevent local session storage
        await auth.signOut();
        throw new Error("Email Not Verified: Please check your inbox and click the verification link we sent you.");
    }
    
    return userCredential;
}

/**
 * Sign up a new user, send verification, and log out immediately
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<firebase.auth.UserCredential>}
 */
async function registerUser(email, password) {
    if (!isValidCompanyDomain(email)) {
        throw new Error("Access Denied: Registration is restricted to @ruizinc.net email addresses.");
    }
    
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    
    // Send email verification link
    await userCredential.user.sendEmailVerification();
    
    // Sign out immediately so they cannot enter dashboard until verified
    await auth.signOut();
    
    return userCredential;
}

/**
 * Log out current user
 * @param {number} depth 
 * @returns {Promise<void>}
 */
async function logoutUser(depth = 0) {
    return auth.signOut().then(() => {
        const prefix = "../".repeat(depth);
        window.location.href = `${prefix}index.html`;
    });
}

/**
 * One-time client-side database migration to correct the spelling of 'Juan Villareal' to 'Juan Villarreal'
 */
async function runJuanNameMigration() {
    if (localStorage.getItem('juan_name_migration_done_v3')) return;
    try {
        console.log("Checking database for 'Juan Villareal' spelling corrections...");
        const updatePromises = [];
        
        // 1. Update 'clients' collection (field: 'trainerAssigned')
        const clientsSnap = await db.collection("clients").where("trainerAssigned", "==", "Juan Villareal").get();
        clientsSnap.forEach(doc => {
            console.log(`Migrating client document: ${doc.id}`);
            updatePromises.push(doc.ref.update({ trainerAssigned: "Juan Villarreal" }));
        });
        
        // 2. Update 'inspections' collection (field: 'inspector')
        const inspectionsSnap = await db.collection("inspections").where("inspector", "==", "Juan Villareal").get();
        inspectionsSnap.forEach(doc => {
            console.log(`Migrating inspection document: ${doc.id}`);
            updatePromises.push(doc.ref.update({ inspector: "Juan Villarreal" }));
        });
        
        // 3. Update 'compiled_plans' collection (field: 'safety_officer' and check 'compiled_text')
        const plansSnap = await db.collection("compiled_plans").get();
        plansSnap.forEach(doc => {
            const data = doc.data();
            let needsUpdate = false;
            const updateData = {};
            
            if (data.safety_officer === "Juan Villareal") {
                updateData.safety_officer = "Juan Villarreal";
                needsUpdate = true;
            }
            if (data.compiled_text && data.compiled_text.includes("Juan Villareal")) {
                updateData.compiled_text = data.compiled_text.replace(/Juan Villareal/g, "Juan Villarreal");
                needsUpdate = true;
            }
            
            if (needsUpdate) {
                console.log(`Migrating compiled plan document: ${doc.id}`);
                updatePromises.push(doc.ref.update(updateData));
            }
        });
        
        if (updatePromises.length > 0) {
            await Promise.all(updatePromises);
            console.log(`Successfully migrated ${updatePromises.length} Firestore documents to 'Juan Villarreal'.`);
        } else {
            console.log("No outdated spelling documents found in Firestore.");
        }
        
        localStorage.setItem('juan_name_migration_done_v3', 'true');
    } catch (error) {
        console.error("Spelling migration failed:", error);
    }
}
