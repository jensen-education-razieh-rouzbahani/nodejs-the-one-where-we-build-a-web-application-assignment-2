import { addItemToshoppingCart } from '../index.js';

const baseURLShoppingcart = 'http://localhost:8000/api/shoppingcart';

// display products on html page

export const displayProducts = (products) => { 
    let productFragment = document.createDocumentFragment();
    for(let i = 0; i < products.length; i++) {
        let product = document.createElement('article'); // Parent article
        product.classList.add('product');

        // Appends to parent article (product)
        addImage(product, products, i);
        addTitle(product, products, i);
        addPrice(product, products, i);
        // addButton(product, products, i);

        productFragment.append(product);
    }

    document.querySelector('.display-products').append(productFragment);
}

    // Appends Image to product
const addImage = (product, products, i) => {
    let divElem = document.createElement('div');
    let productImage = document.createElement('img');
    let productButton = document.createElement('button');
    productImage.setAttribute('src',products[i].imageUrl);
    productButton.innerHTML = 'Add to cart';
    
    divElem.append(productImage);
    divElem.append(productButton);
    product.appendChild(divElem);
    divElem.classList.add('img-container');
    productImage.classList.add('product-img');
    productButton.classList.add('bag-btn');
    productButton.id = 'button-' + i;
    checkIfInCart(i); // Changes innerHTML if already added
    productButton.addEventListener('click', () => {
         addItemToshoppingCart(products[i].id, products[i].name, products[i].price, products[i].imageUrl); // Gives the button an eventlistener to add on click
         //console.log(products[i].id,  products[i].name, products[i].price, products[i].imageUrl);
    });
    // product.append(productButton);

  };

// Appends Title to product
const addTitle = (product, products, i) => {
    let productTitle = document.createElement('h3');
    productTitle.innerHTML = products[i].name;
    product.append(productTitle);
  };

  // Appends Price to product
const addPrice = (product, products, i) => {
    let productPrice = document.createElement('h4');
    productPrice.innerHTML = '$' + products[i].price;
    product.append(productPrice);
  };

//   // Appends Button to product
// const addButton = async (product, products, i) => {
//     let productButton = document.createElement("button");
//     productButton.classList.add('bag-btn');
//     productButton.id = "button-" + i;
//     productButton.innerHTML = "Add to cart";
//     checkIfInCart(i); // Changes innerHTML if already added
//     productButton.addEventListener("click", () => {
//       addItemToshoppingCart(products[i].id); // Gives the button an eventlistener to add on click
//     });
//     product.append(productButton);
//   };

  // Changes innerHTML of button if it exists in cart
const checkIfInCart = async productId => {
    let cartId = await fetchCartId(productId);
    if (cartId) {
      document.querySelector('#button-' + cartId).innerHTML =
        'Product already in cart';
    }
  };

  // Returns the cartId if it exists
const fetchCartId = async i => {
    let id;
    await fetch(baseURLShoppingcart)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data[i]) {
          id = data[i].id;
          // console.log('not found' + id);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
    return id;
  };

        