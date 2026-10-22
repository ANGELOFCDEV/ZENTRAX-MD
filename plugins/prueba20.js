import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, {conn}) => {
  try {
    let res = await fetch('https://api.waifu.pics/nsfw/waifu')
    let json = await res.json()

    let resultJson = {
      name: 'Waifu Random',
      author: 'ZENTRAX-MD',
      description: 'Imagen NSFW aleatoria',
      link: json.url
    }

    let txt
    txt = `
Nombre: ${resultJson.name}

Autor: ${resultJson.author}

Descripción: ${resultJson.description}`

    await conn.sendMessage(m.chat, {image: {url: resultJson.link}, caption: txt.trim()}, {quoted: m})
    // si quieres usar tu EventV2 dejalo así:
    // await conn.sendEventV2(m.chat, 'Text', 'Descripción', 'Toca para ver más', false)

  } catch (e) {
    m.reply('Error al obtener imagen: ' + e.message)
  }
}

handler.command = /^(prueba36)$/i
export default handler