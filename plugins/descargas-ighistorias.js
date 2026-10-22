let handler = async (m, {conn, args, usedPrefix, command}) => {
if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsInsta2}\n*${usedPrefix + command} ANGEL OFC DEV*`
try {
await m.reply(global.wait)
const res = await fetch(`https://api.lolhuman.xyz/api/igstory/${args[0]}?apikey=${lolkeysapi}`)
var anu = await res.json()
var anuku = anu.result
if (anuku == '') return m.reply(`${lenguajeGB['smsAvisoFG']()}${mid.smsInsta3}`)
for (var i of anuku) {
let res = await axios.head(i)
let mime = res.headers['content-type']
if (/image/.test(mime))
await conn.sendFile(m.chat, i, 'error.jpg', null, m).catch(() => {
return m.reply(`${lenguajeGB['smsAvisoFG']()}${mid.smsInsta3}`)
})
if (/video/.test(mime))
await conn.sendFile(m.chat, i, 'error.mp4', null, m).catch(() => {
return m.reply(`${lenguajeGB['smsAvisoFG']()}${mid.smsInsta3}`)
})
conn.reply(m.chat, `${lenguajeGB['smsAvisoIIG']()}${mid.smsinfo}`, m, {
contextInfo: {
externalAdReply: {
mediaUrl: null,
mediaType: 1,
description: null,
title: '𝙕𝙀𝙉𝙏𝙍𝘼𝙓-𝙈𝘿 | 𝘼𝙉𝙂𝙀𝙇 𝙊𝙁𝘾 𝘿𝙀𝙑',
body: 'Super Bot WhatsApp',
previewType: 0,
thumbnail: gataMenu,
sourceUrl: md
}
}
})
}
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
handler.limit = false
}
}
handler.help = ['igstory <username>']
handler.tags = ['downloader']
handler.command = ['igstory', 'ighistoria', 'ighistorias']
handler.limit = 3
handler.register = true
export default handler

/*import axios from 'axios'
import hx from 'hxz-api' 

let handler = async (m, { conn, args, usedPrefix, command, text}) => {
if (!text) throw `${lenguajeGB['smsAvisoMG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 𝘿𝙀 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙍 𝙇𝘼𝙎 𝙃𝙄𝙎𝙏𝙊𝙍𝙄𝘼𝙎\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} ANGEL OFC DEV*\n\n𝙀𝙉𝙏𝙀𝙍 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙐𝙎𝙀𝙍𝙉𝘼𝙈𝙀 𝙏𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙎𝙏𝙊𝙍𝙄𝙀𝙎\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} ANGEL OFC DEV*`

hx.igstory(text).then(async (result) => {
for (let i of result.medias) {
if (i.url.includes("mp4")) {            
conn.sendFile(m.chat, i.url, 'igstory.mp4', wm, m)
} else {     
conn.sendFile(m.chat, i.url, '', '', m)
}}}); 
  
let info = `💖 *Infórmate sobre las Novedades y recuerda tener la última versión.*\n\n💝 *Find out about what's new and remember to have the latest version.*
  `
 conn.sendButton(m.chat, info, `𝘼𝙉𝙂𝙀𝙇 𝙊𝙁𝘾 𝘿𝙀𝙑 - 𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝘾𝙄𝘼\n${asistencia}\n\n`, [
['𝙈𝙚𝙣𝙪 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨 🌀', '#descargasmenu'],
['𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 ✨', '.allmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']], m)
/*.trim()  
await conn.sendHydrated(m.chat, info, wm, null, ig, '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢', null, null, [
['𝙈𝙚𝙣𝙪 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨 🌀', '#descargasmenu'],
['𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 ✨', '.allmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
], m,)  
}
handler.help = ['igstory <username>']
handler.tags = ['downloader']
handler.command = ['igstory', 'ighistoria', 'ighistorias' ]
handler.limit = 3
handler.exp = 87
export default handler
*/
