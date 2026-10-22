import axios from 'axios'
import fetch from 'node-fetch'

const getRandomImageNsfw = async (type) => {
  try {
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
    let res = await fetch(apiMap[type])
    let json = await res.json()
    return json.url
  } catch {
    return null
  }
}

let handler = async (m, { conn, command }) => {
  if (!db.data.chats[m.chat].modohorny && m.isGroup) return conn.reply(m.chat, `🔞 El NSFW está desactivado en este grupo`, m)

  try {
    let contenido = `🔞 *ZENTRAX-MD NSFW* 🔞\nComando: ${command}`

    if (command == 'pornopies' || command == 'nsfwfoot') {
      let img = await getRandomImageNsfw('nsfwfoot')
      await conn.sendFile(m.chat, img, null, contenido, m, null, {viewOnce: true})
    }
    if (command == 'pornoass' || command == 'nsfwass') {
      let img = await getRandomImageNsfw('nsfwass')
      await conn.sendFile(m.chat, img, null, contenido, m, null, {viewOnce: true})
    }
    if (command == 'porno' || command == 'porn' || command == 'pornorandom') {
      let res = (await axios.get('https://raw.githubusercontent.com/ANGELOFCDEV/ZENTRAX-MD/master/src/JSON/porno.json')).data
      let enlace = res[Math.floor(Math.random() * res.length)]
      await conn.sendFile(m.chat, enlace, null, contenido, m, null, {viewOnce: true})
    }
  } catch (e) {
    m.reply(`Error NSFW: ${e.message}`)
  }
}

handler.help = ['porno']
handler.tags = ['nsfw']
handler.command = /^(porno|porn|pornotetas|nsfwboobs|pornobooty|nsfwbooty|pornopies|nsfwfoot|pornoass|nsfwass|pornobdsm|nsfwbdsm|pornocum|nsfwcum|pornoero|nsfwero|pornorandom|pornrandom)$/i
handler.group = true
export default handler