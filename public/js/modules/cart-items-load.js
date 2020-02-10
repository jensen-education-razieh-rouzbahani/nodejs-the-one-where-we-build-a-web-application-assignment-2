import { removeShoppingcartItem } from '../shoppingcart.js';



// displays shopping cart items

export const displayShoppingcartProducts = (cartItems) => {
    let shoppingcartFragment = document.createDocumentFragment(); //Elements will be added to this fragmnet before added to DOM
    for(let i = 0; i < cartItems.length; i++) {
        let cartItem = document.createElement('div'); //parent div
        cartItem.classList.add('item');
        cartItem.id = 'item ' + cartItems[i].id; // unique id for easy removal

        // Appends to parent div (item)
        addImage(cartItem, cartItems, i);
        addTitle(cartItem, cartItems, i);
        addPrice(cartItem, cartItems, i);
        addButton(cartItem, cartItems, i);

        shoppingcartFragment.appendChild(cartItem); // Adds the built item to fragment
    }
    document.querySelector('.cart-content').appendChild(shoppingcartFragment); //writes the items on DOM
};

// Appends Image to Item
const addImage = (cartItem, cartItems, i) => {
    let itemImage = document.createElement('img');
    itemImage.src = cartItems[i].imageUrl;
    cartItem.appendChild(itemImage);
  };
  
  // Appends Title to Item
  const addTitle = (cartItem, cartItems, i) => {
    let itemTitle = document.createElement('h4');
    itemTitle.innerHTML = cartItems[i].name;
    cartItem.appendChild(itemTitle);
  };
  
  // Appends Price to Item
  const addPrice = (cartItem, cartItems, i) => {
    let itemPrice = document.createElement('h5');
    itemPrice.innerHTML = '$' + cartItems[i].price;
    cartItem.appendChild(itemPrice);
  };
  
  // Appends Button to Item
  const addButton = (cartItem, cartItems, i) => {
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'remove';
    removeButton.id = 'remove-button- ' + i;
    removeButton.addEventListener('click', () => {
        removeShoppingcartItem(cartItems[i].id); //Gives the button an eventlistener to remove on click
    });
    cartItem.appendChild(removeButton);
  };
 