import { checkStringLength, isPalindrome, extractNumber } from './functions.js';

window.console.log(checkStringLength('JavaScript rocks', 20)); // true
window.console.log(checkStringLength('0123456789йцукенгш', 18)); // true
window.console.log(checkStringLength('Добро пожаловать!', 10)); // false

window.console.log(isPalindrome('топот')); // true
window.console.log(isPalindrome('ДовОд')); // true
window.console.log(isPalindrome('Кекс')); // false

window.console.log(extractNumber('2023 год')); // 2023
window.console.log(extractNumber('ECMAScript 2022')); // 2022
window.console.log(extractNumber('1 кефир, 0.5 батона')); // 105
window.console.log(extractNumber('агент 007')); // 7
window.console.log(extractNumber('а я томат')); // NaN;
window.console.log(extractNumber('-1')); // 1;
window.console.log(extractNumber('1.5')); // 15;
