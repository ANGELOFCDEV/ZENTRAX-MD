// Código elaborado por: https://github.com/GataNina-Li

import fetch from 'node-fetch'
import fs from 'fs'

const fantasyDBPath = './fantasy.json'
const jsonURL = 'https://raw.githubusercontent.com/ANGEL OFC DEV/module/main/imagen_json/anime.json'

let handler = async (m, {command, usedPrefix, text, conn}) => {
let user = global.db.data.users[m.sender]
const response = await fetch(jsonURL)
const data = await response.json()

let personajeInfo = null
let calificacionTotal = 0,
cantidadLikes = 0,
cantidadSuperlikes = 0,
cantidadDislikes = 0
const personaje = data.infoImg.find((p) => p.name.toLowerCase() === text.toLowerCase() || p.code === text)

if (!personaje || !text) {
return conn.reply(
m.chat,
`> *No se encontró información para el personaje especificado.*\n\n_Ingrese el nombre o código del personaje_\n\n> Puede ver la lista de personajes disponibles usando *${usedPrefix}fantasyl* o *${usedPrefix}fyl*`,
m
)
}

const imagen = personaje.url
const nombre = personaje.name
const origen = personaje.desp
const descripcion = personaje.info
const precio = personaje.price
const clase = personaje.class
const tipo = personaje.type
const codigo = personaje.code

let fantasyDB = []
if (fs.existsSync(fantasyDBPath)) {
const data = fs.readFileSync(fantasyDBPath, 'utf8')
fantasyDB = JSON.parse(data)
}

if (fs.existsSync(fantasyDBPath)) {
fantasyDB.forEach((user) => {
const id = Object.keys(user)[0]
const flow = user[id].flow
if (flow) {
flow.forEach((voto) => {
if (voto.character_name === nombre && voto.like) cantidadLikes++
if (voto.character_name === nombre && voto.superlike) cantidadSuperlikes++
if (voto.character_name === nombre && voto.dislike) cantidadDislikes++
})
}
})
calificacionTotal = cantidadLikes + cantidadSuperlikes + cantidadDislikes
}

let estado = 'Personaje Libre'
if (fs.existsSync(fantasyDBPath)) {
const usuarioExistente = fantasyDB.find((user) => {
const id = Object.keys(user)[0]
const fantasy = user[id].fantasy
return fantasy.some((personaje) => personaje.id === codigo)
})
if (usuarioExistente) {
const idUsuarioExistente = Object.keys(usuarioExistente)[0]
const nombreImagen = data.infoImg.find((personaje) => personaje.code === codigo)?.name
if (nombreImagen) {
estado = `*${nombreImagen}* fue comprado por *${conn.getName(idUsuarioExistente)}*`
}
}
}

await conn.reply(m.chat, '> *Obteniendo información del personaje...*\n\n_Esto puede tomar tiempo, paciencia por favor_', m)
const preguntas = obtenerPreguntas(nombre, !user.premiumTime ? 1 : 5)
const respuestas = []
const modo = 'Responderás a esta pregunta únicamente'
for (const pregunta of preguntas) {
try {
const response = await fetch(`https://api.cafirexos.com/api/chatgpt?text=${pregunta}&name=${m.name}&prompt=${modo}`)
const data = await response.json()
respuestas.push(data.resultado || 'err-gb')
} catch (error) {
respuestas.push('err-gb')
}
}

let mensaje = `
> 🌟 *Detalles del personaje* 🌟

*Nombre:* 
✓ ${nombre}

*Origen:*
✓ ${origen}

*Precio:* 
✓ \`${precio}\` *${rpgshop.emoticon('money')}*

*Clase:* 
✓ ${clase}

*Tipo:* 
✓ ${tipo}

*Código:* 
✓ ${codigo}

*Descripción:* 
✓ ${descripcion}

⟡ *Calificación total del personaje »* \`${calificacionTotal}\`
⟡ *Cantidad de 👍 (Me gusta) »* \`${cantidadLikes}\`
⟡ *Cantidad de ❤️ (Me encanta) »* \`${cantidadSuperlikes}\`
⟡ *Cantidad de 👎 (No me gusta) »* \`${cantidadDislikes}\`

*Estado:* 
✓ ${estado}
`

mensaje += `
> 👩‍🔬 Función Experimental 🧪
> ✨ *Información basada en IA* ✨\n
${
  respuestas.some((respuesta) => respuesta === 'err-gb')
    ? '`En este momento no se puede acceder a este recurso`'
    : preguntas.map((pregunta, index) => `*✪ ${pregunta}*\n${respuestas[index]}`).join('\n\n')
}
`
if (!user.premiumTime) {
mensaje += `${
      respuestas.some((respuesta) => respuesta === 'err-gb')
        ? ''
        : `\n\n*¡Sé un usuario 🎟️ premium para liberar más contenido de la IA! ✨*\n\n> Puedes usar *${usedPrefix}fychange* o *${usedPrefix}fycambiar* para obtener ⏳🎟️ Tiempo Premium\n\n> También puedes comprar un pase 🎟️ usando *${usedPrefix}pase premium*`
    }`
}

await conn.sendFile(m.chat, imagen, 'fantasy.jpg', mensaje.trim(), m, true, {
contextInfo: {
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
showAdAttribution: false,
renderLargerThumbnail: false,
title: '🌟 FANTASÍA RPG',
body: `😼 Usuario: » ${conn.getName(m.sender)}`,
mediaType: 1,
sourceUrl: accountsgb,
thumbnailUrl: 'https://i.imgur.com/vIH5SKp.jpg'
}
}
})
}

handler.command = /^(fantasyinfo|fyinfo)$/i
export default handler

function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min)
}

function obtenerPreguntas(nombre, cantidadPreguntas) {
const totalPreguntas = [
[
`¿Cuál es el nombre completo del personaje ${nombre}?`,
`¿En qué obra (libro, película, serie, videojuego, etc.) aparece este personaje ${nombre}?`,
`¿Cuál es el papel o función del personaje ${nombre} en la historia?`,
`¿Cuál es la historia o trasfondo del personaje ${nombre}?`,
`¿Cuáles son las características físicas del personaje ${nombre} (edad, género, apariencia)?`
],
[
`¿Qué habilidades o rasgos distintivos tiene el personaje ${nombre}?`,
`¿Cuál es la personalidad del personaje ${nombre}?`,
`¿Quién es el autor o creador del personaje ${nombre}?`,
`¿Existen adaptaciones o reinterpretaciones del personaje ${nombre} en diferentes medios?`,
`¿Cuál es la recepción crítica o popular del personaje ${nombre}?`
],
[
`¿Hay algún detalle interesante o curioso sobre el personaje ${nombre} que valga la pena conocer?`,
`¿Dónde puedo ver al personaje ${nombre} (plataformas, libros, páginas, etc.)?`,
`Muestra la lista completa de los personajes que están relacionados con ${nombre}`,
`¿El personaje ${nombre} es una persona real? En ese caso, ¿cuál es su ocupación, logros, historia personal, etc.?`,
`Si el personaje ${nombre} es de un anime o serie, ¿hay información sobre el estudio de animación o la producción de la serie?`
],
[
`¿Cuál es el significado o simbolismo del nombre del personaje ${nombre}?`,
`¿Hay algún elemento recurrente en la vestimenta o apariencia del personaje ${nombre}?`,
`¿El actor ha participado en algún proyecto de voz en off o doblaje relacionado con ${nombre}?`,
`¿Cuál es el origen cultural o étnico del personaje ${nombre}?`,
`¿Existen memes o referencias populares relacionadas con ${nombre}?`
],
[
`¿El actor ha recibido algún tipo de entrenamiento especializado para interpretar ciertos roles relacionados con ${nombre}?`,
`¿Hay alguna relación amorosa o interés romántico del personaje ${nombre} en la historia?`,
`¿Cuál es el estado emocional o psicológico del personaje ${nombre} en diferentes momentos de la historia?`,
`¿Cómo se compara este personaje ${nombre} con otros personajes similares en otras obras?`,
`¿Hay algún elemento icónico o distintivo asociado al personaje ${nombre}?`
],
[
`¿Cuál es el impacto cultural o social del personaje ${nombre} dentro y fuera de la obra?`,
`¿El personaje ${nombre} ha sido adaptado en otras formas de entretenimiento, como videojuegos o novelas?`,
`¿Cuál es el arco de desarrollo del personaje ${nombre} a lo largo de la historia?`,
`¿El actor o el personaje ${nombre} han sido objeto de estudios académicos o análisis críticos?`,
`¿Cuál es el objetivo principal o la motivación del personaje ${nombre} en la historia?`
],
[
`¿El actor ${nombre} ha participado en campañas publicitarias o comerciales relevantes?`,
`¿El personaje ${nombre} ha sido objeto de parodias o imitaciones en otros medios?`,
`¿Existen teorías de los fans sobre el origen o el destino final del personaje ${nombre}?`,
`¿El actor ${nombre} ha sido modelo o portavoz de alguna marca o producto?`,
`¿El personaje ${nombre} ha sufrido cambios significativos en su personalidad o apariencia a lo largo de la historia?`
],
[
`¿Cómo se desarrolla la relación del personaje ${nombre} con otros personajes secundarios?`,
`¿El actor ${nombre} ha recibido algún tipo de reconocimiento por su trabajo en el campo de la actuación?`,
`¿El personaje ${nombre} tiene algún tipo de habilidad especial o poder sobrenatural dentro de la historia?`,
`¿El actor ${nombre} ha expresado su opinión sobre el desarrollo o el destino del personaje en entrevistas?`,
`¿Cómo se relaciona el personaje ${nombre} con los temas o mensajes principales de la obra?`
],
[
`¿El actor o el personaje ${nombre} han inspirado obras de fanfiction o fanart significativas?`,
`¿Cuál es el contexto sociohistórico en el que se desarrolla la historia del personaje ${nombre}?`,
`¿El personaje ${nombre} ha sido reinterpretado o reinventado en adaptaciones modernas o contemporáneas?`,
`¿Cómo afecta el entorno o el escenario al desarrollo del personaje ${nombre}?`,
`¿El actor ${nombre} ha experimentado algún tipo de transformación física para interpretar al personaje?`
],
[
`¿Cuál es el nombre completo del personaje ${nombre}? ¿Tiene apodos o alias?`,
`¿En qué lugar y época nació o fue creado ${nombre}? ¿Cómo era su entorno?`,
`¿Quiénes son sus padres, familia o creadores ${nombre}? ¿Qué influencia tuvieron en su vida?`,
`¿De qué raza, especie o clase social proviene ${nombre}? ¿Cómo esto marcó su desarrollo?`,
`¿Posee alguna habilidad o característica distintiva ${nombre}? ¿Cómo la obtuvo?`
],
[
`¿Cómo se describiría el personaje ${nombre} en tres palabras? ¿Qué lo hace único?`,
`¿Cuáles son sus valores, creencias y principios más importantes ${nombre}?`,
`¿Qué lo motiva a actuar ${nombre}? ¿Cuáles son sus metas y sueños?`,
`¿Tiene algún miedo o inseguridad que lo atormente ${nombre}? ¿Cómo lo enfrenta?`,
`¿Cómo suele reaccionar ante situaciones difíciles o inesperadas ${nombre}?`
],
[
`¿Quiénes son sus amigos, aliados o compañeros más cercanos ${nombre}? ¿Cómo se conocieron?`,
`¿Tiene enemigos o rivales ${nombre}? ¿Por qué? ¿Qué tipo de relación tienen?`,
`¿Qué papel juega en su familia o comunidad ${nombre}? ¿Cómo se relaciona con ellos?`,
`¿Ha experimentado el amor, la pérdida o la traición ${nombre}? ¿Cómo lo ha marcado?`,
`¿Qué tipo de impacto tiene en el mundo que lo rodea ${nombre}? ¿Es positivo o negativo?`
],
[
`¿Cuál es el evento más importante que ha marcado su vida ${nombre}? ¿Por qué?`,
`¿Ha cometido errores o actos de los que se arrepiente ${nombre}? ¿Cómo ha aprendido de ellos?`,
`¿Ha tenido momentos de gran triunfo o satisfacción ${nombre}? ¿Qué los hizo especiales?`,
`¿Ha experimentado cambios o transformaciones a lo largo de su historia ${nombre}? ¿En qué se ha convertido?`,
`¿Cuál es su mayor aspiración o sueño por cumplir ${nombre}? ¿Cómo planea lograrlo?`
],
[
`¿Qué valores o lecciones importantes podemos aprender del personaje ${nombre}?`,
`¿Qué mensaje o significado nos transmite su historia ${nombre}?`,
`¿En qué aspectos nos identificamos con el personaje ${nombre}? ¿En qué se diferencia de nosotros?`,
`¿Qué emociones nos despierta su historia ${nombre}? ¿Por qué?`,
`¿Cómo nos inspira o motiva el personaje ${nombre} a ser mejores personas?`
],
[
`¿Qué simboliza o representa el personaje ${nombre} en la historia?`,
`¿Se basa en alguna persona o evento real ${nombre}? ¿En qué se inspira?`,
`¿Ha sido objeto de análisis o debate por parte de críticos o académicos ${nombre}?`,
`¿Qué impacto cultural ha tenido el personaje ${nombre}? ¿Cómo ha influido en la sociedad?`,
`¿Qué legado o huella ha dejado en el mundo ${nombre}? ¿Por qué es importante recordarlo?`
],
[
`¿Cuál es la fecha de nacimiento y lugar de origen del actor o del personaje ${nombre}? (en caso de ser una persona real)`,
`¿Ha participado el actor/personaje ${nombre} en obras de teatro? En ese caso, ¿cuáles?`,
`¿Cuándo se hizo (fecha) la obra (libro, película, serie, videojuego, etc.) del personaje ${nombre}?`,
`¿Qué lecciones o valores representa el personaje ${nombre} dentro de la historia?`,
`¿Existe alguna página web o comunidad en línea dedicada al personaje ${nombre} o al actor?`
]
]
const preguntasSeleccionadas = totalPreguntas[getRandom(0, totalPreguntas.length)]
const preguntasAleatorias = []
while (preguntasAleatorias.length < cantidadPreguntas) {
const randomIndex = Math.floor(Math.random() * preguntasSeleccionadas.length)
const pregunta = preguntasSeleccionadas[randomIndex]
if (!preguntasAleatorias.includes(pregunta)) {
preguntasAleatorias.push(pregunta)
}
}
return preguntasAleatorias
}
