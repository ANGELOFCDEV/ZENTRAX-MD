/**
POR FAVOR TENGAN LA AMABILIDAD Y BONDAD DE NO CAMBIAR MÍNIMAMENTE LOS CRÉDITOS DE ZENTRAX-MD, 
SI VAS A AÑADIR TUS DATOS O CRÉDITOS, ESTA BIEN. PERO NO QUITEN LOS QUE YA ESTAN DE ZENTRAX-MD, GRACIAS 
**/

/** PLEASE BE KIND AND KINDNESS NOT TO MINIMALLY CHANGE ZENTRAX-MD CREDITS, 
IF YOU ARE GOING TO ADD YOUR DATA OR CREDITS, IT'S OK. BUT DO NOT REMOVE THOSE THAT ARE ALREADY FROM ZENTRAX-MD, THANK YOU **/
let handler = async (m, {conn, command, usedPrefix}) => {
let pp = gataMenu
let name = await conn.getName(m.sender)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime =
(await new Promise((resolve) => {
process.once('message', resolve)
setTimeout(resolve, 1000)
})) * 1000
}
let uptime = clockString(_uptime)
let estado = `╭━━━━[ *𝙀𝙎𝙏𝘼𝘿𝙊 | 𝙎𝙏𝘼𝙏𝙐𝙎* ]━━━━━⬣
┃💗 *¡Hola | Hi!* ${name}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃𓃠 *Versión de ${gt}*
┃➥ ${vs}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃✿ 𝗖𝗥𝗘𝗔𝗗𝗢𝗥𝗔 | 𝗖𝗥𝗘𝗔𝗧𝗢𝗥
┃ღ 𝘼𝙉𝙂𝙀𝙇 𝙊𝙁𝘾 𝘿𝙀𝙑
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃✿ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧𝗢 | 𝗖𝗢𝗡𝗧𝗔𝗖𝗧
┃➥ *${ig}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ღ ${global.opts['self'] ? '𝙋𝙍𝙄𝙑𝘼𝘿𝙊 - 𝙋𝙍𝙄𝙑𝘼𝙏𝙀' : '𝙋𝙐𝘽𝙇𝙄𝘾𝙊 - 𝙋𝙐𝘽𝙇𝙄𝘾'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ღ *Activo Durante | Active During* 
┃➥ ${uptime}
┃ღ *Usuario(s) | Users* 
┃➥ ${Object.keys(global.db.data.users).length} 
┃ღ *Chat(s) Prohibido(s) | Forbidden Chats*
┃➥ ${Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned).length} 
┃ღ *Usuario(s) Prohibido(s) | Prohibited Urs*
┃➥ ${Object.entries(global.db.data.users).filter((user) => user[1].banned).length} 
╰━━━━━━━━━━━━━━━━━━⬣`
await conn.sendFile(m.chat, gataImg, 'lp.jpg', estado, fkontak, false, {
contextInfo: {
externalAdReply: {
mediaUrl: null,
mediaType: 1,
description: null,
title: gt,
body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗭𝗘𝗡𝗧𝗥𝗔𝗫-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ',
previewType: 0,
thumbnail: gataImg,
sourceUrl: accountsgb
}
}
})
/*await conn.sendButton(m.chat, estado, `𝘼𝙉𝙂𝙀𝙇 𝙊𝙁𝘾 𝘿𝙀𝙑 - 𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝘾𝙄𝘼\n${asistencia}\n\n` + wm, pp, [
['𝙈𝙚𝙣𝙪́ 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪', '.allmenu'],
['𝙑𝙚𝙡𝙤𝙘𝙞𝙙𝙖𝙙 | 𝙎𝙥𝙚𝙚𝙙', '/ping'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪', '#menu']], null, [
['𝙕𝙀𝙉𝙏𝙍𝘼𝙓-𝙈𝘿', `${md}`]], fakeChannel, m)*/
}
handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(estado|status|estate|state|heygata|stado|stats|botstat(us)?)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':')
}
