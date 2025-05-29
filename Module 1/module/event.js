// nodejs er events namer module ke require koresi EventEmitter variable er moddhe. Sei EventEmitter er blueprint nia emitter namer arekta variable create koresi.
const EventEmitter = require('events');

const emitter = new EventEmitter();

// bellRing namer akta emiiter create koresi emitter.on er maddhome. And 2nd perameter a akta function dewa hoiase. ai bellRing emitter jokhon call hobe, tokhon 2nd perameter er function call hobe.
emitter.on('bellRing', (period) => {
    console.log(`Now period number is ${period}`);
});

// bellRing namer emitter ke call koresi ba emit koresi. emitter.emit(emitterName, functionPerameter aita optional)
emitter.emit('bellRing', '3rd period');
