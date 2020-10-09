"use strict";
const span = document.querySelectorAll(".date-piker .calendar .one .date span");
const leftBtn1 = document.querySelector(
  ".date-piker .calendar .one .wrapper .left"
);
const rightBtn1 = document.querySelector(
  ".date-piker .calendar .one .wrapper .right"
);
const mounthAndYear = document.querySelector(
  ".date-piker .calendar .one .wrapper .mounth"
);
const input = document.querySelector(".date-piker input");
const calendar = document.querySelector(".date-piker .calendar");
const closeBtn = document.querySelector("#close");

let globalNewDate = new Date();
let globalYear = globalNewDate.getFullYear();
let globalMonth = globalNewDate.getMonth();

leftBtn1.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth--;
  if (globalMonth === -1) {
    globalMonth = 11;
    globalYear--;
  }
  globalNewDate = new Date(globalYear, globalMonth, 1);
  createdMonthNames(globalMonth);
  createdDaysNumber(1, globalNewDate);
});

rightBtn1.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth++;
  if (globalMonth === 12) {
    globalMonth = 0;
    globalYear++;
  }
  globalNewDate = new Date(globalYear, globalMonth, 1);
  createdMonthNames(globalMonth);
  createdDaysNumber(1, globalNewDate);
});

// заполняет числами дни на календаре
function createdDaysNumber(cnt, selectedDateFromClicker) {
  let now;
  let month;
  let year;
  if (selectedDateFromClicker === undefined) {
    now = new Date();
    month = now.getMonth();
    year = now.getFullYear();
  } else {
    now = selectedDateFromClicker;
    month = selectedDateFromClicker.getMonth();
    year = selectedDateFromClicker.getFullYear();
  }

  let count = cnt || 1; // первый день месяца, который будем увеличивать для отрисовки каждого дня
  const setNewDate = new Date(now.setFullYear(year, month, count)); // эммулируем начало месяца
  let startDay = setNewDate.getDay();
  if (count !== 1) {
    startDay = new Date(now.setFullYear(year, month, 1)).getDay(); // на каждом круге необходимо вернуть startDay в первоначальное положение
  }
  if (month !== setNewDate.getMonth()) {
    for (let i = 7; i < 7 + startDay; i++) {
      // это "фор" чистит спаны, которые уже не используются в текущем месяце перед первым числом
      span[i].innerHTML = "";
      span[i].style.cursor = "default";
    }
    return; // если месяц изменился, то выходим из рекурсии.
  }
  // в формуле, что пониже:
  // 7 - это пропускаем именованные span'ы(вс.пн.вт.ср.чт.пт.сб).
  // startDay - это количество дней(спанов), которые надо пропустить для рисования. (пример: месяц начинается не с Воскресенья(1-ый спан), а с четверга(5-ый спан))
  // count - каждое следующее число(нумерация дня) в месяце.
  // 1 - просто отнять единичку, чтобы не было сдвига в спанах.
  span[7 + startDay + count - 1].innerHTML = `${setNewDate.getDate()}`;
  span[7 + startDay + count - 1].style.cursor = "pointer";
  count++;
  //--------------------------------------------------------------------
  for (let i = 7 + startDay + count - 1; i < span.length; i++) {
    span[i].innerHTML = ""; //Этот "фор" чистит спаны после последнего числа месяца.
    span[i].style.cursor = "default";
  }
  createdDaysNumber(count, selectedDateFromClicker);
}
function createdMonthNames(mon) {
  switch (mon) {
    case 0:
      mounthAndYear.innerHTML = `Январь ${globalYear}`;
      break;
    case 1:
      mounthAndYear.innerHTML = `Февраль ${globalYear}`;
      break;
    case 2:
      mounthAndYear.innerHTML = `Март ${globalYear}`;
      break;
    case 3:
      mounthAndYear.innerHTML = `Апрель ${globalYear}`;
      break;
    case 4:
      mounthAndYear.innerHTML = `Май ${globalYear}`;
      break;
    case 5:
      mounthAndYear.innerHTML = `Июнь ${globalYear}`;
      break;
    case 6:
      mounthAndYear.innerHTML = `Июль ${globalYear}`;
      break;
    case 7:
      mounthAndYear.innerHTML = `Август ${globalYear}`;
      break;
    case 8:
      mounthAndYear.innerHTML = `Сентябрь ${globalYear}`;
      break;
    case 9:
      mounthAndYear.innerHTML = `Октябрь ${globalYear}`;
      break;
    case 10:
      mounthAndYear.innerHTML = `Ноябрь ${globalYear}`;
      break;
    case 11:
      mounthAndYear.innerHTML = `Декабрь ${globalYear}`;
      break;
    default:
      console.log("switch case упал");
  }
}

let firstDateForInput = "";
let secondDateForInput = "";

span.forEach(function (span) {
  span.addEventListener("click", function (event) {
    if (event.target.innerHTML !== "") {
      // собираем информацию и пушим в строку
      firstDateForInput = `${globalYear}/${globalMonth + 1}/${
        event.target.innerHTML
      }`;
      createdDateInInput(firstDateForInput, secondDateForInput);
    }
  });
});

function createdDateInInput(fText, sText) {
  if (fText === "") {
    input.value = "";
    input.value = sText;
  } else if (sText === "") {
    input.value = "";
    input.value = fText;
  } else {
    input.value = "";
    input.value = `${fText} - ${sText}`;
  }
}
input.addEventListener("focus", function () {
  // открывашка
  calendar.style.display = "block";
});
closeBtn.addEventListener("click", function () {
  // закрывашка
  calendar.style.display = "none";
});

createdMonthNames(globalMonth);
createdDaysNumber();

// ---------------------------!!!СПОСОБ ООООООООООООЧень топорный(просто копия кода выше)!!! я понимаю,
//что это дубликат и можно оптимизировать введя пару новых переменных-------- второй календарик
// либо переписать по новой, так как я изначально неправильно разбил проект на подзадачи.
const span2 = document.querySelectorAll(
  ".date-piker .calendar .two .date span"
);
const leftBtn2 = document.querySelector(
  ".date-piker .calendar .two .wrapper .left"
);
const rightBtn2 = document.querySelector(
  ".date-piker .calendar .two .wrapper .right"
);
const mounthAndYear2 = document.querySelector(
  ".date-piker .calendar .two .wrapper .mounth"
);

let globalNewDate2 = new Date();
let globalYear2 = globalNewDate.getFullYear();
let globalMonth2 = globalNewDate.getMonth();

leftBtn2.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth2--;
  if (globalMonth2 === -1) {
    globalMonth2 = 11;
    globalYear2--;
  }
  globalNewDate2 = new Date(globalYear2, globalMonth2, 1);
  createdMonthNames2(globalMonth2);
  createdDaysNumber2(1, globalNewDate2);
});

rightBtn2.addEventListener("click", function () {
  // диапазон месяцев от 0 до 11 и пытаюсь не дать выбраться за пределы >11 и <0
  globalMonth2++;
  if (globalMonth2 === 12) {
    globalMonth2 = 0;
    globalYear2++;
  }
  globalNewDate2 = new Date(globalYear2, globalMonth2, 1);
  createdMonthNames2(globalMonth2);
  createdDaysNumber2(1, globalNewDate2);
});
function createdDaysNumber2(cnt, selectedDateFromClicker) {
  let now;
  let month;
  let year;
  if (selectedDateFromClicker === undefined) {
    now = new Date();
    month = now.getMonth();
    year = now.getFullYear();
  } else {
    now = selectedDateFromClicker;
    month = selectedDateFromClicker.getMonth();
    year = selectedDateFromClicker.getFullYear();
  }

  let count = cnt || 1; // первый день месяца, который будем увеличивать для отрисовки каждого дня
  const setNewDate = new Date(now.setFullYear(year, month, count)); // эммулируем начало месяца
  let startDay = setNewDate.getDay();
  if (count !== 1) {
    startDay = new Date(now.setFullYear(year, month, 1)).getDay(); // на каждом круге необходимо вернуть startDay в первоначальное положение
  }
  if (month !== setNewDate.getMonth()) {
    for (let i = 7; i < 7 + startDay; i++) {
      // это "фор" чистит спаны, которые уже не используются в текущем месяце перед первым числом
      span2[i].innerHTML = "";
      span2[i].style.cursor = "default";
    }
    return; // если месяц изменился, то выходим из рекурсии.
  }
  // в формуле, что пониже:
  // 7 - это пропускаем именованные span'ы(вс.пн.вт.ср.чт.пт.сб).
  // startDay - это количество дней(спанов), которые надо пропустить для рисования. (пример: месяц начинается не с Воскресенья(1-ый спан), а с четверга(5-ый спан))
  // count - каждое следующее число(нумерация дня) в месяце.
  // 1 - просто отнять единичку, чтобы не было сдвига в спанах.
  span2[7 + startDay + count - 1].innerHTML = `${setNewDate.getDate()}`;
  span2[7 + startDay + count - 1].style.cursor = "pointer";
  count++;
  //--------------------------------------------------------------------
  for (let i = 7 + startDay + count - 1; i < span2.length; i++) {
    span2[i].innerHTML = ""; //Этот "фор" чистит спаны после последнего числа месяца.
    span2[i].style.cursor = "default";
  }
  createdDaysNumber2(count, selectedDateFromClicker);
}
function createdMonthNames2(mon) {
  switch (mon) {
    case 0:
      mounthAndYear2.innerHTML = `Январь ${globalYear2}`;
      break;
    case 1:
      mounthAndYear2.innerHTML = `Февраль ${globalYear2}`;
      break;
    case 2:
      mounthAndYear2.innerHTML = `Март ${globalYear2}`;
      break;
    case 3:
      mounthAndYear2.innerHTML = `Апрель ${globalYear2}`;
      break;
    case 4:
      mounthAndYear2.innerHTML = `Май ${globalYear2}`;
      break;
    case 5:
      mounthAndYear2.innerHTML = `Июнь ${globalYear2}`;
      break;
    case 6:
      mounthAndYear2.innerHTML = `Июль ${globalYear2}`;
      break;
    case 7:
      mounthAndYear2.innerHTML = `Август ${globalYear2}`;
      break;
    case 8:
      mounthAndYear2.innerHTML = `Сентябрь ${globalYear2}`;
      break;
    case 9:
      mounthAndYear2.innerHTML = `Октябрь ${globalYear2}`;
      break;
    case 10:
      mounthAndYear2.innerHTML = `Ноябрь ${globalYear2}`;
      break;
    case 11:
      mounthAndYear2.innerHTML = `Декабрь ${globalYear2}`;
      break;
    default:
      console.log("switch case упал");
  }
}

span2.forEach(function (span) {
  span.addEventListener("click", function (event) {
    if (event.target.innerHTML !== "") {
      // собираем информацию и пушим в строку
      secondDateForInput = `${globalYear2}/${globalMonth2 + 1}/${
        event.target.innerHTML
      }`;
      createdDateInInput(firstDateForInput, secondDateForInput);
    }
  });
});

createdMonthNames2(globalMonth);
createdDaysNumber2();
