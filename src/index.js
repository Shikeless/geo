// import { mapInit } from './js/ymaps';
import render from './templates/friends.hbs';

// window.onload = mapInit();

const list = [
  { name: 'Иван', last_name: 'Иванов'},
  { name: 'Петр', last_name: 'Иванов'},
  { name: 'Олег', last_name: 'Иванов'},
  { name: 'Кирилл', last_name: 'Иванов'},
  { name: 'Кирилл', last_name: 'Иванов'},
  { name: 'Кирилл', last_name: 'Иванов'},
  { name: 'Кирилл', last_name: 'Иванов'},
  { name: 'Кирилл', last_name: 'Иванов'}
]

map.innerHTML = render(); // Handlebars.compile