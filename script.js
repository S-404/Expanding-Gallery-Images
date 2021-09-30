const panels = document.querySelectorAll('.panel');
const slidePosition = document.getElementById('position');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dots = document.querySelectorAll('.dot');
const loadText = document.querySelector('.loading-text');
const gallery = document.querySelector('.gallery');

let load = 0;
let loadInterval = setInterval(blurryloading, 20);
function blurryloading() {
  load++;
  if (load > 99) {
    clearInterval(loadInterval);
    loadText.style.display = 'none';
  }

  const scale = (val, in_min, in_max, out_min, out_max) => {
    return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  loadText.innerText = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  gallery.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

let currentPosition = 1;

panels.forEach((panel, index) => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('active');
    currentPosition = index + 1;
    updSliderPosition();
  });
});

nextBtn.addEventListener('click', () => {
  currentPosition++;
  if (currentPosition > dots.length) {
    currentPosition = dots.length;
  }
  updSliderPosition();
  changepic('next');
});

prevBtn.addEventListener('click', () => {
  currentPosition--;
  if (currentPosition < 1) {
    currentPosition = 1;
  }

  updSliderPosition();
  changepic('prev');
});

function updSliderPosition() {
  dots.forEach((dot, index) => {
    if (index < currentPosition) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  const actives = document.querySelectorAll('.dot.active');
  slidePosition.style.width =
    ((actives.length - 1) / (dots.length - 1)) * 100 + '%';

  prevBtn.disabled = false;
  nextBtn.disabled = false;
  if (currentPosition === 1) {
    prevBtn.disabled = true;
  } else if (currentPosition === dots.length) {
    nextBtn.disabled = true;
  }
}

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove('active');
  });
}
function changepic(picindex) {
  let active = document.querySelector('.panel.active');
  let target =
    picindex === 'prev'
      ? active.previousElementSibling
      : active.nextElementSibling;
  if (target !== null) {
    removeActiveClasses();
    target.classList.add('active');
  }
}
