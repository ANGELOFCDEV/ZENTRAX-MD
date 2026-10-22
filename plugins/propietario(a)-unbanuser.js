let handler = async (m, {conn, text, command, usedPrefix}) => {
if (!text)
throw `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘽𝘼𝙉𝙀𝘼𝙍\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} @tag*\n\n𝙏𝘼𝙂 𝙎𝙊𝙈𝙀𝙊𝙉𝙀 𝙏𝙊 𝙐𝙉𝘽𝘼𝙉\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} @tag*`
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who)
throw `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘽𝘼𝙉𝙀𝘼𝙍\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} @tag*\n\n𝙏𝘼𝙂 𝙎𝙊𝙈𝙀𝙊𝙉𝙀 𝙏𝙊 𝙐𝙉𝘽𝘼𝙉\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} @tag*`
let users = global.db.data.users
users[who].banned = false
conn.reply(m.chat, `${eg}𝙀𝙇/𝙇𝘼 𝙐𝙎𝙐𝘼𝙍𝙄𝙊(𝘼) 𝙁𝙐𝙀 𝘿𝙀𝙎𝘽𝘼𝙉𝙀𝘼𝘿𝙊(𝘼) 🤩\n𝙋𝙊𝘿𝙍𝘼 𝙐𝙎𝘼𝙍 𝘼 ${gt}\n\n𝙏𝙃𝙀 𝙐𝙎𝙀𝙍 𝙒𝘼𝙎 𝙐𝙉𝘽𝘼𝙉 🤠\n𝙐𝙎𝙀 𝙕𝙀𝙉𝙏𝙍𝘼𝙓-𝙈𝘿`, m)
}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^unbanuser$/i
handler.group = true
handler.admin = true
export default handler
