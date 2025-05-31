// Amader target holo: index.js file ta run korar somoi, index.js er pore jei text gulo likhbe, sei text gulo ke log.txt namer akta file a store korbo.

const path = require("path");
const fs = require("fs");
// process holo akta IIFE function. jar karone define korte hobena. Aita define korai ase global object er moddhe.

// console.log(process.argv);  // Aita akta array dei. Tar 1st perameter a nodejs computer er jei file er moddhe ase, sei path. Ar 2nd perameter a dei jei file run kortesi, sei file er path. Ar tarpor akadhik element thakte pare. Jodi amra nodejs er maddhome run korar somoi node index.js Hello world --> fileName er por, akadhik word space akare dei. Tahole sobgulo akta akta kore element hobe.

const inpurArguments = process.argv.slice(2, )
const text = inpurArguments.join(" "); // amader command jodi hoi: node index.js Hello world ---> Tahole output: Hello world
const message = `${text} \n`;  // Evelry append a nicher line a jeno add hoi. Tail text er last a \n add korte hobe.

if(!message){
    console.log("🤣🤣 age message likho");
    console.log("Ex: node index.js Hello world!");
    process.exit(1);  // server ke stop kore diba smothly
}

// path ke require koresi. Ai path.join() method akadhik text ke patha akare concat kore. Aikhane __dirname dia folderName porjonto path pabo. Tarpor log.txt file a add korte chassi. sita 2nd perameter a bole diasi.
const pathName = path.join(__dirname, "log.txt");

// fs.appendFile(pathName, message, options, callback function);  ai callback function a append korar por onno jei kaj ase, sei gulo kore thaki.
fs.appendFile(pathName, message, {encoding: 'utf-8'}, ()=>{
    console.log("Your log added successfull!")
})


// ----------------  Summary -----------------
// 1. Terminal a node index.js dia file ke run korar somoi extra jei word gulo dibo seiguloke dhorte hobe.
// 2. se word guloke sentence banate hobe and last a \n add korte hobe new line a append korar jonno
// 3. fs.appendFile() method er maddhome append korte hobe. Ai appendFile() ager text ke replace korena. Sudo new text ke add kore.