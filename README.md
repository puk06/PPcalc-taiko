# about this library 

This library calculate osu!taiko's PP ver V4 standalone!!

This library calculate pp same as taikopp.com

and calculate Acc(%) from (300s , 100s,  miss)

This library written in Javascript

This is for JS project!

# How to use this library

Type this in your console

```
npm i pp-calc-taiko
```

# How to use this library in your project?


```javascript
const { ppcalc, calcAccuracy } = require("pp-calc-taiko")
//pls use const {} = require("")

let SR = 7
let Maxcombo = 1900
let od = 7
let Misses = 2
let Acc = calcAccuracy(1700, 198, 2)
let Mods = ['DT', 'HD']

const pp = ppcalc(SR, Maxcombo, od, Misses, Acc, Mods)

//SR = DT included
//Acc is like 98.6
//Mods = ['DT', 'HD']

console.log(`pp: ${pp}`) //pp: 531.65

console.log(`acc: ${Acc}`) // acc: 94.68
```
 If you already have Acc (like 98)
 You don't need use ```calcAccuracy()```
# IMPORTANT ATTENTION

This library can't calculate sr DT included. Please use rosu-pp-js or else.
