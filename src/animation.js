// Scroll with animation targets
const revealEls = document.querySelectorAll('.reveal');

// Scroll Animation
export function animation() {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }else {
            entry.target.classList.remove('active');
        }
    })
}, {
    threshold : 0.2,
})

revealEls.forEach(el => observer.observe(el))

}
