const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
let economy;
fs.readFile('economy.json', 'utf-8', function (err, data) {
    if (err) throw err;
    economy = JSON.parse(data);
});

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('register your account to the database'),
    async execute(interaction) {
        let pass = false;        
        const uuid = interaction.user.id;
        let base = {
            version: '1.0',
            money: 0,
        };

        if(!(uuid in economy)) {
            economy[uuid] = base;
            fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});
            await interaction.reply('Account created successfully. type /balance to view your balance!');
            pass = true;
        } else {
            await interaction.reply('Account already exists.');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /register; pass: ${pass}`);
    },
};