const body = document.body;
const themeToggle = document.getElementById('themeToggle');

// Themes
const heroTitle = document.querySelector('.hero-title');
const heroSub = document.querySelector('.hero-sub');

// On Page load,check localStorage and apply the saved theme
export function theme() {
    if(localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';            
}

// Theme toggle
themeToggle.addEventListener('click',() => {    
        body.classList.toggle('light-mode')            
        if(body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';            
            heroTitle.style.color = '#f2f4e8'
            heroSub.style.color = '#e8ead6';

        }else {
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>'
        }
     localStorage.setItem('theme',body.classList.contains('light-mode') ? 'light' : 'dark')
})

}
