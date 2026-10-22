let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
import fetch from 'node-fetch'

let handler = async (m, {conn, args, text, users, user, usedPrefix, command, isPrems, isOwner, isROwner}) => {
try {
let texto0 = `${ag}𝙈𝙄 𝘾𝙍𝙀𝘼𝘿𝙊𝙍(𝘼) 𝙃𝘼 𝙍𝙀𝙎𝙏𝙍𝙄𝙉𝙂𝙄𝘿𝙊 𝙀𝙎𝙏𝘼 𝙁𝙐𝙉𝘾𝙄𝙊𝙉 𝘿𝙀 𝙄𝙉𝙂𝙍𝙀𝙎𝘼𝙍 𝙀𝙇 𝘽𝙊𝙏 𝙏𝙀𝙈𝙋𝙊𝙍𝘼𝙇𝙈𝙀𝙉𝙏𝙀 𝘼 𝙂𝙍𝙐𝙋𝙊𝙎 𝙑𝙐𝙀𝙇𝙑𝘼 𝙈𝘼𝙎 𝙏𝘼𝙍𝘿𝙀 𝙊 𝙐𝙎𝙀 𝙇𝘼 𝙁𝙐𝙉𝘾𝙄𝙊𝙉 *${usedPrefix}serbot*\n\n𝙈𝙔 𝘾𝙍𝙀𝘼𝙏𝙊𝙍 𝙃𝘼𝙎 𝙍𝙀𝙎𝙏𝙍𝙄𝘾𝙏𝙀𝘿 𝙏𝙃𝙄𝙎 𝙁𝙐𝙉𝘾𝙏𝙄𝙊𝙉 𝙊𝙁 𝙀𝙉𝙏𝙀𝙍𝙄𝙉𝙂 𝙏𝙃𝙀 𝘽𝙊𝙏 𝙏𝙀𝙈𝙋𝙊𝙍𝘼𝙍𝙄𝙇𝙔 𝙏𝙊 𝙂𝙍𝙊𝙐𝙋𝙎 𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙇𝘼𝙏𝙀𝙍 𝙊𝙍 𝙐𝙎𝙀 𝙏𝙃𝙀 𝙁𝙐𝙉𝘾𝙏𝙄𝙊𝙉 *${usedPrefix}jadibot*`
let texto1 = `${mg}𝙐𝙎𝙀 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘾𝙊𝙈𝙊 𝙀𝙎𝙏𝙀 𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} enlace de Grupo y Número de Token(s)*\n*${usedPrefix + command} ${grupos.getRandom()} 3*\n\n*3* 𝙏𝙊𝙆𝙀𝙉 🪙 = *30* 𝙈𝙄𝙉𝙐𝙏𝙊𝙎\n\n𝙐𝙎𝙀 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙇𝙄𝙆𝙀 𝙏𝙃𝙄𝙎 𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} ${grupos.getRandom()} 3*\n\n*3* 𝙏𝙊𝙆𝙀𝙉𝙎 🪙 = *30* 𝙈𝙄𝙉𝙐𝙏𝙀𝙎`
let texto2 = `${ag}¡𝙔𝘼 𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙏𝙊𝙆𝙀𝙉𝙎! 🪙\n\n𝘾𝙊𝙈𝙋𝙍𝘼 𝙏𝙊𝙆𝙀𝙉𝙎 𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙉𝙄𝙍 𝙕𝙀𝙉𝙏𝙍𝘼𝙓 𝘼 𝙏𝙐 𝙂𝙍𝙐𝙋𝙊 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊:\n*${usedPrefix}buy joincount 3*\n\n𝙔𝙊𝙐 𝙉𝙊 𝙇𝙊𝙉𝙂𝙀𝙍 𝙃𝘼𝙑𝙀 𝙏𝙊𝙆𝙀𝙉𝙎! 🪙\n\n𝘽𝙐𝙔 𝙏𝙊𝙆𝙀𝙉𝙎 𝙏𝙊 𝘽𝙀 𝘼𝘽𝙇𝙀 𝙏𝙊 𝙄𝙉𝙑𝙄𝙏𝙀 𝙕𝙀𝙉𝙏𝙍𝘼𝙓 𝙏𝙊 𝙔𝙊𝙐𝙍 𝙂𝙍𝙊𝙐𝙋 𝙒𝙄𝙏𝙃 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 *${usedPrefix}buy joincount 3*`
let texto3 = `${fg}𝙀𝙉𝙇𝘼𝘾𝙀 𝙉𝙊 𝙑𝘼𝙇𝙄𝘿𝙊. 𝘿𝙀𝘽𝙀 𝙎𝙀𝙍 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙂𝙍𝙐𝙋𝙊 𝘿𝙀 𝙒𝙃𝘼𝙏𝙎𝘼𝙋𝙋\n*${usedPrefix + command} ${grupos.getRandom()} 3*\n\n𝙄𝙉𝙑𝘼𝙇𝙄𝘿 𝙇𝙄𝙉𝙆. 𝙈𝙐𝙎𝙏 𝘽𝙀 𝙒𝙃𝘼𝙏𝙎𝘼𝙋𝙋 𝙂𝙍𝙊𝙐𝙋 𝙇𝙄𝙉𝙆\n*${usedPrefix + command} ${grupos.getRandom()} 3*`
let texto4 = `${mg}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙉𝙐𝙈𝙀𝙍𝙊 𝘿𝙀 𝙏𝙊𝙆𝙀𝙉(𝙎)\n*3* 𝙏𝙊𝙆𝙀𝙉 🪙 = *30* 𝙈𝙄𝙉𝙐𝙏𝙊𝙎\n\n𝙀𝙉𝙏𝙀𝙍 𝙏𝙃𝙀 𝙉𝙐𝙈𝘽𝙀𝙍 𝙊𝙁 𝙏𝙊𝙆𝙀𝙉𝙎\n*3* 𝙏𝙊𝙆𝙀𝙉𝙎 🪙 = *30* 𝙈𝙄𝙉𝙐𝙏𝙀𝙎`
let texto5 = `${fg}𝙈𝙄𝙉𝙄𝙈𝙊 *3* 𝙏𝙊𝙆𝙀𝙉(𝙎) 𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙉𝙄𝙍 𝘼 𝙕𝙀𝙉𝙏𝙍𝘼𝙓\n\n𝙈𝙄𝙉𝙄𝙈𝙐𝙈 *3* 𝙏𝙊𝙆𝙀𝙉𝙎 𝙏𝙊 𝘽𝙀 𝘼𝘽𝙇𝙀 𝙏𝙊 𝙅𝙊𝙄𝙉 𝙕𝙀𝙉𝙏𝙍𝘼𝙓`
let texto6 = `${fg}𝙈𝘼𝙓𝙄𝙈𝙊 *3* 𝙏𝙊𝙆𝙀𝙉(𝙎) 𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙉𝙄𝙍 𝘼 𝙕𝙀𝙉𝙏𝙍𝘼𝙓\n\n𝙈𝘼𝙓𝙄𝙈𝙐𝙈 *3* 𝙏𝙊𝙆𝙀𝙉𝙎 𝙏𝙊 𝘽𝙀 𝘼𝘽𝙇𝙀 𝙏𝙊 𝙅𝙊𝙄𝙉 𝙕𝙀𝙉𝙏𝙍𝘼𝙓`
let texto7 = `${eg}😻 𝙎𝙀 𝙃𝘼 𝙐𝙉𝙄𝘿𝙊 𝙕𝙀𝙉𝙏𝙍𝘼𝙓 𝘼𝙇 𝙂𝙍𝙐𝙋𝙊!!!\n\n𝙕𝙀𝙉𝙏𝙍𝘼𝙓 𝙃𝘼𝙎 𝙅𝙊𝙄𝙉𝙀𝘿 𝙏𝙃𝙀 𝙂𝙍𝙊𝙐𝙋!!!`

let img1 =
'https://img.freepik.com/vector-premium/animacion-monedas-pixeles-imagenes-animacion-moneda-oro-ilustracion-vectorial_350225-3.jpg?w=2000'
let img2 = 'https://img.freepik.com/premium-vector/set-8bit-pixel-graphics-icons-game-art-coins-gold-animation_534389-12.jpg?w=2000'

if (!global.db.data.settings[conn.user.jid].temporal) return await conn.reply(m.chat, texto0, fkontak, m)
//conn.sendButton( m.chat, wm, texto0, null, [[`🙌 𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝘼𝙍 𝘾𝙊𝙈𝘼𝙉𝘿𝙊`, `.reporte *Quiero unir a ZENTRAX en mí Grupo. Por favor Active la función #botemporal*`], [`🍀 𝙈 𝙀 𝙉 𝙐`, `.menu`]], fkontak, m)

if (!args[0]) return await conn.reply(m.chat, texto1, fkontak, m)
let [_, code] = args[0].match(linkRegex) || []

if (!linkRegex.test(args[0])) return await conn.reply(m.chat, texto3, fkontak, m)
//conn.sendButton( m.chat, wm, texto3, null, [[`🍀 𝙈 𝙀 𝙉 𝙐`, `.menu`]], fkontak, m)
let user = m.sender.split('@')[0]

if (!(isPrems || isOwner || isROwner)) {
//Para Usuarios
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
//if (!args[1]) throw `${mg}*USE EL COMANDO COMO ESTE EJEMPLO*\n*${usedPrefix + command} enlace y Número de Token(s)*\n\n*EJEMPLO*\n*${usedPrefix + command} ${nn} 3*\n\n*3 TOKEN 🪙 = 30 MINUTOS*`
//if (!linkRegex.test(args[0])) throw `${fg}𝙀𝙉𝙇𝘼𝘾𝙀 𝙉𝙊 𝙑𝘼𝙇𝙄𝘿𝙊.` //Aquí
if (user.joincount <= 1)
return conn.sendButton(m.chat, wm, texto2, img1, [[`🏪 𝘾𝙊𝙈𝙋𝙍𝘼𝙍 : 𝘽𝙐𝙔 3 ${rpgshopp.emoticon('joincount')}`, '.buy joincount 3']], fkontak, m)
if (isNaN(args[1])) return conn.sendButton(m.chat, wm, texto4, img1, [['🍀 𝙈 𝙀 𝙉 𝙐', '.menu']], fkontak, m)
if (args[1] < 3) return conn.sendButton(m.chat, wm, texto5, img2, [['🍀 𝙈 𝙀 𝙉 𝙐', '.menu']], fkontak, m)
if (args[1] > 3) return conn.sendButton(m.chat, wm, texto6, img2, [['🍀 𝙈 𝙀 𝙉 𝙐', '.menu']], fkontak, m) //Solo ingresará si tiene 3 Token(s)

await delay(3 * 3000)
let res = await conn.groupAcceptInvite(code)
await conn.reply(m.chat, texto7, fkontak, m)
//await conn.sendButton( m.chat, texto7, `${await conn.getName(res)} | ` + wm, null, [[`🍀 𝙈 𝙀 𝙉 𝙐`, `.menu`]], fkontak, m).then(async() => {
user.joincount -= args[1]
var jumlahHari = 600000 * args[1] // 10 minutos | Usuarios
var now = new Date() * 1

if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += jumlahHari
else global.db.data.chats[res].expired = now + jumlahHari
await conn.reply(
res,
`✅ ${gt} 𝙎𝙀 𝙃𝘼 𝙐𝙉𝙄𝘿𝙊 𝘼𝙇 𝙂𝙍𝙐𝙋𝙊!!!\n${await conn.getName(res)}\n\n𝙍𝙀𝘾𝙐𝙀𝙍𝘿𝙀 𝙌𝙐𝙀 𝙀𝙎 ⏳ 𝙏𝙀𝙈𝙋𝙊𝙍𝘼𝙇, 𝙐𝙎𝙀 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 *${usedPrefix}menu* 𝙋𝘼𝙍𝘼 𝙑𝙀𝙍 𝙀𝙇 𝙈𝙀𝙉𝙐\n\n🚪 𝙈𝙀 𝙎𝘼𝙇𝘿𝙍𝙀 𝘼𝙐𝙏𝙊𝙈𝘼𝙏𝙄𝘾𝘼𝙈𝙀𝙉𝙏𝙀 𝙀𝙉:\n${msToDate(global.db.data.chats[res].expired - now)}\n\n*${username}* 𝙇𝙀 𝙌𝙐𝙀𝘿𝘼 *${user.joincount}* 𝙏𝙊𝙆𝙀𝙉(𝙎)🪙\n\n❕ 𝙋𝙐𝙀𝘿𝙀 𝙐𝙎𝘼𝙍 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 *${usedPrefix + command}* 𝙏𝘼𝙈𝘽𝙄𝙀𝙉 𝙀𝙉 𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 𝙈𝙄𝙀𝙉𝙏𝙍𝘼𝙎 𝙀𝙎𝙏𝙀 𝙔𝙊\n\n❕\n*${usedPrefix + command}*\n\n❕ 𝙋𝘼𝙍𝘼 𝙐𝙉𝘼 𝙈𝙀𝙅𝙊𝙍 𝙀𝙓𝙋𝙀𝙍𝙄𝙀𝙉𝘾𝙄𝘼, 𝘿𝙀𝘽𝙊 𝘿𝙀 𝙎𝙀𝙍 𝘼𝘿𝙈𝙄𝙉\n\n❗ 𝙀𝙉 𝘾𝘼𝙎𝙊 𝙌𝙐𝙀 𝙐𝙉 𝘼𝘿𝙈𝙄𝙉 𝙈𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝙀 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 𝙔 𝙌𝙐𝙄𝙀𝙍𝘼 𝙌𝙐𝙀 𝙑𝙐𝙀𝙇𝙑𝘼 𝙉𝙊 𝙎𝙀 𝙑𝘼 𝙋𝙊𝘿𝙀𝙍`,
m
)
await delay(2 * 2000)
await conn.sendMessage(
res,
{text: lenguajeGB.smsJoin(user), mentions: (await conn.groupMetadata(`${res}`)).participants.map((v) => v.id)},
[user],
{quoted: fkontak}
)
//for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
//let data = (await conn.onWhatsApp(jid))[0] || {}
//if (data.exists)
//conn.reply(m.chat, `@${m.sender.split`@`[0]} adicional ${conn.user.name} a ${await conn.getName(res)}\njid: ${res}, el bot se apagará a tiempo: ${msToDate(global.db.data.chats[res].expired - now)}`, data.jid, m)
} else if (isOwner || !isPrems || isROwner) {
//Para Owner
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)

if (user.joincount === 0)
throw `${ag}*¡YA NO TIENES TOKENS! 🪙*\n\n*COMPRA TOKENS PARA PODER INVITAR A ZENTRAX A TÚ GRUPO CON EL COMANDO *${usedPrefix}buy joincount 3 o ${usedPrefix}buy Para ver la Tienda*`
if (!args[1])
throw `${mg}*USE EL COMANDO COMO ESTE EJEMPLO*\n*${usedPrefix + command} enlace y Número de Token(s)*\n\n*EJEMPLO*\n*${usedPrefix + command} ${nn} 3*\n\n*3 TOKEN 🪙 = 30 MINUTOS*`
if (!linkRegex.test(args[0])) throw `${fg}𝙀𝙉𝙇𝘼𝘾𝙀 𝙉𝙊 𝙑𝘼𝙇𝙄𝘿𝙊.` //Aquí

await delay(3 * 3000)
let res = await conn.groupAcceptInvite(code)
conn.reply(m.chat, `${eg}😻 *SE HA UNIDO ZENTRAX AL GRUPO!!!*`, m).then(async () => {
//Si el Owner se une al Grupo no habrá temporizador
let img = 'https://i.imgur.com/8fK4h6F.jpg'
var jumlahHari = 600000 * args[1] // 10 minutos | Owner
var now = new Date() * 1
if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += jumlahHari
else global.db.data.chats[res].expired = now + jumlahHari

await conn.reply(
res,
`✅ ${gt} SE HA UNIDO AL GRUPO!!!\n${await conn.getName(res)}\n\n*RECUERDE QUE ES ⏳ TEMPORAL, USE EL COMANDO ${usedPrefix}menu PARA VER EL MENÚ*\n\n🚪 *ME SALDRÉ AUTOMÁTICAMENTE EN:*\n${msToDate(global.db.data.chats[res].expired - now)}\n\n${username} *LE QUEDA ${user.joincount} TOKEN(S) 🪙*\n\n❕ *PUEDE USAR EL COMANDO TAMBIÉN EN GRUPO MIENTRAS ESTE YO*\n\n❕ *SI QUIERE QUE ESTE POR MÁS TIEMPO AUMENTE EL NÚMERO DE TOKENS CUANDO USE EL COMANDO*\n*${usedPrefix + command}*\n\n❗ *EN CASO QUE UN ADMIN ME ELIMINE DEL GRUPO Y QUIERA QUE VUELVA NO SE VA PODER*`,
fkontak,
m
)
await delay(2 * 2000)
await conn.sendMessage(
res,
{text: lenguajeGB.smsJoin(user), mentions: (await conn.groupMetadata(`${res}`)).participants.map((v) => v.id)},
[user],
{quoted: fkontak}
)

for (let jid of global.owner.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter((v) => v != m.sender)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists)
conn.reply(
m.chat,
`@${m.sender.split`@`[0]} adicional ${conn.user.name} a ${await conn.getName(res)}\njid: ${res}, el bot se apagará a tiempo: ${msToDate(global.db.data.chats[res].expired - now)}`,
data.jid,
m
)
}
conn.sendButton(
m.chat,
'',
wm,
null,
[
['Creadora', '/creadora'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
],
m,
res
)
})
}
} catch (e) {
await conn.reply(
m.chat,
`${fg}\`\`\`POSIBLES CAUSAS
- El enlace esta incorrecto o caducado.

- No me puedo unir si previamente me han eliminado del Grupo.

- El Grupo esta Lleno, por ende no puedo unirme.
\`\`\``,
m
)
console.log(e)
}
}
handler.help = ['temporal', 'tiempo']
handler.command = ['bottemporal', 'botemporal', 'addbot', 'botadd']
handler.register = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function msToDate(ms) {
let temp = ms
let days = Math.floor(ms / (24 * 60 * 60 * 1000))
let daysms = ms % (24 * 60 * 60 * 1000)
let hours = Math.floor(daysms / (60 * 60 * 1000))
let hoursms = ms % (60 * 60 * 1000)
let minutes = Math.floor(hoursms / (60 * 1000))
let minutesms = ms % (60 * 1000)
let sec = Math.floor(minutesms / 1000)
return days + ' *Día(s)* ☀️\n' + hours + ' *Hora(s)* ⏳\n' + minutes + ' *Minuto(s)* ⏰\n' + sec + ' *Segundo(s)* 🕐\n'
}
