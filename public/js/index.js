import { displayProducts } from "./modules/products-load.js";

//  variables

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


//  inserts or adds product to the shopping cart

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
