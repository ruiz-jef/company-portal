$path = "C:\Users\Jefte Abencerraje\.gemini\antigravity\scratch\company-portal\safety-plans\app.js"
$content = [System.IO.File]::ReadAllText($path)

$target = @'
// Fetch DB Configurations
async function fetchDatabaseConfigs() {
    const modulesSnap = await db.collection("safety_modules").get();
    dbModules = modulesSnap.docs.map(doc => doc.data());
    
    // Sort modules by custom ordering
    const order = ["iipp", "hipp", "wvpp", "epp", "php", "rup", "hmbp"];
    dbModules.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    const industriesSnap = await db.collection("industries").get();
    dbIndustries = industriesSnap.docs.map(doc => doc.data());
}
'@

$replacement = @'
// Fetch DB Configurations
async function fetchDatabaseConfigs() {
    const modulesSnap = await db.collection("safety_modules").get();
    dbModules = modulesSnap.docs.map(doc => doc.data());
    
    // Fallback override: if IIPP in Firestore is outdated (missing the custom table), use local code version
    dbModules = dbModules.map(dbMod => {
        const localMod = defaultModulesSeed.find(m => m.id === dbMod.id);
        if (localMod) {
            if (dbMod.id === 'iipp' && (!dbMod.content_template || !dbMod.content_template.includes("iipp_custom_inspections_table"))) {
                console.log("IIPP templates in Firestore are outdated. Falling back to local version.");
                return localMod;
            }
        }
        return dbMod;
    });

    // Sort modules by custom ordering
    const order = ["iipp", "hipp", "wvpp", "epp", "php", "rup", "hmbp"];
    dbModules.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    const industriesSnap = await db.collection("industries").get();
    dbIndustries = industriesSnap.docs.map(doc => doc.data());
}
'@

# Normalize line endings
$target = $target.Replace("`r`n", "`n").Replace("`n", "`r`n")
$replacement = $replacement.Replace("`r`n", "`n").Replace("`n", "`r`n")

if ($content.Contains($target)) {
    $content = $content.Replace($target, $replacement)
    [System.IO.File]::WriteAllText($path, $content)
    Write-Output "SUCCESS"
} else {
    Write-Output "ERROR: Target string not found in app.js!"
}
