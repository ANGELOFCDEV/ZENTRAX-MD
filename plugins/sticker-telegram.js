import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
let handler = async (m, {conn, args, usedPrefix, command}) => {
let user = global.db.data.users[m.sender]
let f = user.packname || global.packname
let g = user.packname && user.author ? user.author : user.packname && !user.author ? '' : global.author
if (!args[0])
throw `${lenguajeGB['smsAvisoIIG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊:\n${usedPrefix + command} https://t.me/addstickers/Porcientoreal\n\n𝙀𝙉𝙏𝙀𝙍 𝙏𝙃𝙀 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈 𝙇𝙄𝙉𝙆\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀:\n${usedPrefix + command} https://t.me/addstickers/Porcientoreal`
if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `${lenguajeGB['smsAvisoIIG']()}𝙇𝘼 𝙐𝙍𝙇 𝙀𝙎 𝙄𝙉𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝘼\n𝙏𝙃𝙀 𝙐𝙍𝙇 𝙄𝙎 𝙄𝙉𝘾𝙊𝙍𝙍𝙀𝘾𝙏`
let packName = args[0].replace('https://t.me/addstickers/', '')
let gas = await fetch(
`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`,
{method: 'GET', headers: {'User-Agent': 'GoogleBot'}}
)
if (!gas.ok) throw eror
let json = await gas.json()
m.reply(
`${lenguajeGB['smsAvisoIIG']()} *𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙏𝙊𝙏𝘼𝙇𝙀𝙎:* ${json.result.stickers.length}\n*𝙀𝙉𝙑𝙄𝘼𝘿𝙊 𝙀𝙇:* ${json.result.stickers.length * 1.5} Segundos`.trim()
)
for (let i = 0; i < json.result.stickers.length; i++) {
let fileId = json.result.stickers[i].thumb.file_id
let gasIn = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
let jisin = await gasIn.json()
let stiker = await sticker(
false,
'https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/' + jisin.result.file_path,
f,
g
)
await conn.sendFile(
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
body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗭𝗘𝗡𝗧𝗥𝗔𝗫-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
mediaType: 2,
sourceUrl: redesMenu.getRandom(),
thumbnail: gataImg.getRandom()
}
}
},
{quoted: m}
)
await delay(3000)
}
throw `${lenguajeGB['smsAvisoEG']()}`
}
handler.help = ['stikertele *<url>*']
handler.tags = ['sticker', 'downloader']
handler.command = /^(stic?kertele(gram)?)$/i
handler.cookie = 1
handler.limit = 1
handler.register = true
export default handler

const delay = (time) => new Promise((res) => setTimeout(res, time))
