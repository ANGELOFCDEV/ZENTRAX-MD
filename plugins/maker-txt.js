let handler = async (m, {conn, text, usedPrefix, command}) => {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
if (!teks)
throw `${lenguajeGB['smsAvisoMG']()} 𝙌𝙐𝙀 𝙀𝙎𝘾𝙍𝙄𝘽𝙄𝙊? 𝙐𝙎𝘼𝙍 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙀 𝙇𝘼 𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 𝙁𝙊𝙍𝙈𝘼\n\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊: *${usedPrefix + command}* Hola ZENTRAX`
let img = global.API('fgmods', '/api/maker/txt', {text: teks}, 'apikey')
conn.sendFile(m.chat, img, 'img.png', `✍🏻 𝙀𝙎𝙏𝘼 𝙇𝙄𝙎𝙏𝙊!!\n${wm}`, m)
}
handler.help = ['txt']
handler.tags = ['fun']
handler.command = ['txt', 'escribir', 'escribe']

export default handler
