import { menuItems } from "../data/menuData.js";

// Menu 
const menuGrid = document.getElementById('menuGrid');
const menuTabs = document.getElementById('menuTabs')

// Nodelists
const tabBtns = document.querySelectorAll('.tab-btn');
const navLinks = document.querySelectorAll('.nav-links a');

export function menu() {
    let activeCategory = 'coffee'; // Tracks the menu tab which is selected

    // Renders menu Cards based on the active category
    function menuRender() {
        // filter menu items to only the active category
        const filteredMenu = menuItems.filter(menuItem => menuItem.category === activeCategory);

        // One card per item using temperate literal
        const filteredCard = filteredMenu.map(item => 
            `            
                    <div class = 'menu-card'>                            
                        <img src ='${item.image}' class = 'menu-card-img'/>
                        <p class = 'menu-card-name'>${item.name}</p>
                        <p class = 'menu-card-desc'>${item.description}</p>
                        <p class = 'menu-card-price'> ₦${item.price.toLocaleString()}</p>
                        <button data-id = '${item.id}' class = 'menu-card-add' onclick ='addToCart(${item.id})'>Add</button>
                    
                    
                    </div>
            `
            
        ).join('')
        menuGrid.innerHTML = filteredCard;
    }


    tabBtns.forEach(tab => {    
        tab.addEventListener('click',(e)=> {    
            tabBtns.forEach(btn => btn.classList.remove('active'));
            const id = e.target.dataset.category;
            e.target.classList.add('active');
            activeCategory = id;
            menuRender()
        })
    })
    menuRender();
}
