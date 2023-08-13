// DOM-elements для слайдера каталога
const catalog = document.querySelector(".catalog");
const catSlider = document.querySelector(".catalog__slider");
const catCards = document.querySelector(".catalog__cards");
const catCard = document.querySelector(".catalog__card");
const catArrRight = document.querySelector(".catalog__arrRight");
const catArrLeft = document.querySelector(".catalog__arrLeft");
// DOM-elements для для разворота закладки "Подробнее..." в каталоге
const more = document.querySelectorAll(".catalog__more");
const program = document.querySelectorAll(".catalog__program");
// DOM-elements для слайдера отзывов
const reviews = document.querySelector(".reviews");
const revSlider = document.querySelector(".reviews__slider");
const revCards = document.querySelector(".reviews__cards");
const revCard = document.querySelector(".reviews__card");
const revArrRight = document.querySelector(".reviews__arrRight");
const revArrLeft = document.querySelector(".reviews__arrLeft");
// DOM-elements for frame
const buttonOpen = document.querySelector("[data-button]");
const send = document.querySelector("[data-send]");
const frame = document.querySelector(".frame");
const form = document.querySelector(".frame__form");
const gratitude = document.querySelector(".frame__gratitude");
// Функция подсчета шага слайдера и границы
function calculation(slider, cards, card) {
  let sliderWidth = slider.offsetWidth;
  let containerWidth = cards.scrollWidth;
  let cardWidth = card.offsetWidth;
  let countCard = cards.childElementCount;
  let gap = (containerWidth - cardWidth * countCard) / (countCard - 1);
  let step = cardWidth + gap;
  let visibleCards = 1;
  for (let i = cardWidth; i < sliderWidth; i += step) {
    visibleCards++;
  }
  let indent = (countCard - visibleCards) * step;
  return [step, indent];
}
// Вычисление и задание основных переменных слайдера
let catData = calculation(catSlider, catCards, catCard);
let revData = calculation(revSlider, revCards, revCard);
let catPosition = 0;
let revPosition = 0;
// Фкункция проверки достижения границы и изначальная проверка
function check(arrRight, arrLeft, position, indent) {
  arrRight.style.display = position <= -indent ? "none" : "block";
  arrLeft.style.display = position >= 0 ? "none" : "block";
}
check(catArrRight, catArrLeft, catPosition, catData[1]);
check(revArrRight, revArrLeft, revPosition, revData[1]);
// Фкункция пролистывания слайдера в каталоге
function moveCatalog(e) {
  if (e.target === catArrRight) {
    catPosition -= catData[0];
    catCards.style.transform = `translateX(${catPosition}px)`;
    check(catArrRight, catArrLeft, catPosition, catData[1]);
  } else if (e.target === catArrLeft) {
    catPosition += catData[0];
    catCards.style.transform = `translateX(${catPosition}px)`;
    check(catArrRight, catArrLeft, catPosition, catData[1]);
  }
}
// Фкункция пролистывания слайдера в обзорах
function moveReviews(e) {
  if (e.target === revArrRight) {
    revPosition -= revData[0];
    revCards.style.transform = `translateX(${revPosition}px)`;
    check(revArrRight, revArrLeft, revPosition, revData[1]);
  } else if (e.target === revArrLeft) {
    revPosition += revData[0];
    revCards.style.transform = `translateX(${revPosition}px)`;
    check(revArrRight, revArrLeft, revPosition, revData[1]);
  }
}
// Вешаем слушатель слайдера на каталог и обзоры
catalog.addEventListener("click", moveCatalog);
reviews.addEventListener("click", moveReviews);
// Функция разворачивания закладки "Подробнее..." в каталоге
function openMore(e) {
  if ([...more].includes(e.target)) {
    program.forEach((elem) => {
      elem.style.height = "535px";
    });
    more.forEach((elem) => {
      elem.style.opacity = "0";
      elem.style.margin = "0";
    });
  }
}
// Вешаем слушатель разворачивания закладки "Подробнее..."
catSlider.addEventListener("click", openMore);
//Функция закрытия попапа
function closeFrame(e) {
  if (e.code === "Escape") {
    frame.style.opacity = "0";
    frame.style.transform = "translateY(-100%)";
    document.body.style.overflow = "visible";
    window.removeEventListener("keydown", closeFrame);
    send.removeEventListener("click", sendComment);
  }
}
//Функция открытия попапа
function openFrame() {
  window.scrollTo(0, 0);
  frame.style.opacity = "1";
  frame.style.transform = "translateY(0)";
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", closeFrame);
  send.addEventListener("click", sendComment);
}
//Вешаем слушатель на кнопку отправления заявки (открыть фрейм)
buttonOpen.addEventListener("click", openFrame);
//Функция отправки заявки
function sendComment() {
  //тут должны быть всякие валидации
  if (true) {
    //тут должны быть всякие асинхронные запросы
    form.style.display = "none";
    gratitude.style.display = "block";
    setTimeout(() => {
      form.style.display = "flex";
      gratitude.style.display = "none";
      frame.style.opacity = "0";
      frame.style.transform = "translateY(-100%)";
      document.body.style.overflow = "visible";
      window.removeEventListener("keydown", closeFrame);
      send.removeEventListener("click", sendComment);
    }, 3000);
  }
}
