const {SlashCommandBuilder} = require('discord.js');
const fs = require('node:fs');
let economy;
fs.readFile('economy.json', 'utf-8', function (err, data) {
    if (err) throw err;
    economy = JSON.parse(data);
});


module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('checks account balance'),
    async execute(interaction) {
        let pass = false;
        const uuid = interaction.user.id;
        if(uuid in economy) {
            await interaction.reply(`you have ${economy[uuid].money} money!`);
            pass = true;
        } else {
            await interaction.reply('You don\'t have an account yet! type /register to register an account!');
        }
        console.log(`${interaction.user.username} \(${interaction.user.id}\) used command /balance; pass: ${pass}`);
    }
}