import fetch from 'node-fetch'
let handler = async (m, {conn, args, text, command, usedPrefix}) => {
if (!text) throw `${lenguajeGB['smsAvisoMG']()}${mid.TikTok}\n*${usedPrefix + command} ZENTRAX_Dios*`
try {
let res = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${lolkeysapi}`
await conn.sendFile(m.chat, res, 'error.jpg', `✅ ${mid.TikTok1}\n💟 *${text}*`, m, false)
conn.reply(m.chat, `${lenguajeGB['smsAvisoIIG']()} *${mid.smsinfo}*`, m, {
contextInfo: {
externalAdReply: {
mediaUrl: null,
mediaType: 1,
description: null,
title: wm,
body: 'Super Bot WhatsApp',
previewType: 0,
thumbnail: gataMenu,
sourceUrl: md
}
}
})
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
handler.limit = false
}
}
handler.help = ['tiktokfoto'].map((v) => v + ' <username>')
handler.tags = ['downloader']
handler.command = /^(tiktokfoto|tiktokphoto)$/i
handler.limit = 1
handler.register = true
export default handler

/*conn.sendHydrated(m.chat, info, wm, null, md, '𝙕𝙀𝙉𝙏𝙍𝘼𝙓-𝙈𝘿', null, null, [
['𝙈𝙚𝙣𝙪 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨 🌀', '#descargasmenu'],
['𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 ✨', '.allmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
], m,)*/
