
// Reservation
const guestNameInput = document.getElementById('guestName');    
const guestPhoneInput = document.getElementById('guestPhone');    
const reservationDateInput = document.getElementById('reservationDate');    
const reservationTimeInput = document.getElementById('reservationTime');    
const guestCountInput = document.getElementById('guestCount');

const guestNameError = document.getElementById('guestNameError');
const guestPhoneError = document.getElementById('guestPhoneError');
const reservationDateError = document.getElementById('reservationDateError');
const reservationTimeError = document.getElementById('reservationTimeError');
const guestCountError = document.getElementById('guestCountError');


const reservationForm = document.getElementById('reservationForm');
const confirmationCard = document.getElementById('confirmationCard')
const confirmDetails = document.getElementById('confirmDetails');
const newReservationBtn = document.getElementById('newReservationBtn');

export function reservation() {
reservationForm.addEventListener('submit',(e) => {    
    e.preventDefault();    // Stops default page reload    
    
    const guestName = guestNameInput.value;
    const guestPhone = guestPhoneInput.value;
    const reservationDate = reservationDateInput.value;    
    const reservationTime = reservationTimeInput.value;
    const guestCount = guestCountInput.value;

    if(guestName.trim() === '') {
        guestNameInput.classList.add('error');
        guestNameError.textContent = 'Please enter your name';        
        return;        
    }

    if(guestPhone.trim() === '') {
        guestPhoneInput.classList.add('error');        
        guestPhoneError.textContent = 'Please enter a valid phone number';
        return;
    }

    if(reservationDate.trim() === '') {
        reservationDateInput.classList.add('error');        
        reservationDateError.textContent = 'Please enter a reservation date';
        return;
    }
    const today = new Date().toISOString().split('T')[0];
    if(reservationDate < today) {
        reservationDateInput.classList.add('error');
        reservationDateError.textContent = 'The selected Date has passed,pick a future date';
        return;
    }
    reservationDateError.textContent = '';
    
    if(reservationTime.trim() === '') {
        reservationTimeInput.classList.add('error');
        reservationTimeError.textContent = 'Please enter a time'
        return;
    }
    if(reservationTime < '11:00' || reservationTime > '20:00') {
        reservationTimeInput.classList.add('error');
        reservationTimeError.textContent = "Sorry, reservation starts by 11am and close by 8:00pm"
        return;
    }
    reservationTimeError.textContent = '';

    if(guestCount === '') {
        guestCountInput.classList.add('error');
        guestCountError.textContent= 'Please select number of guest';
        return;
    }
    reservationForm.style.display = 'none';
    confirmationCard.classList.add('active');

    confirmDetails.innerHTML = `
            <div class = 'confirm-row'>            
                <span>Name</span>
                <span>${guestName}</span>
            </div>
            
            <div class = 'confirm-row'>            
                <span>Phone Number</span>
                <span>${guestPhone}</span>
            </div>

            <div class = 'confirm-row'>            
                <span>Date</span>
                <span>${reservationDate}</span>
            </div>

            <div class = 'confirm-row'>            
                <span>Time</span>
                <span>${reservationTime}</span>
            </div>

            <div class = 'confirm-row'>            
                <span>Guests</span>
                <span>${guestCount}</span>
            </div>                
        
    `    
})

newReservationBtn.addEventListener('click',() => {
    confirmationCard.classList.remove('active')
    reservationForm.style.display = 'block';
    guestNameError.textContent = '';
    guestPhoneError.textContent = '';
    reservationDateError.textContent = '';
    reservationTimeError.textContent = '';
    guestCountError.textContent = '';
    reservationForm.reset();
})

}
