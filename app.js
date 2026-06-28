
import { menu } from "./src/menu.js";
import { theme } from "./src/theme.js";
import { animation } from "./src/animation.js";
import { reservation } from "./src/reservation.js";
import { addToCart } from "./src/cart.js";
import { review } from "./src/review.js";
window.addToCart = addToCart;

theme();
animation();
menu();
review();
reservation();




console.log('app.js running');

const nav = document.getElementById('navbar');
const navToggleBtn = document.getElementById('navToggle');

navToggleBtn.addEventListener('click',() => {
    nav.classList.toggle('nav-open')
    console.log('nav',nav)
})







