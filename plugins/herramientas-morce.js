let handler = async (m, {conn, usedPrefix, command, text}) => {
let enc = {
a: '•-',
b: '-•••',
c: '-•-•',
d: '-••',
e: '•',
f: '••-•',
g: '--•',
h: '••••',
i: '••',
j: '•---',
k: '-•-',
l: '•-••',
m: '--',
n: '-•',
o: '---',
p: '•--•',
q: '--•-',
r: '•-•',
s: '•••',
t: '-',
u: '••-',
v: '•••-',
w: '•--',
x: '-••-',
y: '-•--',
z: '--••',
0: '-----',
1: '•----',
2: '••---',
3: '•••--',
4: '••••-',
5: '•••••',
6: '-••••',
7: '--•••',
8: '---••',
9: '----•',
'?': '••--••',
'!': '-•-•--',
'.': '•-•-•-',
',': '--••--',
';': '-•-•-•',
':': '---•••',
'+': '•-•-•',
'-': '-••••-',
'/': '-••-•',
'=': '-•••-',
' ': '/'
}

let dec = {
'-----': '0',
'•----': '1',
'••---': '2',
'•••--': '3',
'••••-': '4',
'•••••': '5',
'-••••': '6',
'--•••': '7',
'---••': '8',
'----•': '9',
'•-': 'a',
'-•••': 'b',
'-•-•': 'c',
'-••': 'd',
'•': 'e',
'••-•': 'f',
'--•': 'g',
'••••': 'h',
'••': 'i',
'•---': 'j',
'-•-': 'k',
'•-••': 'l',
'--': 'm',
'-•': 'n',
'---': 'o',
'•--•': 'p',
'--•-': 'q',
'•-•': 'r',
'•••': 's',
'-': 't',
'••-': 'u',
'•••-': 'v',
'•--': 'w',
'-••-': 'x',
'-•--': 'y',
'--••': 'z',
'••--••': '?',
'-•-•--': '!',
'•-•-•-': '.',
'--••--': ',',
'-•-•-•': ';',
'---•••': ':',
'•-•-•': '+',
'-••••-': '-',
'-••-•': '/',
'-•••-': '=',
'/': ' '
}

let selected = text.toLowerCase().split(' ')[0] + ' '
if (selected == 'codificar ') {
let str = text.replace(selected, '').toLowerCase()
let Output_Morse = ''
for (let i of str) {
if (!enc[i]) Output_Morse += i
for (let j in enc) {
if (j == i) Output_Morse += enc[i] + ' '
}
}

return conn.reply(m.chat, Output_Morse, fkontak, m)
} else if (selected == 'decodificar ') {
let str = text.replace(selected, '').replace(/[.]/g, '•')
let Output_String = ''
for (let i of str.split(' ')) {
if (!dec[i]) Output_String += i
for (let j in dec) {
if (j == i) Output_String += dec[i]
}
}
return conn.reply(m.chat, Output_String, fkontak, m)
} else {
return conn.reply(
m.chat,
`${mg}🔣 𝘾𝙊𝘿𝙄𝘾𝙊 𝙈𝙊𝙍𝙎𝙀 𝘾𝙊𝘿𝙄𝙁𝙄𝘾𝘼𝙍/𝘿𝙀𝘾𝙊𝘿𝙄𝙁𝙄𝘾𝘼𝙍\n\n𝙋𝘼𝙍𝘼 𝘾𝙊𝘿𝙄𝙁𝙄𝘾𝘼𝙍 𝙐𝙎𝙀 *:* 𝙏𝙊 𝙀𝙉𝘾𝙊𝘿𝙀 𝙐𝙎𝙀\n*${usedPrefix}${command} codificar Hola ZENTRAX*\n*${usedPrefix}${command} codificar Hello ZENTRAX*\n\n𝙋𝘼𝙍𝘼 𝘿𝙀𝘾𝙊𝘿𝙄𝙁𝙄𝘾𝘼𝙍 𝙐𝙎𝙀 *:* 𝙏𝙊 𝘿𝙀𝘾𝙊𝘿𝙀 𝙐𝙎𝙀\n*${usedPrefix}${command} decodificar •••• --- •-•• •- / --• •- - •-*\n*${usedPrefix}${command} decodificar •••• • •-•• •-•• --- / --• •- - •-*`,
fkontak,
m
)
}
}

handler.help = ['morse'].map((v) => v + ' <encode|decode>')
handler.tags = ['tools']

handler.command = /^(morse|morce)/i
handler.money = 40

export default handler
