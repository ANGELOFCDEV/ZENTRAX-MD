import { find_lyrics } from '@brandond/findthelyrics'
import { getTracks } from '@green-code/music-track-data'
import { googleImage } from '@bochilteam/scraper'
const handler = async (m, {conn, text, usedPrefix, command}) => {
const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
if (!teks) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused3}\n*${usedPrefix + command} Billie Eilish bored*`
try {
const result = await getTracks(teks)
const lyrics = await find_lyrics(`${result[0].artist} ${result[0].title}`)
const res = await fetch(global.API('https://some-random-api.com', '/lyrics', {title: result[0].artist + result[0].title}))
const json = await res.json()
let img
try {
img = result.album.artwork
} catch {
try {
img = json.thumbnail.genius
} catch {
const bochil = await googleImage(`${result[0].artist} ${result[0].title}`)
img = await bochil.getRandom()
}
}
await conn.sendButton(
m.chat,
`ღ ${mid.smsYT1} :\n💚 *${result[0].title || ''}*\n\nღ ${mid.smsYT2} :\n💜 *${result[0].artist || ''}*\n\nღ ${mid.smsYT3} :\n${lyrics || ''}`,
null,
img,
[
['𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙧 | 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙 🚀', `/play ${text}`],
['𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖𝙨 | 𝙎𝙚𝙖𝙧𝙘𝙝𝙚𝙨 🔎', '#buscarmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
],
null,
null,
m
)
//conn.sendFile(m.chat, img, 'letra.jpg', `ღ ${mid.smsYT1} :\n💚 *${result[0].title || ''}*\n\nღ ${mid.smsYT2} :\n💜 *${result[0].artist || ''}*\n\nღ ${mid.smsYT3} :\n${lyrics || ''}`, fkontak, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗭𝗘𝗡𝗧𝗥𝗔𝗫-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
await conn.sendMessage(
m.chat,
{audio: {url: result[0].preview}, fileName: `${result[0].artist} ${result[0].title}.mp3`, mimetype: 'audio/mp4'},
{quoted: m}
)
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
handler.limit = 0
}
}
handler.help = ['lirik', 'letra'].map((v) => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric|letra)$/i
handler.limit = 1
//handler.level = 2
//handler.register = true
export default handler

/*import fetch from 'node-fetch'
import { lyrics, lyricsv2, googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
if (!teks) throw `${lenguajeGB['smsAvisoMG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉𝘼 𝘾𝘼𝙉𝘾𝙄𝙊𝙉 𝙋𝘼𝙍𝘼 𝙊𝘽𝙏𝙀𝙉𝙀𝙍 𝙇𝘼 𝙇𝙀𝙏𝙍𝘼\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} Runaway*\n\n𝙀𝙉𝙏𝙀𝙍 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀 𝙊𝙁 𝘼 𝙎𝙊𝙉𝙂 𝙏𝙊 𝙂𝙀𝙏 𝙏𝙃𝙀 𝙇𝙔𝙍𝙄𝘾𝙎\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} Billie Eilish bored*`
const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
try { 
let res = await fetch(global.API('https://some-random-api.ml', '/lyrics', {
title: result.author + result.title}))
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.thumbnail.genius) throw json

await conn.reply(m.chat, `𝙏𝙄𝙏𝙐𝙇𝙊 | 𝙏𝙄𝙏𝙇𝙀 
💚 *${result.title}*

𝘼𝙐𝙏𝙊𝙍(𝘼) | 𝘼𝙐𝙏𝙃𝙊𝙍
💜 *${result.author}*


${result.lyrics}


𝙀𝙉𝙇𝘼𝘾𝙀 | 𝙐𝙍𝙇
🧡 *${result.link}*`, fkontak,  m)

} catch (e) {
  await conn.reply(m.chat, `*⚠️ VUELVA A INTERNARLO, SI EL COMANDO SIGUE FALLANDO REPÓRTELO A LA CREADORA USANDO #reporte*`, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
}}
handler.help = ['lirik','letra'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric|letra)$/i
handler.limit = 1
handler.level = 3
handler.exp = 55
export default handler */
