import axios from 'axios'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { sticker } from '../lib/sticker.js'

const getRandomImageNsfw = async (type) => {
  try {
    // APIs públicas que usa ZENTRAX-MD
    const apiMap = {
      nsfwfoot: 'https://api.waifu.pics/nsfw/feet',
      nsfwass: 'https://api.waifu.pics/nsfw/ass',
      nsfwbdsm: 'https://api.waifu.pics/nsfw/bdsm',
      nsfwcum: 'https://api.waifu.pics/nsfw/cum',
      nsfwero: 'https://api.waifu.pics/nsfw/ero',
      nsfwfemdom: 'https://api.waifu.pics/nsfw/femdom',
      nsfwglass: 'https://api.waifu.pics/nsfw/glasses',
      nsfwhentai: 'https://api.waifu.pics/nsfw/hentai',
      nsfworgy: 'https://api.waifu.pics/nsfw/orgy',
      nsfwyuri: 'https://api.waifu.pics/nsfw/yuri',
      nsfwtrap: 'https://api.waifu.pics/nsfw/trap'
    }
    let url = apiMap[type]
    if (!url) return null
    let res = await fetch(url)
    let json = await res.json()
    return json.url
  } catch {
    return null
  }
}
const nsfw = getRandomImageNsfw

let handler = async (m, { conn, usedPrefix, command }) => {
let frep = { contextInfo: { externalAdReply: { title: wm, body: '🔞 ZENTRAX-MD NSFW 🔞', sourceUrl: redesMenu.getRandom(), thumbnail: await (await fetch(img16)).buffer() } } }
let user = global.db.data.users[m.sender]
if (!db.data.chats[m.chat].modohorny && m.isGroup) return conn.reply(m.chat, `*${lenguajeGB['smsContAdult']()}*`, m)

const horarioNsfw = db.data.chats[m.chat].horarioNsfw
const now = moment.tz('America/Guayaquil')
const currentTime = now.format('HH:mm')
if (horarioNsfw) {
const {inicio, fin} = horarioNsfw
const inicioTime = moment(inicio, 'HH:mm').tz('America/Guayaquil')
const finTime = moment(fin, 'HH:mm').tz('America/Guayaquil')
const currentMoment = moment(currentTime, 'HH:mm').tz('America/Guayaquil')
let isWithinTimeRange = false
if (inicioTime.isAfter(finTime)) {
if (currentMoment.isBetween(inicioTime, moment('23:59', 'HH:mm').tz('America/Guayaquil')) || currentMoment.isBetween(moment('00:00', 'HH:mm').tz('America/Guayaquil'), finTime)) isWithinTimeRange = true
} else {
if (currentMoment.isBetween(inicioTime, finTime)) isWithinTimeRange = true
}
if (!isWithinTimeRange) return m.reply(`*Este comando solo funciona en el horario habilitado en este grupo es: ${inicio} a ${fin}*`)
}

try {
let contenido = `${lenguajeGB['smsCont18Porn']()}\n${lenguajeGB['smsBotonM7']()} » ${user.premiumTime > 0 ? '✅' : '❌'}`

if (command == 'pornopies' || command == 'nsfwfoot') {
let img = await nsfw('nsfwfoot')
await conn.sendFile(m.chat, img, null, contenido, null, null, {viewOnce: true}, m)
}
if (command == 'pornoass' || command == 'nsfwass') {
let img = await nsfw('nsfwass')
await conn.sendFile(m.chat, img, null, contenido, null, null, {viewOnce: true}, m)
}
if (command == 'pornobdsm' || command == 'nsfwbdsm') {
let img = await nsfw('nsfwbdsm')
await conn.sendFile(m.chat, img, null, contenido, null, null, {viewOnce: true}, m)
}
if (command == 'pornocum' || command == 'nsfwcum') {
let img = await nsfw('nsfwcum')
await conn.sendFile(m.chat, img, null, contenido, null, null, {viewOnce: true}, m)
}
if (command == 'pornoero' || command == 'nsfwero') {
let img = await nsfw('nsfwero')
await conn.sendFile(m.chat, img, null, contenido, null, null, {viewOnce: true}, m)
}
if (command == 'pornotetas' || command == 'nsfwboobs') {
let res = await conn.getFile('https://api-fgmods.ddns.net/api/nsfw/boobs?apikey=fg-dylux').catch(async () => {
let resError = (await axios.get('https://raw.githubusercontent.com/ANGELOFCDEV/ZENTRAX-MD/master/src/JSON/tetas.json')).data
return resError[Math.floor(Math.random() * resError.length)]
})
let toSend = typeof res === 'string' ? res : res.data || res
await conn.sendFile(m.chat, toSend, null, contenido, null, null, {viewOnce: true}, m)
}
if (command == 'pornobooty' || command == 'nsfwbooty') {
let res = await conn.getFile('https://api-fgmods.ddns.net/api/nsfw/ass?apikey=fg-dylux').catch(async () => {
let resError = (await axios.get('https://raw.githubusercontent.com/ANGELOFCDEV/ZENTRAX-MD/master/src/JSON/booty.json')).data
return resError[Math.floor(Math.random() * resError.length)]
})
let toSend = typeof res === 'string' ? res : res.data || res
await conn.sendFile(m.chat, toSend, null, contenido, null, null, {viewOnce: true}, m)
}
if (command == 'porno' || command == 'porn' || command == 'pornorandom' || command == 'pornrandom') {
let res = (await axios.get('https://raw.githubusercontent.com/ANGELOFCDEV/ZENTRAX-MD/master/src/JSON/porno.json')).data
let enlace = res[Math.floor(Math.random() * res.length)]
await conn.sendFile(m.chat, enlace, null, contenido, null, null, {viewOnce: true}, m)
}

} catch (e) {
console.log(e)
m.reply(`*Error en ZENTRAX-MD NSFW*\n${e.message}`)
}
}

handler.help = ['porno', 'pornotetas', 'pornobooty', 'pornoass', 'pornopies']
handler.tags = ['nsfw', 'adult']
handler.command = /^(porno|porn|pornotetas|nsfwboobs|pornobooty|nsfwbooty|pornopies|nsfwfoot|pornoass|nsfwass|pornobdsm|nsfwbdsm|pornocum|nsfwcum|pornoero|nsfwero|pornofurro|nsfwfurry|pornoecchi|nsfwecchi|pornoyuri|nsfwyuri|pornorandom|pornrandom)$/i
handler.group = true

export default handler