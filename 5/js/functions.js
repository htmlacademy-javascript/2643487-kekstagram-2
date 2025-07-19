// const checkStringLength = (str, maxLength) => str.length <= maxLength;

// const isPalindrome = (str) => {
//   const cleanedStr = str.replace(/\s/g, '').toLowerCase(); //Удаляет все пробелы из строки и понижает регистр
//   return cleanedStr === cleanedStr.split('').reverse().join(''); //разбивает строку на массив, собирает в обратном порядке и сравниает
// };

// const extractNumber = (input) => {
//   const str = String(input); // Преобразует входное значение в строку
//   const digits = str.replace(/\D/g, ''); // Удаляет всё, кроме цифр
//   return parseInt(digits, 10); // Возвращает число или NaN
// };

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingWithinWorkday = (workStart, workEnd, meetingStart, duration) => {
  const workStartMinutes = parseTime(workStart);
  const workEndMinutes = parseTime(workEnd);
  const meetingStartMinutes = parseTime(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

export { isMeetingWithinWorkday };
