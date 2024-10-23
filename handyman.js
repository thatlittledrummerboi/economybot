const fs = require('node:fs').promises;

async function parseJSON(path) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing JSON:', err);
        throw err;
    }
}

async function compareVersions(userAccount) {
    let exit = {
        "version": null,
        "money": null,
        "publicBalanceVisibility": null,
        "level": null,
        "xp": null,
    };
    const ver = userAccount.version
    const versions = {
        "latest": 1,
        "1.0": 1,
    };

    if (versions[ver] < versions['latest']) {
        exit.version = "1.1";
        exit.money = userAccount.money ?? 0;
        exit.publicBalanceVisibility = userAccount.publicBalanceVisibility ?? false;
        exit.level = userAccount.level ?? 1;
        exit.xp = userAccount.xp ?? 0;

        return(exit);
    } else {
        return(0);
    }
}

module.exports = { parseJSON, compareVersions };