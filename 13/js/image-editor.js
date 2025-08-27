// Константы для масштабирования
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

// Константы для эффектов
const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
};

const form = document.querySelector('.img-upload__form');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const imagePreview = form.querySelector('.img-upload__preview img');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectsList = form.querySelector('.effects');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');

// Состояние
let currentScale = DEFAULT_SCALE;
let currentEffect = 'none';

// Функции для масштабирования
const updateScale = (value) => {
  currentScale = value;
  scaleControlValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const newValue = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  updateScale(newValue);
};

const onScaleBiggerClick = () => {
  const newValue = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  updateScale(newValue);
};

// Функции для эффектов
const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();

  effectLevelValue.value = parseFloat(sliderValue).toString();

  if (currentEffect !== 'none') {
    const {filter, unit} = EFFECTS[currentEffect];
    imagePreview.style.filter = `${filter}(${sliderValue}${unit})`;
  }
};

const updateEffect = () => {
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
  } else {
    effectLevelContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(EFFECTS[currentEffect].options);
    effectLevelSlider.noUiSlider.set(EFFECTS[currentEffect].options.start);
  }
};

const onEffectChange = () => {
  currentEffect = form['effect'].value;
  updateEffect();
};

// Инициализация слайдера
const initEffectSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

// Сброс состояния
const resetImageEditor = () => {
  currentScale = DEFAULT_SCALE;
  updateScale(currentScale);
  currentEffect = 'none';
  updateEffect();
};

// Инициализация всего модуля
const initImageEditor = () => {

  // Масштабирование
  updateScale(DEFAULT_SCALE);
  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

  // Эффекты
  initEffectSlider();
  effectsList.addEventListener('change', onEffectChange);
  effectLevelContainer.classList.add('hidden');
};

export { initImageEditor, resetImageEditor };
