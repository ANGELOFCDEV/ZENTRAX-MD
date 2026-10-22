import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
let handler = async (m, {conn, text, args, usedPrefix, command}) => {
let user = global.db.data.users[m.sender]
let f = user.packname || global.packname
let g = user.packname && user.author ? user.author : user.packname && !user.author ? '' : global.author
if (!text)
throw `${mg}𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙋𝘼𝙍𝘼 𝙌𝙐𝙀 𝙀𝙇 𝙏𝙀𝙓𝙏𝙊 𝙎𝙀 𝘾𝙊𝙉𝙑𝙄𝙀𝙍𝙏𝘼 𝙀𝙉 𝙎𝙏𝙄𝘾𝙆𝙀𝙍\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command}* Nuevo Sticker\n\n𝙒𝙍𝙄𝙏𝙀 𝙎𝙊 𝙏𝙃𝙀 𝙏𝙀𝙓𝙏 𝘽𝙀𝘾𝙊𝙈𝙀𝙎 𝘼 𝙎𝙏𝙄𝘾𝙆𝙀𝙍\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command}* New Sticker*`
let teks = encodeURI(text)

if (command == 'attp') {
let stiker = await sticker(null, `${global.APIs.fgmods.url}/maker/attp?text=${teks}&apikey=${global.APIs.fgmods.key}`, f, g)
conn.sendFile(
m.chat,
stiker,
'sticker.webp',
'',
m,
true,
{
contextInfo: {
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
showAdAttribution: false,
title: wm,
body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗭𝗘𝗡𝗧𝗥𝗔𝗫-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
mediaType: 2,
sourceUrl: accountsgb,
thumbnail: imagen1
}
}
},
{quoted: m}
)
}

if (command == 'ttp') {
let stiker = await sticker(null, `${global.APIs.fgmods.url}/maker/ttp?text=${teks}&apikey=${global.APIs.fgmods.key}`, f, g)
conn.sendFile(
m.chat,
stiker,
'sticker.webp',
'',
m,
true,
{
contextInfo: {
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
showAdAttribution: false,
title: wm,
body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗭𝗘𝗡𝗧𝗥𝗔𝗫-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
mediaType: 2,
sourceUrl: accountsgb,
thumbnail: imagen1
}
}
},
{quoted: m}
)
}
}
handler.help = ['attp']
handler.tags = ['sticker']
handler.command = /^(attp|ttp|ttp2|ttp3|ttp4|attp2)$/i
handler.register = true
export default handler
