const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('active');
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove('active');
  });
}

function changepic(picindex) {
  let active = document.querySelector('.active');
  let target =
    picindex === 'prev'
      ? active.previousElementSibling
      : active.nextElementSibling;
  if (target !== null) {
    removeActiveClasses();
    target.classList.add('active');
  }
}
