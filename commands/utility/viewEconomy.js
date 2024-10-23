const { SlashCommandBuilder } = require('discord.js');
const {admins} = require('../../config.json');
const {parseJSON} = require('../../handyman');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('vieweconomy')
        .setDescription('view Economy JSON'),
    async execute(interaction) {
        if(admins.includes(interaction.user.id)) {
            const economy = await parseJSON('economy.json');
            interaction.reply({content: `\`\`\`json\n${JSON.stringify(economy)}\n\`\`\``, ephemeral: true});
        } else {
            interaction.reply('you don\'t have perms to use this command :c');
        }
    },
};