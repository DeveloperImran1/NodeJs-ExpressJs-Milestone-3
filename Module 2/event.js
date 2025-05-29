// Let schoole a akta bell ase. Sei bell bajle school suti hoi. So schoolBell holo akta event. Jeita emit hole ba bajle. Students ra seita listen korbe. And akta responce korbe.

// Similarly aikhane nodeJs er events module theke EventEmitter namer akta module k import korese. Then sei EventEmitter er all property gulo extends kore SchoolBell er moddhe niase.
const EventEmitter = require('events');
class SchoolBell extends EventEmitter{};

// SchoolBell theke schollBell namer akta blueprin create koresi new keyword use kore.
const schoolBell = new SchoolBell();

// Akhon ring namer akta event create koresi. Ai ring namer event k call korle ba fire korle 2nd perameter er function call hobe. So event create korar jonno: eventEmitterName.on(eventName, function) method use kora hoi.
schoolBell.on('ring', ()=> {
    console.log("Yaah Huu!! Class ses")
});

// ring namer jei event create koresi. Seitake fire koresi ba emit koresi. eventEmitterName.emit(eventName); method er maddhome.
schoolBell.emit("ring");