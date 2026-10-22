// Código elaborado por: https://github.com/GataNina-Li

import { listaAvisos } from '../plugins/rpg-fantasy_start.js'
import fetch from 'node-fetch'
import fs from 'fs'

const fantasyDBPath = './fantasy.json'
let fantasyDB = []
const validClasses = ['Común', 'Poco Común', 'Raro', 'Épico', 'Legendario', 'Sagrado', 'Supremo', 'Transcendental']
let cantidadUsuariosRanking = 5

let handler = async (m, {command, usedPrefix, conn, text, args}) => {
// Aquí explico como se maneja los remitentes Jjjj
let who
if (m.isGroup) {
if (text) {
// Si es un grupo y hay texto, se asume que el usuario está ingresando un número de teléfono
let userArg = text.replace(/[^\d]/g, '') // Eliminar todos los caracteres que no sean dígitos
who = userArg.endsWith('@s.whatsapp.net') ? userArg : userArg + '@s.whatsapp.net'
} else if (m.quoted && m.quoted.sender) {
// Si el mensaje está respondiendo a otro mensaje, se obtiene el identificador del remitente del mensaje original
who = m.quoted.sender
} else {
// Si no hay texto ni mensaje citado, se toma el remitente del mensaje actual
who = m.sender
}
} else {
if (text) {
// Si no es un grupo y hay texto, se asume que el usuario está ingresando un número de teléfono
let userArg = text.replace(/[^\d]/g, '') // Eliminar todos los caracteres que no sean dígitos
who = userArg.endsWith('@s.whatsapp.net') ? userArg : userArg + '@s.whatsapp.net'
} else if (m.quoted && m.quoted.sender) {
// En chat privado, si el mensaje está respondiendo a otro mensaje, se obtiene el identificador del remitente del mensaje original
who = m.quoted.sender
} else {
// Si no hay texto ni mensaje citado, se toma el remitente del mensaje actual
who = m.sender
}
}

const userId = who
let user = global.db.data.users[userId]

const jsonURL = 'https://raw.githubusercontent.com/ANGEL OFC DEV/module/main/imagen_json/anime.json'
const response = await fetch(jsonURL)
const data = await response.json()

if (fs.existsSync(fantasyDBPath)) {
const data = fs.readFileSync(fantasyDBPath, 'utf8')
var fantasyDB = JSON.parse(fs.readFileSync(fantasyDBPath, 'utf8'))
} else {
m.reply(`Para usar este comando primero debe de comprar al menos un personaje, use *${usedPrefix}fy*`)
return
}

let usuarioExistente = fantasyDB.find((user) => Object.keys(user)[0] === userId)
if (!usuarioExistente) {
return conn.reply(
m.chat,
`No hemos encontrado personajes. Para ver el Top o tú información debes de comprar un personaje, use *${usedPrefix}fantasy* o *${usedPrefix}fy*`,
m
)
}

async function obtenerPersonajeAleatorio() {
if (usuarioExistente && usuarioExistente[userId] && usuarioExistente[userId].fantasy && usuarioExistente[userId].fantasy.length > 0) {
let personajes = usuarioExistente[userId].fantasy
let personajeAleatorio = personajes[Math.floor(Math.random() * personajes.length)].name
return personajeAleatorio
} else {
let personajes = data.infoImg
let personajeAleatorio = personajes[Math.floor(Math.random() * personajes.length)].name
return personajeAleatorio
}
}
let personaje = await obtenerPersonajeAleatorio()

const idUsuario = Object.keys(usuarioExistente)[0]
const fantasyUsuario = usuarioExistente[idUsuario].fantasy

function obtenerPersonajesDisponibles(userId, fantasyUsuario, infoImg) {
const personajesDisponibles = []
fantasyUsuario.forEach((personaje) => {
const info = infoImg.find((img) => img.code === personaje.id)
if (info) {
personajesDisponibles.push({
id: personaje.id,
name: personaje.name,
code: personaje.id,
class: info.class
})
}
})
return personajesDisponibles
}

let seEncontraronPersonajes = null
function construirListaPersonajes(personajes) {
const personajesPorClase = {}
validClasses.forEach((clase) => {
personajesPorClase[clase] = []
})
personajes.forEach((personaje) => {
personajesPorClase[personaje.class].push(personaje)
})
let listaFinal = ''
validClasses.forEach((clase) => {
if (personajesPorClase[clase].length > 0) {
const mensajeClase = `\n*✦ Clase: ${clase}*\n${personajesPorClase[clase].map((personaje) => `• _${personaje.name}_ » \`\`\`(${personaje.id})\`\`\``).join('\n')}\n`
        listaFinal += mensajeClase
        seEncontraronPersonajes = true
      }
    })
    if (!seEncontraronPersonajes) {
      listaFinal += '*✘* \`\`\`No tienes personajes\`\`\`\n'
    }
    return listaFinal.trim()
  }
  const personajesDisponibles = obtenerPersonajesDisponibles(userId, fantasyUsuario, data.infoImg)
  const listaPersonajes = construirListaPersonajes(personajesDisponibles)

  let totalLikes = 0,
    totalSuperlikes = 0,
    totalDislikes = 0
  if (usuarioExistente[idUsuario].flow) {
    usuarioExistente[idUsuario].flow.forEach((flow) => {
      if (flow.like) totalLikes++
      if (flow.superlike) totalSuperlikes++
      if (flow.dislike) totalDislikes++
    })
  }

  const calificacionTotal = totalLikes + totalSuperlikes + totalDislikes
  const personajesGustados = totalLikes > 0 ? totalLikes : '*✘* ```No has dado me gusta a personajes```'
  const personajesSuperlike = totalSuperlikes > 0 ? totalSuperlikes : '*✘* ```No has dado me encanta a personajes```'
  const personajesNoGustados = totalDislikes > 0 ? totalDislikes : '*✘* ```No has dado no me gusta a personajes```'

  let preciosPersonajes = fantasyUsuario.map((personaje) => {
    const infoPersonaje = data.infoImg.find((img) => img.name.toLowerCase() === personaje.name.toLowerCase())
    return {name: personaje.name, price: infoPersonaje ? infoPersonaje.price : Infinity}
  })
  preciosPersonajes.sort((a, b) => a.price - b.price)

  const personajeMasBarato =
    preciosPersonajes.length > 0
      ? `✓ _${preciosPersonajes[0].name}_ » \`\`\`${preciosPersonajes[0].price}\`\`\` 🐱`
: '*✘* ```No tienes personajes```'
let personajeMasCaro =
preciosPersonajes.length > 0
? `✓ _${preciosPersonajes[preciosPersonajes.length - 1].name}_ » \`\`\`${preciosPersonajes[preciosPersonajes.length - 1].price}\`\`\` 🐱`
: '*✘* ```No tienes personajes```'
if (preciosPersonajes.length > 0 && preciosPersonajes[0].price === preciosPersonajes[preciosPersonajes.length - 1].price) {
personajeMasCaro = '*✘* ```No hay un Personaje más caro```'
}

const clases = {}
fantasyUsuario.forEach((personaje) => {
const infoPersonaje = data.infoImg.find((img) => img.name.toLowerCase() === personaje.name.toLowerCase())
if (infoPersonaje) {
if (!clases[infoPersonaje.class]) clases[infoPersonaje.class] = 0
clases[infoPersonaje.class]++
}
})

let claseMasPersonajes = '*✘* ```No tienes personajes```'
let claseMenosPersonajes = '*✘* ```No tienes personajes```'

let maxCount = 0,
minCount = Infinity
Object.entries(clases).forEach(([clase, count]) => {
if (count > maxCount) {
maxCount = count
claseMasPersonajes = `*✓* La clase *${clase}* tiene \`\`\`${count}\`\`\` personaje${maxCount === 1 ? '' : 's'}`
}
if (count < minCount && count > 0) {
minCount = count
claseMenosPersonajes = `*✓* La clase *${clase}* tiene \`\`\`${count}\`\`\` personaje${minCount === 1 ? '' : 's'}`
}
if (maxCount === minCount) {
claseMasPersonajes = '*✘* ```No hay una clase con mayor personajes```'
}
})

let calificacion = [5, 10, 15, 20, 30]
let mensajeDesafiosPendientes = ''
if (user.fantasy_character2 < calificacion.length) {
const remainingCharacters = calificacion[user.fantasy_character2] - fantasyUsuario.length
const remainingCharactersText = remainingCharacters > 0 ? `${remainingCharacters}` : '0'
mensajeDesafiosPendientes += `_Compra *${remainingCharactersText}* Personajes más para obtener una recompensa_\n*Progreso:* \`\`\`(${fantasyUsuario.length}/${calificacion[user.fantasy_character2]})\`\`\``
} else {
mensajeDesafiosPendientes += '*✓* _Has completado todas las misiones_'
}

calificacion = [3, 8, 13, 18, 25, 35, 40, 55, 65, 80, 100]
let txtLike = ''
if (user.fantasy_character3 <= 10) {
const remainingLikes = calificacion[user.fantasy_character3] - personajesGustados
const remainingLikesText = remainingLikes > 0 ? `${remainingLikes}` : '0'
const moreOrWith = user.fantasy_character3 === 0 ? '' : ' más'
txtLike += `_Califica a *${remainingLikesText}* personajes${moreOrWith} con "👍"_\n*Progreso:* \`\`\`(${personajesGustados}/${calificacion[user.fantasy_character3]})\`\`\``
} else {
txtLike += '*✓* _Has completado todas las misiones_'
}

let txtSuperLike = ''
if (user.fantasy_character4 <= 10) {
const remainingSuperlikes = calificacion[user.fantasy_character4] - personajesSuperlike
const remainingSuperlikesText = remainingSuperlikes > 0 ? `${remainingSuperlikes}` : '0'
const moreOrWith = user.fantasy_character4 === 0 ? '' : ' más'
txtSuperLike += `_Califica a *${remainingSuperlikesText}* personajes${moreOrWith} con "❤️"_\n*Progreso:* \`\`\`(${personajesSuperlike}/${calificacion[user.fantasy_character4]})\`\`\``
} else {
txtSuperLike += '*✓* _Has completado todas las misiones_'
}

let txtDislike = ''
if (user.fantasy_character5 <= 10) {
const remainingDislikes = calificacion[user.fantasy_character5] - personajesNoGustados
const remainingDislikesText = remainingDislikes > 0 ? `${remainingDislikes}` : '0'
const moreOrWith = user.fantasy_character5 === 0 ? '' : ' más'
txtDislike += `_Califica a *${remainingDislikesText}* personajes${moreOrWith} con "👎"_\n*Progreso:* \`\`\`(${personajesNoGustados}/${calificacion[user.fantasy_character5]})\`\`\``
} else {
txtDislike += '*✓* _Has completado todas las misiones_'
}

// Usuarios con más personajes comprados
let usuariosConMasPersonajes = fantasyDB
.map((entry) => ({
userId: Object.keys(entry)[0],
numPersonajes: entry[Object.keys(entry)[0]].fantasy.length
}))
.filter((usuario) => usuario.numPersonajes > 0) // Filtrar solo usuarios con al menos un personaje comprado
.sort((a, b) => b.numPersonajes - a.numPersonajes)
let topUsuariosPersonajes = usuariosConMasPersonajes
.slice(0, cantidadUsuariosRanking)
.map((usuario, index) => {
let positionEmoji = index === 0 ? '🥇 »' : index === 1 ? '🥈 »' : index === 2 ? '🥉 »' : `${index + 1}.`
return `*${positionEmoji}* @${usuario.userId.split('@')[0]}\n *✪ ${usuario.numPersonajes}* personaje${usuario.numPersonajes === 1 ? '' : 's'}`
})
.join('\n\n')
let rankingPersonajes = topUsuariosPersonajes ? topUsuariosPersonajes : '```Todavía no hay usuarios aquí```'

// Obtener usuarios activos en calificación de personajes
let usuariosActivos = fantasyDB
.map((entry) => ({
userId: Object.keys(entry)[0],
totalCalificaciones:
entry[Object.keys(entry)[0]].record[0].total_like +
entry[Object.keys(entry)[0]].record[0].total_dislike +
entry[Object.keys(entry)[0]].record[0].total_superlike
}))
.filter((usuario) => usuario.totalCalificaciones > 0)
usuariosActivos.sort((a, b) => b.totalCalificaciones - a.totalCalificaciones)
let topUsuariosCalificaciones = usuariosActivos
.slice(0, cantidadUsuariosRanking)
.map((usuario, index) => {
let positionEmoji = index === 0 ? '🥇 »' : index === 1 ? '🥈 »' : index === 2 ? '🥉 »' : `${index + 1}.`
return `*${positionEmoji}* @${usuario.userId.split('@')[0]}\n*✪* Realizó *${usuario.totalCalificaciones}* ${usuario.totalCalificaciones === 1 ? 'calificación' : 'calificaciones'}`
})
.join('\n\n')
let rankingCalificaciones = topUsuariosCalificaciones ? topUsuariosCalificaciones : '```Todavía no hay usuarios aquí```'

// Obtener usuarios con el personaje más caro
preciosPersonajes = []
fantasyDB.forEach((entry) => {
entry[Object.keys(entry)[0]].fantasy.forEach((personaje) => {
let infoPersonaje = data.infoImg.find((img) => img.name.toLowerCase() === personaje.name.toLowerCase())
if (infoPersonaje) {
preciosPersonajes.push({
userId: Object.keys(entry)[0],
personaje: personaje.name,
precio: infoPersonaje.price
})
}
})
})
let processedUsers = new Set()
preciosPersonajes.sort((a, b) => b.precio - a.precio)
let topUsuariosCaros = []
for (const usuario of preciosPersonajes) {
if (!processedUsers.has(usuario.userId)) {
let positionEmoji =
topUsuariosCaros.length === 0
? '🥇 »'
: topUsuariosCaros.length === 1
? '🥈 »'
: topUsuariosCaros.length === 2
? '🥉 »'
: `${topUsuariosCaros.length + 1}.`
topUsuariosCaros.push(`*${positionEmoji}* @${usuario.userId.split('@')[0]}\n*✪ ${usuario.personaje}* » \`\`\`${usuario.precio}\`\`\` 🐈`)
processedUsers.add(usuario.userId)
}
if (topUsuariosCaros.length >= cantidadUsuariosRanking) break
}
let rankingCaros = topUsuariosCaros.length > 0 ? topUsuariosCaros.join('\n\n') : '```Todavía no hay usuarios aquí```'
/*preciosPersonajes.sort((a, b) => b.precio - a.precio)
let topUsuariosCaros = preciosPersonajes.slice(0, cantidadUsuariosRanking).map((usuario, index) => {
let positionEmoji = index === 0 ? "🥇 »" : index === 1 ? "🥈 »" : index === 2 ? "🥉 »" : `${index + 1}.`
return `*${positionEmoji}* @${usuario.userId.split('@')[0]}\n*✪ ${usuario.personaje}* » \`\`\`${usuario.precio}\`\`\` 🐈`
}).join('\n\n')
let rankingCaros = topUsuariosCaros ? topUsuariosCaros : 'Todavía no hay usuarios aquí'*/

// Obtener usuarios con mejor clase de personaje
let clasesPorUsuario = {}
fantasyDB.forEach((entry) => {
entry[Object.keys(entry)[0]].fantasy.forEach((personaje) => {
let infoPersonaje = data.infoImg.find((img) => img.name.toLowerCase() === personaje.name.toLowerCase())
if (infoPersonaje) {
if (!clasesPorUsuario[Object.keys(entry)[0]]) {
clasesPorUsuario[Object.keys(entry)[0]] = {}
}
if (!clasesPorUsuario[Object.keys(entry)[0]][infoPersonaje.class]) {
clasesPorUsuario[Object.keys(entry)[0]][infoPersonaje.class] = 0
}
clasesPorUsuario[Object.keys(entry)[0]][infoPersonaje.class]++
}
})
})
// La mejor clase de personaje
let mejoresClasesPorUsuario = {}
Object.keys(clasesPorUsuario).forEach((userId) => {
let clasesUsuario = clasesPorUsuario[userId]
let mejorClase = Object.keys(clasesUsuario).reduce((a, b) => (clasesUsuario[a] > clasesUsuario[b] ? a : b))
mejoresClasesPorUsuario[userId] = mejorClase
})
// Ordenar a los usuarios según la cantidad de personajes en su mejor clase
let topUsuariosClases = Object.keys(mejoresClasesPorUsuario)
.filter((userId) => Object.values(clasesPorUsuario[userId]).length > 0)
.sort((a, b) => {
let aClass = validClasses.indexOf(mejoresClasesPorUsuario[a])
let bClass = validClasses.indexOf(mejoresClasesPorUsuario[b])
return bClass - aClass
})
.slice(0, cantidadUsuariosRanking)
.map((userId, index) => {
let clase = mejoresClasesPorUsuario[userId]
let count = clasesPorUsuario[userId][clase]
let positionEmoji = index === 0 ? '🥇 »' : index === 1 ? '🥈 »' : index === 2 ? '🥉 »' : `${index + 1}.`
return `*${positionEmoji}* @${userId.split('@')[0]}\n*✪ ${clase}* » *${count}* personaje${count === 1 ? '' : 's'}`
})
.join('\n\n')
let rankingClases = topUsuariosClases ? topUsuariosClases : '```Todavía no hay usuarios aquí```'

// Usuarios por cantidad de transferencias
let usuariosTransferencias = fantasyDB
.map((entry) => {
const usuario = entry[Object.keys(entry)[0]]
const totalTransferencias = (usuario.record && usuario.record.length > 0 && usuario.record[0].total_character_transfer) || 0
return {
userId: Object.keys(entry)[0],
totalTransferencias: totalTransferencias
}
})
.filter((usuario) => usuario.totalTransferencias > 0) // Filtrar usuarios con al menos una transferencia
.sort((a, b) => b.totalTransferencias - a.totalTransferencias)
.slice(0, cantidadUsuariosRanking)
.map((usuario, index) => {
let positionEmoji = index === 0 ? '🥇 »' : index === 1 ? '🥈 »' : index === 2 ? '🥉 »' : `${index + 1}.`
return `*${positionEmoji}* @${usuario.userId.split('@')[0]}\n*✪* Realizó *${usuario.totalTransferencias}* transferencia${usuario.totalTransferencias === 1 ? '' : 's'}`
})
.join('\n\n')
let rankingTransferencias = usuariosTransferencias ? usuariosTransferencias : '```Todavía no hay usuarios aquí```'

const personajesTransferencias = usuarioExistente[idUsuario].record[0].total_character_transfer

let mentions = []
fantasyDB.forEach((entry) => {
mentions.push({
userId: Object.keys(entry)[0]
})
})

let contexto2 =
user.fantasy_character2 === 0
? '¡Compra varios personajes!'
: user.fantasy_character2 === 1
? '🧺 Recompensa pequeña'
: user.fantasy_character2 === 2
? '🛍️ Recompensa mediana'
: user.fantasy_character2 === 3
? '📦 Recompensa millonaria'
: user.fantasy_character2 === 4
? '⚗️ Recompensa multimillonaria'
: '💸 Recompensa magistral 💸'

let contexto3 =
user.fantasy_character3 === 0
? '¡Califica a varios personajes!'
: user.fantasy_character3 >= 1 && user.fantasy_character3 <= 3
? '🧺 Recompensa pequeña'
: user.fantasy_character3 >= 4 && user.fantasy_character3 <= 6
? '🛍️ Recompensa mediana'
: user.fantasy_character3 === 7
? '📦 Recompensa millonaria'
: user.fantasy_character3 >= 8 && user.fantasy_character3 <= 9
? '⚗️ Recompensa multimillonaria'
: '💸 Recompensa magistral 💸'

let contexto4 =
user.fantasy_character4 === 0
? '¡Califica a varios personajes!'
: user.fantasy_character4 >= 1 && user.fantasy_character4 <= 3
? '🧺 Recompensa pequeña'
: user.fantasy_character4 >= 4 && user.fantasy_character4 <= 6
? '🛍️ Recompensa mediana'
: user.fantasy_character4 === 7
? '📦 Recompensa millonaria'
: user.fantasy_character4 >= 8 && user.fantasy_character4 <= 9
? '⚗️ Recompensa multimillonaria'
: '💸 Recompensa magistral 💸'

let contexto5 =
user.fantasy_character5 === 0
? '¡Califica a varios personajes!'
: user.fantasy_character5 >= 1 && user.fantasy_character5 <= 3
? '🧺 Recompensa pequeña'
: user.fantasy_character5 >= 4 && user.fantasy_character5 <= 6
? '🛍️ Recompensa mediana'
: user.fantasy_character5 === 7
? '📦 Recompensa millonaria'
: user.fantasy_character5 >= 8 && user.fantasy_character5 <= 9
? '⚗️ Recompensa multimillonaria'
: '💸 Recompensa magistral 💸'

const mensaje = `
${
  command != 'fantasymy' && command != 'fymy'
    ? `🔥 *RPG FANTASY - TENDENCIAS* 🔥

> 🤩 *❰ Más personajes comprados ❱* 🤩
${rankingPersonajes}\n

> *❰ Calificando ("👍", "❤️", "👎") ❱*
${rankingCalificaciones}\n

> ❇️ *❰ Personajes transferidos ❱* ❇️
${rankingTransferencias}\n

> 🤑 *❰ Personaje más caro ❱* 🤑
${rankingCaros}\n

> 😎 *❰ Mejor clase en personaje ❱* 😎
${rankingClases}

*⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯*`
    : '> 🤩 *RPG FANTASY* 🤩'
}

> ⛱️ *❰ Consejo / Ayuda ❱* ⛱️\n
${listaAvisos(usedPrefix, personaje)} 

*⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯*

> 🌟 *❰ Información de personaje ❱* 🌟
*✓ @${userId.split('@')[0]}*
    
*❰ Total de personajes ❱* 
${fantasyUsuario.length > 0 ? `*✓* \`\`\`${fantasyUsuario.length}\`\`\`` : '*✘* ```No tienes personajes```'}

*❰ Personajes comprados ❱*
${listaPersonajes}

*❰ Calificación total de personajes ❱* 
${calificacionTotal > 0 ? `*✓* \`\`\`${calificacionTotal}\`\`\`` : '*✘* ```No has calificado personajes```'}

*❰ Personajes transferidos ❱* 
${personajesTransferencias > 0 ? `*✓* \`\`\`${personajesTransferencias}\`\`\`` : '*✘* ```No has transferido personajes```'}

*❰ Personajes que has dado 👍 ❱* 
${personajesGustados > 0 ? `*✓* \`\`\`${personajesGustados}\`\`\`` : personajesGustados}

*❰ Personajes que has dado ❤️ ❱* 
${personajesSuperlike > 0 ? `*✓* \`\`\`${personajesSuperlike}\`\`\`` : personajesSuperlike}

*❰ Personajes que has dado 👎 ❱*
${personajesNoGustados > 0 ? `*✓* \`\`\`${personajesNoGustados}\`\`\`` : personajesNoGustados}

*❰ Tú personaje más barato ❱* 
${personajeMasBarato}

*❰ Tú personaje más caro ❱* 
${personajeMasCaro}

*❰ Clase con menos personajes ❱* 
${claseMenosPersonajes}

*❰ Clase con más personajes ❱* 
${claseMasPersonajes}

*⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯*

> 🔒 *❰ Desafíos por desbloquear ❱* 🔒

*❰ ¿Puede calificar personajes? ❱*
${user.fantasy_character === 1 ? '*✓* \`\`\`Sí\`\`\`' : '*✘* \`\`\`No\`\`\`'}

*❰ Por comprar personajes ❱*
${fantasyUsuario.length > 0 ? mensajeDesafiosPendientes : `*✘* \`\`\`Primero compra usando:\`\`\`\n\`${usedPrefix}fantasy o ${usedPrefix}fy\``}

*❰ Por dar 👍 ❱* 
${personajesGustados > 0 ? txtLike : personajesGustados}

*❰ Por dar ❤️ ❱* 
${personajesSuperlike > 0 ? txtSuperLike : personajesSuperlike}

*❰ Por dar 👎 ❱* 
${personajesNoGustados > 0 ? txtDislike : personajesNoGustados}

> 🎁 *❰ Recompensas extras 🔓 ❱* 🎁

*❰ Por personajes comprados 🪅 ❱*
*✓ Nivel:* \`(${user.fantasy_character2}/5)\`
*✓ Tipo:* _${contexto2}_

*❰ Por dar 👍 ❱* 
*✓ Nivel:* \`(${user.fantasy_character3}/11)\`
*✓ Tipo:* _${contexto3}_

*❰ Por dar ❤️ ❱* 
*✓ Nivel:* \`(${user.fantasy_character4}/11)\`
*✓ Tipo:* _${contexto4}_

*❰ Por dar 👎 ❱* 
*✓ Nivel:* \`(${user.fantasy_character5}/11)\`
*✓ Tipo:* _${contexto5}_
`
//let fake = { contextInfo: { externalAdReply: { title: `🌟 FANTASÍA RPG`, body: `😼 RPG de: » ${conn.getName(userId)}`, sourceUrl: accountsgb.getRandom(), thumbnailUrl: 'https://telegra.ph/file/2bc10639d4f5cf5685185.jpg' }}}
let image = [
'https://telegra.ph/file/77cd4b654273b5cde1ce8.jpg',
'https://telegra.ph/file/feb1553dffb7410556c8f.jpg',
'https://telegra.ph/file/343d26ea0d2621d47539c.jpg',
'https://telegra.ph/file/2bc10639d4f5cf5685185.jpg'
].getRandom()
await conn.sendMessage(m.chat, {image: {url: image}, caption: mensaje.trim(), mentions: conn.parseMention(mensaje)}, fkontak)
/*await conn.sendFile(m.chat, 'https://telegra.ph/file/77cd4b654273b5cde1ce8.jpg', 'fantasy.jpg', mensaje.trim(), fkontak, null, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: false,
renderLargerThumbnail: true,
title: `🌟 FANTASÍA RPG`,
body: `😼 RPG de: » ${conn.getName(userId)}`,
mediaType: 1,
sourceUrl: accountsgb.getRandom(),
thumbnailUrl: 'https://telegra.ph/file/2bc10639d4f5cf5685185.jpg'
}}})*/
//await conn.reply(m.chat, mensaje.trim(), fkontak, { mentions: conn.parseMention(mensaje) })
}

handler.command = /^(fantasymy|fymy|fyranking|fytendencia)$/i
export default handler
