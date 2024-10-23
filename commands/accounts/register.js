const {SlashCommandBuilder} = require('discord.js');
const {parseJSON} = require('../../handyman');
const fs = require('fs');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('register your account to the database'),
    async execute(interaction) {
        let economy = await parseJSON('economy.json');
        let pass = false;        
        const uuid = interaction.user.id;
        let base = {
            version: '1.0',
            money: 0,
            publicBalanceVisibility: false,
            level: 1,
            xp: 0,
        };

        if(!(uuid in economy)) {
            economy[uuid] = base;
            await fs.writeFile('economy.json', JSON.stringify(economy), err => {if(err) throw err;});
            await interaction.reply('Account created successfully. type /balance to view your balance!');
            pass = true;
        } else {
            await interaction.reply('Account already exists.');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /register; pass: ${pass}`);
    },
};