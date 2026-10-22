import fetch from 'node-fetch'
//import { areJidsSameUser } from '@adiwajshing/baileys'
let {areJidsSameUser} = (await import(global.baileys)).default
let handler = async (m, {conn, text, participants, groupMetadata}) => {
let fkontak = {
key: {participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo'},
message: {
contactMessage: {
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}
},
participant: '0@s.whatsapp.net'
}
let grupos = [nna, nn, nnn, nnnt]
let gata = [img5, img6, img7, img8, img9]
let enlace = {
contextInfo: {
externalAdReply: {
title: wm + ' 🐈',
body: 'support group',
sourceUrl: grupos.getRandom(),
thumbnail: await (await fetch(zentrax.getRandom())).buffer()
}
}
}
let enlace2 = {
contextInfo: {
externalAdReply: {
showAdAttribution: true,
mediaUrl: yt,
mediaType: 'VIDEO',
description: '',
title: wm,
body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗭𝗘𝗡𝗧𝗥𝗔𝗫-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
thumbnailUrl: await (await fetch(gataImg)).buffer(),
sourceUrl: yt
}
}
}
let dos = [enlace, enlace2]

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
var number = text.split`@`[1]

if (!text && !m.quoted)
return await conn.reply(
m.chat,
`${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀 𝙍𝙀𝘾𝙃𝘼𝙕𝘼𝙍 𝘾𝙊𝙈𝙊 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙏𝘼𝙂 𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝙍𝙀𝙅𝙀𝘾𝙏 𝘼𝙎 𝘼 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`,
fkontak,
m
)
//await conn.sendButton(m.chat, `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀 𝙍𝙀𝘾𝙃𝘼𝙕𝘼𝙍 𝘾𝙊𝙈𝙊 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙏𝘼𝙂 𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝙍𝙀𝙅𝙀𝘾𝙏 𝘼𝙎 𝘼 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)

try {
if (text) {
var user = number + '@s.whatsapp.net'
} else if (m.quoted.sender) {
var user = conn.getName(m.quoted.sender)
} else if (m.mentionedJid) {
var user = number + '@s.whatsapp.net'
}
} catch (e) {
} finally {
let users = m.isGroup ? participants.find((v) => areJidsSameUser(v.jid == user)) : {}
let yo = conn.getName(m.sender)
let tu = conn.getName(who)

if (!users)
return await conn.reply(
m.chat,
`${fg}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼, 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙒𝘼𝙎 𝙉𝙊𝙏 𝙁𝙊𝙐𝙉𝘿, 𝙏𝙃𝙀𝙔 𝙈𝙐𝙎𝙏 𝘽𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋`,
fkontak,
m
)
//await conn.sendButton(m.chat, `${fg}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼, 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙒𝘼𝙎 𝙉𝙊𝙏 𝙁𝙊𝙐𝙉𝘿, 𝙏𝙃𝙀𝙔 𝙈𝙐𝙎𝙏 𝘽𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)

if (user === m.sender) return await conn.reply(m.chat, `${fg}𝙐𝙎𝙏𝙀𝘿 𝙈𝙄𝙎𝙈𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝙎𝙀𝙍 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙔𝙊𝙐 𝙔𝙊𝙐𝙍𝙎𝙀𝙇𝙁 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, fkontak, m)
//await conn.sendButton(m.chat, `${fg}𝙐𝙎𝙏𝙀𝘿 𝙈𝙄𝙎𝙈𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝙎𝙀𝙍 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙔𝙊𝙐 𝙔𝙊𝙐𝙍𝙎𝙀𝙇𝙁 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)

if (user === conn.user.jid) return await conn.reply(m.chat, `${fg}𝙔𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙊 𝙎𝙀𝙍 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼 😹\n\n𝙒𝙄𝙏𝙃 𝙈𝙀 𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝘾𝙊𝙐𝙋𝙇𝙀`, fkontak, m)
//await conn.sendButton(m.chat, `${fg}𝙔𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙊 𝙎𝙀𝙍 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼 😹\n\n𝙒𝙄𝙏𝙃 𝙈𝙀 𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝘾𝙊𝙐𝙋𝙇𝙀`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)

if (global.db.data.users[user].pasangan != m.sender) {
return await conn.reply(
m.chat,
`𝙉𝙊 𝙋𝙐𝙀𝘿𝙀𝙎 𝙍𝙀𝘾𝙃𝘼𝙕𝘼𝙍 𝘼 *${tu}* 𝙎𝙄 𝙉𝙄𝙉𝙂𝙐𝙉𝙊 𝙎𝙀 𝙃𝘼 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝘿𝙊, 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝙏𝙀 𝙋𝘼𝙍𝘼 𝙌𝙐𝙀 𝘿𝙄𝙂𝘼 𝙎𝙄 𝙏𝙀 𝘼𝘾𝙀𝙋𝙏𝘼 𝙊 𝙏𝙀 𝙍𝙀𝘾𝙃𝘼𝙕𝘼\n\n𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘿𝙀𝘾𝙇𝙄𝙉𝙀 𝙄𝙁 𝙉𝙊𝘽𝙊𝘿𝙔 𝙃𝘼𝙎 𝘿𝙀𝘾𝙇𝘼𝙍𝙀𝘿, 𝘿𝙀𝘾𝙇𝘼𝙍𝙀 𝙒𝙄𝙏𝙃 *${tu}* 𝙏𝙊 𝙎𝘼𝙔 𝙄𝙁 𝙔𝙊𝙐 𝘼𝘾𝘾𝙀𝙋𝙏 𝙊𝙍 𝙍𝙀𝙅𝙀𝘾𝙏 𝙔𝙊𝙐`,
fkontak,
m,
{contextInfo: {mentionedJid: [user, tu]}}
)
//await conn.sendButton(m.chat, `𝙉𝙊 𝙋𝙐𝙀𝘿𝙀𝙎 𝙍𝙀𝘾𝙃𝘼𝙕𝘼𝙍 𝘼 *${tu}* 𝙎𝙄 𝙉𝙄𝙉𝙂𝙐𝙉𝙊 𝙎𝙀 𝙃𝘼 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝘿𝙊, 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝙏𝙀 𝙋𝘼𝙍𝘼 𝙌𝙐𝙀 𝘿𝙄𝙂𝘼 𝙎𝙄 𝙏𝙀 𝘼𝘾𝙀𝙋𝙏𝘼 𝙊 𝙏𝙀 𝙍𝙀𝘾𝙃𝘼𝙕𝘼\n\n𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘿𝙀𝘾𝙇𝙄𝙉𝙀 𝙄𝙁 𝙉𝙊𝘽𝙊𝘿𝙔 𝙃𝘼𝙎 𝘿𝙀𝘾𝙇𝘼𝙍𝙀𝘿, 𝘿𝙀𝘾𝙇𝘼𝙍𝙀 𝙒𝙄𝙏𝙃 *${tu}* 𝙏𝙊 𝙎𝘼𝙔 𝙄𝙁 𝙔𝙊𝙐 𝘼𝘾𝘾𝙀𝙋𝙏 𝙊𝙍 𝙍𝙀𝙅𝙀𝘾𝙏 𝙔𝙊𝙐`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m, { contextInfo: { mentionedJid: [user, tu] }})
} else {
global.db.data.users[user].pasangan = ''
return await conn.reply(
m.chat,
`😿 𝙇𝘼𝙈𝙀𝙉𝙏𝘼𝘽𝙇𝙀𝙈𝙀𝙉𝙏𝙀 *${yo}* 𝙎𝙀 𝙃𝘼 𝙉𝙀𝙂𝘼𝘿𝙊 🚫 𝙀𝙉 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝙐𝙉𝘼 𝙍𝙀𝙇𝘼𝘾𝙄𝙊𝙉 𝘾𝙊𝙉𝙏𝙄𝙂𝙊 *${tu}*\n𝙉𝙊 𝙀𝙎𝙏𝙀𝙎 𝙏𝙍𝙄𝙎𝙏𝙀, 𝘼𝙐𝙉 𝙏𝙄𝙀𝙉𝙀𝙎 𝙈𝙐𝘾𝙃𝘼𝙎 𝘾𝙊𝙎𝘼𝙎 𝙋𝙊𝙍 𝙃𝘼𝘾𝙀𝙍 🍃\n\n𝙏𝙃𝙀𝙍𝙀 𝘼𝙍𝙀 𝙉𝙊 𝙍𝙀𝘼𝙎𝙊𝙉𝙎 𝙁𝙊𝙍 𝙏𝙃𝙀𝙈 𝙏𝙊 𝘽𝙀 𝘼 𝘾𝙊𝙐𝙋𝙇𝙀, 𝘿𝙊𝙉'𝙏 𝘽𝙀 𝘿𝙄𝙎𝘾𝙊𝙐𝙍𝘼𝙂𝙀𝘿`,
`*${tu} 💔 ${yo}*\n`,
m,
{
contextInfo: {
mentionedJid: [user, tu, yo],
externalAdReply: {
mediaUrl: null,
mediaType: 1,
description: null,
title: gt,
body: '',
previewType: 0,
thumbnail: gataImg,
sourceUrl: accountsgb
}
}
}
)
//await conn.sendButton(m.chat, `😿 𝙇𝘼𝙈𝙀𝙉𝙏𝘼𝘽𝙇𝙀𝙈𝙀𝙉𝙏𝙀 *${yo}* 𝙎𝙀 𝙃𝘼 𝙉𝙀𝙂𝘼𝘿𝙊 🚫 𝙀𝙉 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝙐𝙉𝘼 𝙍𝙀𝙇𝘼𝘾𝙄𝙊𝙉 𝘾𝙊𝙉𝙏𝙄𝙂𝙊 *${tu}*\n𝙉𝙊 𝙀𝙎𝙏𝙀𝙎 𝙏𝙍𝙄𝙎𝙏𝙀, 𝘼𝙐𝙉 𝙏𝙄𝙀𝙉𝙀𝙎 𝙈𝙐𝘾𝙃𝘼𝙎 𝘾𝙊𝙎𝘼𝙎 𝙋𝙊𝙍 𝙃𝘼𝘾𝙀𝙍 🍃\n\n𝙏𝙃𝙀𝙍𝙀 𝘼𝙍𝙀 𝙉𝙊 𝙍𝙀𝘼𝙎𝙊𝙉𝙎 𝙁𝙊𝙍 𝙏𝙃𝙀𝙈 𝙏𝙊 𝘽𝙀 𝘼 𝘾𝙊𝙐𝙋𝙇𝙀, 𝘿𝙊𝙉'𝙏 𝘽𝙀 𝘿𝙄𝙎𝘾𝙊𝙐𝙍𝘼𝙂𝙀𝘿`, `*${tu} 💔 ${yo}*\n` + wm, img5, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], m, dos.getRandom(), { contextInfo: { mentionedJid: [user, tu, yo]}})
}
}
}
handler.command = /^(rechazar|cancelar|decline)$/i
handler.group = true
export default handler
