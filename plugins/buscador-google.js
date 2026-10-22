//import { googleIt } from '@bochilteam/scraper';
import google from 'google-it'
import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, {conn, command, args, usedPrefix}) => {
const fetch = (await import('node-fetch')).default
const text = args.join` `
if (!text) throw `${lenguajeGB['smsAvisoMG']()} ${mid.smsMalused} *${usedPrefix + command} Cat*`
try {
const res = await fetch(`${apis}/search/googlesearch?query=${text}`)
const data = await res.json()

if (data.status && data.data && data.data.length > 0) {
let teks = `🔍 ${mid.buscador9} ${text}\n\n`
for (let result of data.data) {
teks += `*${result.title}*\n_${result.url}_\n_${result.description}_\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n`
}

const ss = `https://image.thum.io/get/fullpage/https://google.com/search?q=${encodeURIComponent(text)}`
conn.sendFile(m.chat, ss, 'result.png', teks, fkontak)
m.react('✅')
}
} catch {
try {
const res = await fetch(`https://api.alyachan.dev/api/google?q=${text}&apikey=ZENTRAX-Dios`)
const data = await res.json()

if (data.status && data.data && data.data.length > 0) {
let teks = `🔍 ${mid.buscador9} ${text}\n\n`
for (let result of data.data) {
teks += `_${result.title}_\n_${result.formattedUrl || result.url}_\n_${result.snippet || result.description}_\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n`
}
const ss = `https://image.thum.io/get/fullpage/https://google.com/search?q=${encodeURIComponent(text)}`
conn.sendFile(m.chat, ss, 'result.png', teks, fkontak)
}
} catch {
try {
const url = 'https://google.com/search?q=' + encodeURIComponent(text)
google({query: text}).then((res) => {
let teks = `🔍 ${mid.buscador9} ${text}\n\n*${url}*\n\n`
for (let g of res) {
teks += `_${g.title}_\n_${g.link}_\n_${g.snippet}_\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n`
}
const ss = `https://image.thum.io/get/fullpage/${url}`
conn.sendFile(m.chat, ss, 'error.png', teks, fkontak, false, {
contextInfo: {
externalAdReply: {
mediaUrl: null,
mediaType: 1,
description: null,
title: gt,
body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗭𝗘𝗡𝗧𝗥𝗔𝗫-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
previewType: 0,
thumbnail: imagen4,
sourceUrl: accountsgb
}
}
})
//m.reply(teks)
})
} catch {
handler.limit = 0
}
}
}
}
handler.help = ['google', 'googlef'].map((v) => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.register = true
handler.limit = 1
export default handler

/*import { googleIt } from '@bochilteam/scraper'
let handler = async (m, { conn, command, args, usedPrefix }) => {
const fetch = (await import('node-fetch')).default
let full = /f$/i.test(command)
let text = args.join` `
if (!text) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙇𝙊 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀 𝘽𝙐𝙎𝘾𝘼𝙍\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} ZENTRAX*\n\n𝙏𝙔𝙋𝙀 𝙒𝙃𝘼𝙏 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝙎𝙀𝘼𝙍𝘾𝙃 𝙁𝙊𝙍\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} Cat*`, m)
let pp = './media/menus/Menu1.jpg'
let url = 'https://google.com/search?q=' + encodeURIComponent(text)
let search = await googleIt(text)
let msg = search.articles.map(({
// header,
title,
url,
description
}) => {
return `*${title}*\n_${url}_\n_${description}_\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`
}).join('\n\n')

/*let info = `💖 *Infórmate sobre las Novedades y recuerda tener la última versión.*\n\n💝 *Find out about what's new and remember to have the latest version.*
  `.trim()
conn.sendHydrated(m.chat, info, wm, pp, ig, '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢', null, null, [
['𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖𝙨 | 𝙎𝙚𝙖𝙧𝙘𝙝𝙚𝙨 🔎', '#buscarmenu'],
['𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 ✨', '.allmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
], m,) 
try {
let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).arrayBuffer()
if (/<!DOCTYPE html>/i.test(ss.toBuffer().toString())) throw ''
await conn.sendFile(m.chat, ss, 'error.png', url + '\n\n' + msg, m)
} catch (e) {
m.reply(msg)
}}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.exp = 40
handler.exp = 3
export default handler*/
