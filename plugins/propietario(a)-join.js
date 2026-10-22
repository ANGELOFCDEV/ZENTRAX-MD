let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, {conn, text, isOwner}) => {
let link = (m.quoted ? (m.quoted.text ? m.quoted.text : text) : text) || text
let [_, code] = link.match(linkRegex) || []
if (!code)
throw `${mg}🙌 𝘿𝙀𝘽𝙀 𝙄𝙉𝙂𝙍𝙀𝙎𝘼𝙍 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 | 𝙔𝙊𝙐 𝙈𝙐𝙎𝙏 𝙀𝙉𝙏𝙀𝙍 𝘼 𝙇𝙄𝙉𝙆\n😼 *Ingrese el enlace de un grupo.*\n*Enter the link of a group.*\n\n*𝙀𝙅𝙀𝙈𝙋𝙇𝙊 | 𝙀𝙓𝘼𝙈𝙋𝙇𝙀*\n*#unete ${grupo1}*\n\n*#join ${grupo2}*`

const botConfig = global.db.data.users[conn.user.jid] || {}
const timeMatch = text.match(/(\d+)\s*(minuto|hora|día|dias)/i)
let time, unit

if (botConfig.prestar === false && isOwner) {
time = 1 // 1 día
unit = 'día'
} else {
time = timeMatch ? parseInt(timeMatch[1]) : 60 // Tiempo predeterminado: 1hora
unit = timeMatch ? timeMatch[2].toLowerCase() : 'minuto'
}

let timeInMs
if (unit.includes('minuto')) {
timeInMs = time * 60 * 1000
} else if (unit.includes('hora')) {
timeInMs = time * 60 * 60 * 1000
} else if (unit.includes('día') || unit.includes('dias')) {
timeInMs = time * 24 * 60 * 60 * 1000
}

if (botConfig.prestar === false && !isOwner) {
global.db.data.pendingApprovals = global.db.data.pendingApprovals || {}
global.db.data.pendingApprovals[code] = {sender: m.sender, timeInMs}
const data = global.owner.filter((number, _, isDeveloper) => isDeveloper && number)
await m.reply(
`${ag}*✅ Su enlace se envió a Mí Propietario(a).*\n*Your link was sent to My Owner.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n⚠️ *Su Grupo será Evaluado y Quedará a decisión de Mí Propietario(a) si ${gt} se une o no al Grupo.*\n*Your Group will be Evaluated and it will be up to My Owner if ${gt} joins the Group or not.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n❕ *Es posible que su Solicitud sea Rechazada por las siguientes Causas:*\n*Your Application may be Rejected for the following Reasons:*\n*1️⃣ El Bot está Saturado.*\n*The Bot is Saturated.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n2️⃣ *El Bot fue eliminado del Grupo.*\n*The Bot was removed from the Group.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n3️⃣ *El Grupo no cumple con las Normativas de ${gt}*\n*The Group does not comply with the Regulations of ${gt}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n4️⃣ *El enlace del grupo se restableció.*\n*The group link was restored.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n5️⃣ *No se agrega a Grupos según Mi Propietario(a).*\n*Not added to Groups by My Owner*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n💌 *La solicitud puede tardar Horas en ser Respondida. Por favor Tener Paciencia. Gracias*\n*The request may take hours to be answered. Please be patient. Thank you*`
)

for (let jid of data.map((id) => [id] + '@s.whatsapp.net').filter((v) => v != conn.user.jid)) {
await conn.sendMessage(
jid,
{
text: `${iig}╭══•───────────────•══╮\n┃ 📧 *𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝙐𝘿 𝙋𝘼𝙍𝘼 𝙐𝙉 𝙂𝙍𝙐𝙋𝙊*\n┃ 📧 *𝙂𝙍𝙊𝙐𝙋 𝙍𝙀𝙌𝙐𝙀𝙎𝙏*\n╰══•───────────────•══╯\n\n*👤 𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝘼𝙉𝙏𝙀 | 𝘼𝙋𝙋𝙇𝙄𝘾𝘼𝙉𝙏*\nwa.me/${m.sender.split('@')[0]}\n\n*🔮 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 | 𝙂𝙍𝙊𝙐𝙋 𝙇𝙄𝙉𝙆*\n${link}\n\n*⏳ TIEMPO SOLICITADO:* ${time} ${unit}${time > 1 ? 's' : ''}`
},
{quoted: m}
)
}
return
}

if (botConfig.prestar === true || isOwner) {
if (!isOwner) {
const user = global.db.data.users[m.sender]
const costPerHour = 50
const cost = Math.ceil((timeInMs / (60 * 60 * 1000)) * costPerHour)
if (user.limit < cost) return m.reply(`❌ NO TIENE SUFICIENTE DIAMANTE, NECESITA *${cost} DIAMANTES* PARA UNIRTE AL GRUPO.`)
user.limit -= cost
await conn.sendMessage(
m.chat,
{text: `😎 ESPERE 3 SEGUNDOS, ME UNIRÉ AL GRUPO \n\n> SE HAN DESCONTADO *${cost} DIAMANTES* DE TU CUENTA.`},
{quoted: m}
)
}

let res
try {
res = await conn.groupAcceptInvite(code)
} catch (error) {
console.error('Error al unirse al grupo:', error)
return m.reply('❌ NO PUDE UNIRME AL GRUPO. VERIFICA EL ENLACE E INTÉNTALO DE NUEVO.')
}

await new Promise((resolve) => setTimeout(resolve, 3000))
const pendingApproval = global.db.data.pendingApprovals?.[code]
const senderNumber = pendingApproval?.sender || m.sender
const sendWelcomeMessage = async (groupId) => {
try {
const groupMetadata = await conn.groupMetadata(groupId)
const groupName = groupMetadata.subject || 'este grupo'
let mes = `Hola a todos 👋🏻
     
Soy *${conn.user.name}* (${wm}) es uno de los bots multidispositivo de WhatsApp construido con Node.js, *${conn.user.name}* Recién invitado por *@${senderNumber.split('@')[0]}*

para ver el Menu del bot escribe:
*#help*

@${conn.user.jid.split('@')[0]} saldrá automáticamente después de:\n${time} ${unit}${time > 1 ? 's' : ''}`
await conn.reply(groupId, mes)
} catch (error) {
console.error('Error al enviar el mensaje de presentación:', error)
await conn.reply(groupId, mes)
}
}
await sendWelcomeMessage(res)
global.db.data.chats[res] = global.db.data.chats[res] || {}
global.db.data.chats[res].expired = +new Date() + timeInMs
if (global.db.data.pendingApprovals?.[code]) {
delete global.db.data.pendingApprovals[code]
}
await m.reply(
`*𝙕𝙀𝙉𝙏𝙍𝘼𝙓-𝙈𝘿 𝙎𝙀 𝙃𝘼 𝙐𝙉𝙄𝘿𝙊 𝘼𝙇 𝙂𝙍𝙐𝙋𝙊!! ✅* por *${time} ${unit}${time > 1 ? 's' : ''}.*\n*𝙎𝙐𝘾𝘾𝙀𝙎𝙎𝙁𝙐𝙇𝙇𝙔 𝙅𝙊𝙄𝙉𝙀𝘿 ✅* por *${time} ${unit}${time > 1 ? 's' : ''}.*`
)
}
}
handler.help = ['join [chat.whatsapp.com] [tiempo]']
handler.tags = ['owner']
handler.command = /^unete|join|nuevogrupo|unir|unite|unirse|entra|entrar$/i
handler.register = true
export default handler
