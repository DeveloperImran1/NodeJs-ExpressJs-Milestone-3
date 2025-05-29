const { a, add } = require('./file-1');
const { a: a3, add: add3 } = require('./file-3');

console.log(a);
console.log(add(3, 2));

console.log(a3);
console.log(add3(3, 2, 5));
