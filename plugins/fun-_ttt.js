import { format } from 'util'
let debugMode = !1
//let winScore = 4999
//let playScore = 99
let handler = (m) => m
handler.before = async function (m, {conn}) {
let ok
let isWin = !1
let isTie = !1
let isSurrender = !1
this.game = this.game ? this.game : {}
let room = Object.values(this.game).find(
(room) =>
room.id &&
room.game &&
room.state &&
room.id.startsWith('tictactoe') &&
[room.game.playerX, room.game.playerO].includes(m.sender) &&
room.state == 'PLAYING'
)
if (room) {
if (!/^([1-9]|(me)?nyerah|\rendirse\|rendirse|RENDIRSE|SALIR|salir|Salir|out|OUT|Out|surr?ender)$/i.test(m.text)) return !0
isSurrender = !/^[1-9]$/.test(m.text)
if (m.sender !== room.game.currentTurn) {
if (!isSurrender) return !0
}
if (debugMode)
m.reply(
'[DEBUG]\n' +
require('util').format({
isSurrender,
text: m.text
})
)
if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
m.reply(
{
'-3': 'El juego ha terminado',
'-2': 'Inválido',
'-1': 'Posición inválida',
0: 'Posición inválida'
}[ok]
)
return !0
}
if (m.sender === room.game.winner) isWin = true
else if (room.game.board === 511) isTie = true
let arr = room.game.render().map((v) => {
return {
X: '❎',
O: '⭕',
1: '1️⃣',
2: '2️⃣',
3: '3️⃣',
4: '4️⃣',
5: '5️⃣',
6: '6️⃣',
7: '7️⃣',
8: '8️⃣',
9: '9️⃣'
}[v]
})
if (isSurrender) {
room.game._currentTurn = m.sender === room.game.playerX
isWin = true
}

let dia = Math.floor(Math.random() * 2)
let tok = Math.floor(Math.random() * 2)
let gata = Math.floor(Math.random() * 10)
let expp = Math.floor(Math.random() * 10)

let dia2 = Math.floor(Math.random() * 15)
let tok2 = Math.floor(Math.random() * 10)
let gata2 = Math.floor(Math.random() * 1500)
let expp2 = Math.floor(Math.random() * 2500)

let winner = isSurrender ? room.game.currentTurn : room.game.winner
let str = `
🫂 𝙅𝙐𝙂𝘼𝘿𝙊𝙍𝙀𝙎 *:* 𝙋𝙇𝘼𝙔𝙀𝙍𝙎
*┈┈┈┈┈┈┈┈┈*
❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}
*┈┈┈┈┈┈┈┈┈*
     ${arr.slice(0, 3).join('')}
     ${arr.slice(3, 6).join('')}
     ${arr.slice(6).join('')}
*┈┈┈┈┈┈┈┈┈*
${isWin ? `@${(isSurrender ? room.game.currentTurn : room.game.winner).split('@')[0]} 😎🏆 *GANASTE!!*\n*POR HABER GANADO OBTIENES*\n\n💎 *${dia2} Diamantes*\n🪙 *${tok2} Tokens*\n🐈 *${gata2} ZentraCoins*\n⚡ *${expp2} Exp*` : isTie ? `*EMPATE!!* 🤨\n*POR TERMINAR EN EMPATE AMBOS OBTIENEN*\n\n💎 *${dia} Diamantes*\n🪙 *${tok} Tokens*\n🐈 *${gata} ZentraCoins*\n⚡ *${expp} Exp*` : `🪄 *TURNO DE* @${room.game.currentTurn.split('@')[0]}`}
`.trim()
let users = global.db.data.users
if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
if (room.x !== room.o) await this.sendMessage(room.x, {text: str, mentions: this.parseMention(str)}, {quoted: fkontak, m})
await this.sendMessage(room.o, {text: str, mentions: this.parseMention(str)}, {quoted: fkontak, m})

if (isTie || isWin) {
users[room.game.playerX].limit += dia //empate
users[room.game.playerX].joincount += tok
users[room.game.playerX].money += gata
users[room.game.playerX].exp += expp

users[room.game.playerO].limit += dia //empate
users[room.game.playerO].joincount += tok
users[room.game.playerO].money += gata
users[room.game.playerO].exp += expp

if (isWin) users[winner].limit += dia2 //Ganador
users[winner].joincount += tok2
users[winner].money += gata2
users[winner].exp += expp2

if (debugMode) m.reply('[DEBUG]\n' + format(room))
delete this.game[room.id]
}
}
return !0
}

export default handler
