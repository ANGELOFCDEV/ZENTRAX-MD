import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import translate from '@vitalets/google-translate-api'
import { perplexity } from '../lib/chatgpt.js'
import { Configuration, OpenAIApi } from 'openai'

const apikey_base64 =
'c2stcHJvai1tUzN4bGZueXo0UjBPWV8zbm1DVDlMQmlmYXhYbVdaa0ptUVFJMDVKR2FxdHZCbk9ncWZjRXdCbEJmMU5WN0lYa0pncVJuM3BNc1QzQmxia0ZKMVJ5aEJzUl93NzRXbll5LWdjdkowT0NQUXliWTBOcENCcDZIOTlCVVVtcWxuTjVraEZxMk43TGlMU0RsU0s1cXA5Tm1kWVZXc0E='

const apikey = Buffer.from(apikey_base64, 'base64').toString('utf-8')
const configuration = new Configuration({apiKey: apikey})
const openai = new OpenAIApi(configuration)

const handler = async (m, {conn, text, usedPrefix, command}) => {
if (usedPrefix == 'a' || usedPrefix == 'A') return
if (!text)
throw `*${lenguajeGB['smsAvisoMG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉𝘼 𝙋𝙀𝙏𝙄𝘾𝙄𝙊𝙉 𝙊 𝙐𝙉𝘼 𝙊𝙍𝘿𝙀𝙉 𝙋𝘼𝙍𝘼 𝙐𝙎𝘼𝙍 𝙇𝘼 𝙁𝙐𝙉𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝘾𝙃𝘼𝙏𝙂𝙋𝙏\n\n❏ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊 𝘿𝙀 𝙋𝙀𝙏𝙄𝘾𝙄𝙊𝙉𝙀𝙎 𝙔 𝙊𝙍𝘿𝙀𝙉𝙀𝙎\n❏ ${usedPrefix + command} Recomienda un top 10 de películas de acción\n❏ ${usedPrefix + command} Codigo en JS para un juego de cartas`
//let syms1 = `Actuaras como un Bot de WhatsApp el cual fue creado por ANGEL OFC DEV, tu seras ZENTRAX-MD 🐈`;
let syms1 = await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then((v) => v.text())

if (command == 'ia' || command == 'chatgpt') {
try {
const messages = [
{role: 'system', content: syms1},
{role: 'user', content: text}
]

const chooseModel = (query) => {
const lowerText = query.toLowerCase()

if (lowerText.includes('código') || lowerText.includes('programación') || lowerText.includes('code') || lowerText.includes('script')) {
return 'codellama-70b-instruct'
} else if (lowerText.includes('noticias') || lowerText.includes('actual') || lowerText.includes('hoy') || lowerText.includes('último')) {
return 'sonar-medium-online'
} else if (lowerText.includes('explica') || lowerText.includes('por qué') || lowerText.includes('razona') || lowerText.includes('analiza')) {
return 'sonar-reasoning-pro'
} else if (lowerText.includes('cómo') || lowerText.includes('paso a paso') || lowerText.includes('instrucciones')) {
return 'mixtral-8x7b-instruct'
} else if (lowerText.includes('charla') || lowerText.includes('habla') || lowerText.includes('dime')) {
return 'sonar-medium-chat'
} else {
return 'sonar-pro'
}
}

const selectedModel = chooseModel(text)
const fallbackModels = Object.keys(perplexity.api.models).filter((m) => m !== selectedModel)
let response = await perplexity.chat(messages, selectedModel)

if (!response.status) {
for (const fallback of fallbackModels) {
try {
response = await perplexity.chat(messages, fallback)
if (response.status) {
//console.log(`Respaldo ${fallback} funcionó`);
break
}
} catch (e) {
console.error(`Falló ${fallback}: ${e.message}`)
}
}
}

if (response.status) {
await m.reply(response.result.response)
}
} catch {
try {
async function getResponse(prompt) {
try {
await delay(1000)
const response = await axios.post(
'https://api.openai.com/v1/chat/completions',
{model: 'gpt-4o-mini', messages: [{role: 'user', content: prompt}], max_tokens: 300},
{
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${apikey}`
}
}
)
return response.data.choices[0].message.content
} catch (error) {
console.error(error)
}
}

const respuesta = await getResponse(text)
m.reply(respuesta)
} catch {
try {
let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`)
let res = await gpt.json()
await m.reply(res.gpt)
/*let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/chatgpt?q=${text}`)
let res = await gpt.json()
await m.reply(res.data)*/
} catch {}
}
}
}

if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
conn.sendPresenceUpdate('composing', m.chat)
let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`)
let res = await gpt.json()
await m.reply(res.gpt)
}
}
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2)$/i
export default handler
