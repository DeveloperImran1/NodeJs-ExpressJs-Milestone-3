// const fs = require('fs');

// fs.readFile('./hello.txt', {encoding: 'utf-8'}, (err, data)=> {
//     if(err){
//         console.log("Something went wrong in FS read", err)
//         return;
//     }

// fs.writeFile('./hello-new.txt',data ,  {encoding: 'utf-8'}, (err)=> {
//     if(err){
//         console.log("Something went wrong in FS write ", err)
//     }
//     console.log("Succefully data aded")
// })
// });



// ------------- Streaming system a data read and write korno -----------------------

const fs = require('fs');
const readstream = fs.createReadStream('./hello.txt', {encoding: 'utf-8'});
const writestream = fs.createWriteStream("./hello-new.txt", {encoding: 'utf-8'});

// aikhane readstream.on er 1st perameter a bole dita hobe callback function er perameter a data nibo naki error nibo. etc. airokom aro option ase. Seita 1st perameter a bole dita hoi.
readstream.on('data', (data)=>{
    console.log(data)

    writestream.write(data, (err)=>{
        if(err){
            throw Error ("error", err)
        }
    })
})

// Upore writestream tar 1st perameter a data and second perameter a callback function er moddhe err handle korar jonno err perameter nei. But readstream tar callback function er perameter a sudho data pai. error handle korar jonno error ke paina. So abaro readstrea.on() korte hobe. And tokhon 1st perameter a bole dita hobe error get korbo, callback function theke.
readstream.on("error", (err)=>{
    throw Error("error", err)
});

// Upore writestream.write() er callback function er perameter a error k pawa jai. so uporer handle koresi. But amra chaila aivabew handle korte pari:
writestream.on("error",(err)=> {
    throw Error("error", err)
})


// Akhon read and write er kaj ses hoia gele, readstream and writestream k end korote hobe.
readstream.on('end', ()=> {
    console.log("Reading ended");
    writestream.end(); // readstream end hoia gele,, writestream.end() function ke call korbo.
})
// readstrea and write stream end kora hoiase. Akhon write stream end hoiase kina, ta check kora hoi finish er maddhome.
writestream.on("finish", ()=>{
    console.log("Writen successfully")
})