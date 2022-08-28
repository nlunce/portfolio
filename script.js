'strict mode';
const home = document.querySelector('.home').className;
const about = document.querySelector('.about').className;
const services = document.querySelector('.services').className;
const portfolio = document.querySelector('.portfolio').className;
const contact = document.querySelector('.contact').className;

const homeIcon = document.querySelector('.fa-house').className;
const aboutIcon = document.querySelector('.fa-user').className;
const servicesIcon = document.querySelector('.fa-bars').className;
const portfolioIcon = document.querySelector('.fa-briefcase').className;
const contactIcon = document.querySelector('.fa-comments').className;

const navHighlight = function (navTitle, navIcon) {
  document.querySelector(`.${navTitle}`).style.color = 'var(--accent-color)';
  document.querySelector(`.${navIcon}`).style.color = 'var(--accent-color)';
};

if (document.querySelector('title').textContent === 'Home') {
  navHighlight(home, homeIcon);
} else if (document.querySelector('title').textContent === 'About') {
  navHighlight(about, aboutIcon);
} else if (document.querySelector('title').textContent === 'Services') {
  navHighlight(services, servicesIcon);
} else if (document.querySelector('title').textContent === 'Portfolio') {
  navHighlight(portfolio, portfolioIcon);
} else if (document.querySelector('title').textContent === 'Contact') {
  navHighlight(contact, contactIcon);
}
