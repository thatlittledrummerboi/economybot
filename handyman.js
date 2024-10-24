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
        "owns": {},
        "stats": {
            "highestMoney": 0,
            "allTimeMoney": 0,
            "commandsExecuted": 0,
        },
    };
    const ver = userAccount.version
    const versions = {
        "latest": 3,
        "1.0": 1,
        "1.1": 2,
        "1.2": 3,
    };

    if (versions[ver] < versions['latest']) {
        exit.version = "1.1";
        exit.money = userAccount.money ?? 0;
        exit.publicBalanceVisibility = userAccount.publicBalanceVisibility ?? false;
        exit.level = userAccount.level ?? 1;
        exit.xp = userAccount.xp ?? 0;

        for (let i = 0; i<exit.owns.length; i++) {
            exit.owns[i] = userAccount.owns[i] ?? (typeof(userAccount.owns[i]) == number) ? 0 : "";
        }

        for (let i = 0; i<exit.stats.length;) {
            exit.stats[i] = userAccount.stats[i] ?? (typeof(userAccount.stats[i] == number)) ? 0 : "";
        }

        exit.stats.commandsExecuted = userAccount.stats.commandsExecuted ?? 0;

        return(exit);
    } else {
        return(0);
    }
}

async function updatePlayerStats(userAccount) {
    if(userAccount.money > userAccount.stats.highestMoney) userAccount.stats.highestMoney = userAccount.money;
    if(userAccount.money > userAccount.stats.allTimeMoney) userAccount.stats.allTimeMoney = userAccount.money;
}

module.exports = { parseJSON, compareVersions, updatePlayerStats };