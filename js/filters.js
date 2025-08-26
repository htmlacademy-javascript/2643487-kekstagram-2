const RANDOM_PHOTOS_COUNT = 10;
const RENDER_DELAY = 500;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
let currentFilter = FilterType.DEFAULT;
let photosData = [];

// Функции фильтрации
const filterDefault = (photos) => photos;

const filterRandom = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const filterDiscussed = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

// Функция применения фильтра
const applyFilter = (filterType, photos) => {
  switch (filterType) {
    case FilterType.RANDOM:
      return filterRandom(photos);
    case FilterType.DISCUSSED:
      return filterDiscussed(photos);
    default:
      return filterDefault(photos);
  }
};

// Устранение дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Обработчик изменения фильтра
const filterChangeHandler = (cb) => {
  filtersForm.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === `filter-${currentFilter}`) {
      return;
    }

    const previousButton = filtersForm.querySelector('.img-filters__button--active');
    previousButton.classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');

    currentFilter = clickedButton.id.replace('filter-', '');
    cb(applyFilter(currentFilter, photosData));
  });
};

// Инициализация фильтров
const initFilters = (data, renderCallback) => {
  photosData = data;
  filtersContainer.classList.remove('img-filters--inactive');

  const debouncedRender = debounce(renderCallback, RENDER_DELAY);
  filterChangeHandler(debouncedRender);
};

export { initFilters, applyFilter, FilterType };
