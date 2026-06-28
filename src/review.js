
const reviewsTrack = document.getElementById('reviewsTrack');
console.log('reviewsTrack',reviewsTrack)
const prevReviewBtn = document.getElementById('prevReviewBtn');
const nextReviewBtn = document.getElementById('nextReviewBtn');

// Form
const reviewForm = document.getElementById('reviewForm');
const reviewerName = document.getElementById('reviewerName');
const reviewComment = document.getElementById('reviewComment');

// Rating
const starInput = document.getElementById('starInput');
const stars = document.querySelectorAll('.star');

// Error messages
const reviewerNameError = document.getElementById('reviewerNameError');
const ratingError = document.getElementById('ratingError');
const reviewCommentError = document.getElementById('reviewCommentError');

let reviewArray = [];
let selectedRating = 0;

let savedReview = localStorage.getItem('brewnest-reviews');
if(savedReview) {
    reviewArray = JSON.parse(savedReview)
}

export function review() {    
    renderReview();
    stars.forEach(star => {
    star.addEventListener('click',(e) => {
        selectedRating = Number(e.target.dataset.value);
        console.log('selected',selectedRating)
        stars.forEach(s => {
            if(Number(s.dataset.value) <= selectedRating) {
                s.innerHTML = '&#9733;'
            } else {
                s.innerHTML = '&#9734;'
            }
        })
    })
})

function addReview() {
    let name = reviewerName.value;
    let comment = reviewComment.value;
    
    if(name === '') {
        reviewerNameError.textContent = 'Please enter name';
        return;
    }

    if(comment ==='') {
        reviewCommentError.textContent = 'Please enter your review';
        return;
    }
    if(selectedRating === 0) {
        ratingError.textContent = "Please drop your rating";
        return;        
    }

    const reviewerObject = {
        id : Date.now(),
        name : name,
        rating : selectedRating,
        comment : comment,
        date : new Date().toLocaleDateString()
    }
    console.log('reviewObj',reviewerObject);

    reviewArray.push(reviewerObject);
    localStorage.setItem('brewnest-reviews',JSON.stringify(reviewArray))

    renderReview()

    reviewerName.value = '';
    reviewComment.value = '';
    selectedRating = 0;
    stars.forEach(s => s.innerHTML = '&#9734;');
    reviewerNameError.textContent = '';
    reviewCommentError.textContent = '';
    ratingError.textContent = '';
}

reviewForm.addEventListener('submit',(e) => {
    e.preventDefault();
    addReview();
})

function renderReview() {
    const reviewCards = reviewArray.map(review => {    
         const starString = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
         console.log('review',review.comment,review.name,review.date,starString)
        return `
            <div class = 'reviewer-card'>
                <div class = 'reviewer-stars'>${starString}</div>
                <p class = 'reviewer-comment'>${review.comment}</p>
                <span class = 'reviewer-name'>${review.name}</span>
                <span class = 'reviewer-date'>${review.date}</span>
            </div>
        `
    }).join('')        

    reviewsTrack.innerHTML = reviewCards;
    if(reviewArray.length > 3) {
        prevReviewBtn.style.display = 'flex';
        nextReviewBtn.style.display = 'flex';
    }else {
        prevReviewBtn.style.display = 'none';
        nextReviewBtn.style.display = 'none';
    }
}
prevReviewBtn.addEventListener('click',(e) => {
    reviewsTrack.scrollBy({left : -100})
})
nextReviewBtn.addEventListener('click',(e)=> {
    reviewsTrack.scrollBy({left : 100})
})

}

