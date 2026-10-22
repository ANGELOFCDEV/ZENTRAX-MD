// CÓDIGO CREADO POR ANGEL OFC DEV : https://github.com/GataNina-Li
import { createHash } from 'crypto'
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
import axios from 'axios'
import _ from 'lodash'

let nombre = 0,
edad = 0,
genero = 0,
bio = 0,
identidad = 0,
pasatiempo = 0,
registro,
_registro,
fecha,
hora,
tiempo,
registrando,
fechaBio
let pas1 = 0,
pas2 = 0,
pas3 = 0,
pas4 = 0,
pas5 = 0

let handler = async function (m, {conn, text, command, usedPrefix}) {
let key
let sinDefinir = '😿 Es privada'
let d = new Date(new Date() + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, {weekday: 'long'})
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch((_) => gataMenu)
let ppch = await conn.profilePictureUrl(who, 'image').catch((_) => gataMenu.getRandom())
let userNationality = null
try {
let api = await axios.get(`${apis}/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
let userNationalityData = api.data.result
userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : null
} catch (err) {
userNationality = null
}
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
let nombreWA = (await usedPrefix) + conn.getName(m.sender) //'@' + m.sender.split("@s.whatsapp.net")[0]
let user = global.db.data.users[m.sender]
let verificar = new RegExp(usedPrefix)

let who2 = m.isGroup ? _.get(m, 'mentionedJid[0]', m.quoted?.sender || m.sender) : m.sender
let biografia = await conn.fetchStatus(who2).catch(() => null)
if (!biografia || !biografia[0] || biografia[0].status === null) {
bio = sinDefinir
fechaBio = 'Fecha no disponible'
} else {
bio = biografia[0].status || sinDefinir
fechaBio = biografia[0].setAt
? new Date(biografia[0].setAt).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'})
: 'Fecha no disponible'
}

let intervalId
function mensajeRegistro() {
if (edad === 0) {
clearInterval(intervalId)
registrando = false
return
}
if (user.registered === true) {
return
}
if (typeof genero === 'string') {
global.db.data.users[m.sender]['registroC'] = true
registrando = false
conn.reply(
m.chat,
`*SU TIEMPO DE REGISTRO HA TERMINADO!!*\n\n_Si no continúa en este momento su registro no se guardará, si guarda más tarde su registro se habrá perdido_\n\n*Para continuar escriba:* ${usedPrefix}finalizar`,
fkontak,
m
)
} else {
clearInterval(intervalId)
global.db.data.users[m.sender]['registroR'] = true
registrando = false
conn.reply(
m.chat,
`*SU TIEMPO DE REGISTRO HA TERMINADO!!*\n\n_Si no continúa en este momento su registro no se guardará, si guarda más tarde su registro se habrá perdido_\n\n*Para continuar escriba:* ${usedPrefix}finalizar`,
fkontak,
m
)
}
}

if (user.registered === true)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoIIG']()}*YA ESTÁ REGISTRADO!!*\n*SI QUIERE ANULAR SU REGISTRO, USE ESTE COMANDO*\n*${usedPrefix}unreg numero de serie*\n\n*SI NO RECUERDA SU NÚMERO DE SERIE, USE ESTE COMANDO*\n*${usedPrefix}myns*`,
fkontak,
m
)

//let groupID = '120363146016943755@g.us'
//try {
//let groupMetadata = await conn.groupMetadata(groupID);
//let groupMembers = groupMetadata.participants.map(participant => participant.id || participant.jid);

//if (!groupMembers.includes(m.sender)) {
//throw `*👀 CÓMO DESEA REGISTRARSE?* Antes de registrarte primero debes unirte al grupo requerido:*\nhttps://chat.whatsapp.com/KNwcGS4PCEN5qjbHD5VDZM\n\n*• Después usar el comando de la siguiente manera:*\n📑 *REGISTRO RÁPIDO*\n• Insignia de verificación\n• Desbloquear comandos que requieran registro\n\n*Escriba para el registro rápido:*\n${usedPrefix}reg1 nombre edad\n\n🗂️ *REGISTRO COMPLETO*\n• Insignia de verificación\n• Desbloquear comandos que requieran registro\n• Premium Temporal Gratis\n• Más opciones para este registro\n\n*Escriba para el registro completo:*\n${usedPrefix}nombre\n\n\`\`\`⭐ Considere que tendrá un tiempo para completar en caso de registrarse\`\`\``;
//}} catch (e) {
//console.log(e)}

if (command == 'verificar' || command == 'verify' || command == 'register' || command == 'reg' || command == 'registrar') {
await conn.reply(
m.chat,
`*👀 CÓMO DESEA REGISTRARSE?*\n\n📑 *REGISTRO RÁPIDO*\n• Insignia de verificación\n• Desbloquear comandos que requieran registro\n\n*Escriba para el registro rápido:*\n${usedPrefix}reg1 nombre edad\n\n🗂️ *REGISTRO COMPLETO*\n• Insignia de verificación\n• Desbloquear comandos que requieran registro\n• Premium Temporal Gratis\n• Más opciones para este registro\n\n*Escriba para el registro completo:*\n${usedPrefix}nombre\n\n\`\`\`⭐ Considere que tendrá un tiempo para completar en caso de registrarse\`\`\``,
fkontak,
m
)
}

if (command == 'reg1') {
registrando = true
if (registrando === true) {
intervalId = setInterval(mensajeRegistro, 2 * 60 * 1000) //2 min
setTimeout(() => {
clearInterval(intervalId)
}, 126000) //2.1 min
}

registro = text.replace(/\s+/g, usedPrefix)
_registro = text.split(' ', 2)
if (!text)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoIIG']()}👉 *PARÁMETROS DEL REGISTRO:*\n${usedPrefix + command} nombre edad\n\n\`\`\`EJEMPLO:\`\`\`\n${usedPrefix + command} ${gt} 20\n\n*✨ CONSEJO:*\n• _Su nombre no debe de contener números_\n• _La edad no debe de contener letras_\n\n⭐ *Si desea personalizar más su registro, escriba:*\n${usedPrefix}nombre`,
fkontak,
m
)
//if (_registro['length'] >= 3 || isNaN(_registro[1])) return
//conn.sendButton(m.chat, fg + '🙃 *ESTÁ INTENTANDO SEPARAR SU NOMBRE O UNIR TODO?* ', '🧐 *COINCIDE COMO EN ESTOS EJEMPLOS:*\n' + `\`\`\`${usedPrefix + command} Super${gt}20\`\`\`` + '\n' + `\`\`\`${usedPrefix + command} Super 15 ${gt} \`\`\`` + '\n' + `\`\`\`${usedPrefix + command} Super ${gt} 24 De ${author}\`\`\`\n\n` + '*Si cumple que tenga (Nombre/Frase y Edad) Autocompletaremos su Registro, de lo contraio vuelva a registrarse*\n➘ _Use el Botón de abajo_', null, [[`🌟 AUTOCOMPLETAR MI REGISTRO`, usedPrefix + 'reg1' + ' ' + text.replace(/[♧◇♡♤■□●○•°☆▪︎¤¿?¡¬¦±×÷°µ§©®™¶€¢£¥₽₹₩₱₸₪₫₮₦₴₡₭₲₼₿.,\/#!$%\^&\*;:{}@=\-_`~()\s\0-9]/gi, "") + ' ' + text.replace(/[♧◇♡♤■□●○•°☆▪︎¤¿?¡¬¦±×÷°µ§©®™¶€¢£¥₽₹₩₱₸₪₫₮₦₴₡₭₲₼₿.,\/#!$%\^&\*;:{}@=\-_`~()\s\a-z]/gi, "")], ['📑 VOLVER A REGISTRAR', command + usedPrefix]], m)
if (!_registro[0])
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*FALTA SU NOMBRE, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``,
fkontak,
m
)
if (_registro[0].length >= 30)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*SU NOMBRE ES MUY LARGO, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``,
fkontak,
m
)
if (_registro[0].length <= 2)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*SU NOMBRE ES MUY CORTO O FALTANTE, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``,
fkontak,
m
)
_registro[0] = text.replace(/\s+/g, '').replace(/[0-9]+/gi, '')
user.name = _registro[0]

if (!_registro[1])
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*FALTA SU EDAD, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``,
fkontak,
m
)
if (isNaN(_registro[1]))
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*NO SE ENCONTRÓ LA EDAD, RECUERDE USAR:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\`\n\n> *Nota:* No use prefijos ni símbolos entre el nombre y edad, solo es válido un espacio entre el nombre y la edad.`,
fkontak,
m
)
if (_registro[1] > 90)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*SU EDAD ES MUY MAYOR, USE OTRA EDAD POR FAVOR*\n\n*PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``,
fkontak,
m
)
if (_registro[1] < 10)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*SU EDAD ES MUY MENOR, USE OTRA EDAD POR FAVOR*\n\n*PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``,
fkontak,
m
)
user.age = parseInt(_registro[1]) //_registro[1]
global.db.data.users[m.sender]['registroR'] = true

let registroRapido = ` *░ 📑 REGISTRO ACTUAL 📑 ░*
 *∷∷∷∷∷∷∷∷∷∷∷∷∷∷∷*
┊ *✓ NOMBRE*
┊ ⁘ ${user.name === 0 ? sinDefinir : user.name}
┊
┊ *✓ EDAD*
┊ ⁘ ${user.age === 0 ? sinDefinir : user.age + ' años'}
╰┈┈┈┈┈┈┈┈┈┈┈┈•

❇️ \`\`\`Para finalizar su registro escriba:\`\`\`
✪ *${usedPrefix}finalizar*`

await conn.sendMessage(
m.chat,
{
text: registroRapido,
contextInfo: {
externalAdReply: {
title: wm,
body: '🌟 Puede modificar su registro antes de finalizar',
thumbnailUrl: pp,
sourceUrl: 'https://www.atom.bio/zentrax/',
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
},
{quoted: fkontak}
)
}

if (command == 'nombre' || command == 'name') {
registrando = true
if (registrando === true) {
intervalId = setInterval(mensajeRegistro, 3 * 60 * 1000) //3 min
setTimeout(() => {
clearInterval(intervalId)
}, 186000) //3.1 min
}
if (verificar.test(text) == false || text.length <= 1)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoIIG']()}👉 *PERSONALICE SU NOMBRE PARA REGISTRAR, EJEMPLO:*\n${usedPrefix}nombre ${gt}`,
fkontak,
m
)
if (/^\d+$/.test(text))
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE NO DEBE DE TENER SÓLO NÚMEROS, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba:_\n*${usedPrefix}nombre2*`
},
{quoted: fkontak}
)
if (text.length >= 25)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoFG']()}*USE UN NOMBRE MÁS CORTO, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba:_\n*${usedPrefix}nombre2*`
},
{quoted: fkontak}
)
if (text.length <= 2)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoFG']()}*NOMBRE FALTANTE O MUY CORTO, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba ${usedPrefix}nombre2_`
},
{quoted: fkontak}
)
user.name = text
.replace(/\s+/g, '')
.replace(/[0-9]+/gi, '')
.trim()
if (user.name)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${user.name === 0 ? sinDefinir : user.name}\n\n🔢 *AHORA PUEDE REGISTRAR SU EDAD, EJEMPLO:*\n\`\`\`${usedPrefix}edad 20\`\`\``
},
{quoted: fkontak}
)
}

if (command == 'nombre2' || command == 'name2') {
if (/^\d+$/.test(text))
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE NO DEBE DE TENER SÓLO NÚMEROS, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba:_\n*${usedPrefix}nombre2*`
},
{quoted: fkontak}
)
if (nombreWA.slice(1).length < 2)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE DE WHATSAPP ES MUY CORTO PARA REGISTRAR*\n\n*Modifique su nombre de WhatsApp e intente de nuevo o puede personalizar 🌟 su nombre usando:*\n*${usedPrefix}nombre ${gt}*`
},
{quoted: fkontak}
)
if (nombreWA.slice(1).length > 25)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE DE WHATSAPP ES MUY LARGO PARA REGISTRAR*\n\n*Modifique su nombre de WhatsApp e intente de nuevo o puede personalizar 🌟 su nombre usando:*\n*${usedPrefix}nombre ${gt}*`
},
{quoted: fkontak}
)
user.name = nombreWA
.replace(/\s+/g, '')
.replace(/[0-9]+/gi, '')
.slice(1)
.trim()
if (user.name)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${user.name === 0 ? sinDefinir : user.name}\n\n🔢 *AHORA PUEDE REGISTRAR SU EDAD, EJEMPLO:*\n\`\`\`${usedPrefix}edad 20\`\`\``
},
{quoted: fkontak}
)
}

if (command == 'edad' || command == 'age' || command == 'edad2' || command == 'age2') {
if (verificar.test(text.slice(1)) == false && !text)
return conn.sendMessage(
m.chat,
{text: `${lenguajeGB['smsAvisoIIG']()}*👉 AGREGUÉ SU EDAD PARA REGISTRAR, EJEMPLO:*\n${usedPrefix}edad 20`},
{quoted: fkontak}
)
if (isNaN(text)) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*INGRESE SOLO NÚMEROS*`, fkontak, m)
if (text > 90) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*DEMASIADO MAYOR PARA SER REGISTRADO*`, fkontak, m)
if (text < 10) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*DEMASIADO MENOR PARA SER REGISTRADO*`, fkontak, m)
user.age = text.replace(/[.,\/#!$%\^&\*;:{}@=\-_`~()\s\a-z]/gi, '')
    if (verificar.test(text) == true)
      return conn.sendMessage(
        m.chat,
        {
          text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${user.name === 0 ? sinDefinir : user.name}\n\n*❖ EDAD:*\n${user.age === 0 ? sinDefinir : user.age + ' años'}\n\n🧬 *AHORA PUEDE REGISTRAR SU GÉNERO, EJEMPLO:*\n\`\`\`${usedPrefix}genero\`\`\``
},
{quoted: fkontak}
)
}

if (command == 'genero' || command == 'género' || command == 'gender') {
let genText = `🌟 *SELECCIONA TU GÉNERO!!*
1️⃣ ️▸ _🚹 MASCULINO (Hombre)_
2️⃣ ▸ _🚺 FEMENINO (Mujer)_
3️⃣ ▸ _👤 OCULTAR GÉNERO (Omitir)_\n
🌟 *PUEDE USAR EL EMOJI NUMÉRICO O TEXTO NUMÉRICO PARA ELEGIR SU GÉNERO EJEMPLO:*
✓ \`\`\`${usedPrefix}genero 2️⃣\`\`\`
✓ \`\`\`${usedPrefix}genero 2\`\`\``
if (!text) return conn.sendMessage(m.chat, {text: genText}, {quoted: fkontak})
function asignarGenero(text) {
if (text == 0 && text > 3)
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*"${text}" NO ES VÁLIDO PARA ELEGIR, RECUERDE USAR EL EMOJI NUMÉRICO, EMOJI DE GÉNERO O TEXTO NUMÉRICO PARA SELECCIONAR SU GÉNERO, EJEMPLO*\n\n✓ \`\`\`${usedPrefix}genero 2️⃣\`\`\`\n✓ \`\`\`${usedPrefix}genero 2\`\`\``,
fkontak,
m
)
switch (text) {
case '1️⃣':
case '1':
case '🚹':
genero = 'Hombre'
break
case '2️⃣':
case '2':
case '🚺':
genero = 'Mujer'
break
case '3️⃣':
case '3':
case '👤':
genero = 'Ocultado'
break
default:
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoAG']()}*RECUERDE USAR EL EMOJI NUMÉRICO, EMOJI DE GÉNERO O TEXTO NUMÉRICO PARA SELECCIONAR SU GÉNERO, EJEMPLO*\n\n✓ \`\`\`${usedPrefix}genero 2️⃣\`\`\`\n✓ \`\`\`${usedPrefix}genero 2\`\`\``,
fkontak,
m
)
}
}
asignarGenero(text)
user.genero = genero
if (user.genero)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${user.name === 0 ? sinDefinir : user.name}\n\n*❖ EDAD:*\n${user.age === 0 ? sinDefinir : user.age + ' años'}\n\n*❖ GENERO:*\n${user.genero === 0 ? sinDefinir : user.genero}\n\n*🌼 AHORA PUEDE REGISTRAR SU ORIENTACIÓN SEXUAL, EJEMPLO:*\n\`\`\`${usedPrefix}identidad\`\`\``
},
{quoted: fkontak}
)
}

if (command == 'identidad' || command == 'identity') {
var generos = [
'Agénero',
'Andrógino',
'Andrógina',
'Asexual',
'Bigénero',
'Bisexual',
'Cisgénero',
'CrossDresser',
'Demigénero',
'Gay',
'Género fluido',
'Género neutro',
'Genderqueer',
'Heterosexual',
'Heteroflexible',
'Homoflexible',
'Homosexual',
'Intersexual',
'Lesbiana',
'Pansexual',
'Pangénero',
'Questioning',
'Queer',
'Sapiosexual',
'Transgénero',
'Trigénero',
'Variante/Género expansivo'
]
var emojiANumero = {'0️⃣': '0', '1️⃣': '1', '2️⃣': '2', '3️⃣': '3', '4️⃣': '4', '5️⃣': '5', '6️⃣': '6', '7️⃣': '7', '8️⃣': '8', '9️⃣': '9'}
function asignarIdentidad(text) {
text = text.replace(/[\d️⃣]/g, function (match) {
return emojiANumero[match] || match
})
var numero = parseInt(text.replace(/[^\d]/g, ''))
if (!isNaN(numero) && Number(numero) > 0 && Number(numero) <= generos.length) {
return generos[numero - 1]
} else if (!text) {
return conn.reply(
m.chat,
`${lenguajeGB['smsAvisoAG']()}*RECUERDE USAR EL EMOJI NUMÉRICO, EMOJI DE GÉNERO O TEXTO NUMÉRICO PARA SELECCIONAR SU ORIENTACIÓN SEXUAL, EJEMPLO*\n\n✓ \`\`\`${usedPrefix}identidad 2️⃣\`\`\`\n✓ \`\`\`${usedPrefix}identidad 2\`\`\``,
fkontak,
m
)
} else {
conn.reply(
m.chat,
`${lenguajeGB['smsAvisoFG']()}*ESTÁ ELECCIÓN "${numero}" NO FORMA PARTE DE LA LISTA DE ORIENTACIONES, ELEGIR UNO DE LA LISTA POR FAVOR, EJEMPLO:*\n\n✓ \`\`\`${usedPrefix}identidad 2️⃣\`\`\`\n✓ \`\`\`${usedPrefix}identidad 2\`\`\``,
fkontak,
m
)
}
}
let yyr = ''
yyr += `*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•*
*┊ 🌟 SELECCIONE SU ORIENTACIÓN SEXUAL!!*
*┊┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•*\n`
generos.forEach(function (identidad, index) {
yyr += `*┊* \`\`\`[${index + 1}]\`\`\` » _${identidad}_\n`
})
yyr += '*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*'
if (!text) {
const {key} = await conn.sendMessage(m.chat, {text: yyr}, {quoted: fkontak})
await delay(1000)
await conn.sendMessage(
m.chat,
{
text: yyr + `\n\n✨ *AQUÍ UN EJEMPLO DE COMO SELECCIONAR:*\n\`\`\`${usedPrefix}identidad 4️⃣\`\`\`\n\`\`\`${usedPrefix}identidad 4\`\`\``,
edit: key
},
{quoted: fkontak}
)
}
var identidadAsignada = asignarIdentidad(text)
user.identidad = identidadAsignada
if (user.identidad && text < generos.length && text != 0)
return conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${!user.name ? sinDefinir : user.name}\n\n*❖ EDAD:*\n${!user.age ? sinDefinir : user.age + ' años'}\n\n*❖ GENERO:*\n${!user.genero ? sinDefinir : user.genero}\n\n*❖ ORIENTACIÓN SEXUAL:*\n${!user.identidad ? sinDefinir : user.identidad}\n\n❇️ *AHORA PUEDE REGISTRAR SUS PASATIEMPOS, EJEMPLO:*\n\`\`\`${usedPrefix}pasatiempo\`\`\``
},
{quoted: fkontak}
)
}

if (command == 'pasatiempo' || command == 'hobby') {
pasatiempo = 0
pas1 = ''
pas2 = ''
pas3 = ''
pas4 = ''
pas5 = ''
var seleccion = text
var todosLosPasatiempos = [
'👟 Acroyoga',
'🎭 Actuación',
'🎭 Actuación de Improvisación',
'🎭 Actuación de voz',
'🎭 Actuación en videojuegos',
'🎭 Actuar en Comedias de Situación Radiofónicas',
'🎭 Actuar en un Circo Ambulante',
'🎭 Actuar en una Obra de Teatro Comunitaria',
'🚁 Aeromodelismo',
'🥋 Aikido',
'🎯 Airsoft',
'♟️ Ajedrez',
'🏔️ Alpinismo',
'🖥️ Animación',
'🎉 Animador/a de Equipos',
'✏️ Anime dibujos',
'🐝 Apicultura',
'🍖 Aprender a asar carnes a la parrilla',
'🎤 Aprender a cantar como mi artista favorito',
'🍤 Aprender a cocinar mariscos',
'🍳 Aprender a cocinar platos de diferentes culturas',
'🍲 Aprender a cocinar platos tradicionales japoneses',
'💻 Aprender a codificar y crear mis propias aplicaciones.',
'🎶 Aprender a componer canciones como mi artista favorito',
'🎨 Aprender a dibujar como los artistas de los videojuegos que me gustan',
'🎨 Aprender a dibujar como los artistas del anime que me gusta',
'🎼 Aprender a dirigir una orquesta',
'📜 Aprender a escribir un blog',
'🧏‍♀️ Aprender a hablar con el lenguaje de señas japonés',
'🍋 Aprender a hacer aderezos caseros',
'🍋 Aprender a hacer aderezos para ensaladas',
'📱 Aprender a hacer aplicaciones móviles',
'💐 Aprender a hacer arreglos florales japoneses',
'🍚 Aprender a hacer arroz al vapor',
'🍚 Aprender a hacer arroz con diferentes técnicas',
'🍚 Aprender a hacer arroz con frijoles',
'🍚 Aprender a hacer arroz con leche',
'🍚 Aprender a hacer arroz con pollo',
'🍚 Aprender a hacer arroz con verduras',
'🍚 Aprender a hacer arroz frito',
'🍚 Aprender a hacer arroz integral',
'🍹 Aprender a hacer batidos de frutas',
'🍹 Aprender a hacer batidos de proteínas',
'🍦 Aprender a hacer batidos y smoothies',
'🥗 Aprender a hacer bowls de granos',
'🍤 Aprender a hacer brochetas',
'🍪 Aprender a hacer brownies y blondies',
'🍳 Aprender a hacer brunch',
'🍕 Aprender a hacer calzones y empanadas',
'🍤 Aprender a hacer camarones a la parrilla',
'🍤 Aprender a hacer camarones al ajillo',
'🍤 Aprender a hacer camarones al ajillo con ajo y perejil',
'🍤 Aprender a hacer camarones al coco',
'🍤 Aprender a hacer camarones empanizados',
'🍖 Aprender a hacer carne al horno',
'🍖 Aprender a hacer carne asada',
'🍹 Aprender a hacer cócteles de frutas',
'🍹 Aprender a hacer cócteles sin alcohol',
'🍹 Aprender a hacer cócteles y bebidas sin alcohol',
'🍰 Aprender a hacer cheesecakes',
'🍫 Aprender a hacer chocolate amargo',
'🍫 Aprender a hacer chocolate blanco',
'🍫 Aprender a hacer chocolate caliente',
'🍫 Aprender a hacer chocolate con almendras',
'🍫 Aprender a hacer chocolate con avellanas',
'🍫 Aprender a hacer chocolate con leche',
'🍫 Aprender a hacer chocolate con menta',
'🍫 Aprender a hacer chocolate con naranja',
'🍫 Aprender a hacer chocolates artesanales',
'🍖 Aprender a hacer chuletas de cerdo',
'🍋 Aprender a hacer conservas y encurtidos',
'🧵 Aprender a hacer cosplay de alta costura',
'🎭 Aprender a hacer cosplay de personajes de películas de videojuegos',
'🎨 Aprender a hacer cosplay de personajes de series de televisión',
'🍖 Aprender a hacer costillas a la barbacoa',
'🍖 Aprender a hacer costillas al horno',
'🍰 Aprender a hacer cupcakes decorados',
'🍲 Aprender a hacer curry japonés',
'🍳 Aprender a hacer desayunos saludables',
'🍩 Aprender a hacer donas',
'🍉 Aprender a hacer ensaladas de espinacas',
'🍉 Aprender a hacer ensaladas de frutas',
'🍉 Aprender a hacer ensaladas de garbanzos',
'🍉 Aprender a hacer ensaladas de pasta',
'🍉 Aprender a hacer ensaladas de quinoa',
'🥗 Aprender a hacer ensaladas gourmet',
'🍖 Aprender a hacer estofado de ternera',
'🍜 Aprender a hacer fideos de arroz',
'🍜 Aprender a hacer fideos de huevo',
'🍜 Aprender a hacer fideos soba',
'🍜 Aprender a hacer fideos udon',
'🍜 Aprender a hacer fideos y udon',
'🍕 Aprender a hacer focaccia de hierbas',
'🍕 Aprender a hacer focaccias y panes planos',
'🍫 Aprender a hacer fudge',
'🍪 Aprender a hacer galletas de avena',
'🍪 Aprender a hacer galletas de avena y pasas',
'🍪 Aprender a hacer galletas de chocolate',
'🍪 Aprender a hacer galletas de chocolate blanco y macadamia',
'🍪 Aprender a hacer galletas de chocolate y nuez',
'🍪 Aprender a hacer galletas de jengibre',
'🍪 Aprender a hacer galletas de mantequilla',
'🍪 Aprender a hacer galletas de mantequilla de maní',
'🍪 Aprender a hacer galletas decoradas',
'🍲 Aprender a hacer guisos y estofados',
'🍔 Aprender a hacer hamburguesas gourmet',
'🍨 Aprender a hacer helados de café',
'🍨 Aprender a hacer helados de chocolate',
'🍨 Aprender a hacer helados de frutas del bosque',
'🍨 Aprender a hacer helados de mango',
'🍨 Aprender a hacer helados de vainilla',
'🍨 Aprender a hacer helados de yogur',
'🍦 Aprender a hacer helados veganos',
'🍨 Aprender a hacer helados y sorbetes',
'🍳 Aprender a hacer huevos a la benedictina',
'🍳 Aprender a hacer huevos a la florentina',
'🍳 Aprender a hacer huevos a la mexicana',
'🍳 Aprender a hacer huevos a la mexicana con salsa',
'🍳 Aprender a hacer huevos al curry',
'🍳 Aprender a hacer huevos al estilo ranchero',
'🍳 Aprender a hacer huevos al horno',
'🍳 Aprender a hacer huevos al horno con espinacas',
'🍳 Aprender a hacer huevos al plato',
'🍳 Aprender a hacer huevos benedictinos',
'🍳 Aprender a hacer huevos escalfados',
'🍳 Aprender a hacer huevos rellenos',
'🍳 Aprender a hacer huevos revueltos con verduras',
'🍳 Aprender a hacer huevos revueltos perfectos',
'🖍️ Aprender a hacer ilustraciones digitales',
'🍖 Aprender a hacer kebabs',
'🍤 Aprender a hacer langostinos a la parrilla',
'🍋 Aprender a hacer limonadas y bebidas refrescantes',
'🍪 Aprender a hacer macarons',
'🎻 Aprender a hacer música con instrumentos tradicionales japoneses',
'🍣 Aprender a hacer nigiri',
'🍚 Aprender a hacer onigiri',
'🥘 Aprender a hacer paella',
'🧑‍🍳 Aprender a hacer pan',
'🍨 Aprender a hacer parfaits',
'🍝 Aprender a hacer pasta fresca',
'🍰 Aprender a hacer pasteles de chocolate',
'🍰 Aprender a hacer pasteles de chocolate blanco',
'🍰 Aprender a hacer pasteles de chocolate y frambuesa',
'🍰 Aprender a hacer pasteles de chocolate y nueces',
'🍰 Aprender a hacer pasteles de frutas',
'🍰 Aprender a hacer pasteles de zanahoria',
'🍜 Aprender a hacer pho',
'🍕 Aprender a hacer pizzas al estilo napolitano',
'🍕 Aprender a hacer pizzas artesanales',
'🍕 Aprender a hacer pizzas de mariscos',
'🍕 Aprender a hacer pizzas de masa fina',
'🍕 Aprender a hacer pizzas de masa gruesa',
'🍕 Aprender a hacer pizzas de pepperoni',
'🍕 Aprender a hacer pizzas de pollo',
'🍕 Aprender a hacer pizzas de verduras asadas',
'🍚 Aprender a hacer poke bowls',
'🍰 Aprender a hacer postres y repostería',
'🌮 Aprender a hacer quesadillas',
'🍜 Aprender a hacer ramen',
'🍜 Aprender a hacer ramen casero',
'🍜 Aprender a hacer ramen con pollo',
'🍜 Aprender a hacer ramen de cerdo',
'🍜 Aprender a hacer ramen picante',
'🍜 Aprender a hacer ramen vegetariano',
'🍋 Aprender a hacer salsas caseras',
'🍋 Aprender a hacer salsas para pasta',
'🍣 Aprender a hacer sashimi',
'🍔 Aprender a hacer sliders',
'🍲 Aprender a hacer sopas de calabaza',
'🍲 Aprender a hacer sopas de cebolla',
'🍲 Aprender a hacer sopas de fideos',
'🍲 Aprender a hacer sopas de lentejas',
'🍲 Aprender a hacer sopas de mariscos',
'🍲 Aprender a hacer sopas de pollo',
'🍲 Aprender a hacer sopas de tomate',
'🍲 Aprender a hacer sopas de verduras',
'🍲 Aprender a hacer sopas frías como el gazpacho',
'🍲 Aprender a hacer sopas y caldos',
'🍨 Aprender a hacer sorbetes de frutas',
'🍣 Aprender a hacer sushi',
'🍣 Aprender a hacer sushi de aguacate',
'🍣 Aprender a hacer sushi de atún',
'🍣 Aprender a hacer sushi de langosta',
'🍣 Aprender a hacer sushi de langostino',
'🍣 Aprender a hacer sushi de salmón',
'🍣 Aprender a hacer sushi rolls',
'🌮 Aprender a hacer tacos y salsas',
'🍰 Aprender a hacer tartas de frutas',
'🍰 Aprender a hacer tartas y pasteles',
'🍣 Aprender a hacer temaki',
'🍤 Aprender a hacer tempura',
'🍳 Aprender a hacer tortillas de espinaca',
'🍳 Aprender a hacer tortillas de maíz',
'🍳 Aprender a hacer tortillas españolas',
'🍳 Aprender a hacer tortillas y omelets',
'🍫 Aprender a hacer trufas y bombones',
'🥙 Aprender a hacer wraps y burritos',
'📅 Aprender a organizar eventos',
'💻 Aprender a programar',
'💻 Aprender a programar videojuegos',
'🔧 Aprender a reparar dispositivos electrónicos',
'🧶 Aprender a tejer o hacer crochet',
'🎻 Aprender a tocar el cello',
'🎸 Aprender a tocar el instrumento que usa mi artista favorito',
'🎹 Aprender a tocar el piano',
'🎷 Aprender a tocar el saxofón',
'🎹 Aprender a tocar el teclado',
'🎻 Aprender a tocar el violín',
'🎻 Aprender a tocar instrumentos tradicionales japoneses',
'🥁 Aprender a tocar la batería',
'🎸 Aprender a tocar la guitarra.',
'🎸 Aprender a tocar la guitarra eléctrica',
'🎺 Aprender a tocar la trompeta',
'📸 Aprender a usar cámaras profesionales',
'💾 Aprender a usar un emulador para jugar a videojuegos antiguos',
'🎪 Aprender Acrobacias de Circo',
'🎭 Aprender actuación y técnicas teatrales',
'🥋 Aprender artes marciales',
'🎨 Aprender caligrafía',
'🥋 Aprender defensa personal y disciplina a través de artes marciales.',
'🗣️ Aprender habilidades de comunicación',
'🧘 Aprender meditación y mindfulness',
'🎓 Aprender nuevas habilidades a través de cursos en línea.',
'📊 Aprender sobre análisis de datos',
'🍷 Aprender sobre cata de vinos',
'🖥️ Aprender sobre ciberseguridad',
'🍽️ Aprender sobre cocina de autor',
'🍽️ Aprender sobre cocina de temporada',
'🍽️ Aprender sobre cocina fusión',
'🍽️ Aprender sobre cocina internacional',
'🍽️ Aprender sobre cocina mediterránea',
'🍽️ Aprender sobre cocina molecular',
'🍽️ Aprender sobre cocina saludable',
'🍽️ Aprender sobre cocina tradicional',
'🏞️ Aprender sobre conservación de la naturaleza',
'💡 Aprender sobre diseño gráfico',
'🎞️ Aprender sobre efectos especiales en el cine',
'🍺 Aprender sobre elaboración de cervezas',
'📖 Aprender sobre escritura creativa',
'🚀 Aprender sobre exploración espacial',
'📚 Aprender sobre filosofía',
'📈 Aprender sobre finanzas personales',
'📸 Aprender sobre fotografía y técnicas de edición',
'📜 Aprender sobre historia antigua',
'🔍 Aprender sobre investigación científica',
'🍉 Aprender sobre la conservación de alimentos',
'📚 Aprender sobre la cultura otaku',
'📚 Aprender sobre la historia de la música de mi artista favorito',
'📚 Aprender sobre la historia del anime que me gusta',
'📚 Aprender sobre la historia del arte',
'📚 Aprender sobre la historia del cine',
'📚 Aprender sobre la producción de series de televisión',
'🌅 Aprender sobre las aves locales y sus hábitats.',
'🍽️ Aprender sobre maridaje de alimentos y bebidas',
'💼 Aprender sobre marketing digital',
'🌌 Aprender sobre mitología',
'🍏 Aprender sobre nutrición y dietética',
'🎧 Aprender sobre producción musical',
'🍽️ Aprender sobre servicio de mesa y etiqueta',
'🌍 Aprender sobre sostenibilidad y medio ambiente',
'🎨 Aprender sobre técnicas de grabado.',
'📡 Aprender sobre tecnología de drones',
'🎨 Aprender técnicas de acuarela o acrílico',
'🍳 Aprender técnicas de cocina al vacío',
'🎨 Aprender técnicas de grabado',
'🎨 Aprender técnicas de pintura al óleo',
'🎼 Aprender teoría musical',
'🎩 Aprender Trucos de Magia',
'🌐 Aprender un idioma',
'🌍 Aprender un nuevo idioma a través de clases o aplicaciones.',
'🌳 Arboricultura',
'🌿 Aromaterapia',
'⛏️ Arqueología',
'🏛️ Arquitectura',
'💐 Arreglos florales',
'🎨 Arte',
'🖌️ Arte callejero',
'🎨 Arte Digital',
'🥋 Artes marciales',
'🥋 Artes marciales mixtas',
'🏺 Asistir a clases de cerámica o escultura',
'🎶 Asistir a conciertos de mi artista favorito',
'🎬 Asistir a estrenos de películas que espero con ansias',
'🗓️ Asistir a eventos relacionados con la música de mi artista favorito',
'🎉 Asistir a ferias del libro y eventos literarios',
'🎬 Asistir a festivales de cine.',
'🎭 Asistir a obras de teatro o musicales.',
'🎭 Asistir a talleres de actuación.',
'🔭 Astrofotografía',
'🔮 Astrología',
'🌌 Astronomía',
'🔭 Astronomía Amateur',
'👟 Atletismo',
'🌊 Atravesar las olas haciendo surf.',
'📚 Audiolibros',
'💌 Ayudar a mi comunidad a través del voluntariado.',
'💃 Bailar las coreografías de mis canciones preferidas',
'🩰 Ballet',
'🏀 Baloncesto',
'🏔️ Barranquismo',
'🏸 Bádminton',
'🏸 Bádminton de mesa',
'🏸 Bádminton de playa',
'🎤 Beatboxing',
'💄 Belleza',
'📚 Bibliofilia',
'🐬 Biología Marítima',
'⚾ Béisbol',
'💻 Blog',
'📝 Blog de viajes',
'✏️ Bocetos',
'🎨 Body painting',
'🏄 Bodyboard',
'🎳 Bolos',
'🎳 Bolos cósmicos',
'🎳 Bolos Cósmicos Nocturnos',
'🎳 Bolos duckpin',
'🧵 Bordado',
'🎳 Bowling',
'🥊 Boxeo',
'🔍 Búsqueda de Huevos de Pascua para Adultos',
'🔍 Búsqueda del tesoro en línea',
'🤿 Buceo',
'🎭 Burlesque',
'🖋️ Caligrafía',
'🎨 Caligrafía japonesa',
'👟 Caminata',
'🏕 Camping',
'🛶 Canoa',
'🚣 Canoa australiana',
'🚣 Canoa de aguas bravas',
'🚣 Canoa de aguas rápidas',
'🚣 Canoa de aguas tranquilas',
'🚣 Canoa de mar',
'🚣 Canoa de río',
'🚣 Canoa de río de aguas bravas',
'🚣 Canoa de río de aguas lentas',
'🚣 Canoa de río de aguas onduladas',
'🚣 Canoa de río de aguas rápidas',
'🚣 Canoa de río de aguas serenas',
'🚣 Canoa de río de aguas tranquilas',
'🚣 Canoa de travesía',
'🚣 Canoa hawaiana',
'🚣 Canoa india',
'🚣 Canoa polinesia',
'🚣 Canoa polo',
'🎤 Cantar a todo pulmón las canciones de mi artista favorito',
'🎤 Cantar mis canciones favoritas con amigos en karaoke.',
'🎤 Canto',
'🎤 Canto a capela',
'🎤 Canto en karaoke',
'📸 Capturar momentos y paisajes con mi cámara.',
'🌅 Capturar paisajes y naturaleza',
'✏️ Caricaturas',
'🪚 Carpintería',
'🏎️ Carreras de autos',
'🐎 Carreras de caballos',
'🏇 Carreras de camellos',
'🚗 Carreras de go-karts',
'❄️ Carreras de moto de nieve',
'🛵 Carreras de motocicletas',
'🚧 Carreras de obstáculos',
'🦮 Carreras de perros',
'🛷 Carreras de trineos',
'♿ Carreras en silla de ruedas',
'🗺️ Cartografía',
'🍔 Catador de Comida Rápida',
'🏹 Caza',
'🕵️ Caza de Tesoros con Detector de Metales',
'🍵 Ceremonia del té',
'🎨 Cerámica',
'🚲 Ciclismo',
'🚴 Ciclismo acrobático',
'🚴 Ciclismo con manos libres',
'🚴 Ciclismo con mascotas',
'🚴 Ciclismo con obstáculos',
'🚴 Ciclismo con remolque',
'🚴 Ciclismo con remolque para camping',
'🚴 Ciclismo con remolque para carga',
'🚴 Ciclismo con remolque para compras',
'🚴 Ciclismo con remolque para mascotas',
'🚴 Ciclismo con remolque para niños',
'🚴 Ciclismo con remolque para picnic',
'🚴 Ciclismo con sidecar',
'🚴 Ciclismo de Acrobacias',
'🚴 Ciclismo de carretera',
'🚴 Ciclismo de montaña',
'🚴 Ciclismo de Montaña en Cuevas',
'🚵 Ciclismo de Montaña en la Nieve',
'🚲 Ciclismo de Montaña Extremo',
'🚴 Ciclismo de montaña nocturno',
'🚴 Ciclismo en grupo',
'🚴 Ciclismo en invierno',
'🚴 Ciclismo en solitario',
'🚴 Ciclismo en tandem',
'🚴 Ciclismo en un Parque de BMX',
'🚴 Ciclismo Extremo por la Ciudad',
'🚴 Ciclismo sin manos',
'🎞️ Cine en casa',
'🎬 Cinematografía',
'🎪 Circo',
'🔮 Clarividencia',
'🎭 Clowning',
'📚 Club de lectura',
'📚 Club de Lectura de Ciencia Ficción',
'📚 Clubes de lectura de cómics en línea',
'📚 Clubes de lectura en línea',
'🍳 Cocina gourmet',
'🍳 Cocina internacional',
'🥗 Cocina saludable',
'🍳 Cocinar',
'🍲 Cocinar platos tradicionales de mi país',
'🍜 Cocinar recetas de mis series o películas favoritas',
'🍹 Coctelería',
'🗝️ Coleccionar antigüedades',
'💥 Coleccionar cómics',
'💿 Coleccionar ediciones especiales de discos de mi artista favorito',
'🛍️ Coleccionar ediciones especiales de películas en DVD o Blu-ray',
'🎫 Coleccionar entradas',
'🛍️ Coleccionar figuras, mangas, pósters y demás artículos de anime',
'🛍️ Coleccionar figuras, pósters y demás artículos de videojuegos',
'📚 Coleccionar libros',
'🧤 Coleccionar objetos',
'🛍️ Coleccionar objetos de recuerdo de mis películas preferidas',
'🛍️ Coleccionar objetos de recuerdo de mis series de televisión preferidas',
'💿 Coleccionar posters, discos, camisetas y demás mercancía de mi artista favorito',
'🕹️ Coleccionar videojuegos antiguos',
'🏺 Coleccionismo de Artefactos Antiguos',
'🐞 Colecta de Insectos',
'🎨 Collage',
'🎭 Comedia',
'🎭 Comedia absurda',
'🎭 Comedia de enredo',
'🎭 Comedia de improvisación',
'🎭 Comedia de improvisación para niños',
'🎭 Comedia de melodrama',
'🎭 Comedia de situación',
'🎭 Comedia de situación en radio',
'🎭 Comedia de sketch',
'🎭 Comedia de stand-up para niños',
'🎭 Comedia de sátira',
'🎭 Comedia de vaudeville',
'🎭 Comedia musical',
'🎭 Comedia romántica',
'🍕 Comer',
'🌐 Compartir mis pensamientos y experiencias en un blog.',
'💻 Compilar un blog sobre la historia del anime',
'🎼 Componer música',
'🎶 Componer Música Electrónica',
'🎼 Componer música original inspirada en mi artista favorito',
'🎶 Compongo canciones inspiradas en el anime',
'🎵 Composición de bandas sonoras',
'🎵 Composición de canciones',
'🎶 Composición de música',
'🎶 Composición de música para películas',
'🎶 Composición de música para videojuegos',
'🚗 Conducir',
'👻 Conspiración',
'🏰 Construcción de Castillos de Arena Épicos',
'🚀 Construcción de Cohetes Caseros',
'🏗️ Construcción de Maquetas',
'🤖 Construir y programar mis propios robots.',
'🏃‍♂️ Correr en el parque o en la playa',
'🎩 Cosplay',
'🦸 Cosplay de Personajes de Series de TV',
'🦸 Cosplay de Personajes Famosos',
'🧵 Costura creativa',
'🖥️ Creación de Animaciones',
'🎮 Creación de avatares',
'🎤 Creación de contenido de ASMR',
'🎮 Creación de contenido de Minecraft',
'🎤 Creación de contenido en redes sociales',
'🎬 Creación de contenido en YouTube',
'🌱 Creación de Jardines Verticales',
'🎮 Creación de juegos de mesa',
'🎮 Creación de juegos de mesa para niños',
'🎲 Creación de Juegos de Mesa Personalizados',
'🎮 Creación de Juegos de Rol en Línea (RPG)',
'🎶 Creación de listas de reproducción en streaming',
'🏰 Creación de mapas para juegos de rol',
'🎨 Creación de memes',
'🎮 Creación de mods para juegos de mesa',
'🎮 Creación de mods para videojuegos',
'🎵 Creación de música digital',
'🎮 Creación de mundos virtuales',
'🎙️ Creación de podcasts',
'🎵 Creación de remixes',
'🤖 Creación de Robots de Combate',
'🎮 Creación de videojuegos de acción',
'🎮 Creación de videojuegos de aventuras',
'🎮 Creación de videojuegos de estrategia',
'🎮 Creación de videojuegos de realidad virtual',
'🎮 Creación de videojuegos de simulación',
'🎮 Creación de videojuegos educativos',
'👾 Creación de videojuegos indie',
'🎮 Creación de videojuegos para móviles',
'🖼️ Crear arte digital y compartirlo en línea',
'🎬 Crear cortometrajes con amigos',
'🎨 Crear fanart de anime en diferentes estilos artísticos',
'🎲 Crear juegos de mesa inspirados en anime',
'🎧 Crear listas de reproducción y explorar música nueva.',
'🎨 Crear manualidades y proyectos DIY.',
'💻 Crear mods para videojuegos',
'🎮 Crear tu propia página web',
'💻 Crear un blog donde hable sobre mis películas preferidas',
'📷 Crear un blog o canal de YouTube sobre fotografía',
'💻 Crear un blog o vlog sobre anime',
'💻 Crear un blog sobre literatura',
'🎬 Crear un canal de YouTube.',
'💻 Crear un canal de YouTube donde comparta mis experiencias en videojuegos',
'💻 Crear un canal de YouTube donde hable sobre mis series favoritas',
'💻 Crear un canal de YouTube donde muestre mis proyectos artísticos',
'💻 Crear un canal de YouTube sobre anime',
'📰 Crear un fanzine dedicado a mi artista favorito',
'🌳 Crear un jardín japonés en miniatura',
'🎨 Crear un mural comunitario.',
'🎙️ Crear un podcast sobre mis series favoritas',
'🖼️ Crear un portafolio de mis mejores fotos',
'📁 Crear un portafolio de mis obras de arte',
'🎮 Crear un videojuego inspirado en anime',
'🐉 Criptozoología',
'📖 Crítica Literaria',
'🧩 Crucigramas',
'🌸 Cuidado de la Piel',
'🐾 Cuidar y adoptar mascotas.',
'🌱 Cultivar plantas y flores en casa o en el jardín.',
'💐 Cultivo de flores',
'🎼 Danza',
'🎻 Danza del vientre',
'🎯 Dardos',
'🥋 Defensa personal',
'👟 Deportes extremos',
'🎮 Desarrollar videojuegos.',
'📱 Desarrollo de aplicaciones de realidad aumentada',
'📱 Desarrollo de aplicaciones móviles',
'👩‍💻 Desarrollo de aplicaciones para redes sociales',
'📱 Desarrollo de aplicaciones web',
'🚀 Desarrollo de software',
'🎮 Desarrollo de Videojuegos',
'🚵 Descenso de montaña en bicicleta',
'🎧 Descubrir Nueva Música',
'✏️ Dibujar',
'🖍️ Dibujar cómics o ilustraciones.',
'🎨 Dibujar con tinta',
'✏️ Dibujar en 3D',
'🎨 Dibujar fanarts de anime y compartirlos en línea',
'🎨 Dibujar fanarts de mis películas favoritas',
'🎨 Dibujar fanarts de mis personajes de series de televisión',
'🎨 Dibujar fanarts de mis personajes de videojuegos favoritos',
'🎨 Dibujar fanarts de mis personajes favoritos',
'🎨 Dibujar ilustraciones basadas en libros que me gustan',
'🎨 Dibujar o pintar fanarts de mi artista favorito',
'🎨 Dibujo a carboncillo',
'🎨 Dibujo a lápiz',
'🎨 Dibujo a pluma',
'🎨 Dibujo a tiza',
'🎨 Dibujo digital',
'🖥️ Diseñar gráficos o ilustraciones digitales.',
'🗺️ Diseñar niveles para videojuegos',
'👗 Diseñar ropa inspirada en personajes de anime',
'👗 Diseñar una línea de ropa inspirada en anime',
'🌀 Diseño de Laberintos',
'👗 Diseño de Moda',
'🎮 Diseño de Mods para Videojuegos',
'🖥️ Diseño de sitios web',
'🎮 Diseño de videojuegos',
'🎨 Diseño gráfico digital',
'🎭 Disfrazarme como personajes de anime',
'🎭 Disfrazarme como personajes de videojuegos',
'🎭 Disfrazarme de personajes de películas en eventos especiales',
'🎭 Disfrazarme de personajes de series de televisión en convenciones',
'🎆 Disfrutar de fuegos artificiales y espectáculos.',
'🚴 Disfrutar de paseos en bicicleta por la naturaleza.',
'🏀 Disfrutar de un partido en la cancha de baloncesto.',
'🎧 DJ en Fiestas Locales',
'📸 Documentar eventos y celebraciones',
'💤 Dormir',
'🎬 Edición de videos',
'🧀 Elaboración de Quesos',
'🕯️ Elaboración de Velas',
'🧳 Empacar para viajes',
'🕹️ Emuladores de videojuegos',
'🧘 Encontrar la calma y la paz interior.',
'📚 Encuadernación de libros',
'🌳 Entrenamiento de Bonsái',
'🎤 Entrevistas de antropología en línea',
'🎤 Entrevistas de arqueología en línea',
'🎤 Entrevistas de arquitectura en línea',
'🎤 Entrevistas de astronomía en línea',
'🎤 Entrevistas de biología aplicada en línea',
'🎤 Entrevistas de biología en línea',
'🎤 Entrevistas de celebridades en línea',
'🎤 Entrevistas de ciencia en línea',
'🎤 Entrevistas de ciencias de la computación en línea',
'🎤 Entrevistas de ciencias políticas en línea',
'🎤 Entrevistas de cine en línea',
'🎤 Entrevistas de derecho en línea',
'🎤 Entrevistas de diseño en línea',
'🎤 Entrevistas de economía en línea',
'🎤 Entrevistas de enfermería en línea',
'🎤 Entrevistas de estadísticas en línea',
'🎤 Entrevistas de expertos en línea',
'🎤 Entrevistas de exploración espacial en línea',
'🎤 Entrevistas de filosofía en línea',
'🎤 Entrevistas de física aplicada en línea',
'🎤 Entrevistas de física en línea',
'🎤 Entrevistas de historia del arte en línea',
'🎤 Entrevistas de historia en línea',
'🎤 Entrevistas de informática en línea',
'🎤 Entrevistas de ingeniería en línea',
'🎤 Entrevistas de literatura en línea',
'🎤 Entrevistas de matemáticas aplicadas en línea',
'🎤 Entrevistas de matemáticas en línea',
'🎤 Entrevistas de medicina en línea',
'🎤 Entrevistas de música en línea',
'🎤 Entrevistas de odontología en línea',
'🎤 Entrevistas de política en línea',
'🎤 Entrevistas de psicología en línea',
'🎤 Entrevistas de química aplicada en línea',
'🎤 Entrevistas de química en línea',
'🎤 Entrevistas de realidad virtual en línea',
'🎤 Entrevistas de robótica en línea',
'🎤 Entrevistas de sociología en línea',
'🎤 Entrevistas de tecnología ambiental en línea',
'🎤 Entrevistas de tecnología de alimentos en línea',
'🎤 Entrevistas de tecnología de materiales en línea',
'🎤 Entrevistas de tecnología en línea',
'🎤 Entrevistas de tecnología energética en línea',
'🎤 Entrevistas de trabajo en línea',
'🎤 Entrevistas de vehículos autónomos en línea',
'🎤 Entrevistas de veterinaria en línea',
'🎤 Entrevistas en línea',
'🎤 Entrevistas en vivo en redes sociales',
'🏇 Equitación',
'🎶 Esc uchar Faded de Alan Walker',
'🧗 Escalada en hielo',
'🧗 Escalada en roca',
'🧗 Escalar rocas o paredes de escalada.',
'✍️ Escribir cuentos o novelas propias',
'✍️ Escribir cuentos, poesía o incluso un diario personal.',
'✍️ Escribir fanfiction con un estilo de escritura de anime',
'✍️ Escribir fanfictions basadas en mis películas favoritas',
'✍️ Escribir fanfictions de mis personajes de series de televisión',
'✍️ Escribir fanfictions de videojuegos',
'✍️ Escribir historias de anime en formato de manga',
'✍️ Escribir historias ficticias sobre mi artista favorito',
'✍️ Escribir historias ficticias sobre personajes de anime',
'📜 Escribir Poemas Cómicos',
'✍️ Escribir poesía y compartirla en línea',
'✍️ Escribir reseñas de anime',
'✍️ Escribir reseñas de libros que leo',
'✍️ Escribir reseñas de los álbumes de mi artista favorito',
'✍️ Escribir reseñas sobre las películas que veo',
'✍️ Escribir reseñas sobre los episodios que veo',
'💻 Escribir un blog o crear un canal de YouTube sobre mi artista favorito',
'✍️ Escribir un blog sobre técnicas de arte y manualidades',
'✍️ Escribir un guion para una película de anime',
'✍️ Escribir una guía para un videojuego',
'✍️ Escribir una novela ambientada en el mundo del anime que me gusta',
'📖 Escribir una novela o un libro.',
'📝 Escritura creativa',
'📝 Escritura de Haikus',
'📚 Escritura de poesía',
'✒️ Escritura en Caligrafía',
'🎶 Escuchar 24 Hours de Sunmi',
'🎶 Escuchar 24K Magic de Bruno Mars',
'🎶 Escuchar 7 Rings de Ariana Grande',
'🎶 Escuchar Adagio for Strings de Tiësto',
'🎶 Escuchar Adele',
'🎶 Escuchar Adore You de Harry Styles',
'🎶 Escuchar AIIYL de KARD',
'🎶 Escuchar Airplane pt.2 de BTS',
'🎶 Escuchar Alcohol-Free de TWICE',
'🎶 Escuchar All of Me de John Legend',
'🎶 Escuchar Alligator de MONSTA X',
'🎶 Escuchar Alone de Marshmello',
'🎶 Escuchar Amor de Mis Amores de Los Ángeles Azules',
'🎶 Escuchar Amor Eterno de La Factoría',
'🎶 Escuchar Animals de Martin Garrix',
'🎶 Escuchar Anpanman de BTS',
'🎶 Escuchar Aquel Lugar de La Sonora Dinamita',
"🎶 Escuchar As If It's Your Last de BLACKPINK",
'🎶 Escuchar As It Was de Harry Styles',
'🎶 Escuchar Atmosphere de Kaskade',
'🎶 Escuchar Aurora',
'🎶 Escuchar Bad Guy de Billie Eilish',
'🎶 Escuchar Bad Habits de Ed Sheeran',
'🎶 Escuchar Baila Baila Baila de Rosalía',
'🎶 Escuchar Baila Esta Cumbia de Selena',
'🎶 Escuchar Bangarang de Skrillex ft. Sirah',
'🎶 Escuchar Bbibbi de IU',
'🎶 Escuchar Beautiful de Wanna One',
'🎶 Escuchar Bichota de Karol G',
'🎶 Escuchar Billie Eilish',
'🎶 Escuchar Billie Jean de Michael Jackson',
'🎶 Escuchar Black Mamba de aespa',
'🎶 Escuchar Blinding Lights de The Weeknd',
'🎶 Escuchar Blood Sweat & Tears de BTS',
'🎶 Escuchar Blue Hour de TXT',
'🎶 Escuchar Blueming de IU',
'🎶 Escuchar Bob Dylan',
'🎶 Escuchar Bohemian Rhapsody de Queen',
'🎶 Escuchar Born Slippy de Underworld',
'🎶 Escuchar Boss de NCT U',
'🎶 Escuchar Boy With Luv de BTS ft. Halsey',
'🎶 Escuchar Breathe de Lee Hi',
'🎶 Escuchar Breathe de The Prodigy',
'🎶 Escuchar Butter de BTS',
'🎶 Escuchar Callaíta de Bad Bunny y Jhay Cortez',
'🎶 Escuchar Camila Cabello',
'🎶 Escuchar Celebrity de IU',
'🎶 Escuchar Celine Dion',
'🎶 Escuchar Cheer Up de TWICE',
'🎶 Escuchar Cherry Bomb de NCT 127',
'🎶 Escuchar Cielo de Benny Ibarra',
'🎶 Escuchar Circles de Post Malone',
'🎶 Escuchar Closer de The Chainsmokers ft. Halsey',
'🎶 Escuchar Cold Blooded de Jessi',
'🎶 Escuchar Cold Heart (PNAU Remix) de Elton John y Dua Lipa',
'🎶 Escuchar Coldplay',
'🎶 Escuchar Come & Go de Marshmello y Juice WRLD',
'🎶 Escuchar Con Calma de Daddy Yankee ft. Snow',
'🎶 Escuchar Counting Stars de OneRepublic',
'🎶 Escuchar Crave You de Flight Facilities ft. Giselle',
'🎶 Escuchar Criminal de Natti Natasha y Ozuna',
'🎶 Escuchar Crown de TXT',
'🎶 Escuchar Cumbia de la Selva de Los Ángeles Azules',
'🎶 Escuchar Cumbia de la Tierra de Los Ángeles Azules',
'🎶 Escuchar Cumbia de la Vida de Los Ángeles Azules',
'🎶 Escuchar Cumbia de los Abuelos de Los Ángeles Azules',
'🎶 Escuchar Cumbia de los Gatos de Los Ángeles Azules',
'🎶 Escuchar Cumbia de los Pajaritos de Los Ángeles Azules',
'🎶 Escuchar Cumbia del Sol de Los Ángeles Azules',
'🎶 Escuchar Cumbia Sobre el Río de Celso Piña',
'🎶 Escuchar Dalla Dalla de ITZY',
'🎶 Escuchar Dance Monkey de Tones and I',
'🎶 Escuchar Dancing with a Stranger de Sam Smith y Normani',
'🎶 Escuchar Darkside de Alan Walker ft. Au/Ra y Tomine Harket',
'🎶 Escuchar Ddu-Du Ddu-Du de BLACKPINK',
'🎶 Escuchar Deja Vu de Olivia Rodrigo',
'🎶 Escuchar Despacito de Luis Fonsi ft. Daddy Yankee',
'🎶 Escuchar Dile Que Tú Me Quieres de Ozuna',
'🎶 Escuchar Dákiti de Bad Bunny y Jhay Cortez',
'🎶 Escuchar Doja Cat',
"🎶 Escuchar Don't Let Me Down de The Chainsmokers ft. Daya",
"🎶 Escuchar Don't Start Now de Dua Lipa",
"🎶 Escuchar Don't You Worry Child de Swedish House Mafia",
'🎶 Escuchar Dua Lipa',
'🎶 Escuchar Dynamite de BTS',
'🎶 Escuchar Eagles',
'🎶 Escuchar Easy On Me de Adele',
'🎶 Escuchar Ed Sheeran',
'🎶 Escuchar Eight de IU ft. Suga (BTS)',
'🎶 Escuchar El Amor de Mi Vida de Los Bukis',
'🎶 Escuchar Ella y Yo de Don Omar ft. Aventura',
'🎶 Escuchar Energetic de Wanna One',
'🎶 Escuchar Escape de Kaskade',
'🎶 Escuchar Euphoria de Jungkook',
'🎶 Escuchar Everytime de David Guetta ft. Chris Willis',
'🎶 Escuchar Faded de Alan Walker',
'🎶 Escuchar Fake Love de BTS',
'🎶 Escuchar Fancy de TWICE',
'🎶 Escuchar Fantasia de MONSTA X',
'🎶 Escuchar Feel So Close de Calvin Harris',
'🎶 Escuchar Feel Special de TWICE',
'🎶 Escuchar Fiesta de IZ*ONE',
'🎶 Escuchar Firestarter de The Prodigy',
'🎶 Escuchar First of the Year (Equinox) de Skrillex',
'🎶 Escuchar Fix You de Coldplay',
'🎶 Escuchar Forever Young de BLACKPINK',
'🎶 Escuchar Galvanize de The Chemical Brothers',
'🎶 Escuchar Gashina de Sunmi',
'🎶 Escuchar Get Lucky de Daft Punk ft. Pharrell Williams',
'🎶 Escuchar Gimme Gimme de WJSN',
'🎶 Escuchar Giveon',
'🎶 Escuchar Glass Animals',
'🎶 Escuchar Go Crazy de Chris Brown y Young Thug',
'🎶 Escuchar Go! de The Chemical Brothers',
'🎶 Escuchar Go Go de BTS',
'🎶 Escuchar Gold de Adventure Club ft. Yuna',
'🎶 Escuchar Good 4 U de Olivia Rodrigo',
'🎶 Escuchar Good Day de IU',
'🎶 Escuchar Grenade de Bruno Mars',
'🎶 Escuchar Guns Roses',
'🎶 Escuchar Happier de Marshmello ft. Bastille',
'🎶 Escuchar Happier Than Ever de Billie Eilish',
'🎶 Escuchar Hard Carry de GOT7',
'🎶 Escuchar Harry Styles',
'🎶 Escuchar Havana de Camila Cabello ft. Young Thug',
'🎶 Escuchar Heart Shaker de TWICE',
'🎶 Escuchar Heartbreak Anniversary de Giveon',
'🎶 Escuchar Heat Waves de Glass Animals',
'🎶 Escuchar Hello de Adele',
'🎶 Escuchar Hero de MONSTA X',
'🎶 Escuchar Hey Boy Hey Girl de The Chemical Brothers',
'🎶 Escuchar Hey Jude de The Beatles',
'🎶 Escuchar Higher Love de Kygo y Whitney Houston',
'🎶 Escuchar HIP de MAMAMOO',
'🎶 Escuchar Holo de Lee Hi',
'🎶 Escuchar Hotel California de Eagles',
'🎶 Escuchar How You Like That de BLACKPINK',
'🎶 Escuchar Hush Hush de T-ara',
'🎶 Escuchar I Could Be the One de Avicii vs. Nicky Romero',
'🎶 Escuchar I Feel for You de Bob Sinclar',
'🎶 Escuchar I Gotta Feeling de The Black Eyed Peas (David Guetta Remix)',
'🎶 Escuchar I Need U de BTS',
'🎶 Escuchar I Remember de Deadmau5 y Kaskade',
'🎶 Escuchar I Want It That Way de Backstreet Boys',
'🎶 Escuchar I Want to Hold Your Hand de The Beatles',
'🎶 Escuchar I Will Always Love You de Whitney Houston',
'🎶 Escuchar Ice Cream de BLACKPINK ft. Selena Gomez',
'🎶 Escuchar Icy de ITZY',
'🎶 Escuchar IDOL de BTS',
"🎶 Escuchar If I Ain't Got You de Alicia Keys",
'🎶 Escuchar Imagine de John Lennon',
'🎶 Escuchar In The Morning de ITZY',
'🎶 Escuchar In Your Area de BLACKPINK',
'🎶 Escuchar Industry Baby de Lil Nas X ft. Jack Harlow',
'🎶 Escuchar Insomnia de Faithless',
'🎶 Escuchar James Arthur',
'🎶 Escuchar John Legend',
'🎶 Escuchar John Lennon',
'🎶 Escuchar Just Right de GOT7',
'🎶 Escuchar Just the Way You Are de Bruno Mars',
'🎶 Escuchar Justin Bieber',
'🎶 Escuchar Kick It de NCT 127',
'🎶 Escuchar Kill This Love de BLACKPINK',
'🎶 Escuchar Kiss Me de Sixpence None the Richer',
'🎶 Escuchar Kiss Me More de Doja Cat',
'🎶 Escuchar Kiss Me More de Doja Cat ft. SZA',
'🎶 Escuchar Knock Knock de TWICE',
'🎶 Escuchar La Canción de Bad Bunny y J Balvin',
'🎶 Escuchar La Cumbia de la Gente de Los Ángeles Azules',
'🎶 Escuchar La Cumbia de La Gente de Los Ángeles Azules ft. Sonora Santanera',
'🎶 Escuchar La Gozadera de Gente de Zona ft. Marc Anthony',
'🎶 Escuchar La La La de KARA',
'🎶 Escuchar La Modelo de Ozuna ft. Cardi B',
'🎶 Escuchar La Negra Tiene Tumbao de Celia Cruz',
'🎶 Escuchar La Rebelión de Joe Arroyo',
'🎶 Escuchar La Vida es un Carnaval de Celia Cruz',
'🎶 Escuchar La Vie en Rose de IZ*ONE',
'🎶 Escuchar Lady Gaga',
'🎶 Escuchar Lean On de Major Lazer ft. DJ Snake y MØ',
'🎶 Escuchar Leave The Door Open de Silk Sonic',
'🎶 Escuchar Led Zeppelin',
'🎶 Escuchar Let It Be de The Beatles',
'🎶 Escuchar Let Me Love You de Mario (DJ Snake Remix)',
'🎶 Escuchar Levels de Avicii',
'🎶 Escuchar Levitating de Dua Lipa',
'🎶 Escuchar Levitating de Dua Lipa ft. DaBaby',
'🎶 Escuchar Light It Up de Major Lazer ft. Nyla y Fuse ODG',
'🎶 Escuchar Like a Rolling Stone de Bob Dylan',
'🎶 Escuchar Likey de TWICE',
'🎶 Escuchar Lil Nas X',
'🎶 Escuchar LILAC de IU',
'🎶 Escuchar Llamado de Emergencia de Daddy Yankee',
'🎶 Escuchar Loco de ITZY',
'🎶 Escuchar Love Generation de Bob Sinclar ft. Gary Pine',
'🎶 Escuchar Love Killa de MONSTA X',
'🎶 Escuchar Love Poem de IU',
'🎶 Escuchar Love Scenario de iKON',
'🎶 Escuchar Love Shot de EXO',
'🎶 Escuchar Love Yourself de BTS',
'🎶 Escuchar Lovesick Girls de BLACKPINK',
'🎶 Escuchar Lucid Dreams de Juice WRLD',
'🎶 Escuchar Lullaby de GOT7',
'🎶 Escuchar Mamma Mia de KARD',
'🎶 Escuchar Mi Gente de J Balvin ft. Willy William',
'🎶 Escuchar Michael Jackson',
'🎶 Escuchar Midnight City de M83',
'🎶 Escuchar Monster de EXO',
'🎶 Escuchar Montero (Call Me By Your Name) de Lil Nas X',
'🎶 Escuchar Mood de 24kGoldn ft. Iann Dior',
'🎶 Escuchar More & More de TWICE',
'🎶 Escuchar Mr. de KARA',
'🎧 Escuchar música',
'🎶 Escuchar My Heart Will Go On de Celine Dion',
'🎶 Escuchar My Type de iKON',
'🎶 Escuchar New Rules de Dua Lipa',
'🎶 Escuchar Next Level de aespa',
'🎶 Escuchar Nirvana',
'🎶 Escuchar No Limit de MONSTA X',
'🎶 Escuchar No Me Acuerdo de Thalía ft. Natti Natasha',
'🎶 Escuchar No Time To Die de Billie Eilish',
'🎶 Escuchar Not By The Moon de GOT7',
'🎶 Escuchar Not Shy de ITZY',
'🎶 Escuchar Not Today de BTS',
'🎶 Escuchar NUNU NANA de Jessi',
'🎶 Escuchar Olivia Rodrigo',
'🎶 Escuchar On de BTS',
'🎶 Escuchar On My Way de Alan Walker, Sabrina Carpenter y Farruko',
'🎶 Escuchar One More Time de Daft Punk',
'🎶 Escuchar OneRepublic',
'🎶 Escuchar Outside de Calvin Harris ft. Ellie Goulding',
'🎶 Escuchar Oye Como Va de Tito Puente',
'🎶 Escuchar Peaches de Justin Bieber',
'🎶 Escuchar Peaches de Justin Bieber ft. Daniel Caesar y Giveon',
'🎶 Escuchar Perfect de Ed Sheeran',
'🎶 Escuchar Playing With Fire de BLACKPINK',
'🎶 Escuchar Positions de Ariana Grande',
'🎶 Escuchar Power de EXO',
'🎶 Escuchar Pporappippam de Sunmi',
'🎶 Escuchar Praise You de Fatboy Slim',
'🎶 Escuchar Queen',
'🎶 Escuchar Rain on Me de Lady Gaga y Ariana Grande',
'🎶 Escuchar Ransom de Lil Tecca',
'🎶 Escuchar Red Flavor de Red Velvet',
'🎶 Escuchar Red Lights de Tiësto',
'🎶 Escuchar Reggaetón Lento de CNCO',
'🎶 Escuchar Reload de Sebastian Ingrosso y Tommy Trash',
'🎶 Escuchar Right Here, Right Now de Fatboy Slim',
'🎶 Escuchar Rihanna',
'🎶 Escuchar Rockstar de Post Malone ft. 21 Savage',
'🎶 Escuchar Rolling in the Deep de Adele',
'🎶 Escuchar Roly-Poly de T-ara',
'🎶 Escuchar Rose de Lee Hi',
'🎶 Escuchar Roses de SAINt JHN',
'🎶 Escuchar Roses de SAINt JHN (Imanbek Remix)',
'🎶 Escuchar Rumors de Lizzo ft. Cardi B',
'🎶 Escuchar Run Away de TXT',
'🎶 Escuchar Run de BTS',
'🎶 Escuchar Runaway de Aurora',
'🎶 Escuchar Salsa de la Calle de Gilberto Santa Rosa',
'🎶 Escuchar Salsa y Control de La Sonora Carruseles',
'🎶 Escuchar Sandstorm de Darude',
'🎶 Escuchar Savage de aespa',
'🎶 Escuchar Save Me de BTS',
'🎶 Escuchar Save Your Tears de The Weeknd',
'🎶 Escuchar Save Your Tears de The Weeknd ft. Ariana Grande',
'🎶 Escuchar Say So de Doja Cat',
"🎶 Escuchar Say You Won't Let Go de James Arthur",
'🎶 Escuchar Scared to Be Lonely de Martin Garrix y Dua Lipa',
'🎶 Escuchar Scary Monsters and Nice Sprites de Skrillex',
'🎶 Escuchar Secret de WJSN',
'🎶 Escuchar Senorita de Shawn Mendes y Camila Cabello',
'🎶 Escuchar Shallow de Lady Gaga y Bradley Cooper',
'🎶 Escuchar Shape of You de Ed Sheeran',
'🎶 Escuchar Shawn Mendes',
'🎶 Escuchar Shivers de Ed Sheeran',
'🎶 Escuchar Shoot Out de MONSTA X',
'🎶 Escuchar Silence de Marshmello ft. Khalid',
'🎶 Escuchar Simon Says de NCT 127',
'🎶 Escuchar Siren de Sunmi',
'🎶 Escuchar Sixpence None the Richer',
'🎶 Escuchar Smack My Bitch Up de The Prodigy',
'🎶 Escuchar Smells Like Teen Spirit de Nirvana',
'🎶 Escuchar Solo de Jennie (BLACKPINK)',
'🎶 Escuchar Someone Like You de Adele',
'🎶 Escuchar Something Just Like This de The Chainsmokers y Coldplay',
'🎶 Escuchar Spring Day de BTS',
'🎶 Escuchar Stairway to Heaven de Led Zeppelin',
'🎶 Escuchar Star de NCT',
'🎶 Escuchar Starlight de Muse (Gareth Emery Remix)',
'🎶 Escuchar Starry Night de MAMAMOO',
'🎶 Escuchar Stay de BLACKPINK',
'🎶 Escuchar Stay de Rihanna',
'🎶 Escuchar Stay de The Kid LAROI y Justin Bieber',
'🎶 Escuchar Stay de Zedd y Alessia Cara',
'🎶 Escuchar Stay With Me de Sam Smith',
'🎶 Escuchar Still With You de Jungkook',
'🎶 Escuchar Stitches (Remix) de Shawn Mendes (DJ Snake Remix)',
'🎶 Escuchar Strobe de Deadmau5',
'🎶 Escuchar Summer de Calvin Harris',
'🎶 Escuchar Sun & Moon de Above & Beyond ft. Richard Bedford',
'🎶 Escuchar Sunflower de Post Malone y Swae Lee',
'🎶 Escuchar Sweet Night de V',
'🎶 Escuchar Sweet Nothing de Calvin Harris ft. Florence Welch',
'🎶 Escuchar Taki Taki de DJ Snake ft. Selena Gomez, Ozuna y Cardi B',
'🎶 Escuchar Te Amo de Franco de Vita',
'🎶 Escuchar Te Boté de Ozuna, Bad Bunny, Nicky Jam, y Casper Mágico',
'🎶 Escuchar Te Conozco Bien de Marc Anthony ft. Jennifer Lopez',
'🎶 Escuchar Tempo de EXO',
'🎶 Escuchar Thank U, Next de Ariana Grande',
'🎶 Escuchar The A Team de Ed Sheeran',
'🎶 Escuchar The Beatles',
'🎶 Escuchar The Dream Chapter: STAR de TXT',
'🎶 Escuchar The Eve de EXO',
'🎶 Escuchar The Kid LAROI',
'🎶 Escuchar The Middle de Zedd, Maren Morris y Grey',
'🎶 Escuchar The Spectre de Alan Walker',
'🎶 Escuchar The Truth Untold de BTS ft. Steve Aoki',
'🎶 Escuchar The Weeknd',
'🎶 Escuchar Thing Called Love de Above & Beyond ft. Richard Bedford',
'🎶 Escuchar Thinking Out Loud de Ed Sheeran',
'🎶 Escuchar Tidal Wave de Sub Focus',
'🎶 Escuchar Titanium de David Guetta ft. Sia',
'🎶 Escuchar Tones and I',
'🎶 Escuchar Too Good at Goodbyes de Sam Smith',
'🎶 Escuchar Treasure de Bruno Mars',
'🎶 Escuchar TT de TWICE',
'🎶 Escuchar Turn Down for What de DJ Snake y Lil Jon',
'🎶 Escuchar Tusa de Karol G y Nicki Minaj',
'🎶 Escuchar U Got It de WJSN',
"🎶 Escuchar Vente Pa' Ca de Ricky Martin ft. Maluma",
'🎶 Escuchar Viva La Vida de Coldplay',
'🎶 Escuchar Vivir Mi Vida de Marc Anthony',
'🎶 Escuchar Wake Me Up de Avicii',
'🎶 Escuchar Wannabe de ITZY',
'🎶 Escuchar Watermelon Sugar de Harry Styles',
'🎶 Escuchar We Found Love de Calvin Harris ft. Rihanna',
'🎶 Escuchar What Is Love? de TWICE',
'🎶 Escuchar Whitney Houston',
'🎶 Escuchar X de Nicky Jam y J Balvin',
'🎶 Escuchar Yes or Yes de TWICE',
'🎶 Escuchar Yo Perreo Sola de Bad Bunny',
'🎶 Escuchar You Are the Reason de Calum Scott',
'🎶 Escuchar You Calling My Name de GOT7',
"🎶 Escuchar You Don't Know Me de Armand Van Helden",
'🎶 Escuchar Zimzalabim de Red Velvet',
'🎶 Escuchar ZOOM de Jessi',
'🎨 Esculpir',
'🎨 Escultura',
'🎨 Escultura en hielo',
'🤺 Esgrima',
'🎮 eSports',
'🚤 Esquí acuático',
'👋 Estar en 500px',
'👋 Estar en 9GAG',
'👋 Estar en Airtable',
'👋 Estar en ArtStation',
'👋 Estar en Asana',
'👋 Estar en Badoo',
'👋 Estar en Baidu Tieba',
'👋 Estar en Bandcamp',
'👋 Estar en Behance',
'👋 Estar en Buffer',
'👋 Estar en Buy Me a Coffee',
'👋 Estar en Canva',
'👋 Estar en Chatwork',
'👋 Estar en ClickUp',
'👋 Estar en Clubhouse',
'👋 Estar en Coda',
'👋 Estar en DeviantArt',
'👋 Estar en Discord',
'👋 Estar en DLive',
'👋 Estar en Dribbble',
'👋 Estar en Ello',
'👋 Estar en Eventbrite',
'👋 Estar en Facebook',
'👋 Estar en Facebook Messenger',
'👋 Estar en FaceTime',
'👋 Estar en Figma',
'👋 Estar en Flickr',
'👋 Estar en Flipboard',
'👋 Estar en Flock',
'👋 Estar en Foursquare',
'👋 Estar en Gab',
'👋 Estar en GitHub',
'👋 Estar en Goodreads',
'👋 Estar en Google Meet',
'👋 Estar en GroupMe',
'👋 Estar en Hike',
'👋 Estar en Hootsuite',
'👋 Estar en Houseparty',
'👋 Estar en Imo',
'👋 Estar en Instagram',
'👋 Estar en Jitsi',
'👋 Estar en KakaoTalk',
'👋 Estar en Ko-fi',
'👋 Estar en Last.fm',
'👋 Estar en Line',
'👋 Estar en LinkedIn',
'👋 Estar en LiveJournal',
'👋 Estar en Mailchimp',
'👋 Estar en Mattermost',
'👋 Estar en Medium',
'👋 Estar en Meetup',
'👋 Estar en MeWe',
'👋 Estar en Microsoft Teams',
'👋 Estar en Minds',
'👋 Estar en Miro',
'👋 Estar en Mix',
'👋 Estar en Monday.com',
'👋 Estar en MySpace',
'👋 Estar en Nextdoor',
'👋 Estar en Notion',
'👋 Estar en OnlyFans',
'👋 Estar en Patreon',
'👋 Estar en Periscope',
'👋 Estar en Pinterest',
'👋 Estar en Plurk',
'👋 Estar en Quibblo',
'👋 Estar en Quora',
'👋 Estar en Ravelry',
'👋 Estar en Reddit',
'👋 Estar en Rocket.Chat',
'👋 Estar en Rumble',
'👋 Estar en Scribophile',
'👋 Estar en Signal',
'👋 Estar en Skype',
'👋 Estar en Slack',
'👋 Estar en Snapchat',
'👋 Estar en SoundCloud',
'👋 Estar en Steemit',
'👋 Estar en Substack',
'👋 Estar en Tango',
'👋 Estar en Taringa!',
'👋 Estar en Telegram',
'👋 Estar en TikTok',
'👋 Estar en Trello',
'👋 Estar en Tumblr',
'👋 Estar en Twitch',
'👋 Estar en Twitter',
'👋 Estar en Viber',
'👋 Estar en VKontakte',
'👋 Estar en Voxer',
'👋 Estar en Wattpad',
'👋 Estar en WeChat',
'👋 Estar en Weibo',
'👋 Estar en Whatsapp',
'👋 Estar en XING',
'👋 Estar en Yelp',
'👋 Estar en YouTube',
'👋 Estar en ZOOM',
'📘 Estudiar',
'📜 Estudiar genealogía y la historia familiar',
'📚 Estudiar guionismo y escritura de series',
'📚 Estudiar historia y arqueología',
'📚 Estudiar la historia de la literatura',
'🇯🇵 Estudiar japonés para poder entender mejor el anime',
'📚 Estudiar la cinematografía y técnicas de dirección',
'📚 Estudiar la historia de la fotografía',
'📚 Estudio de Filosofía',
'🔍 Estudio de Mitología Comparada',
'🌿 Estudio de Plantas Medicinales',
'🧳 Excursiones a lugares abandonados',
'🌲 Excursiones de Senderismo Nocturnas',
'📸 Experimentar con diferentes estilos de fotografía',
'🖌️ Experimentar con diferentes estilos de pintura',
'🍕 Experimentar con la cocina vegana o vegetariana',
'🍳 Experimentar con nuevas recetas y sabores en la cocina.',
'🧪 Experimentos científicos en línea',
'🔬 Experimentos Culinarios',
'🧪 Experimentos de Ciencias Caseros',
'🦠 Experimentos de Ciencias de la Vida',
'🔬 Experimentos de Química Divertidos',
'🌋 Exploración de volcanes',
'🏙️ Exploración Urbana',
'🌳 Explorar senderos y montañas.',
'🎨 Expresar mi creatividad a través de la pintura y el arte visual.',
'📜 Fabricación de Papel Artesanal',
'👻 Fantasmas y/o apariciones',
'🍺 Fermentación Casera',
'🎬 Filmar y editar cortometrajes.',
'👟 Fitness',
'💃 Formar un grupo de baile de anime',
'📸 Fotogénico/a',
'📸 Fotografía',
'📸 Fotografía blanco y negro',
'📸 Fotografía de alimentos para redes sociales',
'📸 Fotografía de animales',
'📸 Fotografía de arquitectura para redes sociales',
'📸 Fotografía de bodas',
'📸 Fotografía de bodas para redes sociales',
'📸 Fotografía de eventos para redes sociales',
'📸 Fotografía de juegos',
'📸 Fotografía de mascotas para redes sociales',
'📸 Fotografía de moda',
'📸 Fotografía de moda para redes sociales',
'📷 Fotografía de Naturaleza en Macro',
'📸 Fotografía de naturaleza para redes sociales',
'📸 Fotografía de paisajes',
'📸 Fotografía de paisajes para redes sociales',
'📸 Fotografía de productos para redes sociales',
'📸 Fotografía de redes sociales',
'📷 Fotografía de retratos',
'📸 Fotografía de retratos para redes sociales',
'📸 Fotografía de Street Style',
'📸 Fotografía de vehículos para redes sociales',
'📸 Fotografía de viajes para redes sociales',
'⚛️ Física Cuántica',
'⚽ Fútbol',
'🏈 Fútbol americano',
'🎮 Gamer',
'🕹️ Gaming en streaming',
'🏊 Gimnasia acuática',
'🎤 Grabar covers de mis canciones favoritas',
'🎥 Grabar mis reacciones a las películas que veo',
'🎥 Grabar mis reacciones a los episodios de mi anime favorito',
'🎥 Grabar mis reacciones a los episodios de mis series favoritas',
'🎥 Grabar mis reacciones a videojuegos que juego',
'🎨 Graffiti en 3D',
'🤸‍♂️ Hacer acrobacias o gimnasia',
'🧶 Hacer amigurumis',
'🎨 Hacer arte colaborativo con otros artistas',
'🎨 Hacer arte con acuarelas.',
'🎨 Hacer arte con arena.',
'🎨 Hacer arte con elementos de la arquitectura.',
'🎨 Hacer arte con elementos de la cultura local',
'🎨 Hacer arte con elementos de la cultura popular.',
'🎨 Hacer arte con elementos de la danza',
'🎨 Hacer arte con elementos de la escultura.',
'🎨 Hacer arte con elementos de la fotografía.',
'🎨 Hacer arte con elementos de la historia.',
'🎨 Hacer arte con elementos de la literatura.',
'🎨 Hacer arte con elementos de la música.',
'🎨 Hacer arte con elementos de la naturaleza.',
'🎨 Hacer arte con elementos reciclados.',
'🎨 Hacer arte con flores secas.',
'🎨 Hacer arte con hilo y aguja.',
'🎨 Hacer arte con hilos de colores.',
'🎨 Hacer arte con materiales de desecho.',
'🎨 Hacer arte con materiales naturales.',
'🎨 Hacer arte con materiales reciclados.',
'🎨 Hacer arte con papel maché.',
'🎨 Hacer arte con piedras y conchas.',
'🎨 Hacer arte en la calle o graffiti.',
'🪴 Hacer bonsáis o cultivar orquídeas.',
'🧶 Hacer bufandas',
'🖌️ Hacer caligrafía o lettering.',
'🍹 Hacer cócteles y bebidas creativas',
'🚴‍♂️ Hacer ciclismo por la ciudad o en la naturaleza',
'🥘 Hacer conservas y encurtidos',
'🎤 Hacer doblaje de anime',
'🌌 Hacer fotografía nocturna.',
'🌌 Hacer fotografía nocturna y de astrofotografía',
'🌆 Hacer fotografía urbana y de arquitectura',
'🎨 Hacer grafitis',
'🧶 Hacer guantes de ganchillo',
'🎨 Hacer joyas',
'🧶 Hacer mantas de ganchillo',
'🧶 Hacer mantas de lana',
'🛠️ Hacer manualidades y proyectos de bricolaje',
'🚵 Hacer mountain bike.',
'🧶 Hacer muñecas de trapo',
'🎨 Hacer murales',
'🥨 Hacer pan o repostería.',
'🧶 Hacer peluches',
'🍰 Hacer repostería y decorar pasteles',
'🎥 Hacer reseñas de videojuegos en un canal de YouTube',
'🎨 Hacer scrapbooking.',
'🌿 Hacer senderismo en parques nacionales.',
'📷 Hacer sesiones de fotos a amigos y familiares',
'🎤 Hacer stand-up comedy.',
'📺 Hacer un análisis de personajes de series',
'📸 Hacer un álbum de fotos familiar.',
'🎥 Hacer un podcast sobre cine',
'🎤 Hacer un podcast sobre temas de interés.',
'📱 Hacer videos o podcasts sobre mis intereses.',
'🎨 Historia del Arte',
'🏒 Hockey',
'🏇 Hípica',
'✏️ Ilustración',
'🖌️ Ilustración digital',
'🎭 Improvisación teatral',
'🎭 Improvisación teatral en línea',
'🎭 Improvisación teatral para niños',
'📷 Instagram',
'🧠 Inteligencia Artificial',
'📚 Investigar la cultura japonesa relacionada con el anime',
'🕵️‍♀️ Investigar la vida y la carrera de mi artista favorito',
'🎤 Ir a conciertos',
'🤝 Ir a eventos donde puedo conectar con otros fans de anime',
'👟 Ir al gimnasio',
'🏋️‍♀️ Ir al gimnasio y hacer entrenamiento de fuerza',
'🛍️ Ir de compras',
'🌱 Jardinería',
'💍 Joyas Artesanales',
'🎮 Juegos clásicos',
'🎮 Juegos de acción',
'🎮 Juegos de antropología en línea',
'🎮 Juegos de arcade',
'🎮 Juegos de arqueología en línea',
'🎮 Juegos de arquitectura en línea',
'🎮 Juegos de arte en línea',
'🎮 Juegos de astronomía en línea',
'🎮 Juegos de aventura',
'🎮 Juegos de aventuras en línea',
'🎮 Juegos de baile en línea',
'🎮 Juegos de battle royale',
'🎮 Juegos de biología aplicada en línea',
'🎮 Juegos de biología en línea',
'🎮 Juegos de carreras',
'🚗 Juegos de carreras en línea',
'🃏 Juegos de cartas',
'🎮 Juegos de cartas en línea',
'🎮 Juegos de ciencia en línea',
'🎮 Juegos de ciencias de la computación en línea',
'🎮 Juegos de ciencias políticas en línea',
'🎮 Juegos de cocina en línea',
'🎮 Juegos de coctelería en línea',
'🎮 Juegos de consola',
'🎮 Juegos de construcción en línea',
'🎮 Juegos de decoración en línea',
'🎮 Juegos de deportes',
'🎮 Juegos de deportes en línea',
'🎮 Juegos de deportes extremos en línea',
'🎮 Juegos de derecho en línea',
'🕵️‍♂️ Juegos de detectives en línea',
'🎮 Juegos de diseño en línea',
'🎮 Juegos de drones en línea',
'🎮 Juegos de economía en línea',
'🎮 Juegos de enfermería en línea',
'🎮 Juegos de escape en vivo',
'🎮 Juegos de estadísticas en línea',
'🎮 Juegos de estrategia',
'🎮 Juegos de estrategia en línea',
'🎮 Juegos de exploración espacial en línea',
'🎮 Juegos de filosofía en línea',
'🎮 Juegos de física aplicada en línea',
'🎮 Juegos de física en línea',
'🎮 Juegos de historia del arte en línea',
'🎮 Juegos de historia en línea',
'🎮 Juegos de informática en línea',
'🎮 Juegos de ingeniería en línea',
'🎮 Juegos de inteligencia artificial en línea',
'🎮 Juegos de jardinería en línea',
'🎮 Juegos de lógica en línea',
'🎮 Juegos de literatura en línea',
'🎮 Juegos de maquillaje en línea',
'🎮 Juegos de matemáticas aplicadas en línea',
'🎮 Juegos de matemáticas en línea',
'🎮 Juegos de medicina en línea',
'🎲 Juegos de mesa',
'🎮 Juegos de mesa digitales',
'🎲 Juegos de mesa en línea',
'🎮 Juegos de mesa modernos',
'🎮 Juegos de mesa modernos en línea',
'🎮 Juegos de moda en línea',
'🎮 Juegos de música en línea',
'🎮 Juegos de odontología en línea',
'🎮 Juegos de pelea',
'🎮 Juegos de peluquería en línea',
'🎮 Juegos de política en línea',
'🎮 Juegos de psicología en línea',
'🎮 Juegos de química aplicada en línea',
'🎮 Juegos de química en línea',
'🎮 Juegos de realidad aumentada en línea',
'🎮 Juegos de realidad virtual en línea',
'🎮 Juegos de repostería en línea',
'🎮 Juegos de robótica en línea',
'🎮 Juegos de rol',
'🧙 Juegos de Rol de Magia',
'🧙‍♂️ Juegos de rol en línea',
'🏰 Juegos de rol en vivo',
'🎮 Juegos de rol en vivo en línea',
'🎮 Juegos de rompecabezas en línea',
'🎮 Juegos de simulación',
'🎮 Juegos de simulación en línea',
'🎮 Juegos de sociología en línea',
'🎮 Juegos de tecnología ambiental en línea',
'🎮 Juegos de tecnología de alimentos en línea',
'🎮 Juegos de tecnología de la información en línea',
'🎮 Juegos de tecnología de materiales en línea',
'🎮 Juegos de tecnología en línea',
'🎮 Juegos de tecnología energética en línea',
'🎮 Juegos de terror en línea',
'🎮 Juegos de vehículos autónomos en línea',
'🎮 Juegos de veterinaria en línea',
'🎮 Juegos de viajes en línea',
'🎮 Juegos en línea',
'🎮 Juegos VR/AR',
'🧩 Jugar a juegos de cartas.',
'🧩 Jugar a juegos de escape.',
'🧙‍♂️ Jugar a juegos de rol.',
'⚽ Jugar al fútbol con amigos',
'🏌️ Jugar al golf en un campo cercano',
'🎮 Jugar en A Short Hike',
'🎮 Jugar en A Way Out',
'👽 Jugar en Among Us',
'👨‍👩‍👧‍👦 Jugar en Animal Crossing: New Horizons',
'🏹 Jugar en Apex Legends',
'🎮 Jugar en Apex Legends Mobile',
'🎮 Jugar en ARK: Survival Evolved',
"⚔️ Jugar en Assassin's Creed",
"🧙‍♂️ Jugar en Baldur's Gate 3",
'🔫 Jugar en Battlefield',
'🎮 Jugar en BlazBlue: Cross Tag Battle',
'🎮 Jugar en Bloodborne',
'💥 Jugar en Borderlands',
'🎮 Jugar en Brawl Stars',
'🔫 Jugar en Call of Duty',
'🎮 Jugar en Call of Duty: Warzone',
'🧩 Jugar en Candy Crush Saga',
'🎮 Jugar en Celeste',
'👑 Jugar en Clash of Clans',
'🎮 Jugar en Clash Royale',
'🎮 Jugar en Control',
'🔫 Jugar en Counter-Strike',
'🎮 Jugar en Counter-Strike: Global Offensive',
'🎮 Jugar en Cuphead',
'🤖 Jugar en Cyberpunk 2077',
'🛡️ Jugar en Dark Souls',
'🎮 Jugar en Dark Souls III',
'🧙‍♂️ Jugar en Darkest Dungeon',
'👻 Jugar en Dead by Daylight',
'🎮 Jugar en Dead Cells',
'🚀 Jugar en Destiny 2',
'🎮 Jugar en Destiny: The Taken King',
'🎮 Jugar en Dirt 5',
'🧙‍♀️ Jugar en Divinity: Original Sin',
'🧙‍♂️ Jugar en Divinity: Original Sin 2',
"🎮 Jugar en Don't Starve Together",
'🎮 Jugar en Dota 2',
'🐉 Jugar en Dragon Age',
'🎮 Jugar en Dragon Ball FighterZ',
'🎲 Jugar en Dungeons & Dragons',
'🎮 Jugar en Escape from Tarkov',
'🎮 Jugar en F1 2021',
'👾 Jugar en Fall Guys',
'🏹 Jugar en Far Cry',
'🔫 Jugar en Far Cry 6',
'🎮 Jugar en Fe',
'⚽ Jugar en FIFA',
'🧙‍♂️ Jugar en Final Fantasy',
'🎮 Jugar en Final Fantasy VII Remake',
'🎮 Jugar en Fire Emblem: Three Houses',
'🎮 Jugar en Firewatch',
'⚔️ Jugar en For Honor',
'👾 Jugar en Fortnite',
'🏎️ Jugar en Forza Horizon',
'🎮 Jugar en Forza Horizon 4',
'🏎️ Jugar en Forza Motorsport',
'🔥 Jugar en Free Fire',
'🧙‍♀️ Jugar en Genshin Impact',
'⚔️ Jugar en Ghost of Tsushima',
'🎮 Jugar en Gone Home',
'🏎️ Jugar en Gran Turismo',
'🎮 Jugar en Gran Turismo 7',
'🎮 Jugar en Grand Theft Auto V',
'🎮 Jugar en Grounded',
'🎮 Jugar en Guilty Gear -Strive-',
'🎮 Jugar en Hades',
'🃏 Jugar en Hearthstone',
'🎮 Jugar en Hearthstone Battlegrounds',
'🧙‍♀️ Jugar en Hollow Knight',
'🧙‍♀️ Jugar en Hollow Knight: Silksong',
'🎮 Jugar en Hunt: Showdown',
'🦸‍♂️ Jugar en Injustice',
'🎮 Jugar en Injustice 2',
'🎮 Jugar en Inside',
'🎮 Jugar en It Takes Two',
'🎮 Jugar en Journey',
'👨‍🚀 Jugar en Kerbal Space Program',
'⚔️ Jugar en League of Legends',
'🧟‍♂️ Jugar en Left 4 Dead',
'🎮 Jugar en Limbo',
'🎮 Jugar en Little Nightmares',
'🎮 Jugar en Mario Kart 8 Deluxe',
"🦸‍♂️ Jugar en Marvel's Avengers",
'🌍 Jugar en Minecraft',
'🦁 Jugar en Monster Hunter',
'⚔️ Jugar en Monster Hunter Rise',
'🎮 Jugar en Monster Hunter Stories',
'🦁 Jugar en Monster Hunter: World',
'🎮 Jugar en Mortal Kombat 11',
'⚔️ Jugar en Nioh',
'🎮 Jugar en Nioh 2',
"👨‍🚀 Jugar en No Man's Sky",
'🎮 Jugar en Ori and the Blind Forest',
'🎮 Jugar en Ori and the Will of the Wisps',
'🎮 Jugar en Outer Wilds',
'🎮 Jugar en Overcooked! 2',
'🦸‍♀️ Jugar en Overwatch',
'🎮 Jugar en Paladins',
'🧙‍♂️ Jugar en Path of Exile',
'🎮 Jugar en Persona 5',
'👽 Jugar en Phasmophobia',
'🧩 Jugar en Portal',
'🎮 Jugar en Psychonauts 2',
'🏆 Jugar en PUBG Mobile',
'🎮 Jugar en Raft',
'🎮 Jugar en Rainbow Six Siege',
'🎮 Jugar en Ratchet & Clank: Rift Apart',
'🎮 Jugar en Red Dead Redemption 2',
'🧟 Jugar en Resident Evil',
'🎮 Jugar en Resident Evil Village',
'🎮 Jugar en Returnal',
'🎮 Jugar en Roblox',
'🚀 Jugar en Rocket League',
'🎮 Jugar en Rust',
'🚢 Jugar en Sea of Thieves',
'⚔️ Jugar en Sekiro: Shadows Die Twice',
'🎮 Jugar en Slay the Spire',
'🎮 Jugar en Soulcalibur VI',
'🎮 Jugar en Spiritfarer',
'👾 Jugar en Splatoon',
'🚀 Jugar en Star Wars: Squadrons',
'🐾 Jugar en Stardew Valley',
'👾 Jugar en Street Fighter',
'🎮 Jugar en Street Fighter V',
'🎮 Jugar en Streets of Rage 4',
'🎮 Jugar en Subnautica',
'🎮 Jugar en Subnautica: Below Zero',
'👾 Jugar en Super Smash Bros.',
'🎮 Jugar en Super Smash Bros. Ultimate',
'🎲 Jugar en Tabletop Simulator',
'🎮 Jugar en Team Fortress 2',
'🎮 Jugar en Tekken 7',
'🧩 Jugar en Tetris',
'🏰 Jugar en The Elder Scrolls V: Skyrim',
'🎮 Jugar en The Forest',
'🎮 Jugar en The Last Guardian',
'🏹 Jugar en The Last of Us Part II',
'🏹 Jugar en The Legend of Zelda',
'🏹 Jugar en The Legend of Zelda: Breath of the Wild',
'🎮 Jugar en The Outer Worlds',
'🎮 Jugar en The Stanley Parable',
'🎮 Jugar en The Talos Principle',
'🏹 Jugar en The Witcher 3: Wild Hunt',
'🎮 Jugar en The Witness',
'🎮 Jugar en Trackmania',
'⚽ Jugar en un equipo de fútbol o simplemente con amigos.',
'🎮 Jugar en Unravel',
'🎮 Jugar en Valheim',
'🕵️‍♂️ Jugar en Valorant',
'🎮 Jugar en Warframe',
'🎮 Jugar en What Remains of Edith Finch',
'🧙‍♂️ Jugar en World of Warcraft',
'🎲 Jugar juegos de mesa basados en anime',
'🧩 Jugar juegos de mesa con amigos o familia.',
'🎮 Jugar videojuegos retro y compartir mis experiencias',
'🎮 Jugar videojuegos solo o en línea con amigos.',
'🎤 Karaoke',
'🎤 Karaoke en Casa',
'🎤 Karaoke en línea',
'🎤 Karaoke en un Bar Local',
'🚣 Kayak',
'🚣 Kayak de Aguas Bravas',
'🚣 Kayak en Aguas de Mar Abierto',
'🏄 Kitesurf',
'🎯 Lanzamiento de Hachas',
'🏰 LARP (Rol en vivo)',
'📖 Leer',
'📖 Leer biografías de personas inspiradoras.',
'📚 Leer libros de cocina y probar nuevas recetas',
'📚 Leer libros de diferentes géneros y autores',
'📚 Leer libros sobre desarrollo de videojuegos',
'📚 Leer novelas ligeras (light novels)',
'🏋️ Levantamiento de pesas',
'🏋️ Levantamiento de Pesas Olímpico',
'🔤 Lingüística',
'🎙️ Locución',
'👟 Lucha libre',
'🤹 Malabares',
'🤹 Malabares de Fuego',
'💅 Manicura y Pedicura',
'🏋️ Mantenerme en forma en el gimnasio o en casa.',
'💄 Maquillaje artístico',
'🎭 Maquillaje de efectos especiales',
'📚 Maratón de Lectura de Libros Clásicos',
'🎭 Marionetas',
'🌿 Medicina Alternativa',
'💭 Meditación',
'🏃 Mejorar mi salud corriendo al aire libre o en la cinta.',
'😆 Memes',
'🎭 Mimo',
'🍹 Mixólogo de Cócteles Locos',
'🍹 Mixología',
'🖥️ Modelado 3D',
'🦄 Montar a Caballo de Fantasía',
'🏇 Montar a caballo y aprender sobre equitación.',
'🏍️ Motocross en el Barro',
'🎻 Música clásica',
'🎵 Música electrónica',
'🎻 Música folk',
'🏊 Nadar en la piscina o en el mar',
'🎤 Narración de historias',
'🎤 Narración oral',
'🚤 Navegación',
'🛥️ Navegar',
'🛶 Navegar en canoa.',
'🦅 Observación de Aves',
'🦆 Observación de Aves Acuáticas',
'✨ Observación de estrellas',
'🌕 Observación de la luna',
'☁ Observación de las nubes',
'🔭 Observar estrellas y aprender sobre astronomía.',
'🎤 Open mic en línea',
'🍽️ Organizar cenas temáticas con amigos',
'🎉 Organizar eventos de cosplay de videojuegos con amigos',
'🎉 Organizar eventos de visualización de episodios con amigos',
'🎉 Organizar fiestas con mis amigos para escuchar música de mi artista favorito',
'🎉 Organizar maratones de películas con amigos',
'🎉 Organizar noches de juegos con amigos',
'🎲 Organizar Noches de Juegos de Mesa',
'🎮 Organizar Torneos de Juegos de Cartas Coleccionables',
'🃏 Organizar un torneo de juegos de cartas coleccionables de anime',
'📄 Origami',
'🎨 Origami 3D',
'🏄 Paddleboarding',
'🛫 Paracaidismo',
'🏃 Parkour',
'🎢 Parques de atracciones',
'🧚 Participación en Reinos de Rol en Vivo (LARP)',
'👩‍🍳 Participar en clases de cocina',
'🤝 Participar en clubes de lectura',
'🧚 Participar en Competencias de Cometas Gigantes',
'🧗‍♀️ Participar en competiciones de escalada.',
'🏆 Participar en competiciones deportivas locales',
'🏆 Participar en concursos de escritura',
'📸 Participar en concursos de fotografía',
'🎤 Participar en concursos de talentos.',
'🎨 Participar en exposiciones de arte locales',
'🎥 Participar en festivales de cine y disfrutar de las proyecciones',
'🤝 Participar en foros y comunidades en línea sobre mis series favoritas',
'🎤 Participar en grupos de improvisación.',
'🎤 Participar en karaoke con las canciones de mi artista favorito',
'🎭 Participar en obras de teatro de anime',
'🎭 Participar en obras de teatro o improvisación.',
'🎭 Participar en talleres de actuación',
'🎭 Participar en talleres de actuación relacionados con series',
'🖌️ Participar en talleres de arte comunitarios',
'🎳 Participar en Torneos de Bolos',
'🎮 Participar en Torneos de eSports',
'🎮 Participar en torneos de videojuegos y competir con otros jugadores',
'📚 Participar en un club de escritura.',
'🎤 Participar en un coro comunitario.',
'🇯🇵 Participar en un festival cultural japonés',
'🏕️ Pasar la noche en la naturaleza con amigos o familia.',
'🛹 Patinaje',
'🛴 Patinaje en línea',
'💇 Peluquería',
'🎼 Ópera',
'🎣 Pesca',
'🎣 Pesca con mosca',
'🎣 Pesca de Competición',
'🎣 Pesca deportiva',
'🎣 Pesca en alta mar',
'🎣 Pescar en ríos o lagos.',
'🎨 Pintar escenarios de anime',
'🎨 Pintar o dibujar en mi tiempo libre',
'🎨 Pintura',
'🎨 Pintura abstracta',
'🎨 Pintura acrílica',
'🎨 Pintura al óleo',
'🎨 Pintura con esponjas',
'🎨 Pintura con los dedos',
'🎨 Pintura con pinceles chinos',
'🎨 Pintura Corporal',
'🎨 Pintura digital',
'🎨 Pintura en acuarela',
'🎨 Pintura en gouache',
'🎨 Pintura en la Oscuridad con Pintura Fluorescente',
'🎨 Pintura en Lienzos Gigantes',
'🎨 Pintura en Spray de Grafitis',
'🎨 Pintura en tempera',
'🎨 Pirograbado',
'🎉 Planificar fiestas o reuniones con amigos.',
'📅 Planificar viajes y aventuras.',
'🎧 Podcasting',
'🎙️ Podcasts',
'🎤 Podcasts de comedia',
'📝 Poesía',
'🏀 Practicar baloncesto en la cancha local',
'🚣 Practicar kayak o canotaje.',
'🏄 Practicar paddle surf.',
'🏄‍♀️ Practicar surf o paddleboarding',
'🧘 Practicar yoga o pilates.',
'🧘‍♀️ Practicar yoga para relajarme',
'🥗 Preparar comidas saludables y equilibradas',
'🎤 Presentación de radio',
'🎤 Presentaciones de poesía en línea',
'🎤 Presentaciones de stand-up',
'🎤 Presentaciones en vivo',
'🎨 Probar el arte de la cerámica.',
'🎨 Probar el arte de la escultura.',
'🎨 Probar el arte de la fotografía de retrato.',
'🎨 Probar el arte de la pintura en cartón.',
'🎨 Probar el arte de la pintura en cerámica.',
'🎨 Probar el arte de la pintura en cuero.',
'🎨 Probar el arte de la pintura en lienzo.',
'🎨 Probar el arte de la pintura en madera.',
'🎨 Probar el arte de la pintura en metal.',
'🎨 Probar el arte de la pintura en papel.',
'🎨 Probar el arte de la pintura en tela.',
'🎨 Probar el arte de la pintura en vidrio.',
'🎨 Probar el arte digital.',
'🍺 Probar la elaboración de cerveza artesanal.',
'🖌️ Probar técnicas de acuarela.',
'🍳 Probar técnicas de cocina como sous-vide',
'🎨 Probar técnicas de pintura al óleo.',
'🎥 Producción de cortometrajes',
'🎥 Producción de documentales',
'🎵 Producción de música electrónica',
'🎬 Producción de videos',
'📽️ Producción de videos cortos',
'🔍 Profundizar en temas que me interesen.',
'💻 Programación',
'💻 Programación de software',
'🎮 Programar videojuegos',
'🧠 Psicología',
'🧪 Química Orgánica',
'🚣 Rafting',
'🎤 Rap',
'🎨 Realidad aumentada en arte',
'🕹️ Realidad virtual',
'🎥 Realización de Documentales de Naturaleza',
'🎬 Realizar análisis de películas en un blog',
'🎥 Realizar Cortometrajes',
'🧪 Realizar experimentos de química en casa.',
'🧬 Realizar experimentos y aprender sobre el mundo.',
'🎥 Realizar Parodias de Películas',
'🎥 Realizar Parodias de Videos Musicales',
'🏊 Relajarme o entrenar en la piscina.',
'🚣 Remo',
'🌸 Reproducción de Orquídeas',
'🦊 Rescate de Animales',
'🧩 Resolver Cubos de Rubik',
'🧩 Resolver rompecabezas y acertijos.',
'🎨 Restauración de arte',
'🔨 Restauración de Muebles',
'🤖 Robótica',
'🎷 Saxofón',
'👉 Seg uir el canal de Smosh',
'👉 Seguir el canal de 5-Minute Crafts',
'👉 Seguir el canal de AuronPlay',
'👉 Seguir el canal de BuzzFeedVideo',
'👉 Seguir el canal de Cocomelon - Nursery Rhymes',
'👉 Seguir el canal de David Dobrik',
'👉 Seguir el canal de Drew Binsky',
'👉 Seguir el canal de ElrubiusOMG',
'👉 Seguir el canal de Emma Chamberlain',
'👉 Seguir el canal de Epic Rap Battles of History',
'👉 Seguir el canal de FaZe Rug',
'👉 Seguir el canal de Good Mythical Morning',
'👉 Seguir el canal de H3H3 Productions',
'👉 Seguir el canal de Jaiden Animations',
'👉 Seguir el canal de Jake Paul',
'👉 Seguir el canal de Jenna Marbles',
'👉 Seguir el canal de JuegaGerman',
'👉 Seguir el canal de KSI',
'👉 Seguir el canal de Liza Koshy',
'👉 Seguir el canal de Mark Rober',
'👉 Seguir el canal de Marques Brownlee',
'👉 Seguir el canal de Michelle Phan',
'👉 Seguir el canal de MKBHD',
'👉 Seguir el canal de MrBeast',
'👉 Seguir el canal de NikkieTutorials',
'👉 Seguir el canal de Philip DeFranco',
'👉 Seguir el canal de Safiya Nygaard',
"👉 Seguir el canal de Sarah's Day",
'👉 Seguir el canal de Screen Junkies',
'👉 Seguir el canal de Sidemen',
'👉 Seguir el canal de Simply Nailogical',
'👉 Seguir el canal de Smosh',
'👉 Seguir el canal de Tati Westbrook',
'👉 Seguir el canal de The Fitness Marshall',
'👉 Seguir el canal de The Game Theorists',
'👉 Seguir el canal de The Slow Mo Guys',
'👉 Seguir el canal de Unbox Therapy',
'👉 Seguir el canal de vanossgaming',
'👉 Seguir el canal de Zoella',
'🚀 Simulación de vuelo en línea',
'🛹 Skateboard de Downhill Extremo',
'🛹 Skateboard en Parques Especializados',
'🛹 Skateboarding',
'🏂 Snowboard',
'🚨 Soy activista contra la violencia de género.',
'🌍 Soy activista de los derechos humanos.',
'📢 Soy activista en campañas de salud pública.',
'📲 Soy activista en el uso responsable de la tecnología.',
'🌍 Soy activista en la lucha contra el cambio climático.',
'🚨 Soy activista en la lucha contra el racismo.',
'🍃 Soy activista en la lucha contra la contaminación.',
'🚨 Soy activista en la lucha contra la explotación laboral.',
'🚨 Soy activista en la lucha contra la violencia estructural.',
'🚨 Soy activista en la lucha contra la violencia hacia personas LGBTQ+.',
'🌍 Soy activista en la lucha por los derechos de los refugiados LGBTQ+.',
'🌱 Soy activista en la promoción de la agricultura sostenible.',
'🌱 Soy activista en la promoción de la agricultura urbana.',
'🌱 Soy activista en la promoción de la salud ambiental.',
'🌿 Soy activista en la promoción de la salud pública.',
'🌊 Soy activista en la protección de los derechos de los océanos.',
'🌊 Soy activista en la protección de océanos y mares.',
'💻 Soy activista en redes sociales promoviendo los derechos LGBTQ+.',
'💧 Soy activista por el acceso al agua potable.',
'🧑‍🤝‍🧑 Soy activista por la inclusión de personas mayores.',
'🌱 Soy activista por la sostenibilidad y el medio ambiente.',
'🧑‍🤝‍🧑 Soy activista por los derechos de la comunidad LGBTQ+.',
'🏳️‍🌈 Soy activista por los derechos de las personas LGBTQ+.',
'🛡️ Soy activista por los derechos de las personas mayores.',
'🛡️ Soy activista por los derechos de los jóvenes.',
'🛡️ Soy activista por los derechos de los niños.',
'🛡️ Soy activista por los derechos de los trabajadores.',
'🌈 Soy activista que lucha contra la discriminación en el ámbito educativo.',
'🌈 Soy activista que lucha por la igualdad en el matrimonio.',
'🎤 Soy activista que utiliza el teatro para crear conciencia.',
'🎤 Soy activista que utiliza la música para crear conciencia.',
'🎭 Soy actor en obras que abordan la experiencia LGBTQ+.',
'🎭 Soy actor que participa en obras sobre derechos humanos.',
'🎭 Soy actor que participa en obras sobre justicia social.',
'🖌️ Soy artista que crea murales sobre la comunidad LGBTQ+.',
'🎨 Soy artista que crea obras sobre la paz.',
'🎨 Soy artista que participa en exposiciones sobre temas LGBTQ+.',
'🎨 Soy artista que utiliza el arte para empoderar comunidades.',
'🎨 Soy artista que utiliza el arte para sanar comunidades.',
'🎨 Soy artista que utiliza su trabajo para crear conciencia social.',
'🎨 Soy artista que utiliza su trabajo para inspirar cambios sociales.',
'🎨 Soy artista que utiliza su trabajo para promover la paz.',
'🎨 Soy artista que utiliza su trabajo para visibilizar temas LGBTQ+.',
'🖌️ Soy artista visual que crea obras sobre la diversidad sexual.',
'📖 Soy autor de libros que celebran la diversidad sexual.',
'💻 Soy blogger que escribe sobre experiencias LGBTQ+.',
'🎬 Soy cineasta que produce contenido sobre la vida LGBTQ+.',
'🖥️ Soy creador de contenido digital que aborda temas LGBTQ+.',
'🚀 Soy defensor de la ciencia y la educación STEM.',
'🤝 Soy defensor de la cooperación internacional.',
'🌈 Soy defensor de la diversidad cultural.',
'🧑‍🤝‍🧑 Soy defensor de la diversidad e inclusión en el lugar de trabajo.',
'🧑‍🤝‍🧑 Soy defensor de la diversidad en el lugar de trabajo.',
'🧑‍🤝‍🧑 Soy defensor de la diversidad en la representación mediática.',
'📢 Soy defensor de la igualdad de derechos para la comunidad LGBTQ+.',
'🤝 Soy defensor de la igualdad de género.',
'🌈 Soy defensor de la igualdad en el acceso a la educación.',
'🧑‍🤝‍🧑 Soy defensor de la inclusión de personas con discapacidad.',
'🧑‍🤝‍🧑 Soy defensor de la inclusión de personas de diferentes orígenes.',
'🧑‍🤝‍🧑 Soy defensor de la inclusión de personas LGBTQ+ en el ámbito laboral.',
'🌎 Soy defensor de la justicia climática.',
'🌍 Soy defensor de la justicia intergeneracional.',
'🔊 Soy defensor de la libertad de expresión.',
'📢 Soy defensor de la libertad de prensa.',
'🔊 Soy defensor de la libertad de religión y creencias.',
'🚴‍♂️ Soy defensor de la movilidad sostenible en las ciudades.',
'🕊️ Soy defensor de la paz y la resolución de conflictos.',
'📢 Soy defensor de la protección legal para personas LGBTQ+.',
'🧘‍♀️ Soy defensor de la salud mental en la comunidad LGBTQ+.',
'👩‍⚕️ Soy defensor de la salud mental y el bienestar emocional.',
'🏳️‍⚧️ Soy defensor de la salud y los derechos reproductivos para personas trans.',
'🧑‍🤝‍🧑 Soy defensor de los derechos de las minorías.',
'📢 Soy defensor de los derechos de las mujeres en el trabajo.',
'📢 Soy defensor de los derechos de las personas con enfermedades mentales.',
'🏳️‍⚧️ Soy defensor de los derechos de las personas trans.',
'🛡️ Soy defensor de los derechos de los refugiados.',
'📢 Soy defensor de políticas inclusivas en mi comunidad.',
'⚖️ Soy defensor del acceso a la justicia.',
'🧘 Soy defensor del autocuidado y la salud mental.',
'🐾 Soy defensor del bienestar animal.',
'🧘 Soy defensor del bienestar emocional y la salud mental.',
'🧘‍♀️ Soy defensor del bienestar y la autoaceptación en la comunidad LGBTQ+.',
'🎨 Soy diseñador que crea moda inclusiva.',
'📸 Soy documentador de la historia LGBTQ+ a través de la fotografía.',
'📚 Soy educador en derechos de la infancia.',
'🎓 Soy educador en derechos humanos.',
'👩‍🏫 Soy educador en escuelas sobre diversidad y aceptación.',
'📚 Soy educador en temas de derechos de los pueblos indígenas.',
'📚 Soy educador en temas de derechos humanos.',
'📚 Soy educador en temas de igualdad de oportunidades.',
'🧑‍🏫 Soy educador en temas de justicia ambiental.',
'🧑‍🏫 Soy educador en temas de sostenibilidad.',
'📚 Soy educador sobre historia y derechos LGBTQ+.',
'📚 Soy educador sobre la importancia de la inclusión en las escuelas.',
'📖 Soy escritor de cuentos que abordan la igualdad.',
'📖 Soy escritor de ficción y no ficción sobre temas LGBTQ+.',
'📖 Soy escritor de poesía que celebra la diversidad sexual.',
'📖 Soy escritor que aborda temas de equidad y justicia.',
'📖 Soy escritor que aborda temas de justicia económica.',
'📖 Soy escritor que aborda temas de justicia social.',
'💬 Soy facilitador de grupos de discusión sobre identidad y aceptación.',
'💬 Soy facilitador de talleres sobre identidad de género y sexualidad.',
'📸 Soy fotógrafo que captura la esencia de la cultura LGBTQ+.',
'📸 Soy fotógrafo que captura la lucha por los derechos humanos.',
'📸 Soy fotógrafo que documenta la lucha por la igualdad.',
'📸 Soy fotógrafo que documenta la vida de comunidades marginadas.',
'📸 Soy fotógrafo que documenta la vida de comunidades vulnerables.',
'📸 Soy fotógrafo que documenta la vida de la comunidad LGBTQ+.',
'📸 Soy fotógrafo que documenta problemas sociales.',
'🔍 Soy investigador en temas de derechos humanos.',
'🔍 Soy investigador en temas de justicia social.',
'🧑‍🏫 Soy mentor de jóvenes en habilidades para la vida.',
'🧑‍🏫 Soy mentor de jóvenes en temas de liderazgo.',
'📚 Soy mentor de jóvenes LGBTQ+ en su camino hacia la autoaceptación.',
'👩‍🎓 Soy mentor para jóvenes en riesgo.',
'🏞️ Soy miembro de grupos de conservación de espacios naturales.',
'🏳️‍🌈 Soy miembro de un grupo de apoyo para personas LGBTQ+.',
'📢 Soy miembro de un grupo de defensa de los derechos civiles.',
'🌿 Soy miembro de un grupo de reforestación.',
'🏳️‍🌈 Soy miembro de un grupo que apoya a familias LGBTQ+.',
'🌍 Soy miembro de un grupo que lucha contra la pobreza.',
'🌍 Soy miembro de un grupo que promueve la diversidad y la inclusión.',
'🌍 Soy miembro de un grupo que promueve la justicia social.',
'🌍 Soy miembro de un grupo que promueve la justicia social y ambiental.',
'🌍 Soy miembro de un grupo que promueve la justicia social y económica.',
'🌍 Soy miembro de un grupo que promueve la paz mundial.',
'🌍 Soy miembro de un grupo que promueve la paz y la reconciliación.',
'🎶 Soy músico que apoya causas LGBTQ+ a través de conciertos benéficos.',
'🎶 Soy músico que compone canciones sobre la experiencia LGBTQ+.',
'🎤 Soy orador en conferencias sobre derechos de las mujeres.',
'🎤 Soy orador en conferencias sobre derechos humanos.',
'🎤 Soy orador en conferencias sobre derechos LGBTQ+.',
'🎤 Soy orador en conferencias sobre justicia social.',
'🎤 Soy orador en eventos de sensibilización sobre la comunidad LGBTQ+.',
'🎤 Soy orador en eventos sobre derechos de los niños.',
'🎤 Soy orador en eventos sobre justicia social.',
'🎉 Soy organizador de campañas de sensibilización.',
'🎉 Soy organizador de encuentros de networking para profesionales LGBTQ+.',
'📅 Soy organizador de encuentros y espacios seguros para personas LGBTQ+.',
'🎉 Soy organizador de eventos del Orgullo LGBTQ+.',
'🎉 Soy organizador de eventos para fomentar la diversidad cultural.',
'🎉 Soy organizador de eventos para la comunidad.',
'🎉 Soy organizador de eventos para la inclusión y diversidad.',
'🎉 Soy organizador de eventos para la promoción de la paz.',
'🎉 Soy organizador de fiestas y eventos para la comunidad LGBTQ+.',
'📅 Soy organizador de talleres sobre salud sexual para la comunidad LGBTQ+.',
'🎤 Soy participante en marchas y manifestaciones por los derechos LGBTQ+.',
'🎤 Soy participante en paneles de discusión sobre temas LGBTQ+.',
'📚 Soy promotor de la alfabetización en comunidades desfavorecidas.',
'🍽️ Soy promotor de la alimentación saludable y sostenible.',
'🌿 Soy promotor de la conservación de la biodiversidad.',
'🌈 Soy promotor de la diversidad en el ámbito deportivo.',
'📚 Soy promotor de la educación en derechos humanos.',
'📚 Soy promotor de la educación inclusiva.',
'🧑‍🤝‍🧑 Soy promotor de la inclusión de personas con discapacidad en el deporte.',
'🤝 Soy promotor de la inclusión social.',
'📢 Soy promotor de la justicia económica.',
'📚 Soy promotor de la lectura en comunidades desfavorecidas.',
'📚 Soy promotor de la literatura LGBTQ+ en bibliotecas y escuelas.',
'🚴‍♀️ Soy promotor de la movilidad activa y saludable.',
'🚴‍♀️ Soy promotor de la movilidad en bicicleta.',
'🧘‍♀️ Soy promotor de la paz y la resolución de conflictos.',
'🌈 Soy promotor de la salud mental y emocional en la comunidad LGBTQ+.',
'🌸 Soy promotor de la salud reproductiva.',
'🛍️ Soy promotor de negocios y productos LGBTQ+.',
'🍽️ Soy promotor de restaurantes y negocios LGBTQ+.',
'🧘‍♀️ Soy promotor del bienestar integral y la meditación.',
'🛍️ Soy promotor del comercio justo.',
'🚴‍♂️ Soy promotor del transporte sostenible y la movilidad urbana.',
'📦 Soy voluntario en campañas de ayuda humanitaria.',
'🤲 Soy voluntario en comedores comunitarios.',
'💚 Soy voluntario en organizaciones de conservación de la naturaleza.',
'🤝 Soy voluntario en organizaciones que apoyan a jóvenes LGBTQ+.',
'📦 Soy voluntario en programas de ayuda a inmigrantes.',
'📦 Soy voluntario en refugios para personas sin hogar.',
'🎮 Speedcubing',
'🎮 Speedrunning en videojuegos',
'🎤 Stand-up comedy en línea',
'🎤 Stand-Up Comedy en Micrófono Abierto',
'🎥 Streaming de video en vivo',
'🎮 Streaming de Videojuegos en Vivo',
'📚 Sumergirme en libros de diferentes géneros.',
'🏄 Surf',
'🏄 Surf Nocturno con Luces LED',
'🎨 Tatuajes',
'🦴 Taxidermia',
'🎭 Teatro',
'🎭 Teatro clásico',
'🎭 Teatro de calle',
'🎭 Teatro de improvisación musical',
'🎭 Teatro de marionetas',
'🎭 Teatro de sombras',
'🎭 Teatro de títeres con sombras',
'🎭 Teatro en el agua',
'🎭 Teatro en lenguaje de señas',
'🎭 Teatro en línea',
'🎭 Teatro experimental',
'🎭 Teatro improvisado',
'🎭 Teatro para bebés',
'🧶 Tejer',
'🧶 Tejer amigurumis',
'🧶 Tejer o hacer crochet.',
'🎾 Tenis',
'🏓 Tenis de mesa',
'🕺 TikTok',
'🏹 Tiro al blanco',
'🏹 Tiro con arco',
'🏹 Tiro con arco en bicicleta',
'🏹 Tiro con arco en globo',
'🏹 Tiro con arco en trineo',
'🏹 Tiro con Arco Recreativo',
'🏹 Tiro con ballesta',
'🎹 Tocar el piano',
'🎹 Tocar el Piano en una Banda de Jazz',
'🎷 Tocar el saxofón',
'🥁 Tocar el tambor',
'🪘 Tocar el tamboril',
'🎻 Tocar el violín',
'🎻 Tocar el violín y explorar la música clásica.',
'🎸 Tocar en una Banda de Garaje',
'🎸 Tocar Guitarra en una Banda de Rock',
'🎶 Tocar Instrumentos Musicales Inusuales',
'🥁 Tocar la batería o formar parte de una banda.',
'🎸 Tocar la guitarra',
'🎺 Tocar la trompeta',
'🎺 Tocar la trompeta en una banda.',
'🎻 Tocar Música Clásica en un Conjunto',
'🎶 Tocar un instrumento o cantar en un coro.',
'🎻 Tocar Violín en una Orquesta Sinfónica',
'🎵 Toco un instrumento',
'🎮 Torneos de eSports',
'🎮 Torneos de videojuegos',
'📸 Tratar de conseguir fotos o autógrafos de mi artista favorito',
'🎺 Trombón',
'🐦 Twitter',
'🤝 Unirme a grupos de arte en mi comunidad',
'🤝 Unirme a un club de cine para discutir películas',
'🎤 Unirme a un coro o grupo musical para cantar las canciones de mi artista favorito',
'🤼‍♂️ Unirme a un equipo de deportes en mi comunidad',
'🤝 Unirme a un grupo de discusión sobre series',
'🤝 Unirme a un grupo de fans de mi artista favorito',
'🤝 Unirme a una comunidad online de jugadores',
'👉 Ver a Casey Neistat',
'👉 Ver a Drew Gooden',
'👉 Ver a DrossRotzank',
'👉 Ver a Germán Garmendia',
'👉 Ver a iJustine',
'👉 Ver a James Charles',
'👉 Ver a Jeffree Star',
'👉 Ver a Jenna Marbles',
'👉 Ver a JuegaGerman',
'👉 Ver a KSI',
'👉 Ver a Kwebbelkop',
'👉 Ver a Logan Paul',
'👉 Ver a Markiplier',
'👉 Ver a Nigahiga',
'👉 Ver a Rosanna Pansino',
"👉 Ver a Ryan's World",
'👉 Ver a Shane Dawson',
'👉 Ver a Simply Nailogical',
'👉 Ver a The Try Guys',
'👉 Ver a TheOdd1sOut',
'👉 Ver el canal de CinemaSins',
'👉 Ver el canal de David Dobrik',
'👉 Ver el canal de Dude Perfect',
'👉 Ver el canal de Good Mythical Morning',
'👉 Ver el canal de How Ridiculous',
'👉 Ver el canal de Kurtis Conner',
'👉 Ver el canal de Lilly Singh',
'👉 Ver el canal de Linus Tech Tips',
'👉 Ver el canal de Logan Paul',
'👉 Ver el canal de NigaHiga',
'👉 Ver el canal de NikkieTutorials',
'👉 Ver el canal de PewDiePie',
'👉 Ver el canal de Rhett & Link',
'👉 Ver el canal de Rosanna Pansino',
'👉 Ver el canal de Tati Westbrook',
'👉 Ver el canal de The ACE Family',
'👉 Ver el canal de The Try Guys',
'👉 Ver el canal de Troom Troom',
'👉 Ver el canal de T-Series',
'👉 Ver el canal de Vegetta777',
'📺 Ver maratones de mis series de televisión favoritas',
'📺 Ver televisión',
'📺 Ver todos los episodios de mi anime favorito en un día',
'🌎 Viajar',
'🎒 Viajar de mochilero/a',
'🌍 Viajar y explorar nuevas culturas.',
'🎈 Viajes en Globo Aerostático',
'🎮 Videojuegos de mundo abierto',
'🎮 Videojuegos de mundo abierto en línea',
'🎮 Videojuegos de supervivencia en línea',
'🎮 Videojuegos de terror',
'🎮 Videojuegos retro',
'🎻 Violonchelo',
'🫂 Visitar amigos',
'🏰 Visitar castillos',
'🏝️ Visitar playas y hacer snorkel.',
'🏛️ Visitas virtuales a museos',
'📹 Vlog',
'📹 Vlogging',
'🏐 Voleibol',
'🌍 Voluntariado Internacional',
'🚁 Vuelo en helicóptero',
'👟 Yoga',
'🧘 Yoga Acrobático',
'🧘 Yoga acuático',
'🧘 Yoga aéreo',
'🧘 Yoga caliente',
'🧘 Yoga en el Parque con la Comunidad',
'🧘 Yoga facial',
'🧘 Yoga para embarazadas',
'🧘 Yoga para niños.'
]

var emojiANumero = {
'0️⃣': '0',
'1️⃣': '1',
'2️⃣': '2',
'3️⃣': '3',
'4️⃣': '4',
'5️⃣': '5',
'6️⃣': '6',
'7️⃣': '7',
'8️⃣': '8',
'9️⃣': '9'
}
const pasatiemposMap = new Map()
function eliminarEmojis(texto) {
return texto.replace(/[^\w\s]/g, '').toLowerCase()
}
todosLosPasatiempos.forEach((pasatiempo) => {
const textoSinEmoji = eliminarEmojis(pasatiempo)
if (!pasatiemposMap.has(textoSinEmoji)) {
pasatiemposMap.set(textoSinEmoji, pasatiempo.replace(/\.$/, ''))
}
})
let todosLosPasatiemposOrdenados = Array.from(pasatiemposMap.values()).sort(function (a, b) {
const textoA = eliminarEmojis(a)
const textoB = eliminarEmojis(b)
return textoA.localeCompare(textoB)
})
function asignarPasatiempo(text) {
var numero = parseInt(text.replace(/\D/g, ''))
if (numero >= 1 && numero <= todosLosPasatiemposOrdenados.length) {
return todosLosPasatiemposOrdenados[numero - 1]
} else if (text.trim() !== '') {
var pasatiempoIngresado = text.replace(/\D/g, '')
conn.reply(
m.chat,
`${lenguajeGB['smsAvisoAG']()}*EL PASATIEMPO "${!pasatiempoIngresado ? 'CONTIENE LETRAS 🔡' : pasatiempoIngresado === undefined ? 'DE ALGUNA POSICIÓN' : pasatiempoIngresado}" QUE NO FORMA PARTE DE LA LISTA DE PASATIEMPOS*`,
fkontak,
m
)
return
}
}
let yyr1 = ''
let yyr2 = ''
let yyr3 = ''
let yyr4 = ''
let header = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
┊ 🎉 ¡PASATIEMPOS DISPONIBLES!
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯\n`
yyr1 += header
yyr2 += header
yyr3 += header
yyr4 += header
//.replace(/[^\p{L}\p{N}]/gu, '') // Elimina caracteres que no sean letras o números
let primeraParte = todosLosPasatiemposOrdenados.slice(0, 100)
let segundaParte = todosLosPasatiemposOrdenados.slice(500, 1000)
let terceraParte = todosLosPasatiemposOrdenados.slice(1000, 1500)
let cuartaParte = todosLosPasatiemposOrdenados.slice(1500)

primeraParte.forEach((pasatiempo, index) => {
yyr1 += ` [ ${index + 1} ] » ${pasatiempo}\n`
})
segundaParte.forEach((pasatiempo, index) => {
yyr2 += ` [ ${index + 501} ] » ${pasatiempo}\n`
})
terceraParte.forEach((pasatiempo, index) => {
yyr3 += ` [ ${index + 1001} ] » ${pasatiempo}\n`
})
cuartaParte.forEach((pasatiempo, index) => {
yyr4 += ` [ ${index + 1501} ] » ${pasatiempo}\n`
})
let footer = '┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈'
yyr1 += footer
yyr2 += footer
yyr3 += footer
yyr4 += footer
var maximoIndice = todosLosPasatiemposOrdenados.length - 0
async function seleccionarPasatiempos(texto) {
var seleccionados = texto.split(',').map(function (item) {
return item.trim()
})

var pasatiemposSet = new Set()
for (var i = 0; i < seleccionados.length; i++) {
var pasatiempoSeleccionado = asignarPasatiempo(seleccionados[i])
if (pasatiempoSeleccionado !== undefined) {
pasatiemposSet.add(pasatiempoSeleccionado)
if (!pas1) {
pas1 = pasatiempoSeleccionado
} else if (!pas2) {
pas2 = pasatiempoSeleccionado
} else if (!pas3) {
pas3 = pasatiempoSeleccionado
} else if (!pas4) {
pas4 = pasatiempoSeleccionado
} else if (!pas5) {
pas5 = pasatiempoSeleccionado
}
}
}
var pasatiemposUnicos = Array.from(pasatiemposSet)
var resultado = pasatiemposUnicos.join(', ')
var pasatiemposSeleccionados = [pas1, pas2, pas3, pas4, pas5].filter((pasatiempo) => pasatiempo !== '')
var posicionesSet = new Set(pasatiemposSeleccionados)
if (pasatiemposUnicos.length >= 1 && pasatiemposUnicos.length <= 5) {
if (pasatiemposSeleccionados.length >= 1 && pasatiemposSeleccionados.length <= 5 && pasatiemposSeleccionados.length === posicionesSet.size) {
//console.log("Pasatiempos seleccionados:", resultado)
user.pasatiempo = resultado
global.db.data.users[m.sender]['registroC'] = true
conn.sendMessage(
m.chat,
{
text: `${lenguajeGB['smsAvisoEG']()}*GENIAL!! SE HA AGREGADO \`${pasatiemposSeleccionados.length}/5\` PASATIEMPOS*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*${user.pasatiempo === 0 ? sinDefinir : user.pasatiempo}*\n\n🌟 *PARA GUARDAR SU REGISTRO ESCRIBA:*\n\`\`\`${usedPrefix}finalizar\`\`\``
},
{quoted: fkontak}
)
//console.log("Pasatiempos por separado:", pas1, pas2, pas3, pas4, pas5)
} else {
conn.reply(
m.chat,
`${lenguajeGB['smsAvisoAG']()}*EL PASATIEMPO "${pasatiempoSeleccionado === undefined ? 'DE ALGUNA POSICIÓN' : pasatiempoSeleccionado}" YA HA SIDO SELECCIONADO*`,
fkontak,
m
)
return
}
} else {
if (text) return
await conn.sendEvent(
m.chat,
gt + ' - Primera lista de pasatiempos.',
`🌟 *SELECCIONE MÍNIMO UN PASATIEMPO Y MÁXIMO CINCO PASATIEMPOS*\n\n*Para seleccionar varios pasatiempos separé por comas (,) además puede usar números o emojis numéricos, ejemplo:*\n\n✪ *(1 pasatiempo)*\n✓ \`\`\`${usedPrefix + command} 2️⃣\`\`\`\n\n✪ *(2 pasatiempos)*\n✓ \`\`\`${usedPrefix + command} 45, 65\`\`\`\n\n✪ *(3 pasatiempos)*\n✓ \`\`\`${usedPrefix + command} 2️⃣4️⃣, 1️⃣5️⃣6️⃣, 8️⃣9️⃣\`\`\`\n\n✪ *(4 pasatiempos)*\n✓ \`\`\`${usedPrefix + command} 223, 456, 6, 4\`\`\`\n\n✪ *(5 pasatiempos)*\n✓ \`\`\`${usedPrefix + command} 56, 5️⃣1️⃣6️⃣, 345, 2️⃣4️⃣, 200\`\`\`\n\n_Si quieres que este un pasatiempo que no forma parte de esta lista contacta con los creadores de este bot._\n\n⚠️ _Puedes omitir agregar pasatiempos con el comando *#finalizar* pero ten en cuenta que si omites agregar pasatiempos no recibirás recompensas ni tiempo premium gratis y algunos datos no se registrarán porque tú registro será considerado *"Registro rápido"*._\n\n${yyr1}`,
'Toca para ver más\n' + yyr1 + '\n\nPara ver más pasatiempo revise los otros mensajes del bot.',
false
)
await conn.sendEvent(
m.chat,
'Segunda lista de pasatiempos.',
'*Para ver las idicaciones para seleccionar pasatiempos, dirígete al primer mensaje del evento.*\n\n_Si quieres que este un pasatiempo que no forma parte de esta lista contacta con los creadores de este bot._',
'Toca para ver más\n' + yyr2 + '\n\nPara ver más pasatiempos revise los otros mensajes del bot.',
false
)
await conn.sendEvent(
m.chat,
'Tercera lista de pasatiempos.',
'*Para ver las idicaciones para seleccionar pasatiempos, dirígete al primer mensaje del evento.*',
'Toca para ver más\n' + yyr3 + '\n\nPara ver más pasatiempos revise los otros mensajes del bot.',
false
)
await conn.sendEvent(
m.chat,
'Última lista de pasatiempos.',
'*Para ver las idicaciones para seleccionar pasatiempos, dirígete al primer mensaje del evento.*',
'Toca para ver más\n' + yyr4 + '\n\nMás pasatiempos próximamente...',
false
)
}
}
seleccionarPasatiempos(seleccion)
}

if (command == 'finalizar' || command == 'end') {
if (global.db.data.users[m.sender]['registroC'] == true) {
if (user.premLimit === 0) {
tiempo = user.premLimit === 1 ? 0 : 36000000 //10 horas
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
}
fecha = `${week}, ${date} *||* `
hora = `${time}`
user.tiempo = fecha + hora
user.name = user.name === 0 ? sinDefinir : user.name + 'ͧͧͧͦꙶͣͤ✓ᚲᴳᴮ'
user.descripcion = bio
user.age =
user.age === 0 ? sinDefinir : user.age >= 18 ? (user.age += ' Años ' + '(Persona Adulta)') : (user.age += ' Años ' + '(Persona Joven)')
user.genero =
user.genero === 0
? sinDefinir
: user.genero == 'Ocultado'
? `${user.genero} 🕶️`
: user.genero == 'Mujer'
? `${user.genero} 🚺`
: user.genero == 'Hombre'
? `${user.genero} 🚹`
: sinDefinir
user.identidad = user.identidad === 0 ? sinDefinir : user.identidad
user.pasatiempo = user.pasatiempo === 0 ? sinDefinir : user.pasatiempo
} else {
fecha = `${week}, ${date} || `
hora = `${time}`
user.tiempo = fecha + hora
user.name = user.name === 0 ? sinDefinir : user.name + 'ͧͧͧͦꙶͣͤ✓ᚲᴳᴮ'
user.age =
user.age === 0 ? sinDefinir : user.age >= 18 ? (user.age += ' Años ' + '(Persona Adulta)') : (user.age += ' Años ' + '(Persona Joven)')
user.descripcion = bio
}
user.regTime = +new Date()
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
registrando = false
clearInterval(intervalId)
await conn.sendMessage(
m.chat,
{
text: `🍃 \`\`\`VERIFICACIÓN EXITOSA\`\`\` 🍃
*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n
😼 *REGISTRADO POR*
❱❱ ${wm}\n
📑 *TIPO DE REGISTRO* 
❱❱ ${user.registroC === true ? 'REGISTRO COMPLETO' : 'REGISTRO RÁPIDO'}\n
⌛ *FECHA/HORA*
❱❱ ${user.tiempo}\n
🛅 *CÓDIGO DE REGISTRO*
❱❱ ${sn}\n
✅ *INSIGNIA DE VERIFICACIÓN*
❱❱   *${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓ᚲᴳᴮ' : ''}*\n
✨ *NOMBRE* 
❱❱ ${user.name}\n
👀 *DESCRIPCIÓN*
❱❱ ${user.descripcion}\n
⏳ *MODIFICACIÓN DE DESCRIPCIÓN*
❱❱ ${fechaBio}\n
🔢 *EDAD* 
❱❱ ${user.age}\n
${
  user.registroC === true
    ? `☘️ *GÉNERO*
❱❱ ${user.genero}\n
🌱 *ORIENTACIÓN SEXUAL*
❱❱ ${user.identidad}\n
❇️ *PASATIEMPO(S)*
❱❱ ${user.pasatiempo}\n
${
user.premLimit === 1
? ''
: `🎟️ *PREMIUM*
❱❱ ${user.premLimit === 1 ? '' : `${user.premiumTime > 0 ? '✅' : '❌'} +10 HORAS || ${user.premiumTime - now} ms`}`
}   `
    : ''
}${user.registroC === true ? '\n🌟 *Si es su primera vez registrándose, recibirá horas premium de forma gratuita como bonificación exclusiva por su primera inscripción, puede cancelar y eliminar su registro en cualquier momento. Gracias por registrarse ✨*' : ''}\n> *Mira tú registro en este canal*\nhttps://whatsapp.com/channel/0029VatPwXw7Noa8n1Vinx3g`.trim(),
contextInfo: {
externalAdReply: {
title: wm,
body: user.name,
thumbnailUrl: pp,
sourceUrl: 'https://www.atom.bio/zentrax',
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
},
{quoted: fkontak}
)
await m.reply(`${sn}`)

let chtxt =
`📑 *Tipo de registro »* ${user.registroC === true ? 'Completo' : 'Rápido'} ${userNationality ? `\n🌎 *País »* ${userNationality}` : ''}
👤 *Usuario »* ${m.pushName || 'Anónimo'}
✅ *Verificación »* ${user.name}
👀 *Descripción »* ${user.descripcion} 
⏳ *Modificación de descripción »* ${fechaBio}
🔢 *Edad »* ${user.age}${
        user.registroC === true
          ? `\n☘️ *Género »* ${user.genero}
🌱 *Orientación Sexual »* ${user.identidad}
❇️ *Pasatiempo(s) »* ${user.pasatiempo}
${user.premLimit === 1 ? '' : `🎟️ *Premium »* ${user.premLimit === 1 ? '' : `${user.premiumTime > 0 ? '✅' : '❌'} +10 HORAS || ${user.premiumTime - now} ms`}`}   `
          : ''
      }${user.registroC === true ? '\n\n> 🌟 *Si es su primera vez registrándose, recibirá horas premium de forma gratuita como bonificación exclusiva por su primera inscripción, puede cancelar y eliminar su registro en cualquier momento. Gracias por registrarse ✨*' : ''}
🐈 *Bot:* ${gt}`.trim()
await global.conn.sendMessage(
ch.ch1,
{
text: chtxt,
contextInfo: {
externalAdReply: {
title: '【 🔔 Notificación General 🔔 】',
body: '🥳 ¡Nuevo usuario registrado!',
thumbnailUrl: ppch,
sourceUrl: accountsgb,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}
}
},
{quoted: null}
)
}
}
handler.command = [
'verify',
'verificar',
'register',
'registrar',
'reg',
'reg1',
'nombre',
'name',
'nombre2',
'name2',
'edad',
'age',
'edad2',
'age2',
'genero',
'género',
'gender',
'identidad',
'pasatiempo',
'hobby',
'identity',
'finalizar',
'pas2',
'pas3',
'pas4',
'pas5'
] ///^(verify|verificar|reg(ister)?)$/i
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
