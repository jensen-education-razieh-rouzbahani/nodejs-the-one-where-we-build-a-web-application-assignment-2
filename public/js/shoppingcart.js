import { displayShoppingcartProducts } from './modules/cart-items-load.js';
import { updateTotalPrice, totalPrice } from './modules/shoppingcart-calculation.js';



 const baseURLShoppingcart = 'http://localhost:8000/api/shoppingcart';

//  get the shopping cart items

 const getShoppingcartItems = () => {
     fetch(baseURLShoppingcart, { method: 'GET' })
     .then((response) => {
         return response.json();
     }).then((data) => {
         console.log('Products in shopping cart: ', data);
        data.forEach(data => {
            console.log(data.name);    
        });
        displayShoppingcartProducts(data);
        totalPrice(data);
    }).catch((error) => {
      console.error('Error: ', error);
    });
  };

  getShoppingcartItems();


// removes product in the shopping cart
export const removeShoppingcartItem = (id) => {
  fetch(baseURLShoppingcart, {method: 'DELETE', body: JSON.stringify({id: id})}) 
  .then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    let item = document.getElementById('item' + id);
    console.log(item);
    item.parentNode.removeChild(item); // removes item
    updateTotalPrice(); // updates the total price
  }).catch((error) => {
    console.error('Error: ', error);
  });
};


  