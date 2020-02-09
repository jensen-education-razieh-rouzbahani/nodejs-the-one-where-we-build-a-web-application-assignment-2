import { displayProducts } from "./modules/products-load";

//  variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cart = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const showProducts = document.querySelector('.display-products');
const baseURLProducts = 'http://localhost:8000/api/products';
const baseURLShoppingcart = 'http://localhost:8000/api/shoppingcart';



// gets the products & call the function displayProducts() to display them

 const get = () => {
    fetch(baseURLProducts, { method: 'GET' })
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log('Products: ', data);
        displayProducts(data);
    }).catch(error => {
        console.error("Error:", error);
      });
 };

 get();


//  insert or add product to the shopping cart

export const addItemToshoppingCart = (id, name, price, image) => {
     let data = {
         id: id,
         name: name,
         price: price,
         imageUrl: image
        }
         fetch(baseURLShoppingcart, {method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }})
         .then(response => {
          return response.json();
      }).then(data => {
        console.log(data);
        // window.alert("Product added")
    });
  };
