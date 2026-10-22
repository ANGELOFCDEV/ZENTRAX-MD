let handler = async (m, {usedPrefix}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender
let name = conn.getName(who)
let d = `╭━〔 🔖 *BALANCE* 〕━⬣
┃ *USUARIO(A) | USER*
┃ ${name}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *💎 ${global.db.data.users[who].limit} Diamantes* (afuera del Banco)
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *🏦  ${global.db.data.users[who].banco} Diamantes* (adentró del banco)
╰━━━━〔 *𓃠 ${vs}* 〕━━━⬣

*COMPRAR DIAMANTES CON EXP*
${usedPrefix}buy *cantidad*
${usedPrefix}buyall *cantidad*

*COMPRAR DIAMANTES CON ZENTRAXCOINS*
${usedPrefix}buy2 *cantidad*
${usedPrefix}buyall2 *cantidad*

*GUARDAR TUS DIAMANTES EN EL BANCO*
${usedPrefix}dep *cantidad*

*RETIRAR TUS DIAMANTES DEL BANCO:*
${usedPrefix}retirar *cantidad*`

if (m.isWABusiness) {
conn.reply(m.chat, d + wm, m)
} else {
conn.sendButton(
m.chat,
d,
wm,
null,
[
['𝙈𝙚𝙣𝙪 𝙋𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡 | 𝙈𝙖𝙞𝙣 𝙢𝙚𝙣𝙪 ⚡', '#menu'],
['𝙈𝙚𝙣𝙪́ 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 💫', '.allmenu']
],
null,
null,
null,
m
)
}
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'diamond', 'balance']
export default handler

/*await conn.sendHydrated(m.chat, d, wm, null, md, '𝙕𝙀𝙉𝙏𝙍𝘼𝙓-𝙈𝘿', null, null, [
['𝙈𝙚𝙣𝙪 𝙋𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡 | 𝙈𝙖𝙞𝙣 𝙢𝙚𝙣𝙪 ⚡', '#menu'],
['𝙈𝙚𝙣𝙪́ 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 💫', '.allmenu']
], m,)*/
