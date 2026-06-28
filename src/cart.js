import { menuItems } from "../data/menuData.js";

// Order-Panels
const orderCount = document.getElementById('orderCount');
const orderEmpty = document.getElementById('orderEmpty');
const orderList = document.getElementById('orderList');
const orderFooter = document.getElementById('orderFooter');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const orderTotal = document.getElementById('orderTotal');
const clearOrderBtn = document.getElementById('clearOrderBtn');

// Order Modal
const orderModal = document.getElementById('orderModal');
const receiptContent = document.getElementById('receiptContent');
const downloadModalBtn = document.getElementById('downloadReceiptBtn');
const cancelBtn = document.getElementById('cancelBtn');

let cart = [];   // Holds all items added to order
let lastOrder = [];  // To keep track of the last Order
let lastTotal = 0;   // To keep track of the total for the last Order

export function addToCart(id) {            
    const menuItem = menuItems.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === menuItem.id)
    
    const productItem = {
        id : menuItem.id,
        name : menuItem.name,
        price : menuItem.price,
        quantity : 1
    }

    if(existingItem) {
        existingItem.quantity += 1;
    }else {
        cart.push(productItem)
    }
    
    renderOrderPanel();
}


function renderOrderPanel() {
    const total = cart.reduce((acc,item) => acc + (item.price * item.quantity),0)    
    const itemCount = cart.reduce((acc,item) => (acc + item.quantity),0);    
    
    if(cart.length === 0) {
        orderEmpty.style.display = 'block';
        orderFooter.style.display = 'none';
    }else {
        orderFooter.style.display = 'block';
        orderEmpty.style.display = 'none';
    }
    const orderHTML = cart.map(item => `            
            <li class = 'order-item'>
                <span class = 'order-item-name'>${item.name}</span>
                <div class = 'order-item-controls'>
                    <button class = 'qty-btn' data-id = '${item.id}'>-</button>
                    <span class = 'qty-value'>${item.quantity}</span>
                    <button class = 'qty-btn' data-id = '${item.id}'>+</button>
                </div>
                <span class = 'order-item-price'>₦${(item.price * item.quantity).toLocaleString()}</span>
            </li>            
        `).join('')
        orderList.innerHTML = orderHTML;
        orderCount.textContent = itemCount;
        orderTotal.textContent = '₦' + total.toLocaleString();
        
}

orderList.addEventListener('click',(e) => {
    if(e.target.classList.contains('qty-btn')) {
        const id = Number(e.target.dataset.id);
        const cartItem = cart.find(item => item.id === id);
        if(e.target.textContent.trim() === '+') {
            // my logic here
            cartItem.quantity +=1;
        }else {
            // my logic here
            cartItem.quantity -=1;
            if(cartItem.quantity < 1) {
                cart = cart.filter(item => item.id !== id);
            }
        }
        renderOrderPanel()
    }
    
})

clearOrderBtn.addEventListener('click',() => {
  cart = [];
  renderOrderPanel();  
})


placeOrderBtn.addEventListener('click',() => {
    if(cart.length === 0) return;

    const receiptHTML = cart.map(item => 
        `
            <div class = 'receipt-row'>
                <span>${item.name} * ${item.quantity}</span>
                <span>₦${(item.price * item.quantity).toLocaleString()}</span>
            </div>            
        `
    ).join('')
    const total = cart.reduce((acc,item)=> acc +(item.price * item.quantity),0)

    const totalRow = `
        <div class = 'receipt-total'>
            <span>Total: </span>
            <span>₦${total.toLocaleString()}</span>            
        </div>
        <h4>Thanks for your order!</h4>
    `;
    receiptContent.innerHTML = receiptHTML + totalRow;
    orderModal.classList.add('active');
    lastOrder = [...cart];
    lastTotal = total;

    cart = [];   // Refresh the Cart     
    renderOrderPanel()  // Then re-render the OrderPanel
})
cancelBtn.addEventListener('click',() => {    
    cart = [...lastOrder]; // restore the saved order back into the cart
    renderOrderPanel();     // update the UI to show restored items
    orderModal.classList.remove('active') // close the orderModal
})

downloadModalBtn.addEventListener('click',() => {    
    const doc = new jspdf.jsPDF();
    let y = 10;
    
    doc.text('Brewnest - Order Receipt',10, y)
    y +=10;
    doc.text('Lagos,Nigeria',10, y)
    y += 10;
    doc.text('---------------------------------------',10, y)
    y +=10;
    lastOrder.forEach(item => {
        doc.text(`${item.name} * ${item.quantity}   ₦${(item.price * item.quantity).toLocaleString()}`,10,y)
        y +=10;
    })
    y +=10;
    doc.text('-------------------------------------',10,y);
    y +=10;
    doc.text(`Total: ₦${lastTotal.toLocaleString()}`,10,y);
    y +=10;

    doc.text('Thank you for the order!',10, y)

    doc.save('brewnest-receipt.pdf');

    orderModal.classList.remove('active')
})


