import { createPhotosArray } from './mock-generator.js';
import { isMeetingWithinWorkday } from './functions.js';

window.console.log('ВЫВОД МОКОВЫХ ДАННЫХ');
window.console.log(createPhotosArray());

window.console.log('\nДЕМОНСТРАЦИЯ РАБОТЫ ФУНКЦИИ ОПРЕДЕЛЕНИЯ РАБОЧЕГО ВРЕМЕНИ');
window.console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90)); // true
window.console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120)); // true
window.console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90)); // false
window.console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90)); // false
window.console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900)); // false

// Комметарий для коммита
