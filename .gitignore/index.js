// MODULE
const Discord = require("discord.js");
//

// NEW CLIENT
const client = new Discord.Client();
const bot = new Discord.Client();
//

// BOT INFO
const version = "V.0.0.1"
const PREFIX = "@";
const botname = "AlF'Roles";
//

bot.on("ready", function () {
    bot.user.setActivity("AlF'Roles - @help | @AlFa'K#3900")
    //bot.user.setUsername("AlF'Roles")
    bot.user.setStatus("dnd")
    //bot.user.setAvatar("https://cdn.discordapp.com/attachments/478591634137939968/478850006372057129/14df5b7c87dd3815219661555792.jpg")
    console.log("AlF'Roles - Connecté");
});

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;
    
    var rolerainbow = member.guild.roles.find("name", "Rainbow")

    var foother = "Demande de @" + message.author.username + "#" + message.author.discriminator + " ! | " + botname + " - " + version
    
    var user = message.mentions.users.first();

    if(message.content === PREFIX + "help") {
        message.channel.send("Hum...").then(message => message.edit("La commande ``help`` est pas terminée pour le moment."))
    }

    switch (args[0].toLowerCase()) {
        case "role":
            var roleembed = new Discord.RichEmbed()
                .setAuthor("Liste des rôles", message.author.avatarURL)
                    .addField("🌈", "Pour avoir le rôles" + rolerainbow + " !")
                    .addField("⛔", "Pour enlever le rôles" + rolerainbow + " !")
                .setTimestamp()
                .setFooter(foother)
                .setColor("#8d265f")
            const rolemessage = await message.channel.send(roleembed);
            await rolemessage.react("🌈");
            await rolemessage.react("⛔");
            const rolepannier = rolemessage.createReactionCollector((reaction, user) => user.id === message.author.id);
            rolepannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🌈") {
                    await reaction.remove(message.author.id)
                    member.addRole(rolerainbow)
                    message.channel.send("Vous avez bien eu le rôle " + rolerainbow + " !")
                } 
                if (reaction.emoji.name === "⛔") {
                    await reaction.remove(message.author.id)
                    member.removeRole(rolerainbow)
                    message.channel.send("Vous avez bien enlever le rôle " + rolerainbow + " !")
                } 
                await reaction.remove(message.author.id);
            })
        break;

        case "help":
            var credit_embed = new Discord.RichEmbed()
                .setColor('#626cca')
                .setTitle("Menu d'aide :")
                    .addField(PREFIX + 'help,', "Pour afficher l'aide !")
                    .addField(PREFIX + "role,", "Pour voir les roles")
                    .addField(PREFIX + "botinfo,", "Pour voir mes informations")
                .setTimestamp()
                .setFooter(foother)
            message.channel.send(credit_embed)    
        break;

      /*  case "majinfo":
                if (message.author.id === "193092758267887616") {
                        var maj_embed = new Discord.RichEmbed()
                        .setAuthor("Création " + version, message.author.avatarURL)
                            .addField("Création de moi,", `**J'ai été crée par @ℓιαη0112#4033 sous la demande de @AlFa'K#3900 pour sont serveur**.`)
                        .setColor("#00FF6F")
                        .setFooter(version)
                        .setThumbnail(message.author.avatarURL)
                        .setTimestamp()
                    bot.channels.findAll('name', 'bot-update').map(channel => channel.send(maj_embed));
                    message.delete()
                }
        break; */

    }
})

bot.login(process.env.TOKEN);
