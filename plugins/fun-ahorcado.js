const palabras = [
'gato',
'perro',
'elefante',
'tigre',
'ballena',
'mariposa',
'tortuga',
'conejo',
'rana',
'pulpo',
'ardilla',
'jirafa',
'cocodrilo',
'pingüino',
'delfín',
'serpiente',
'hámster',
'mosquito',
'abeja',
'negro',
'television',
'computadora',
'botsito',
'reggaeton',
'economía',
'electrónica',
'facebook',
'WhatsApp',
'Instagram',
'tiktok',
'presidente',
'bot',
'películas',
'gata',
'zentrax'
]

const intentosMaximos = 6
const gam = new Map()

function elegirPalabraAleatoria() {
return palabras[Math.floor(Math.random() * palabras.length)]
}

function ocultarPalabra(palabra, letrasAdivinadas) {
let palabraOculta = ''
for (const letra of palabra) {
palabraOculta += letrasAdivinadas.includes(letra) ? `${letra} ` : '_ '
}
return palabraOculta.trim()
}

function mostrarAhorcado(intentos) {
const dibujo = [
' ____',
' |  |',
intentos < 6 ? ' |  😵' : ' |',
intentos < 5 ? ' |  /' : intentos < 4 ? ' |  /|' : intentos < 3 ? ' |  /|\\' : ' |',
intentos < 2 ? ' |   /' : intentos < 1 ? ' |   / \\' : ' |',
'_|_'
]
return dibujo.join('\n')
}

function juegoTerminado(sender, mensaje, palabra, letrasAdivinadas, intentos) {
if (intentos === 0) {
gam.delete(sender)
return `😵 *¡PERDISTE!*\n\nLa palabra era: *"${palabra}"*\n\n${mostrarAhorcado(intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
}

if (!mensaje.includes('_')) {
const expGanada = palabra.length >= 8 ? Math.floor(Math.random() * 6500) : Math.floor(Math.random() * 350)
global.db.data.users[sender].exp += expGanada
gam.delete(sender)
return `🎉 *¡FELICIDADES!*\n\n🎯 Palabra correcta: *"${palabra}"*\n🏆 Has ganado: *${expGanada} EXP*\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
}

return `🎮 *AHORCADO*\n${mostrarAhorcado(intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n✍️ *Progreso:* ${mensaje}\n\n📉 Intentos restantes: *${intentos}*\n\n¡Escribe otra letra para continuar!`
}

let handler = async (m, {conn}) => {
const users = global.db.data.users[m.sender]
if (gam.has(m.sender)) return conn.reply(m.chat, '⚠️ Ya tienes un juego en curso. ¡Termina ese primero!', m)

const palabra = elegirPalabraAleatoria()
const letrasAdivinadas = []
const intentos = intentosMaximos
const mensaje = ocultarPalabra(palabra, letrasAdivinadas)

gam.set(m.sender, {palabra, letrasAdivinadas, intentos})
const text = `🪓 *AHORCADO*\n\n✍️ Adivina la palabra:\n${mensaje}\n\n📉 Intentos restantes: *${intentos}*\n\n¡Escribe una letra para comenzar!`
conn.reply(m.chat, text, m)
}

handler.before = async (m, {conn}) => {
const juego = gam.get(m.sender)
if (!juego) return
const {palabra, letrasAdivinadas, intentos} = juego
if (m.text.length === 1 && /^[a-zA-Z]$/.test(m.text)) {
const letra = m.text.toLowerCase()
if (!letrasAdivinadas.includes(letra)) {
letrasAdivinadas.push(letra)
if (!palabra.includes(letra)) {
juego.intentos -= 1
}
}

const mensaje = ocultarPalabra(palabra, letrasAdivinadas)
const respuesta = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, juego.intentos)

if (juego.intentos === 0 || !mensaje.includes('_')) {
conn.reply(m.chat, respuesta, m)
} else {
const letrasErradas = letrasAdivinadas.filter((letra) => !palabra.includes(letra)).join(', ')
gam.set(m.sender, {palabra, letrasAdivinadas, intentos: juego.intentos})
conn.reply(m.chat, `${respuesta}\n\n❌ *Letras incorrectas usadas:* ${letrasErradas || 'Ninguna'}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`, m)
}
} else {
conn.reply(m.chat, '⚠️ *Solo puedes enviar una letra a la vez.*', m)
}
}
handler.help = ['ahorcado']
handler.tags = ['game']
handler.command = ['ahorcado']
handler.register = true

export default handler
