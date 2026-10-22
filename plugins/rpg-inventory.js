import daily from './rpg-daily.js'
import weekly from './rpg-weekly.js'
import monthly from './rpg-monthly.js'
import adventure from './rpg-adventure.js'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'

import moment from 'moment-timezone'
import fs from 'fs'

const inventory = {
others: {
level: true,
limit: true,
health: true,
money: true,
exp: true
},
items: {
bibitanggur: true,
bibitmangga: true,
bibitpisang: true,
bibitapel: true,
bibitjeruk: true,
potion: true,
trash: true,
wood: true,
rock: true,
string: true,
emerald: true,
diamond: true,
gold: true,
iron: true,
upgrader: true
},
durabi: {
sworddurability: true,
pickaxedurability: true,
fishingroddurability: true,
armordurability: true
},
tools: {
armor: {
0: '❌',
1: 'Leather Armor',
2: 'Iron Armor',
3: 'Gold Armor',
4: 'Diamond Armor',
5: 'Emerald Armor',
6: 'Crystal Armor',
7: 'Obsidian Armor',
8: 'Netherite Armor',
9: 'Wither Armor',
10: 'Dragon Armor',
11: 'Hacker Armor'
},
sword: {
0: '❌',
1: 'Wooden Sword',
2: 'Stone Sword',
3: 'Iron Sword',
4: 'Gold Sword',
5: 'Copper Sword',
6: 'Diamond Sword',
7: 'Emerald Sword',
8: 'Obsidian Sword',
9: 'Netherite Sword',
10: 'Samurai Slayer Green Sword',
11: 'Hacker Sword'
},
pickaxe: {
0: '❌',
1: 'Wooden Pickaxe',
2: 'Stone Pickaxe',
3: 'Iron Pickaxe',
4: 'Gold Pickaxe',
5: 'Copper Pickaxe',
6: 'Diamond Pickaxe',
7: 'Emerlad Pickaxe',
8: 'Crystal Pickaxe',
9: 'Obsidian Pickaxe',
10: 'Netherite Pickaxe',
11: 'Hacker Pickaxe'
},
fishingrod: true
},
crates: {
common: true,
uncoommon: true,
mythic: true,
pet: true,
legendary: true
},
pets: {
horse: 10,
cat: 10,
fox: 10,
dog: 10,
robo: 10,
lion: 10,
rhinoceros: 10,
dragon: 10,
centaur: 10,
kyubi: 10,
griffin: 10,
phonix: 10,
wolf: 10
},
cooldowns: {
lastclaim: {
name: 'claim',
time: daily.cooldown
},
lastweekly: {
name: 'weekly',
time: weekly.cooldown
},
lastmonthly: {
name: 'monthly',
time: monthly.cooldown
},
lastadventure: {
name: 'adventure',
time: adventure.cooldown
}
}
}
let handler = async (m, {conn, args, command, jid, text, usedPrefix}) => {
let imgr = flaaa.getRandom()
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
if (typeof global.db.data.users[who] == 'Sin Datos | No Dates') {
global.db.data.users[who] = {
exp: 0,
limit: 20,
lastclaim: 0,
registered: false,
name: conn.getName(m.sender),
age: -1,
regTime: -1,
afk: -1,
afkReason: '',
banned: false,
level: 0,
lastweekly: 0,
role: 'Novato',
autolevelup: false,
money: 0,
pasangan: ''
}
}

if (!args[0]) {
/*const sections = [
    {
	title: comienzo + ' ❖ 𝗜𝗡𝗩𝗘𝗡𝗧𝗔𝗥𝗜𝗢 - 𝗜𝗡𝗩𝗘𝗡𝗧𝗢𝗥𝗬 ❖ ' + fin,
	rows: [
{title: "დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘙𝘛𝘐𝘊𝘜𝘓𝘖𝘚 : 𝘐𝘛𝘌𝘔𝘚", rowId: usedPrefix + command + ' 1'},
{title: "დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘊𝘖𝘔𝘉𝘈𝘛𝘌 : 𝘊𝘖𝘔𝘉𝘈𝘛", rowId: usedPrefix + command + ' 2'},
{title: "დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘔𝘐𝘚𝘐𝘖𝘕𝘌𝘚 : 𝘔𝘐𝘚𝘚𝘐𝘖𝘕", rowId: usedPrefix + command + ' 3'},
{title: "დ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘊𝘖𝘔𝘗𝘓𝘌𝘛𝘖 : 𝘚𝘜𝘗𝘗𝘓𝘐𝘌𝘚", rowId: usedPrefix + command + ' 4'}
]
},{
	title: comienzo + ' ❖ 𝗔𝗟𝗜𝗠𝗘𝗡𝗧𝗢𝗦 𝗬 𝗔𝗡𝗜𝗠𝗔𝗟𝗘𝗦 ❖ ' + fin,
	rows: [
{title: "ღ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘓𝘐𝘔𝘌𝘕𝘛𝘖𝘚 𝘠 𝘈𝘕𝘐𝘔𝘈𝘓𝘌𝘚 : 𝘍𝘖𝘖𝘋", rowId: usedPrefix + 'alimentos'},
{title: "ღ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘕𝘐𝘔𝘈𝘓𝘌𝘚 𝘈𝘛𝘙𝘈𝘗𝘈𝘋𝘖𝘚 : HUNT", rowId: usedPrefix + 'animales'}
]}
]

const listMessage = {
  text: `✨ *AVERIGUA EL INVENTARIO QUE TIENES*\n✨ *FIND OUT YOUR INVENTORY*`,
  footer: global.wm,
  title: `*»»—— ֎ INVENTARIO : INVENTORY ֎ —-««*`,
  buttonText: `🔖 SELECCIONE AQUÍ 🔖`,
  sections
}*/
await conn.reply(
m.chat,
`✨ *AVERIGUA EL INVENTARIO QUE TIENES*\n✨ *FIND OUT YOUR INVENTORY*\n\n*»»—— ֎ INVENTARIO : INVENTORY ֎ —-««*\nდ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘙𝘛𝘐𝘊𝘜𝘓𝘖𝘚 : 𝘐𝘛𝘌𝘔𝘚\n${usedPrefix + command} 1\nდ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘊𝘖𝘔𝘉𝘈𝘛𝘌 : 𝘊𝘖𝘔𝘉𝘈𝘛\n${usedPrefix + command} 2\nდ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘔𝘐𝘚𝘐𝘖𝘕𝘌𝘚 : 𝘔𝘐𝘚𝘚𝘐𝘖𝘕\n${usedPrefix + command} 3\nდ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘊𝘖𝘔𝘗𝘓𝘌𝘛𝘖 : 𝘚𝘜𝘗𝘗𝘓𝘐𝘌𝘚\n${usedPrefix + command} 4\n\n❖ 𝗔𝗟𝗜𝗠𝗘𝗡𝗧𝗢𝗦 𝗬 𝗔𝗡𝗜𝗠𝗔𝗟𝗘𝗦 ❖\nღ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘓𝘐𝘔𝘌𝘕𝘛𝘖𝘚 𝘠 𝘈𝘕𝘐𝘔𝘈𝘓𝘌𝘚 : 𝘍𝘖𝘖𝘋\n${usedPrefix + command} alimentos\nღ 𝘐𝘕𝘝𝘌𝘕𝘛𝘈𝘙𝘐𝘖 - 𝘈𝘕𝘐𝘔𝘈𝘓𝘌𝘚 𝘈𝘛𝘙𝘈𝘗𝘈𝘋𝘖𝘚 : HUNT\n${usedPrefix + command} animales\n${wm}`,
m
)
//await conn.sendMessage(m.chat, listMessage, {quoted: fkontak})
}

if (args[0] == '1') {
// Inventario 1

let member = global.db.data.users[m.sender]
let healt = member.health
let level = member.level
let rol = member.role
let pasangan = member.pasangan
let warn = member.warn
let money = member.money
let exp = member.exp
let token = member.joincount
let dia = member.limit
let tiketm = member.healtmonster

let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
let sortedmakananpet = Object.entries(global.db.data.users).sort((a, b) => b[1].makananpet - a[1].makananpet)
let sortedbatu = Object.entries(global.db.data.users).sort((a, b) => b[1].batu - a[1].batu)
let sortediron = Object.entries(global.db.data.users).sort((a, b) => b[1].iron - a[1].iron)
let sortedkayu = Object.entries(global.db.data.users).sort((a, b) => b[1].kayu - a[1].kayu)
let sortedstring = Object.entries(global.db.data.users).sort((a, b) => b[1].string - a[1].string)
let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
let sorteduncoommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
let sortedpet = Object.entries(global.db.data.users).sort((a, b) => b[1].pet - a[1].pet)
let usersmoney = sortedmoney.map((v) => v[0])
let userslevel = sortedlevel.map((v) => v[0])
let usersdiamond = sorteddiamond.map((v) => v[0])
let userspotion = sortedpotion.map((v) => v[0])
let userssampah = sortedsampah.map((v) => v[0])
let usersmakananpet = sortedmakananpet.map((v) => v[0])
let usersbatu = sortedbatu.map((v) => v[0])
let usersiron = sortediron.map((v) => v[0])
let userskayu = sortedkayu.map((v) => v[0])
let usersstring = sortedstring.map((v) => v[0])
let userscommon = sortedcommon.map((v) => v[0])
let usersuncoommon = sorteduncoommon.map((v) => v[0])
let usersmythic = sortedmythic.map((v) => v[0])
let userslegendary = sortedlegendary.map((v) => v[0])
let userspet = sortedpet.map((v) => v[0])

let {min, max} = xpRange(level, global.multiplier)
let pareja = global.db.data.users[m.sender].pasangan

let str = `🏷️ *INVENTARIO | INVENTORY* 
👤» *${name}* ( @${who.split('@')[0]} )\n
╭━━━━━━━━━⬣
┃ *𝗜𝗡𝗩𝗘𝗡𝗧𝗔𝗥𝗜𝗢 𝗗𝗘 𝗔𝗥𝗧𝗜𝗖𝗨𝗟𝗢𝗦* 
┃ *𝙄𝙏𝙀𝙈 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('health')} » ${healt}* 
┃ ${rpgg.emoticon('level')} *Nivel : Level » ${level}*
┃ ${rpgg.emoticon('role')} *Rango : Role* 
┃ *»* ${rol}
┃ *${rpgg.emoticon('premium')} ${member.premium ? '✅ VIP : Premium' : 'Limitado : Free'}*
┃ 🏦 *Banco : Bank » ${member.bank}*
┃ 💞 *Pareja : MyLove* 
┃ *» ${pasangan ? `${name} 💝 ${conn.getName(pareja)}` : '❌'}*
┃ ⚠️ *Advertencia : Warn » ${warn}/4*
┃ 🚷 *Baneado(a) : Banned » No*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ 𝗣𝗥𝗢𝗗𝗨𝗖𝗧𝗢𝗦 𝗩𝗔𝗟𝗜𝗢𝗦𝗢𝗦
┃ 𝗩𝗔𝗟𝗨𝗔𝗕𝗟𝗘 𝗣𝗥𝗢𝗗𝗨𝗖𝗧𝗦
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ ${rpgg.emoticon('exp')} *Exp » ${exp}*
┃ ${rpgg.emoticon('limit')} *Diamante : Diamond » ${dia}*
┃ ${rpgg.emoticon('money')} *ZentraCoins: » ${money}*
┃ ${rpgg.emoticon('joincount')} *Token » ${token}*
┃ *${rpgshop.emoticon('emerald')} » ${member.emerald}*
┃ *${rpgshop.emoticon('berlian')} » ${member.berlian}*
┃ *${rpgshop.emoticon('tiketcoin')} » ${member.tiketcoin}*
┃ *${rpgshop.emoticon('kyubi')} » ${member.kyubi}*
┃ *${rpgshop.emoticon('diamond')} » ${member.diamond}*
┃ *${rpgshop.emoticon('gold')} » ${member.gold}*
┃ *${rpgshop.emoticon('stamina')} » ${member.stamina}%*
┃ 🎟️ *Cupón : Coupon » ${member.cupon}*
┃ 📉 *Gastos : Expg » ${member.expg}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ 𝗦𝗨𝗣𝗘𝗥𝗩𝗜𝗩𝗘𝗡𝗖𝗜𝗔
┃ 𝗦𝗨𝗥𝗩𝗜𝗩𝗔𝗟 𝗜𝗧𝗘𝗠
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('potion')} » ${member.potion}*
┃ *${rpgshop.emoticon('aqua')} » ${member.aqua}*
┃ *${rpgshop.emoticon('trash')} » ${member.trash}*
┃ *${rpgshop.emoticon('wood')} » ${member.wood}*
┃ *${rpgshop.emoticon('rock')} » ${member.rock}*
┃ *${rpgshop.emoticon('batu')} » ${member.batu}*
┃ *${rpgshop.emoticon('string')} » ${member.string}*
┃ *${rpgshop.emoticon('iron')} » ${member.iron}*
┃ *${rpgshop.emoticon('coal')} » ${member.coal}*
┃ *${rpgshop.emoticon('botol')} » ${member.botol}*
┃ *${rpgshop.emoticon('kaleng')} » ${member.kaleng}*
┃ *${rpgshop.emoticon('kardus')} » ${member.kardus}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ 𝗢𝗕𝗝𝗘𝗧𝗢𝗦 𝗠𝗜𝗦𝗧𝗘𝗥𝗜𝗢𝗦𝗢𝗦
┃ 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗢𝗕𝗝𝗘𝗖𝗧𝗦
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('eleksirb')} » ${member.eleksirb}*
┃ *${rpgshop.emoticon('emasbatang')} » ${member.emasbatang}*
┃ *${rpgshop.emoticon('emasbiasa')} » ${member.emasbiasa}*
┃ *${rpgshop.emoticon('rubah')} » ${member.rubah}*
┃ *${rpgshop.emoticon('emas')} » ${member.emas}*
┃ *${rpgshop.emoticon('sampah')} » ${member.sampah}*
┃ *${rpgshop.emoticon('serigala')} » ${member.serigala}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('sword')} » ${member.sword}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('umpan')} » ${member.umpan}*
┃ *${rpgshop.emoticon('healtmonster')} » ${member.healtmonster}*
┃ *${rpgshop.emoticon('pancingan')} » ${member.pancingan}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpg.emoticon('ramuan')} » ${member.ramuan}*
┃ *🧭 Reloj : Reloj » ${member.arlok}*
╰━━━━━━━━━⬣

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${name}* ( @${who.split('@')[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top ZentraCoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*
\n
*⚠️ Advertido(a) : Warn » ${warn}*
*🚫 Baneado(a) : Banned » ${member.banned ? '✅' : '❌'}*\n`.trim() //`
    conn.reply(m.chat, str, m)
    //await conn.sendButton(m.chat, `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${member.premium ? "✅": "❌"}*\n${wm}`, str, imgr + `Inventario : Inventory`, [[`🤺 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘾𝙤𝙢𝙗𝙖𝙩𝙚`, `${usedPrefix}inventario 2`],[`🏕️ 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖𝙧 | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚`, `${usedPrefix}adventure`],['💗 𝙈𝙚𝙣𝙪 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖 | 𝙍𝙋𝙂', '.rpgmenu']], fkontak, m, { mentions: conn.parseMention(str) })
  } else if (args[0] == '2') {
    // Inventario 2

    let user = global.db.data.users[m.sender]
    let healt = user.health

    let pickaxe = user.pickaxe
    let sword = user.sword
    let armor = user.armor
    let fishingrod = user.fishingrod

    let kuda = user.kuda
    let rubah = user.rubah
    let kucing = user.kucing
    let anjing = user.anjing

    let _rubah = user.anakrubah
    let _kucing = user.anakkucing
    let _kuda = user.anakkuda
    let _anjing = user.anakanjing

    //armor
    let adurability = user.armordurability
    //sword
    let sdurability = user.sworddurability
    //pickaxe
    let pdurability = user.pickaxedurability

    let pancing = user.pancing
    let fdurability = user.fishingroddurability

    let bow = user.bow
    let bdurability = user.bowdurability

    let naga = user.naga
    let _naga = user.anaknaga

    let phonix = user.phonix
    let _phonix = user.anakphonix

    let centaur = user.centaur
    let _centaur = user.anakcentaur

    let griffin = user.griffin
    let _griffin = user.anakgriffin

    let serigala = user.serigala
    let _serigala = user.anakserigala

    let level = user.level
    let {min, max} = xpRange(level, global.multiplier)

    //const pets = Object.keys(inventory.pets).map(v => user[v] && `*${global.rpg.emoticon(v)} » ${user[v] >= inventory.pets[v] ? '*Nivel Máximo : Max Level*' : `Nivel : Level* \n*» ${user[v]}*\n`}`).filter(v => v).join('\n').trim()
    const cooldowns = Object.entries(inventory.cooldowns)
      .map(([cd, {name, time}]) => cd in user && `*✧ ${name}*: ${new Date() - user[cd] >= time ? '✅' : '❌'}`)
      .filter((v) => v)
      .join('\n')
      .trim()
    // ${Object.keys(inventory.others).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n')}${tools ? `

const caption = `👤» *${name}* ( @${who.split('@')[0]} )\n
🛣️ 𝗘𝗦𝗧𝗥𝗔𝗧𝗘𝗚𝗜𝗔𝗦 | 𝗔𝗡𝗜𝗠𝗔𝗟𝗘𝗦
🌄 𝗦𝗧𝗥𝗔𝗧𝗘𝗚𝗜𝗘𝗦 | 𝗔𝗡𝗜𝗠𝗔𝗟𝗦

╭━━━━━━━━━⬣
┃ *𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘 𝗖𝗢𝗠𝗕𝗔𝗧𝗘*
┃ *𝗖𝗢𝗠𝗕𝗔𝗧 𝗦𝗧𝗔𝗧𝗨𝗦*
┃
┃ *${rpg.emoticon('health')}* 
┃ *» ${healt}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('pickaxe')}* 
┃ *» ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgshopp.emoticon('sword')} *Espada | Sword*
┃ *» ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgg.emoticon('armor')} *Armadura | Armor* 
┃ *» ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ 🎣 *Caña de Pescar | FishingRod* 
┃ *» ${fishingrod}* 
╰━━━━━━━━━⬣

*╭───━• ESTRATEGIAS*
*╭────━• STRATEGIES*
*│🥼 Armadura : Armor:* 
*│➠ ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
*│🥼⇡ Durabilidad : Durability:* 
*│↸ ${adurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⚔️ Espada : Sword* 
*│➠ ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || (sword > 0 && sword < 5) ? `Ketahanan (*${sword}* / *${sword * 100}*)` : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
*│⚔️⇡ Durabilidad : Durability:* 
*│↸ ${sdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⛏️ Pico : Peak* 
*│➠ ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│⛏️⇡ Durabilidad : Durability:* 
*│↸ ${pdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🎣 Caña de pescar : Fishing Rod* 
*│➠ ${pancing == 0 ? 'No tengo | I do not have' : '' || pancing == 1 ? 'Nivel | Level ✦ 1' : '' || pancing == 2 ? 'Nivel | Level ✦ 2' : '' || pancing == 3 ? 'Nivel | Level ✦ 3' : '' || pancing == 4 ? 'Nivel | Level ✦ 4' : '' || pancing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│🎣⇡ Durabilidad : Durability:* 
*│↸ ${fdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🏹 Arco : Bow*
*│➠ ${bow == 0 ? 'No tengo | I do not have' : '' || bow == 1 ? '✦ Arco de Poca Distancia || 1' : '' || bow == 2 ? '✦ Flechas Mejoradas || 2' : '' || bow == 3 ? '✦ Arco de última tecnología || 3' : '' || bow == 4 ? '✦ Arco Explosivo || 4' : '' || bow == 5 ? '✦ Arco Nuclear || 5' : ''}*
*│🏹⇡ Durabilidad : Durability:* 
*│↸ ${bdurability}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣
┃ *𝗖𝗔𝗝𝗔𝗦 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗔𝗦*
┃ *𝗕𝗢𝗫𝗘𝗦 𝗙𝗢𝗨𝗡𝗗*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('common')}*
┃ *» ${user.common}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('uncoommon')}*
┃ *» ${user.uncoommon}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('mythic')}*
┃ *» ${user.mythic}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('pet')}*
┃ *» ${user.pet}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('legendary')}*
┃ *» ${user.legendary}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('petFood')}*
┃ *» ${user.petFood}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('gardenboxs')}*
┃ *» ${user.gardenboxs}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣
┃ *𝗠𝗔𝗦𝗖𝗢𝗧𝗔𝗦 : 𝗣𝗘𝗧𝗦*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kuda')}*
┃ *${kuda == 0 ? 'No tengo Mascota : I do not have pet' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('fox')}*
┃ *${rubah == 0 ? 'No tengo Mascota : I do not have pet' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kucing')}*
┃ *${kucing == 0 ? 'No tengo Mascota : I do not have pet' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('anjing')}*
┃ *${anjing == 0 ? 'No tengo Mascota : I do not have pet' : '' || anjing == 1 ? 'Nivel | Level ✦ 1' : '' || anjing == 2 ? 'Nivel | Level ✦ 2' : '' || anjing == 3 ? 'Nivel | Level ✦ 3' : '' || anjing == 4 ? 'Nivel | Level ✦ 4' : '' || anjing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
╰━━━━━━━━━⬣

*PROGRESO : PROGRESS*
*╭────────────┄⸙*
*│ ${rpg.emoticon('level')} » ${user.level}*
*│ ${rpg.emoticon('role')}*
*│ »* ${user.role}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🦊 Zorro : Fox*
*│* ${rubah == 0 ? '*No tengo | I do not have*' : '' || (rubah > 0 && rubah < 5) ? `*Nivel/Level ${rubah} A Nivel/To Level ${rubah + 1}*\n*│* Exp *${_rubah}* -> *${rubah * 100}*` : '' || rubah == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐈 Gato : Cat* 
*│* ${kucing == 0 ? '*No tengo | I do not have*' : '' || (kucing > 0 && kucing < 5) ? `*Nivel/Level ${kucing} A Nivel/To Level ${kucing + 1}*\n*│* Exp *${_kucing}* -> *${kucing * 100}*` : '' || kucing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐎 Caballo : Horse* 
*│* ${kuda == 0 ? '*No tengo | I do not have*' : '' || (kuda > 0 && kuda < 5) ? `*Nivel/Level ${kuda} A Nivel/To Level ${kuda + 1}*\n*│* Exp *${_kuda}* -> *${kuda * 100}*` : '' || kuda == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐶 Perro : Dog* 
*│* ${anjing == 0 ? '*No tengo | I do not have*' : '' || (anjing > 0 && anjing < 5) ? `*Nivel/Level ${anjing} A Nivel/To Level ${anjing + 1}*\n*│* Exp *${_anjing}* -> *${anjing * 100}*` : '' || anjing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰────┄⸙*

*╭─━• MASCOTAS EN COMBATE*
*╭━• PET COMBAT*
*│${rpg.emoticon('horse')} » ${kuda == 0 ? '❌' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('fox')} » ${rubah == 0 ? '❌' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('cat')} » ${kucing == 0 ? '❌' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('dragon')} » ${naga == 0 ? '❌' : '' || naga == 1 ? 'Nivel | Level ✦ 1' : '' || naga == 2 ? 'Nivel | Level ✦ 2' : '' || naga == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || naga == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('phonix')} » ${phonix == 0 ? '❌' : '' || phonix == 1 ? 'Nivel | Level ✦ 1' : '' || phonix == 2 ? 'Nivel | Level ✦ 2' : '' || phonix == 3 ? 'Nivel | Level ✦ 3' : '' || phonix == 4 ? 'Nivel | Level ✦ 4' : '' || phonix == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('centaur')} » ${centaur == 0 ? '❌' : '' || centaur == 1 ? 'Nivel | Level ✦ 1' : '' || centaur == 2 ? 'Nivel | Level ✦ 2' : '' || centaur == 3 ? 'Nivel | Level ✦ 3' : '' || centaur == 4 ? 'Nivel | Level ✦ 4' : '' || centaur == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('griffin')} » ${griffin == 0 ? '❌' : '' || griffin == 1 ? 'Nivel | Level ✦ 1' : '' || griffin == 2 ? 'Nivel | Level ✦ 2' : '' || griffin == 3 ? 'Nivel | Level ✦ 3' : '' || griffin == 4 ? 'Nivel | Level ✦ 4' : '' || griffin == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('wolf')} » ${serigala == 0 ? '❌' : '' || serigala == 1 ? 'Nivel | Level ✦ 1' : '' || serigala == 2 ? 'Nivel | Level ✦ 2' : '' || serigala == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || serigala == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭* ${htki} *PROGSES* ${htka}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫ ${rpg.emoticon('level')} » ${user.level} ➠  ${user.level + 1}*
*╭┫ ✨ Exp » ${user.exp} ➠ ${max - user.exp}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('fox')}*\n${rubah == 0 ? '*╰┫❌' : '' || (rubah > 0 && rubah < 5) ? `*╰┫ Nivel : Level » ${rubah} ➠ ${rubah + 1}*\n*╭┫ ExpPet » ${_rubah} -> ${rubah * 100}` : '' || rubah == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('cat')}*\n${kucing == 0 ? '*╰┫❌' : '' || (kucing > 0 && kucing < 5) ? `*╰┫ Nivel : Level » ${kucing} ➠ ${kucing + 1}*\n*╭┫ ExpPet » ${_kucing} -> ${kucing * 100}` : '' || kucing == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('horse')}*\n${kuda == 0 ? '*╰┫❌' : '' || (kuda > 0 && kuda < 5) ? `*╰┫ Nivel : Level » ${kuda} ➠ ${kuda + 1}*\n*╭┫ ExpPet » ${_kuda} -> ${kuda * 100}` : '' || kuda == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('dragon')}*\n${naga == 0 ? '*╰┫❌' : '' || (naga > 0 && naga < 5) ? `*╰┫ Nivel : Level » ${naga} ➠ ${naga + 1}*\n*╭┫ ExpPet » ${_naga} -> ${naga * 100}` : '' || naga == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('phonix')}*\n${phonix == 0 ? '*╰┫❌' : '' || (phonix > 0 && phonix < 5) ? `*╰┫ Nivel : Level » ${phonix} ➠ ${phonix + 1}*\n*╭┫ ExpPet » ${_phonix} -> ${phonix * 100}` : '' || phonix == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('centaur')}*\n${centaur == 0 ? '*╰┫❌' : '' || (centaur > 0 && centaur < 5) ? `*╰┫ Nivel : Level » ${centaur} ➠ ${centaur + 1}*\n*╭┫ ExpPet » ${_centaur} -> ${centaur * 100}` : '' || centaur == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('griffin')}*\n${griffin == 0 ? '*╰┫❌' : '' || (griffin > 0 && griffin < 5) ? `*╰┫ Nivel : Level » ${griffin} ➠ ${griffin + 1}*\n*╭┫ ExpPet » ${_griffin} -> ${griffin * 100}` : '' || griffin == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('wolf')}*\n${serigala == 0 ? '*╰┫❌' : '' || (serigala > 0 && serigala < 5) ? `*╰┫ Nivel : Level » *${serigala}* ➠ ${serigala + 1}*\n*╭┫ ExpPet » ${_serigala} -> ${serigala * 100}` : '' || serigala == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰────────────┄⸙*

🤺 *${name}* ( @${who.split('@')[0]} )\n
*✅ » MISIÓN DISPONIBLE : MISSION AVAILABLE*

*❌ » MISIÓN NO DISPONIBLE : MISSION NOT AVAILABLE*

*╭──━• MISIONES*
*╭──━• MISSIONS*
*│ ⛏️⚡ Minar EXP » ${new Date() - user.lastmiming < 600000 ? '❌' : '✅'}*
*│ ⛏️🐱 Minar ZentraCoins » ${new Date() - user.lastcoins < 600000 ? '❌' : '✅'}*
*│ ⛏️💎 Minar Diamantes » ${new Date() - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
*│ ⚗️ Cofre : Coffer » ${new Date() - user.lastcofre < 86400000 ? '❌' : '✅'}* 
*│ 🏹 Caza : Berburu » ${new Date() - user.lastberburu < 2700000 ? '❌' : '✅'}* 
*│ ⛰️ Aventura : Adventure : » ${new Date() - user.lastadventure < 1500000 ? '❌' : '✅'}* 
*│ 🕐 Cada hora : Hourly » ${new Date() - user.lasthourly < 3600000 ? '❌' : '✅'}* 
*│ 📦 Reclamar : Claim » ${new Date() - user.lastclaim < 7200000 ? '❌' : '✅'}* 
*│ 🎁 Semanalmente : Weekly ${new Date() - user.lastweekly < 259200000 ? '❌' : '✅'}* 
*│ 📮 Mensual : Monthly ${new Date() - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*`.trim() //`
    conn.sendFile(m.chat, imgr, 'zentrax.jpg', caption, fkontak, m, {mentions: conn.parseMention(caption)})
    //await conn.sendButton(m.chat, `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${wm}`, caption, imgr + 'Inventario : Inventory', [[`⚜️ 𝙇𝙞𝙨𝙩𝙖 𝙙𝙚 𝙈𝙞𝙨𝙞𝙤𝙣𝙚𝙨 | 𝙈𝙞𝙨𝙨𝙞𝙤𝙣𝙨`, `${usedPrefix}inventario 3`],	[`🏕️ 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖𝙧 | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚`, `${usedPrefix}adventure`],['💗 𝙈𝙚𝙣𝙪 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖 | 𝙍𝙋𝙂', '.rpgmenu']], fkontak, m, { mentions: conn.parseMention(caption) })
  } else if (args[0] == '4') {
    // Inventario 3

    let member = global.db.data.users[m.sender]
    let user = global.db.data.users[m.sender]
    let usuario = global.db.data.users[m.sender]

    let healt = member.health
    //let level = member.level
    let rol = member.role
    let pasangan = member.pasangan
    let warn = member.warn
    let money = member.money
    let exp = member.exp
    let token = member.joincount
    let dia = member.limit
    let tiketm = member.healtmonster

    let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
    let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedmakananpet = Object.entries(global.db.data.users).sort((a, b) => b[1].makananpet - a[1].makananpet)
    let sortedbatu = Object.entries(global.db.data.users).sort((a, b) => b[1].batu - a[1].batu)
    let sortediron = Object.entries(global.db.data.users).sort((a, b) => b[1].iron - a[1].iron)
    let sortedkayu = Object.entries(global.db.data.users).sort((a, b) => b[1].kayu - a[1].kayu)
    let sortedstring = Object.entries(global.db.data.users).sort((a, b) => b[1].string - a[1].string)
    let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncoommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
    let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
    let sortedpet = Object.entries(global.db.data.users).sort((a, b) => b[1].pet - a[1].pet)
    let sortedgold = Object.entries(global.db.data.users).sort((a, b) => b[1].gold - a[1].gold)
    let sortedarlok = Object.entries(global.db.data.users).sort((a, b) => b[1].arlok - a[1].arlok)

    let usersmoney = sortedmoney.map((v) => v[0])
    let userslevel = sortedlevel.map((v) => v[0])
    let usersdiamond = sorteddiamond.map((v) => v[0])
    let userspotion = sortedpotion.map((v) => v[0])
    let userssampah = sortedsampah.map((v) => v[0])
    let usersmakananpet = sortedmakananpet.map((v) => v[0])
    let usersbatu = sortedbatu.map((v) => v[0])
    let usersiron = sortediron.map((v) => v[0])
    let userskayu = sortedkayu.map((v) => v[0])
    let usersstring = sortedstring.map((v) => v[0])
    let userscommon = sortedcommon.map((v) => v[0])
    let usersuncoommon = sorteduncoommon.map((v) => v[0])
    let usersmythic = sortedmythic.map((v) => v[0])
    let userslegendary = sortedlegendary.map((v) => v[0])
    let userspet = sortedpet.map((v) => v[0])
    let usersgold = sortedgold.map((v) => v[0])
    let usersarlok = sortedarlok.map((v) => v[0])

    let pickaxe = user.pickaxe
    let sword = user.sword
    let armor = user.armor
    let fishingrod = user.fishingrod

    //armor
    let adurability = user.armordurability
    //sword
    let sdurability = user.sworddurability
    //pickaxe
    let pdurability = user.pickaxedurability

    let pancing = user.pancing
    let fdurability = user.fishingroddurability

    let bow = user.bow
    let bdurability = user.bowdurability

    let naga = user.naga
    let _naga = user.anaknaga

    let phonix = user.phonix
    let _phonix = user.anakphonix

    let centaur = user.centaur
    let _centaur = user.anakcentaur

    let griffin = user.griffin
    let _griffin = user.anakgriffin

    let serigala = user.serigala
    let _serigala = user.anakserigala

    let level = user.level
    let {min, max} = xpRange(level, global.multiplier)

    let kuda = user.kuda
    let rubah = user.rubah
    let kucing = user.kucing
    let anjing = user.anjing

    let _rubah = user.anakrubah
    let _kucing = user.anakkucing
    let _kuda = user.anakkuda
    let _anjing = user.anakanjing

    let ayam = user.ayam
    let kambing = user.kambing
    let sapi = user.sapi
    let kerbau = user.kerbau
    let babi = user.babi
    let harimau = user.harimau
    let banteng = user.banteng
    let monyet = user.monyet
    let babihutan = user.babihutan
    let panda = user.panda
    let gajah = user.gajah
    let buaya = user.buaya

    let paus = user.paus
    let kepiting = user.kepiting
    let gurita = user.gurita
    let cumi = user.cumi
    let buntal = user.buntal
    let dory = user.dory
    let lumba = user.lumba
    let lobster = user.lobster
    let hiu = user.hiu
    let udang = user.udang
    let ikan = user.ikan
    let orca = user.orca
    let pancingan = user.pancingan
    let _pancingan = user.anakpancingan

    //let makananpet = user.makananpet
    let ayamb = user.ayamb
    let ayamg = user.ayamg
    let sapir = user.sapir
    let ssapi = user.ssapi

    let makananpet = user.makananpet
    let makanannaga = user.makanannaga
    let makananphonix = user.makananphonix
    let makanangriffin = user.makanangriffin
    let makanankyubi = user.makanankyubi
    let makanancentaur = user.makanancentaur

    let mangga = user.mangga
    let anggur = user.anggur
    let pisang = user.pisang
    let jeruk = user.jeruk
    let apel = user.apel

    let bibitanggur = user.bibitanggur
    let bibitjeruk = user.bibitjeruk
    let bibitapel = user.bibitapel
    let bibitmangga = user.bibitmangga
    let bibitpisang = user.bibitpisang
    //let number = `${PhoneNumber('+' + pasangan.replace('@s.whatsapp.net', '')).getNumber('international')}`

    let pepe = flaaa.getRandom()
    let pp = pepe + 'Inventario : Inventory'
    let str = `🎒 *𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 𝙏𝙊𝙏𝘼𝙇*
🎒 *𝙏𝙊𝙏𝘼𝙇 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔*
${readMore}
╭━━━━━━━━━⬣
┃ *𝗜𝗡𝗩𝗘𝗡𝗧𝗔𝗥𝗜𝗢 𝗗𝗘 𝗔𝗥𝗧𝗜𝗖𝗨𝗟𝗢𝗦* 
┃ *𝙄𝙏𝙀𝙈 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('health')} » ${healt}* 
┃ ${rpgg.emoticon('level')} *Nivel : Level » ${level}*
┃ ${rpgg.emoticon('role')} *Rango : Role* 
┃ *»* ${rol}
┃ *${rpgg.emoticon('premium')} ${member.premium ? '✅ VIP : Premium' : 'Limitado : Free'}*
┃ 🏦 *Banco : Bank » ${member.bank}*
┃ 💞 *Pareja : Pasangan »* ${pasangan ? `@${pasangan.split('@')[0]}` : '❌'}
┃ ⚠️ *Advertencia : Warn » ${warn}*
┃ 🚷 *Baneado(a) : Banned » No*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ 𝗣𝗥𝗢𝗗𝗨𝗖𝗧𝗢𝗦 𝗩𝗔𝗟𝗜𝗢𝗦𝗢𝗦
┃ 𝗩𝗔𝗟𝗨𝗔𝗕𝗟𝗘 𝗣𝗥𝗢𝗗𝗨𝗖𝗧𝗦
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ ${rpgg.emoticon('exp')} *Exp » ${exp}*
┃ ${rpgg.emoticon('limit')} *Diamante : Diamond » ${dia}*
┃ ${rpgg.emoticon('money')} *ZentraCoins: » ${money}*
┃ ${rpgg.emoticon('joincount')} *Token » ${token}*
┃ *${rpgshop.emoticon('emerald')} » ${member.emerald}*
┃ *${rpgshop.emoticon('berlian')} » ${member.berlian}*
┃ *${rpgshop.emoticon('tiketcoin')} » ${member.tiketcoin}*
┃ *${rpgshop.emoticon('kyubi')} » ${member.kyubi}*
┃ *${rpgshop.emoticon('diamond')} » ${member.diamond}*
┃ *${rpgshop.emoticon('gold')} » ${member.gold}*
┃ *${rpgshop.emoticon('stamina')} » ${member.stamina}%*
┃ 🎟️ *Cupón : Coupon » ${member.cupon}*
┃ 📉 *Gastos : Expg » ${member.expg}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ 𝗦𝗨𝗣𝗘𝗥𝗩𝗜𝗩𝗘𝗡𝗖𝗜𝗔
┃ 𝗦𝗨𝗥𝗩𝗜𝗩𝗔𝗟 𝗜𝗧𝗘𝗠
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('potion')} » ${member.potion}*
┃ *${rpgshop.emoticon('aqua')} » ${member.aqua}*
┃ *${rpgshop.emoticon('trash')} » ${member.trash}*
┃ *${rpgshop.emoticon('wood')} » ${member.wood}*
┃ *${rpgshop.emoticon('rock')} » ${member.rock}*
┃ *${rpgshop.emoticon('batu')} » ${member.batu}*
┃ *${rpgshop.emoticon('string')} » ${member.string}*
┃ *${rpgshop.emoticon('iron')} » ${member.iron}*
┃ *${rpgshop.emoticon('coal')} » ${member.coal}*
┃ *${rpgshop.emoticon('botol')} » ${member.botol}*
┃ *${rpgshop.emoticon('kaleng')} » ${member.kaleng}*
┃ *${rpgshop.emoticon('kardus')} » ${member.kardus}*
┃
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╮
┃ 𝗢𝗕𝗝𝗘𝗧𝗢𝗦 𝗠𝗜𝗦𝗧𝗘𝗥𝗜𝗢𝗦𝗢𝗦
┃ 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗢𝗕𝗝𝗘𝗖𝗧𝗦
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸╯
┃ *${rpgshop.emoticon('eleksirb')} » ${member.eleksirb}*
┃ *${rpgshop.emoticon('emasbatang')} » ${member.emasbatang}*
┃ *${rpgshop.emoticon('emasbiasa')} » ${member.emasbiasa}*
┃ *${rpgshop.emoticon('rubah')} » ${member.rubah}*
┃ *${rpgshop.emoticon('emas')} » ${member.emas}*
┃ *${rpgshop.emoticon('sampah')} » ${member.sampah}*
┃ *${rpgshop.emoticon('serigala')} » ${member.serigala}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('sword')} » ${member.sword}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpgshop.emoticon('umpan')} » ${member.umpan}*
┃ *${rpgshop.emoticon('healtmonster')} » ${member.healtmonster}*
┃ *${rpgshop.emoticon('pancingan')} » ${member.pancingan}*
┃ *${rpgshop.emoticon('kayu')} » ${member.kayu}*
┃ *${rpg.emoticon('ramuan')} » ${member.ramuan}*
┃ *🧭 Reloj : Reloj » ${member.arlok}*
╰━━━━━━━━━⬣

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${name}* ( @${who.split('@')[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top ZentraCoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*

👤» *${name}* ( @${who.split('@')[0]} )\n
🛣️ 𝗘𝗦𝗧𝗥𝗔𝗧𝗘𝗚𝗜𝗔𝗦 | 𝗔𝗡𝗜𝗠𝗔𝗟𝗘𝗦
🌄 𝗦𝗧𝗥𝗔𝗧𝗘𝗚𝗜𝗘𝗦 | 𝗔𝗡𝗜𝗠𝗔𝗟𝗦

╭━━━━━━━━━⬣
┃ *𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘 𝗖𝗢𝗠𝗕𝗔𝗧𝗘*
┃ *𝗖𝗢𝗠𝗕𝗔𝗧 𝗦𝗧𝗔𝗧𝗨𝗦*
┃
┃ *${rpg.emoticon('health')}* 
┃ *» ${healt}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpg.emoticon('pickaxe')}* 
┃ *» ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgshopp.emoticon('sword')} *Espada | Sword*
┃ *» ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ ${rpgg.emoticon('armor')} *Armadura | Armor* 
┃ *» ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ 🎣 *Caña de Pescar | FishingRod* 
┃ *» ${fishingrod}* 
╰━━━━━━━━━⬣

*╭───━• ESTRATEGIAS*
*╭────━• STRATEGIES*
*│🥼 Armadura : Armor:* 
*│➠ ${armor == 0 ? 'No tengo | I do not have' : '' || armor == 1 ? '✦ Armadura de Cuero : Leather Armor' : '' || armor == 2 ? '✦ Armadura de Hierro : Iron Armor' : '' || armor == 3 ? '✦ Armadura Mágica : Magic Armor' : '' || armor == 4 ? '✦ Armadura Robótica : Robotic Armor' : '' || armor == 5 ? 'Armadura Cyborg Estelar : Cyborg Armor ǁ MAX' : ''}*
*│🥼⇡ Durabilidad : Durability:* 
*│↸ ${adurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⚔️ Espada : Sword* 
*│➠ ${sword == 0 ? 'No tengo | I do not have' : '' || sword == 1 ? 'Espada de Cuero ✦ Leather Sword' : '' || sword == 2 ? 'Espada de Hierro ✦ Iron Sword' : '' || sword == 3 ? 'Espada de Oro ✦ Gold Sword' : '' || sword == 4 ? 'Espada de Energía ✦ Energy Sword' : '' || (sword > 0 && sword < 5) ? `Ketahanan (*${sword}* / *${sword * 100}*)` : '' || sword == 5 ? 'Espada Galáctica ✦ Galactic Sword ǁ MAX' : ''}*
*│⚔️⇡ Durabilidad : Durability:* 
*│↸ ${sdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│⛏️ Pico : Peak* 
*│➠ ${pickaxe == 0 ? 'No tengo | I do not have' : '' || pickaxe == 1 ? 'Nivel | Level ✦ 1' : '' || pickaxe == 2 ? 'Nivel | Level ✦ 2' : '' || pickaxe == 3 ? 'Nivel | Level ✦ 3' : '' || pickaxe == 4 ? 'Nivel | Level ✦ 4' : '' || pickaxe == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│⛏️⇡ Durabilidad : Durability:* 
*│↸ ${pdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🎣 Caña de pescar : Fishing Rod* 
*│➠ ${pancing == 0 ? 'No tengo | I do not have' : '' || pancing == 1 ? 'Nivel | Level ✦ 1' : '' || pancing == 2 ? 'Nivel | Level ✦ 2' : '' || pancing == 3 ? 'Nivel | Level ✦ 3' : '' || pancing == 4 ? 'Nivel | Level ✦ 4' : '' || pancing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│🎣⇡ Durabilidad : Durability:* 
*│↸ ${fdurability}*
*│┈┈┈┈┈┈┈┈┈┈┈┈┈*
*│🏹 Arco : Bow*
*│➠ ${bow == 0 ? 'No tengo | I do not have' : '' || bow == 1 ? '✦ Arco de Poca Distancia || 1' : '' || bow == 2 ? '✦ Flechas Mejoradas || 2' : '' || bow == 3 ? '✦ Arco de última tecnología || 3' : '' || bow == 4 ? '✦ Arco Explosivo || 4' : '' || bow == 5 ? '✦ Arco Nuclear || 5' : ''}*
*│🏹⇡ Durabilidad : Durability:* 
*│↸ ${bdurability}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣
┃ *𝗖𝗔𝗝𝗔𝗦 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗔𝗦*
┃ *𝗕𝗢𝗫𝗘𝗦 𝗙𝗢𝗨𝗡𝗗*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('common')}*
┃ *» ${user.common}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('uncoommon')}*
┃ *» ${user.uncoommon}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('mythic')}*
┃ *» ${user.mythic}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('pet')}*
┃ *» ${user.pet}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('legendary')}*
┃ *» ${user.legendary}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('petFood')}*
┃ *» ${user.petFood}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('gardenboxs')}*
┃ *» ${user.gardenboxs}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣
┃ *𝗠𝗔𝗦𝗖𝗢𝗧𝗔𝗦 : 𝗣𝗘𝗧𝗦*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kuda')}*
┃ *${kuda == 0 ? 'No tengo Mascota : I do not have pet' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('fox')}*
┃ *${rubah == 0 ? 'No tengo Mascota : I do not have pet' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('kucing')}*
┃ *${kucing == 0 ? 'No tengo Mascota : I do not have pet' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
┃ ╸╸╸╸╸╸╸╸╸╸╸╸╸╸
┃ *${rpgshop.emoticon('anjing')}*
┃ *${anjing == 0 ? 'No tengo Mascota : I do not have pet' : '' || anjing == 1 ? 'Nivel | Level ✦ 1' : '' || anjing == 2 ? 'Nivel | Level ✦ 2' : '' || anjing == 3 ? 'Nivel | Level ✦ 3' : '' || anjing == 4 ? 'Nivel | Level ✦ 4' : '' || anjing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
╰━━━━━━━━━⬣

*PROGRESO : PROGRESS*
*╭────────────┄⸙*
*│ ${rpg.emoticon('level')} » ${user.level}*
*│ ${rpg.emoticon('role')}*
*│ »* ${user.role}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🦊 Zorro : Fox*
*│* ${rubah == 0 ? '*No tengo | I do not have*' : '' || (rubah > 0 && rubah < 5) ? `*Nivel/Level ${rubah} A Nivel/To Level ${rubah + 1}*\n*│* Exp *${_rubah}* -> *${rubah * 100}*` : '' || rubah == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐈 Gato : Cat* 
*│* ${kucing == 0 ? '*No tengo | I do not have*' : '' || (kucing > 0 && kucing < 5) ? `*Nivel/Level ${kucing} A Nivel/To Level ${kucing + 1}*\n*│* Exp *${_kucing}* -> *${kucing * 100}*` : '' || kucing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐎 Caballo : Horse* 
*│* ${kuda == 0 ? '*No tengo | I do not have*' : '' || (kuda > 0 && kuda < 5) ? `*Nivel/Level ${kuda} A Nivel/To Level ${kuda + 1}*\n*│* Exp *${_kuda}* -> *${kuda * 100}*` : '' || kuda == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*│🐶 Perro : Dog* 
*│* ${anjing == 0 ? '*No tengo | I do not have*' : '' || (anjing > 0 && anjing < 5) ? `*Nivel/Level ${anjing} A Nivel/To Level ${anjing + 1}*\n*│* Exp *${_anjing}* -> *${anjing * 100}*` : '' || anjing == 5 ? '*Nivel Máximo : Max Level*' : ''}
*╰────┄⸙*

*╭─━• MASCOTAS EN COMBATE*
*╭━• PET COMBAT*
*│${rpg.emoticon('horse')} » ${kuda == 0 ? '❌' : '' || kuda == 1 ? 'Nivel | Level ✦ 1' : '' || kuda == 2 ? 'Nivel | Level ✦ 2' : '' || kuda == 3 ? 'Nivel | Level ✦ 3' : '' || kuda == 4 ? 'Nivel | Level ✦ 4' : '' || kuda == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('fox')} » ${rubah == 0 ? '❌' : '' || rubah == 1 ? 'Nivel | Level ✦ 1' : '' || rubah == 2 ? 'Nivel | Level ✦ 2' : '' || rubah == 3 ? 'Nivel | Level ✦ 3' : '' || rubah == 4 ? 'Nivel | Level ✦ 4' : '' || rubah == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('cat')} » ${kucing == 0 ? '❌' : '' || kucing == 1 ? 'Nivel | Level ✦ 1' : '' || kucing == 2 ? 'Nivel | Level ✦ 2' : '' || kucing == 3 ? 'Nivel | Level ✦ 3' : '' || kucing == 4 ? 'Nivel | Level ✦ 4' : '' || kucing == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('dragon')} » ${naga == 0 ? '❌' : '' || naga == 1 ? 'Nivel | Level ✦ 1' : '' || naga == 2 ? 'Nivel | Level ✦ 2' : '' || naga == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || naga == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('phonix')} » ${phonix == 0 ? '❌' : '' || phonix == 1 ? 'Nivel | Level ✦ 1' : '' || phonix == 2 ? 'Nivel | Level ✦ 2' : '' || phonix == 3 ? 'Nivel | Level ✦ 3' : '' || phonix == 4 ? 'Nivel | Level ✦ 4' : '' || phonix == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('centaur')} » ${centaur == 0 ? '❌' : '' || centaur == 1 ? 'Nivel | Level ✦ 1' : '' || centaur == 2 ? 'Nivel | Level ✦ 2' : '' || centaur == 3 ? 'Nivel | Level ✦ 3' : '' || centaur == 4 ? 'Nivel | Level ✦ 4' : '' || centaur == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('griffin')} » ${griffin == 0 ? '❌' : '' || griffin == 1 ? 'Nivel | Level ✦ 1' : '' || griffin == 2 ? 'Nivel | Level ✦ 2' : '' || griffin == 3 ? 'Nivel | Level ✦ 3' : '' || griffin == 4 ? 'Nivel | Level ✦ 4' : '' || griffin == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│${rpg.emoticon('wolf')} » ${serigala == 0 ? '❌' : '' || serigala == 1 ? 'Nivel | Level ✦ 1' : '' || serigala == 2 ? 'Nivel | Level ✦ 2' : '' || serigala == 3 ? 'Nivel | Level ✦ 3' : '' || naga == 4 ? 'Nivel | Level ✦ 4' : '' || serigala == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭* ${htki} *PROGSES* ${htka}
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫ ${rpg.emoticon('level')} » ${user.level} ➠  ${user.level + 1}*
*╭┫ ✨ Exp » ${user.exp} ➠ ${max - user.exp}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('fox')}*\n${rubah == 0 ? '*╰┫❌' : '' || (rubah > 0 && rubah < 5) ? `*╰┫ Nivel : Level » ${rubah} ➠ ${rubah + 1}*\n*╭┫ ExpPet » ${_rubah} -> ${rubah * 100}` : '' || rubah == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('cat')}*\n${kucing == 0 ? '*╰┫❌' : '' || (kucing > 0 && kucing < 5) ? `*╰┫ Nivel : Level » ${kucing} ➠ ${kucing + 1}*\n*╭┫ ExpPet » ${_kucing} -> ${kucing * 100}` : '' || kucing == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('horse')}*\n${kuda == 0 ? '*╰┫❌' : '' || (kuda > 0 && kuda < 5) ? `*╰┫ Nivel : Level » ${kuda} ➠ ${kuda + 1}*\n*╭┫ ExpPet » ${_kuda} -> ${kuda * 100}` : '' || kuda == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('dragon')}*\n${naga == 0 ? '*╰┫❌' : '' || (naga > 0 && naga < 5) ? `*╰┫ Nivel : Level » ${naga} ➠ ${naga + 1}*\n*╭┫ ExpPet » ${_naga} -> ${naga * 100}` : '' || naga == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('phonix')}*\n${phonix == 0 ? '*╰┫❌' : '' || (phonix > 0 && phonix < 5) ? `*╰┫ Nivel : Level » ${phonix} ➠ ${phonix + 1}*\n*╭┫ ExpPet » ${_phonix} -> ${phonix * 100}` : '' || phonix == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('centaur')}*\n${centaur == 0 ? '*╰┫❌' : '' || (centaur > 0 && centaur < 5) ? `*╰┫ Nivel : Level » ${centaur} ➠ ${centaur + 1}*\n*╭┫ ExpPet » ${_centaur} -> ${centaur * 100}` : '' || centaur == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('griffin')}*\n${griffin == 0 ? '*╰┫❌' : '' || (griffin > 0 && griffin < 5) ? `*╰┫ Nivel : Level » ${griffin} ➠ ${griffin + 1}*\n*╭┫ ExpPet » ${_griffin} -> ${griffin * 100}` : '' || griffin == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰──┬─┄*
*╭──┴─────────┄⸙*
*╰┫${rpg.emoticon('wolf')}*\n${serigala == 0 ? '*╰┫❌' : '' || (serigala > 0 && serigala < 5) ? `*╰┫ Nivel : Level » *${serigala}* ➠ ${serigala + 1}*\n*╭┫ ExpPet » ${_serigala} -> ${serigala * 100}` : '' || serigala == 5 ? 'Nivel | Level ✦ ǁ MAX' : ''}*
*╰────────────┄⸙*

🤺 *${name}* ( @${who.split('@')[0]} )\n
*✅ » MISIÓN DISPONIBLE : MISSION AVAILABLE*

*❌ » MISIÓN NO DISPONIBLE : MISSION NOT AVAILABLE*

*╭──━• MISIONES*
*╭──━• MISSIONS*
*│ ⛏️⚡ Minar EXP » ${new Date() - user.lastmiming < 600000 ? '❌' : '✅'}*
*│ ⛏️🐱 Minar ZentraCoins » ${new Date() - user.lastcoins < 600000 ? '❌' : '✅'}*
*│ ⛏️💎 Minar Diamantes » ${new Date() - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
*│ ⚗️ Cofre : Coffer » ${new Date() - user.lastcofre < 86400000 ? '❌' : '✅'}* 
*│ 🏹 Caza : Berburu » ${new Date() - user.lastberburu < 2700000 ? '❌' : '✅'}* 
*│ ⛰️ Aventura : Adventure : » ${new Date() - user.lastadventure < 1500000 ? '❌' : '✅'}* 
*│ 🕐 Cada hora : Hourly » ${new Date() - user.lasthourly < 3600000 ? '❌' : '✅'}* 
*│ 📦 Reclamar : Claim » ${new Date() - user.lastclaim < 7200000 ? '❌' : '✅'}* 
*│ 🎁 Semanalmente : Weekly ${new Date() - user.lastweekly < 259200000 ? '❌' : '✅'}* 
*│ 📮 Mensual : Monthly ${new Date() - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• 𝗔𝗡𝗜𝗠𝗔𝗟𝗘𝗦 𝗘𝗡 𝗥𝗘𝗦𝗘𝗥𝗩𝗔*
*╭─━• 𝗔𝗡𝗜𝗠𝗔𝗟𝗦 𝗜𝗡 𝗥𝗘𝗦𝗘𝗥𝗩𝗔𝗧𝗜𝗢𝗡*
*│${rpg.emoticon('bull')} ➡️ ${banteng}*
*│${rpg.emoticon('tiger')} ➡️ ${harimau}*
*│${rpg.emoticon('elephant')} ➡️ ${gajah}*
*│${rpg.emoticon('kambing')} ➡️ ${kambing}*
*│${rpg.emoticon('panda')} ➡️ ${panda}*
*│${rpg.emoticon('buaya')} ➡️ ${buaya}*
*│${rpg.emoticon('kerbau')} ➡️ ${kerbau}*
*│${rpg.emoticon('cow')} ➡️ ${sapi}*
*│${rpg.emoticon('monyet')} ➡️ ${monyet}*
*│${rpg.emoticon('Jabali')} ➡️ ${babihutan}*
*│${rpg.emoticon('babi')} ➡️ ${babi}*
*│${rpg.emoticon('ayam')} ➡️ ${ayam}*
*│*
*│🥢 Animales listos para Cocinar*
*│🥢 Animals ready to Cook*
*│💬 Animales totales » ${buaya + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + ayam + sapi + babi + banteng} Para Cocinar*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭────━• 𝗖𝗢𝗠𝗜𝗗𝗔*
*╭────━• 𝗙𝗢𝗢𝗗*
*│🥓 Comida de Mascota : Food Pet » ${makananpet}*
*│🍖 Pollo a la Parrilla : Grilled Chicken » ${ayamb}*
*│🍗 Pollo frito : Fried Chicken » ${ayamg}*
*│🥘 Alimento de Carne : Meat Food » ${sapir}*
*│🥩 Bistec de Carne : Beef Steak » ${ssapi}*
*│*
*│🎒 Total inv » ${makananpet + ayamb + ayamg + sapir + ssapi} Comida*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• 𝗙𝗥𝗨𝗧𝗔𝗦 𝗬 𝗦𝗘𝗠𝗜𝗟𝗟𝗔𝗦*
*╭────━• 𝗙𝗥𝗨𝗜𝗧 & 𝗦𝗘𝗘𝗗*
*│🥭 Mango » ${mangga}*
*│🍇 Uva : Grape » ${anggur}*
*│🍌 Platano : Banana » ${pisang}*
*│🍊 Naranja : Orange » ${jeruk}*
*│🍎 Manzana : Apple » ${apel}*
*│*
*│🌾 Semillas de Mango : Mango Seeds*
*│» ${bibitmangga}*
*│🌾 Semillas de uva : Grape Seeds*
*│» ${bibitanggur}*                                   
*│🌾 Semillas de plátano : Banana Seeds*
*│» ${bibitpisang}*
*│🌾 Semillas de naranja : Orange Seeds*
*│» ${bibitjeruk}*
*│🌾 Semillas de manzana : Apple seeds*
*│» ${bibitapel}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣ 
┃ 🍱 *Alimentos para mascotas: Pet Food*
┃ » *${makananpet}*
┃ 🕊️ *Comida para Fénix : Phoenix Food*
┃ » *${makananphonix}*
┃ 🐉 *Comida para Dragón : Dragon Food*
┃ » *${makanannaga}*
┃ 🦅 *Comida para Ave : Griffin Food*
┃ » *${makanangriffin}*
┃ 🌀 *Comida Mágica : Magic Food*
┃ » *${makanankyubi}*
┃ 🐐 *Comida para Centauro : Centauro Food*
┃ » *${makanancentaur}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣ 
┃ *𝗣𝗜𝗦𝗖𝗜𝗡𝗔 𝗗𝗘 𝗣𝗘𝗖𝗘𝗦 : 𝗙𝗜𝗦𝗛 𝗣𝗢𝗢𝗟*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón : Shark » ${hiu}*
┃ 🐟 *Pez : Fish » ${ikan}*
┃ 🐠 *Dory : Surgeonfish » ${dory}*
┃ 🐋 *Orca : Killer whale » ${orca}*
┃ 🐳 *Ballena : Whale » ${paus}*
┃ 🦑 *Calamar : Squid » ${cumi}*
┃ 🐙 *Pulpo : Octopus » ${gurita}*
┃ 🐡 *Pez Globo : Blowfish » ${buntal}*
┃ 🦐 *Camarón : Shrimp » ${udang}*
┃ 🐬 *Delfín : Dolphin » ${lumba}*
┃ 🦞 *Langosta : Lobster » ${lobster}*
┃ 🦀 *Cangrejo : Crab » ${kepiting}*
╰━━━━━━━━━⬣

*DATOS DEL GANCHO : HOOK DATA*
*╭────────────────*
*│🪝 Gancho : Hook » ${pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan == 1 ? 'Nivel | Level ✦ 1' : '' || pancingan == 2 ? 'Nivel | Level ✦ 2' : '' || pancingan == 3 ? 'Nivel | Level ✦ 3' : '' || pancingan == 4 ? 'Nivel | Level ✦ 4' : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│ Poder del Gancho*\n*│ ${pancingan == 0 ? 'No tengo | I do not have' : '' || (pancingan > 0 && pancingan < 5) ? `Nivel : Level » ${pancingan} a Nivel ${pancingan + 1}*\n*│ Exp » ${_pancingan} -> ${pancingan * 10000}*` : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*╰────────────────*

╭━━━━━━━━━⬣
┃ *CAJAS : BOX*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃📥 *Cajas : Boxs » ${user.boxs}*
┃📦 *Caja Común : Common Box » ${user.common}*
┃🥡 *Caja Poco Común : Uncommon » ${user.uncoommon}*
┃🗳️ *Caja Mítica : Mythic Box » ${user.mythic}*
┃🎁 *Caja Legendaria : Legendary Box » ${user.legendary}*.
┃🍱 *Caja para Mascota : Pet Box » ${user.pet}*
┃💐 *Caja de Jardinería : Garden boxs » ${user.gardenboxs}*
╰━━━━━━━━━⬣

👤» *${name}* ( @${who.split('@')[0]} )\n
*✅ » MISIÓN DISPONIBLE : MISSION AVAILABLE*

*❌ » MISIÓN NO DISPONIBLE : MISSION NOT AVAILABLE*

*╭──━• MISIONES*
*╭──━• MISSIONS*
*│ ⛏️⚡ Minar EXP » ${new Date() - user.lastmiming < 600000 ? '❌' : '✅'}*
${new Date() - user.lastmiming < 600000 ? `${clockString(user.lastmiming + 600000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️🐱 Minar ZentraCoins » ${new Date() - user.lastcoins < 600000 ? '❌' : '✅'}*
${new Date() - user.lastcoins < 600000 ? `${clockString(user.lastcoins + 600000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️💎 Minar Diamantes » ${new Date() - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
${new Date() - user.lastdiamantes < 900000 ? `${clockString(user.lastdiamantes + 900000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⚗️ Cofre : Coffer » ${new Date() - user.lastcofre < 86400000 ? '❌' : '✅'}* 
${new Date() - user.lastcofre < 86400000 ? `${clockString(user.lastcofre + 86400000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🏹 Caza : Berburu » ${new Date() - user.lastberburu < 2700000 ? '❌' : '✅'}* 
${new Date() - user.lastberburu < 2700000 ? `${clockString(user.lastberburu + 2700000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛰️ Aventura : Adventure : » ${new Date() - user.lastadventure < 1500000 ? '❌' : '✅'}* 
${new Date() - user.lastadventure < 1500000 ? `${clockString(user.lastadventure + 1500000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🕐 Cada hora : Hourly » ${new Date() - user.lasthourly < 3600000 ? '❌' : '✅'}* 
${new Date() - user.lasthourly < 3600000 ? `${clockString(user.lasthourly + 3600000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📦 Reclamar : Claim » ${new Date() - user.lastclaim < 7200000 ? '❌' : '✅'}* 
${new Date() - user.lastclaim < 7200000 ? `${clockString(user.lastclaim + 7200000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🎁 Semanalmente : Weekly ${new Date() - user.lastweekly < 259200000 ? '❌' : '✅'}* 
${new Date() - user.lastweekly < 259200000 ? `${clockString(user.lastweekly + 259200000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📮 Mensual : Monthly ${new Date() - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
${new Date() - user.lastmonthly < 432000000 ? `${clockString(user.lastmonthly + 432000000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│*
*│ PROXIMAMENTE* ⬇️
*│*
*│ 🚀 Cohete : Roket »* ${user.lastroket > 0 ? '✅' : '❌'}
*│ 🚘 Conducir : ngojek »* ${user.lastngojek > 0 ? '✅' : '❌'}
*│ 🚖 taxy: »* ${user.lastgrab > 0 ? '✅' : '❌'}
*│ 👺 Maldición : nebang »* ${user.lastlumber > 0 ? '✅' : '❌'}
*│ 👾 Sacudir : ngocok »* ${user.lastngocok > 0 ? '✅' : '❌'}
*│ ⚔️ Duelo : Duel :* ${user.lastduel > 0 ? '✅' : '❌'}
*│ 🛡️ Guerra : War :* ${user.lastwar > 0 ? '✅' : '❌'}
*│ 🎃 Mazmorras : Dungeon :* ${user.lastdungeon > 0 ? '✅' : '❌'}
*│ 💱 Comercio : Berdagang :* ${user.lastdagang > 0 ? '✅' : '❌'}
*│ 🧺 Jardinería : Berkebun :* ${user.lastberkebon > 0 ? '✅' : '❌'}
*│ 🎣 Pezca : Fishing :* ${user.lastfishing > 0 ? '✅' : '❌'}
*│ 💰 Asistencia social : Bansos :* ${user.lastbansos > 0 ? '✅' : '❌'}
*│*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${name}* ( @${who.split('@')[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top ZentraCoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*
_17.Top Gold_ *${usersgold.indexOf(m.sender) + 1}* _de_ *${usersgold.length}*
_18.Top Clock_ *${usersarlok.indexOf(m.sender) + 1}* _de_ *${usersarlok.length}*` //`
conn.sendFile(m.chat, imgr, 'zentrax.jpg', str, {quoted: fkontak})
//await conn.sendButton(m.chat, `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${wm}`, str, imgr + 'Inventario : Inventory', [[`${healt < 40 ? '❤️ 𝘾𝙐𝙍𝘼𝙍𝙈𝙀 | 𝙃𝙀𝘼𝙇 𝙈𝙀' : '𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖𝙧 | 𝙑𝙚𝙣𝙩𝙪𝙧𝙚 🏕️'}`, `${healt < 40 ? '.heal' : '.adventure'}`],['🏪 𝙏𝙞𝙚𝙣𝙙𝙖 𝙥𝙖𝙧𝙖 𝘾𝙤𝙢𝙥𝙧𝙖𝙧 | 𝘽𝙪𝙮', '.buy'],['🏪 𝙏𝙞𝙚𝙣𝙙𝙖 𝙥𝙖𝙧𝙖 𝙑𝙚𝙣𝙙𝙚𝙧 | 𝙎𝙚𝙡𝙡', '.sell']], m, {quoted: fkontak})
} else if (args[0] == '3') {
// Inventario 4

// let name = m.fromMe ? conn.user : conn.contacts[m.sender]
//let { lastdiamantes, lastcoins, lastmiming, registered, age, lastrampok, lastdagang, lastcofre, lastcodereg, lastberkebon, lasthourly, lastberburu, lastbansos, lastadventure, lastfishing, lastwar, lastduel, lastmining, lastdungeon, lastclaim, lastweekly, lastmonthly } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let name = m.sender
let usuario = await conn.getName(name)

let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
let sortedmakananpet = Object.entries(global.db.data.users).sort((a, b) => b[1].makananpet - a[1].makananpet)
let sortedbatu = Object.entries(global.db.data.users).sort((a, b) => b[1].batu - a[1].batu)
let sortediron = Object.entries(global.db.data.users).sort((a, b) => b[1].iron - a[1].iron)
let sortedkayu = Object.entries(global.db.data.users).sort((a, b) => b[1].kayu - a[1].kayu)
let sortedstring = Object.entries(global.db.data.users).sort((a, b) => b[1].string - a[1].string)
let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
let sorteduncoommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncoommon - a[1].uncoommon)
let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
let sortedpet = Object.entries(global.db.data.users).sort((a, b) => b[1].pet - a[1].pet)
let sortedgold = Object.entries(global.db.data.users).sort((a, b) => b[1].gold - a[1].gold)
let sortedarlok = Object.entries(global.db.data.users).sort((a, b) => b[1].arlok - a[1].arlok)

let usersmoney = sortedmoney.map((v) => v[0])
let userslevel = sortedlevel.map((v) => v[0])
let usersdiamond = sorteddiamond.map((v) => v[0])
let userspotion = sortedpotion.map((v) => v[0])
let userssampah = sortedsampah.map((v) => v[0])
let usersmakananpet = sortedmakananpet.map((v) => v[0])
let usersbatu = sortedbatu.map((v) => v[0])
let usersiron = sortediron.map((v) => v[0])
let userskayu = sortedkayu.map((v) => v[0])
let usersstring = sortedstring.map((v) => v[0])
let userscommon = sortedcommon.map((v) => v[0])
let usersuncoommon = sorteduncoommon.map((v) => v[0])
let usersmythic = sortedmythic.map((v) => v[0])
let userslegendary = sortedlegendary.map((v) => v[0])
let userspet = sortedpet.map((v) => v[0])
let usersgold = sortedgold.map((v) => v[0])
let usersarlok = sortedarlok.map((v) => v[0])

let str = `
👤» *${usuario}* ( @${who.split('@')[0]} )\n
*✅ » MISIÓN DISPONIBLE : MISSION AVAILABLE*

*❌ » MISIÓN NO DISPONIBLE : MISSION NOT AVAILABLE*

*╭──━• MISIONES*
*╭──━• MISSIONS*
*│ ⛏️⚡ Minar EXP » ${new Date() - user.lastmiming < 600000 ? '❌' : '✅'}*
${new Date() - user.lastmiming < 600000 ? `${clockString(user.lastmiming + 600000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️🐱 Minar ZentraCoins » ${new Date() - user.lastcoins < 600000 ? '❌' : '✅'}*
${new Date() - user.lastcoins < 600000 ? `${clockString(user.lastcoins + 600000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛏️💎 Minar Diamantes » ${new Date() - user.lastdiamantes < 900000 ? '❌' : '✅'}* 
${new Date() - user.lastdiamantes < 900000 ? `${clockString(user.lastdiamantes + 900000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⚗️ Cofre : Coffer » ${new Date() - user.lastcofre < 86400000 ? '❌' : '✅'}* 
${new Date() - user.lastcofre < 86400000 ? `${clockString(user.lastcofre + 86400000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🏹 Caza : Berburu » ${new Date() - user.lastberburu < 2700000 ? '❌' : '✅'}* 
${new Date() - user.lastberburu < 2700000 ? `${clockString(user.lastberburu + 2700000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ ⛰️ Aventura : Adventure : » ${new Date() - user.lastadventure < 1500000 ? '❌' : '✅'}* 
${new Date() - user.lastadventure < 1500000 ? `${clockString(user.lastadventure + 1500000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🕐 Cada hora : Hourly » ${new Date() - user.lasthourly < 3600000 ? '❌' : '✅'}* 
${new Date() - user.lasthourly < 3600000 ? `${clockString(user.lasthourly + 3600000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📦 Reclamar : Claim » ${new Date() - user.lastclaim < 7200000 ? '❌' : '✅'}* 
${new Date() - user.lastclaim < 7200000 ? `${clockString(user.lastclaim + 7200000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 🎁 Semanalmente : Weekly ${new Date() - user.lastweekly < 259200000 ? '❌' : '✅'}* 
${new Date() - user.lastweekly < 259200000 ? `${clockString(user.lastweekly + 259200000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│┈┈┈┈┈┈┈┈┈┈┈┈*
*│ 📮 Mensual : Monthly ${new Date() - user.lastmonthly < 432000000 ? '❌' : '✅'}* 
${new Date() - user.lastmonthly < 432000000 ? `${clockString(user.lastmonthly + 432000000 - new Date())}` : '*│* ✅ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗬𝗔 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘'}
*│*
*│ PROXIMAMENTE* ⬇️
*│*
*│ 🚀 Cohete : Roket »* ${user.lastroket > 0 ? '✅' : '❌'}
*│ 🚘 Conducir : ngojek »* ${user.lastngojek > 0 ? '✅' : '❌'}
*│ 🚖 taxy: »* ${user.lastgrab > 0 ? '✅' : '❌'}
*│ 👺 Maldición : nebang »* ${user.lastlumber > 0 ? '✅' : '❌'}
*│ 👾 Sacudir : ngocok »* ${user.lastngocok > 0 ? '✅' : '❌'}
*│ ⚔️ Duelo : Duel :* ${user.lastduel > 0 ? '✅' : '❌'}
*│ 🛡️ Guerra : War :* ${user.lastwar > 0 ? '✅' : '❌'}
*│ 🎃 Mazmorras : Dungeon :* ${user.lastdungeon > 0 ? '✅' : '❌'}
*│ 💱 Comercio : Berdagang :* ${user.lastdagang > 0 ? '✅' : '❌'}
*│ 🧺 Jardinería : Berkebun :* ${user.lastberkebon > 0 ? '✅' : '❌'}
*│ 🎣 Pezca : Fishing :* ${user.lastfishing > 0 ? '✅' : '❌'}
*│ 💰 Asistencia social : Bansos :* ${user.lastbansos > 0 ? '✅' : '❌'}
*│*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

🏆 *RESUMEN EN LOS TOPS* 🏆 
🚀 *SUMMARY IN THE TOPS* 🚀
👤» *${usuario}* ( @${who.split('@')[0]} )\n
_1.Top Nivel_ *${userslevel.indexOf(m.sender) + 1}* _de_ *${userslevel.length}*
_2.Top ZentraCoins_ *${usersmoney.indexOf(m.sender) + 1}* _de_ *${usersmoney.length}*
_3.Top Diamantes+_ *${usersdiamond.indexOf(m.sender) + 1}* _de_ *${usersdiamond.length}*
_4.Top Poción_ *${userspotion.indexOf(m.sender) + 1}* _de_ *${userspotion.length}*
_5.Top Basura_ *${userssampah.indexOf(m.sender) + 1}* _de_ *${userssampah.length}*
_6.Top Alimento para Mascotas_ *${usersmakananpet.indexOf(m.sender) + 1}* _de_ *${usersmakananpet.length}*
_7.Top Piedra_ *${usersbatu.indexOf(m.sender) + 1}* _de_ *${usersbatu.length}*
_8.Top Hierro_ *${usersiron.indexOf(m.sender) + 1}* _de_ *${usersiron.length}*
_9.Top Madera_ *${userskayu.indexOf(m.sender) + 1}* _de_ *${userskayu.length}*
_10.Top Cuerda_ *${usersstring.indexOf(m.sender) + 1}* _de_ *${usersstring.length}*
_11.Top Caja Común_ *${userscommon.indexOf(m.sender) + 1}* _de_ *${userscommon.length}*
_13.Top Caja poco Común_ *${usersuncoommon.indexOf(m.sender) + 1}* _de_ *${usersuncoommon.length}*
_14.Top Caja Mítica_ *${usersmythic.indexOf(m.sender) + 1}* _de_ *${usersmythic.length}*
_15.Top Caja Legendaria_ *${userslegendary.indexOf(m.sender) + 1}* _de_ *${userslegendary.length}*
_16.Top Caja para Mascota_ *${userspet.indexOf(m.sender) + 1}* _de_ *${userspet.length}*
_17.Top Gold_ *${usersgold.indexOf(m.sender) + 1}* _de_ *${usersgold.length}*
_18.Top Clock_ *${usersarlok.indexOf(m.sender) + 1}* _de_ *${usersarlok.length}*`.trim()
/*
*Hero*
My Hero: *${hero == 0 ? 'Tidak Punya' : '' || hero == 1 ? 'Level 1' : '' || hero == 2 ? 'Level 2' : '' || hero == 3 ? 'Level 3' : '' || hero == 4 ? 'Level 4' : '' || hero == 5 ? 'Level 5' : '' || hero == 6 ? 'Level 6' : '' || hero == 7 ? 'Level 7' : '' || hero == 8 ? 'Level 8' : '' || hero == 9 ? 'Level 9' : '' || hero == 10 ? 'Level 10' : '' || hero == 11 ? 'Level 11' : '' || hero == 12 ? 'Level 12' : '' || hero == 13 ? 'Level 13' : '' || hero == 14 ? 'Level 14' : '' || hero == 15 ? 'Level 15' : '' || hero == 16 ? 'Level 16' : '' || hero == 17 ? 'Level 17' : '' || hero == 18 ? 'Level 18' : '' || hero == 19 ? 'Level 19' : '' || hero == 20 ? 'Level 20' : '' || hero == 21 ? 'Level 21' : '' || hero == 22 ? 'Level 22' : '' || hero == 23 ? 'Level 23' : '' || hero == 24 ? 'Level 24' : '' || hero == 25 ? 'Level 25' : '' || hero == 26 ? 'Level 26' : '' || hero == 27 ? 'Level 27' : '' || hero == 28 ? 'Level 28' : '' || hero == 29 ? 'Level 29' : '' || hero == 30 ? 'Level 30' : '' || hero == 31 ? 'Level 31' : '' || hero == 32 ? 'Level 32' : '' || hero == 33 ? 'Level 33' : '' || hero == 34 ? 'Level 34' : '' || hero == 35 ? 'Level 35' : '' || hero == 36 ? 'Level 36' : '' || hero == 37 ? 'Level 37'  : '' || hero == 38 ? 'Level 38' : '' || hero == 39 ? 'Level 39' : '' || hero == 40 ? 'Level MAX' : ''}*

*Pet*
Kucing: *${kucing == 0 ? 'Tidak Punya' : '' || kucing == 1 ? 'Level 1' : '' || kucing == 2 ? 'Level 2' : '' || kucing == 3 ? 'Level 3' : '' || kucing == 4 ? 'Level 4' : '' || kucing == 5 ? 'Level MAX' : ''}*
Kuda: *${kuda == 0 ? 'Tidak Punya' : '' || kuda == 1 ? 'Level 1' : '' || kuda == 2 ? 'Level 2' : '' || kuda == 3 ? 'Level 3' : '' || kuda == 4 ? 'Level 4' : '' || kuda == 5 ? 'Level MAX' : ''}*
Naga: *${naga == 0 ? 'Tidak Punya' : '' || naga == 1 ? 'Level 1' : '' || naga == 2 ? 'Level 2' : '' || naga == 3 ? 'Level 3' : '' || naga == 4 ? 'Level 4' : '' || naga == 5 ? 'Level 5' : '' || naga == 6 ? 'Level 6' : '' || naga == 7 ? 'Level 7' : '' || naga == 8 ? 'Level 8' : '' || naga == 9 ? 'Level 9' : '' || naga == 10 ? 'Level 10' : '' || naga == 11 ? 'Level 11' : '' || naga == 12 ? 'Level 12' : '' || naga == 13 ? 'Level 13' : '' || naga == 14 ? 'Level 14' : '' || naga == 15 ? 'Level 15' : '' || naga == 16 ? 'Level 16' : '' || naga == 17 ? 'Level 17' : '' || naga == 18 ? 'Level 18' : '' || naga == 19 ? 'Level 19' : '' || naga == 20 ? 'Level MAX' : ''}*
Kyubi: *${kyubi == 0 ? 'Tidak Punya' : '' || kyubi == 1 ? 'Level 1' : '' || kyubi == 2 ? 'Level 2' : '' || kyubi == 3 ? 'Level 3' : '' || kyubi == 4 ? 'Level 4' : '' || kyubi == 5 ? 'Level 5' : '' || kyubi == 6 ? 'Level 6' : '' || kyubi == 7 ? 'Level 7' : '' || kyubi == 8 ? 'Level 8' : '' || kyubi == 9 ? 'Level 9' : '' || kyubi == 10 ? 'Level 10' : '' || kyubi == 11 ? 'Level 11' : '' || kyubi == 12 ? 'Level 12' : '' || kyubi == 13 ? 'Level 13' : '' || kyubi == 14 ? 'Level 14' : '' || kyubi == 15 ? 'Level 15' : '' || kyubi == 16 ? 'Level 16' : '' || kyubi == 17 ? 'Level 17' : '' || kyubi == 18 ? 'Level 18' : '' || kyubi == 19 ? 'Level 19' : '' || kyubi == 20 ? 'Level MAX' : ''}*
Centaur: *${centaur == 0 ? 'Tidak Punya' : '' || centaur == 1 ? 'Level 1' : '' || centaur == 2 ? 'Level 2' : '' || centaur == 3 ? 'Level 3' : '' || centaur == 4 ? 'Level 4' : '' || centaur == 5 ? 'Level 5' : '' || centaur == 6 ? 'Level 6' : '' || centaur == 7 ? 'Level 7' : '' || centaur == 8 ? 'Level 8' : '' || centaur == 9 ? 'Level 9' : '' || centaur == 10 ? 'Level 10' : '' || centaur == 11 ? 'Level 11' : '' || centaur == 12 ? 'Level 12' : '' || centaur == 13 ? 'Level 13' : '' || centaur == 14 ? 'Level 14' : '' || centaur == 15 ? 'Level 15' : '' || centaur == 16 ? 'Level 16' : '' || centaur == 17 ? 'Level 17' : '' || centaur == 18 ? 'Level 18' : '' || centaur == 19 ? 'Level 19' : '' || centaur == 20 ? 'Level MAX' : ''}*
Rubah: *${rubah == 0 ? 'Tidak Punya' : '' || rubah == 1 ? 'Level 1' : '' || rubah == 2 ? 'Level 2' : '' || rubah == 3 ? 'Level 3' : '' || rubah == 4 ? 'Level 4' : '' || rubah == 5 ? 'Level MAX' : ''}*  
Phonix: *${phonix == 0 ? 'Tidak Punya' : '' || phonix == 1 ? 'Level 1' : '' || phonix == 2 ? 'Level 2' : '' || phonix == 3 ? 'Level 3' : '' || phonix == 4 ? 'Level 4' : '' || phonix == 5 ? 'Level 5' : '' || phonix == 6 ? 'Level 6' : '' || phonix == 7 ? 'Level 7' : '' || phonix == 8 ? 'Level 8' : '' || phonix == 9 ? 'Level 9' : '' || phonix == 10 ? 'Level 10' : '' || phonix == 11 ? 'Level 11' : '' || phonix == 12 ? 'Level 12' : '' || phonix == 13 ? 'Level 13' : '' || phonix == 14 ? 'Level 14' : '' || phonix == 15 ? 'Level MAX' : ''}*
Griffin: *${griffin == 0 ? 'Tidak Punya' : '' || griffin == 1 ? 'Level 1' : '' || griffin == 2 ? 'Level 2' : '' || griffin == 3 ? 'Level 3' : '' || griffin == 4 ? 'Level 4' : '' || griffin == 5 ? 'Level 5' : '' || griffin == 6 ? 'Level 6' : '' || griffin == 7 ? 'Level 7' : '' || griffin == 8 ? 'Level 8' : '' || griffin == 9 ? 'Level 9' : '' || griffin == 10 ? 'Level 10' : '' || griffin == 11 ? 'Level 11' : '' || griffin == 12 ? 'Level 12' : '' || griffin == 13 ? 'Level 13' : '' || griffin == 14 ? 'Level 14' : '' || griffin == 15 ? 'Level MAX' : ''}*
Serigala: *${serigala == 0 ? 'Tidak Punya' : '' || serigala == 1 ? 'Level 1' : '' || serigala == 2 ? 'Level 2' : '' || serigala == 3 ? 'Level 3' : '' || serigala == 4 ? 'Level 4' : '' || serigala == 5 ? 'Level 5' : '' || serigala == 6 ? 'Level 6' : '' || serigala == 7 ? 'Level 7' : '' || serigala == 8 ? 'Level 8' : '' || serigala == 9 ? 'Level 9' : '' || serigala == 10 ? 'Level 10' : '' || serigala == 11 ? 'Level 11' : '' || serigala == 12 ? 'Level 12' : '' || serigala == 13 ? 'Level 13' : '' || serigala == 14 ? 'Level 14' : '' || serigala == 15 ? 'Level MAX' : ''}*\n
*Proges*
╭────────────────
│Level *${level}* To Level *${level}*
│Exp *${exp}* -> *${max}*
│
│Hero ${hero == 0 ? 'Tidak Punya' : '' || hero > 0 && hero < 40 ? `Level *${hero}* To level *${hero + 1}*\n│Exp *${exphero}* -> *${hero *500}*` : '' || hero == 40 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Rubah ${rubah == 0 ? 'Tidak Punya' : '' || rubah > 0 && rubah < 5 ? `Level *${rubah}* To level *${rubah + 1}*\n│Exp *${_rubah}* -> *${rubah *1000}*` : '' || rubah == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kucing ${kucing == 0 ? 'Tidak Punya' : '' || kucing > 0 && kucing < 5 ? `Level *${kucing}* To level *${kucing + 1}*\n│Exp *${_kucing}* -> *${kucing *1000}*` : '' || kucing == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kuda ${kuda == 0 ? 'Tidak Punya' : '' || kuda > 0 && kuda < 5 ? `Level *${kuda}* To level *${kuda + 1}*\n│Exp *${_kuda}* -> *${kuda *1000}*` : '' || kuda == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Naga ${naga == 0 ? 'Tidak Punya' : '' || naga > 0 && naga < 20 ? `Level *${naga}* To level *${naga + 1}*\n│Exp *${_naga}* -> *${naga *10000}*` : '' || naga == 20 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Phonix ${phonix == 0 ? 'Tidak Punya' : '' || phonix > 0 && phonix < 15 ? `Level *${phonix}* To level *${phonix + 1}*\n│Exp *${_phonix}* -> *${phonix *10000}*` : '' || phonix == 15 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kyubi ${kyubi == 0 ? 'Tidak Punya' : '' || kyubi > 0 && kyubi < 20 ? `Level *${kyubi}* To level *${kyubi + 1}*\n│Exp *${_kyubi}* -> *${kyubi *10000}*` : '' || kyubi == 20 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Centaur ${centaur == 0 ? 'Tidak Punya' : '' || centaur > 0 && centaur < 20 ? `Level *${centaur}* To level *${centaur + 1}*\n│Exp *${_centaur}* -> *${centaur *10000}*` : '' || centaur == 20 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Griffin ${griffin == 0 ? 'Tidak Punya' : '' || griffin > 0 && griffin < 15 ? `Level *${griffin}* To level *${griffin + 1}*\n│Exp *${_griffin}* -> *${griffin *10000}*` : '' || griffin == 15 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Serigala ${serigala == 0 ? 'Tidak Punya' : '' || serigala > 0 && serigala < 15 ? `Level *${serigala}* To level *${serigala + 1}*\n│Exp *${_serigala}* -> *${serigala *10000}*` : '' || serigala == 15? '*Max Level*' : ''}
╰────────────────\n\n
*/
conn.sendFile(m.chat, imgr, 'zentrax.jpg', str, fkontak, m, {mentions: conn.parseMention(str)})
//await conn.sendButton(m.chat, `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${wm}`, str, imgr + 'Inventario : Inventory', [     [`🍱 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘼𝙡𝙞𝙢𝙚𝙣𝙩𝙤𝙨 `, `${usedPrefix}alimentos`],[`🎒 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙩𝙤𝙩𝙖𝙡`, `${usedPrefix}inventario 4`],	['💗 𝙈𝙚𝙣𝙪 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖 | 𝙍𝙋𝙂', '.rpgmenu']], fkontak, m, { mentions: conn.parseMention(str) })
} else if (command == 'alimentos') {
// Inventario piscina

let user = global.db.data.users[m.sender]
let ayam = user.ayam
let kambing = user.kambing
let sapi = user.sapi
let kerbau = user.kerbau
let babi = user.babi
let harimau = user.harimau
let banteng = user.banteng
let monyet = user.monyet
let babihutan = user.babihutan
let panda = user.panda
let gajah = user.gajah
let buaya = user.buaya

let paus = user.paus
let kepiting = user.kepiting
let gurita = user.gurita
let cumi = user.cumi
let buntal = user.buntal
let dory = user.dory
let lumba = user.lumba
let lobster = user.lobster
let hiu = user.hiu
let udang = user.udang
let ikan = user.ikan
let orca = user.orca
let pancingan = user.pancingan
let _pancingan = user.anakpancingan

//let makananpet = user.makananpet
let ayamb = user.ayamb
let ayamg = user.ayamg
let sapir = user.sapir
let ssapi = user.ssapi

let makananpet = user.makananpet
let makanannaga = user.makanannaga
let makananphonix = user.makananphonix
let makanangriffin = user.makanangriffin
let makanankyubi = user.makanankyubi
let makanancentaur = user.makanancentaur

let mangga = user.mangga
let anggur = user.anggur
let pisang = user.pisang
let jeruk = user.jeruk
let apel = user.apel

let bibitanggur = user.bibitanggur
let bibitjeruk = user.bibitjeruk
let bibitapel = user.bibitapel
let bibitmangga = user.bibitmangga
let bibitpisang = user.bibitpisang

let aineh = `
*╭──━• 𝗔𝗡𝗜𝗠𝗔𝗟𝗘𝗦 𝗘𝗡 𝗥𝗘𝗦𝗘𝗥𝗩𝗔*
*╭─━• 𝗔𝗡𝗜𝗠𝗔𝗟𝗦 𝗜𝗡 𝗥𝗘𝗦𝗘𝗥𝗩𝗔𝗧𝗜𝗢𝗡*
*│${rpg.emoticon('bull')} ➡️ ${banteng}*
*│${rpg.emoticon('tiger')} ➡️ ${harimau}*
*│${rpg.emoticon('elephant')} ➡️ ${gajah}*
*│${rpg.emoticon('kambing')} ➡️ ${kambing}*
*│${rpg.emoticon('panda')} ➡️ ${panda}*
*│${rpg.emoticon('buaya')} ➡️ ${buaya}*
*│${rpg.emoticon('kerbau')} ➡️ ${kerbau}*
*│${rpg.emoticon('cow')} ➡️ ${sapi}*
*│${rpg.emoticon('monyet')} ➡️ ${monyet}*
*│${rpg.emoticon('Jabali')} ➡️ ${babihutan}*
*│${rpg.emoticon('babi')} ➡️ ${babi}*
*│${rpg.emoticon('ayam')} ➡️ ${ayam}*
*│*
*│🥢 Animales listos para Cocinar*
*│🥢 Animals ready to Cook*
*│💬 Animales totales » ${buaya + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + ayam + sapi + babi + banteng} Para Cocinar*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭────━• 𝗖𝗢𝗠𝗜𝗗𝗔*
*╭────━• 𝗙𝗢𝗢𝗗*
*│🥓 Comida de Mascota : Food Pet » ${makananpet}*
*│🍖 Pollo a la Parrilla : Grilled Chicken » ${ayamb}*
*│🍗 Pollo frito : Fried Chicken » ${ayamg}*
*│🥘 Alimento de Carne : Meat Food » ${sapir}*
*│🥩 Bistec de Carne : Beef Steak » ${ssapi}*
*│*
*│🎒 Total inv » ${makananpet + ayamb + ayamg + sapir + ssapi} Comida*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

*╭──━• 𝗙𝗥𝗨𝗧𝗔𝗦 𝗬 𝗦𝗘𝗠𝗜𝗟𝗟𝗔𝗦*
*╭────━• 𝗙𝗥𝗨𝗜𝗧 & 𝗦𝗘𝗘𝗗*
*│🥭 Mango » ${mangga}*
*│🍇 Uva : Grape » ${anggur}*
*│🍌 Platano : Banana » ${pisang}*
*│🍊 Naranja : Orange » ${jeruk}*
*│🍎 Manzana : Apple » ${apel}*
*│*
*│🌾 Semillas de Mango : Mango Seeds*
*│» ${bibitmangga}*
*│🌾 Semillas de uva : Grape Seeds*
*│» ${bibitanggur}*                                   
*│🌾 Semillas de plátano : Banana Seeds*
*│» ${bibitpisang}*
*│🌾 Semillas de naranja : Orange Seeds*
*│» ${bibitjeruk}*
*│🌾 Semillas de manzana : Apple seeds*
*│» ${bibitapel}*
*╰─⋆─⋆─⋆─⋆─⋆─⋆─⋆─⋆─┄⸙*

╭━━━━━━━━━⬣ 
┃ 🍱 *Alimentos para mascotas: Pet Food*
┃ » *${makananpet}*
┃ 🕊️ *Comida para Fénix : Phoenix Food*
┃ » *${makananphonix}*
┃ 🐉 *Comida para Dragón : Dragon Food*
┃ » *${makanannaga}*
┃ 🦅 *Comida para Ave : Griffin Food*
┃ » *${makanangriffin}*
┃ 🌀 *Comida Mágica : Magic Food*
┃ » *${makanankyubi}*
┃ 🐐 *Comida para Centauro : Centauro Food*
┃ » *${makanancentaur}*
╰━━━━━━━━━⬣

╭━━━━━━━━━⬣ 
┃ *𝗣𝗜𝗦𝗖𝗜𝗡𝗔 𝗗𝗘 𝗣𝗘𝗖𝗘𝗦 : 𝗙𝗜𝗦𝗛 𝗣𝗢𝗢𝗟*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃ 🦈 *Tiburón : Shark » ${hiu}*
┃ 🐟 *Pez : Fish » ${ikan}*
┃ 🐠 *Dory : Surgeonfish » ${dory}*
┃ 🐋 *Orca : Killer whale » ${orca}*
┃ 🐳 *Ballena : Whale » ${paus}*
┃ 🦑 *Calamar : Squid » ${cumi}*
┃ 🐙 *Pulpo : Octopus » ${gurita}*
┃ 🐡 *Pez Globo : Blowfish » ${buntal}*
┃ 🦐 *Camarón : Shrimp » ${udang}*
┃ 🐬 *Delfín : Dolphin » ${lumba}*
┃ 🦞 *Langosta : Lobster » ${lobster}*
┃ 🦀 *Cangrejo : Crab » ${kepiting}*
╰━━━━━━━━━⬣

*DATOS DEL GANCHO : HOOK DATA*
*╭────────────────*
*│🪝 Gancho : Hook » ${pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan == 1 ? 'Nivel | Level ✦ 1' : '' || pancingan == 2 ? 'Nivel | Level ✦ 2' : '' || pancingan == 3 ? 'Nivel | Level ✦ 3' : '' || pancingan == 4 ? 'Nivel | Level ✦ 4' : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}*
*│ Poder del Gancho » ${pancingan == 0 ? 'No tengo | I do not have' : '' || (pancingan > 0 && pancingan < 5) ? `Nivel : Level » ${pancingan} a Nivel ${pancingan + 1}*\n*│ Exp » ${_pancingan} -> ${pancingan * 10000}*` : '' || pancingan == 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''}
*╰────────────────*

╭━━━━━━━━━⬣
┃ *CAJAS : BOX*
┃ *╸╸╸╸╸╸╸╸╸╸╸╸╸╸*
┃📥 *Cajas : Boxs » ${user.boxs}*
┃📦 *Caja Común : Common Box » ${user.common}*
┃🥡 *Caja Poco Común : Uncommon » ${user.uncoommon}*
┃🗳️ *Caja Mítica : Mythic Box » ${user.mythic}*
┃🎁 *Caja Legendaria : Legendary Box » ${user.legendary}*.
┃🍱 *Caja para Mascota : Pet Box » ${user.pet}*
┃💐 *Caja de Jardinería : Garden boxs » ${user.gardenboxs}*
╰━━━━━━━━━⬣`.trim()
conn.sendFile(m.chat, imgr, 'zentrax.jpg', aineh, fkontak, m)
}
//await conn.sendButton(m.chat, `*𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*\n${wm}`, aineh, imgr + 'Inventario : Inventory', [[`🐈 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙙𝙚 𝘼𝙣𝙞𝙢𝙖𝙡𝙚𝙨`, `${usedPrefix}animales`],[`🎒 𝙄𝙣𝙫𝙚𝙣𝙩𝙖𝙧𝙞𝙤 𝙩𝙤𝙩𝙖𝙡`, `${usedPrefix}inventario 4`],['𝙈𝙚𝙣𝙪 𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖 | 𝙍𝙋𝙂 💗', '.rpgmenu']], fkontak, m)}
}
handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = /^(inventory|inv|inventario|alimentos)$/i
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

function clockString(ms) {
let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [
'*│ 𝗡𝗨𝗘𝗩𝗔 𝗠𝗜𝗦𝗜𝗢𝗡 𝗘𝗡 : 𝗠𝗜𝗦𝗦𝗜𝗢𝗡*\n*│* ',
ye,
' *🗓️ Años : Year*\n',
'*│* ',
mo,
' *⛅ Mes : Month*\n',
'*│* ',
d,
' *☀️ Días : Days*\n',
'*│* ',
h,
' *⏰ Horas : Hours*\n',
'*│* ',
m,
' *🕐 Minutos : Minutes*\n',
'*│* ',
s,
' *⏱️ Segundos : Seconds*\n*│*'
]
.map((v) => v.toString().padStart(2, 0))
.join('')
}
