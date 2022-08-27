'strict mode';

const navHighlight = function () {
  document.querySelector('.home').style.color = 'var(--accent-color)';
  document.querySelector('.fa-solid').style.color = 'var(--accent-color)';
};

if (document.querySelector('title').textContent === 'Home') {
  navHighlight();
}if else(document.querySelector('title').textContent === 'About'){
    navHighlight();
}if else(document.querySelector('title').textContent === 'Services'){
    navHighlight();
}if else(document.querySelector('title').textContent === 'Portfolio'){
    navHighlight();
}if else(document.querySelector('title').textContent === 'Contact'){
    navHighlight();
}



