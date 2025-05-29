const EventEmitter = require('events');
// aikhane amra chassi akta emit create kore, onno file theke import kore. Oi file a use korbo ba fire korbo. So EventEmitter ke events theke import kore School namer class er moddhe extends koresi. Then School class er moddhe startedPeriod er moddhe emit create koresi and last a export kore disi.
class School extends EventEmitter {
    startPeriod() {
        console.log('class started');

        setTimeout(() => {
            this.emit('bellRing', {
                period: '1st ring',
                text: 'period ended',
            });
        }, 2000);
    }
}

module.exports = School;
