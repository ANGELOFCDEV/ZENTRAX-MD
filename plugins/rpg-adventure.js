import fetch from 'node-fetch'

const cooldown = 1500000 //25 minutos
let handler = async (m, {usedPrefix, conn}) => {
let pp = 'https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300'
let ct = [
'AF',
'AX',
'AL',
'DZ',
'AS',
'AD',
'AO',
'AI',
'AQ',
'AG',
'AR',
'AM',
'AW',
'AU',
'AT',
'AZ',
'BS',
'BH',
'BD',
'BB',
'BY',
'BE',
'BZ',
'BJ',
'BM',
'BT',
'BO',
'BQ',
'BA',
'BW',
'BV',
'BR',
'IO',
'BN',
'BG',
'BF',
'BI',
'KH',
'CM',
'CA',
'CV',
'KY',
'CF',
'TD',
'CL',
'CN',
'CX',
'CC',
'CO',
'KM',
'CG',
'CD',
'CK',
'CR',
'CI',
'HR',
'CU',
'CW',
'CY',
'CZ',
'DK',
'DJ',
'DM',
'DO',
'EC',
'EG',
'SV',
'GQ',
'ER',
'EE',
'ET',
'FK',
'FO',
'FJ',
'FI',
'FR',
'GF',
'PF',
'TF',
'GA',
'GM',
'GE',
'DE',
'GH',
'GI',
'GR',
'GL',
'GD',
'GP',
'GU',
'GT',
'GG',
'GN',
'GW',
'GY',
'HT',
'HM',
'VA',
'HN',
'HK',
'HU',
'IS',
'IN',
'ID',
'IR',
'IQ',
'IE',
'IM',
'IL',
'IT',
'JM',
'JP',
'JE',
'JO',
'KZ',
'KE',
'KI',
'KP',
'KR',
'XK',
'KW',
'KG',
'LA',
'LV',
'LB',
'LS',
'LR',
'LY',
'LI',
'LT',
'LU',
'MO',
'MK',
'MG',
'MW',
'MY',
'MV',
'ML',
'MT',
'MH',
'MQ',
'MR',
'MU',
'YT',
'MX',
'FM',
'MD',
'MC',
'MN',
'ME',
'MS',
'MA',
'MZ',
'MM',
'NA',
'NR',
'NP',
'NL',
'AN',
'NC',
'NZ',
'NI',
'NE',
'NG',
'NU',
'NF',
'MP',
'NO',
'OM',
'PK',
'PW',
'PS',
'PA',
'PG',
'PY',
'PE',
'PH',
'PN',
'PL',
'PT',
'PR',
'QA',
'RS',
'RE',
'RO',
'RU',
'RW',
'BL',
'SH',
'KN',
'LC',
'MF',
'PM',
'VC',
'WS',
'SM',
'ST',
'SA',
'SN',
'CS',
'SC',
'SL',
'SG',
'SX',
'SK',
'SI',
'SB',
'SO',
'ZA',
'GS',
'SS',
'ES',
'LK',
'SD',
'SR',
'SJ',
'SZ',
'SE',
'CH',
'SY',
'TW',
'TJ',
'TZ',
'TH',
'TL',
'TG',
'TK',
'TO',
'TT',
'TN',
'TR',
'XT',
'TM',
'TC',
'TV',
'UG',
'UA',
'AE',
'GB',
'US',
'UM',
'UY',
'UZ',
'VU',
'VE',
'VN',
'VG',
'VI',
'WF',
'EH',
'YE',
'ZM',
'ZW'
]

let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
let kt = await ke.json()
let imgr = flaaa.getRandom()
let user = global.db.data.users[m.sender]
let timers = cooldown - (new Date() - user.lastadventure)
if (user.health < 80)
return await conn.reply(
m.chat,
`${htki} 𝘽𝘼𝙅𝘼 𝙎𝘼𝙇𝙐𝘿 ${htka}\n\n𝙏𝙐 𝙎𝘼𝙇𝙐𝘿 💔 𝙀𝙎𝙏𝘼 𝙋𝙊𝙍 𝘿𝙀𝘽𝘼𝙅𝙊 𝘿𝙀 *80!!*\n𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝘾𝙐𝙍𝘼𝙏𝙀 𝙋𝙍𝙄𝙈𝙀𝙍𝙊 𝙋𝘼𝙍𝘼 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼𝙍 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊\n\n𝙔𝙊𝙐𝙍 𝙃𝙀𝘼𝙇𝙏𝙃 💔 𝙄𝙎 𝘽𝙀𝙇𝙊𝙒 *80!!*\n𝙋𝙇𝙀𝘼𝙎𝙀 𝙃𝙀𝘼𝙇 𝙁𝙄𝙍𝙎𝙏 𝙏𝙊 𝘼𝘿𝙑𝙀𝙉𝙏𝙐𝙍𝙀 𝘼𝙂𝘼𝙄𝙉\n\nMALA SALUD : BAD HEALTH\n${wm}`,
fkontak,
imgr,
m
)
/*conn.sendButton(m.chat,`${htki} 𝘽𝘼𝙅𝘼 𝙎𝘼𝙇𝙐𝘿 ${htka}`,
`𝙏𝙐 𝙎𝘼𝙇𝙐𝘿 💔 𝙀𝙎𝙏𝘼 𝙋𝙊𝙍 𝘿𝙀𝘽𝘼𝙅𝙊 𝘿𝙀 *80!!*
𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝘾𝙐𝙍𝘼𝙏𝙀 𝙋𝙍𝙄𝙈𝙀𝙍𝙊 𝙋𝘼𝙍𝘼 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼𝙍 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊\n\n𝙔𝙊𝙐𝙍 𝙃𝙀𝘼𝙇𝙏𝙃 💔 𝙄𝙎 𝘽𝙀𝙇𝙊𝙒 *80!!*\n𝙋𝙇𝙀𝘼𝙎𝙀 𝙃𝙀𝘼𝙇 𝙁𝙄𝙍𝙎𝙏 𝙏𝙊 𝘼𝘿𝙑𝙀𝙉𝙏𝙐𝙍𝙀 𝘼𝙂𝘼𝙄𝙉`.trim(), imgr + 'MALA SALUD : BAD HEALTH', [
[`❤️ 𝘾𝙐𝙍𝘼𝙍𝙈𝙀 | 𝙃𝙀𝘼𝙇 𝙈𝙀`, `${usedPrefix}heal`],
[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 | 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `${usedPrefix}inventory`]], fkontak, m)*/

if (new Date() - user.lastadventure <= cooldown)
return await conn.reply(
m.chat,
`${htki} 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝘼𝙉𝘿𝙊 ${htka}\n\n𝙔𝘼 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼𝙎𝙏𝙀!! 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙀𝙎𝙋𝙀𝙍𝘼 𝙃𝘼𝙎𝙏𝘼 𝙌𝙐𝙀 𝙏𝙀𝙍𝙈𝙄𝙉𝙀 𝙀𝙇 𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙊 𝙔𝙊𝙐 𝘼𝙇𝙍𝙀𝘼𝘿𝙔 𝘼𝘿𝙑𝙀𝙉𝙏𝙐𝙍𝙀𝘿!! 𝙋𝙇𝙀𝘼𝙎𝙀 𝙒𝘼𝙄𝙏 𝙐𝙉𝙏𝙄𝙇 𝙏𝙃𝙀 𝘽𝙍𝙀𝘼𝙆 𝙏𝙄𝙈𝙀 𝙄𝙎 𝙊𝙑𝙀𝙍 ⏱️ ${timers.toTimeString()}\n\nDESCANSANDO : RESTING\n${wm}`,
fkontak,
imgr,
m
)
//conn.sendButton(m.chat, `${htki} 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝘼𝙉𝘿𝙊 ${htka}`,`𝙔𝘼 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼𝙎𝙏𝙀!! 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙀𝙎𝙋𝙀𝙍𝘼 𝙃𝘼𝙎𝙏𝘼 𝙌𝙐𝙀 𝙏𝙀𝙍𝙈𝙄𝙉𝙀 𝙀𝙇 𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙊 𝙔𝙊𝙐 𝘼𝙇𝙍𝙀𝘼𝘿𝙔 𝘼𝘿𝙑𝙀𝙉𝙏𝙐𝙍𝙀𝘿!! 𝙋𝙇𝙀𝘼𝙎𝙀 𝙒𝘼𝙄𝙏 𝙐𝙉𝙏𝙄𝙇 𝙏𝙃𝙀 𝘽𝙍𝙀𝘼𝙆 𝙏𝙄𝙈𝙀 𝙄𝙎 𝙊𝙑𝙀𝙍  ⏱️ ${timers.toTimeString()}`.trim(), imgr + 'DESCANSANDO : RESTING', [[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 | 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `${usedPrefix}inventory`], [`🔔 𝙍𝙀𝘾𝙇𝘼𝙈𝙊 𝘿𝙄𝘼𝙍𝙄𝙊 | 𝘿𝘼𝙄𝙇𝙔`, `${usedPrefix}daily`]], fkontak, m)

const rewards = reward(user)
let text = `🛫 𝙀𝙎𝙏𝘼𝙎 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼𝙉𝘿𝙊 𝙀𝙉 *» ${kt[1][0].name}*

${cmenut}
${cmenub} *ID :* ${kt[1][0].id}
${cmenub} *CIUDAD | CITY :* ${kt[1][0].capitalCity}
${cmenub} *LONGITUD | LENGTH :* ${kt[1][0].longitude}
${cmenub} *LATITUD | LATITUDE :* ${kt[1][0].latitude}
${cmenuf}

🏞️ 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼 𝙁𝙄𝙉𝘼𝙇𝙄𝙕𝘼𝘿𝘼 : 𝘼𝘿𝙑𝙀𝙉𝙏𝙐𝙍𝙀 𝙁𝙄𝙉𝙄𝙎𝙃𝙀𝘿
${cmenua}`

for (const lost in rewards.lost)
if (user[lost]) {
const total = rewards.lost[lost].getRandom()
user[lost] -= total * 1
if (total) text += `\n${global.rpg.emoticon(lost)} ${total}`
}
text += '\n\n✨ 𝙍𝙀𝘾𝙊𝙈𝙋𝙀𝙉𝙎𝘼𝙎 𝘿𝙀 𝙇𝘼 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼\n✨ 𝘼𝘿𝙑𝙀𝙉𝙏𝙐𝙍𝙀 𝙍𝙀𝙒𝘼𝙍𝘿𝙎'
for (const rewardItem in rewards.reward)
if (rewardItem in user) {
const total = rewards.reward[rewardItem].getRandom()
user[rewardItem] += total * 1
if (total) text += `\n» ${global.rpg.emoticon(rewardItem)} ${total}`
}
conn.sendFile(m.chat, pp, 'zentrax.jpg', text.trim(), fkontak)
// await conn.reply(m.chat, `${htki} 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼 ${htka}`, fkontak, imgr, m)
/*conn.sendButton(m.chat, 
     `${htki} 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼 ${htka}`, 
     text.trim(), `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, [
[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 | 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `${usedPrefix}inventory`],
[`🔔 𝙍𝙀𝘾𝙇𝘼𝙈𝙊 𝘿𝙄𝘼𝙍𝙄𝙊 | 𝘿𝘼𝙄𝙇𝙔`, `${usedPrefix}daily`]
], fkontak, m)*/
user.lastadventure = new Date() * 1
}
handler.help = ['adventure']
handler.tags = ['rpg']
handler.command = /^(adventure|adv|aventura|aventurar)$/i
handler.register = true
handler.cooldown = cooldown
handler.disabled = false

export default handler

function reward(user = {}) {
let rewards = {
reward: {
money: 400,
exp: 300,
trash: 150,
potion: 3,
rock: 2,
joincount: 2,
wood: 3,
string: 2,
common: 2 * ((user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2) || 1),
uncoommon: [0, 0, 0, 1, 0].concat(new Array(5 - ((user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2)).fill(0)),
mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(new Array(8 - ((user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3)).fill(0)),
legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(new Array(10 - ((user.dog > 8 && user.dog) || 4)).fill(0)),
cat: [0, 1, 0, 0, 0],
centaur: [0, 1, 0, 0, 0],
dog: [0, 1, 0, 0, 0],
dragon: [0, 1, 0, 0, 0],
emerald: [0, 1, 0, 0, 0],
fox: [0, 1, 0, 0, 0],
griffin: [0, 1, 0, 0, 0],
horse: [0, 1, 0, 0, 0],
kyubi: [0, 1, 0, 0, 0],
lion: [0, 1, 0, 0, 0],
pet: [0, 1, 0, 0, 0],
phonix: [0, 1, 0, 0, 0],
rhinoceros: [0, 1, 0, 0, 0],
robo: [0, 1, 0, 0, 0],
wolf: [0, 1, 0, 0, 0],
iron: [0, 0, 0, 1, 0, 0],
gold: [0, 0, 0, 0, 0, 1, 0],
diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(new Array(5 - ((user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0)).fill(0))
},
lost: {
health: 101 - user.cat * 4,
armordurability: (15 - user.armor) * 7
}
}
return rewards
}
