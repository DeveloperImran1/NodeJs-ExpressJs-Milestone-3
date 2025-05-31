const fs = require('fs');

const text = "We are learning file system";
fs.writeFileSync('./hello.txt', text) // writeFileSync er maddhome file er ager data ke replace kore new data set kore.

const data = fs.readFileSync('./hello.txt', {encoding: 'utf-8'});
console.log(data)