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



// getting the products

 const get = () => {
    fetch(baseURLProducts, { method: 'GET' })
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log('Products: ', data);
        displayProducts(data);
    });
 }

 get();


//  insert or add product to the shopping cart

const postItem = (id, name, price, image) => {
    let data = {
        id: id,
        name: name,
        price: price,
        imageUrl: image
    }
    fetch (baseURLShoppingcart, {method: "POST", body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        // console.log(data.message);
         window.alert("Product added");

        
    })
}

// remove product

const deleteProduct = (id, name, price, image) => {
    let data = {
        id: id,
        name: name,
        price: price,
        imageUrl: image  
    }
    fetch (baseURLShoppingcart, {method: "DELETE", body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }})
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        console.log(data.message);
        window.alert('Product removed');
    });
    

},

// display products

 displayProducts = (products) => { 
    for(let i = 0; i < products.length; i++) {

        let articleElem = document.createElement('article');
        let divElem = document.createElement('div');
        let imageElem = document.createElement('img');
        let buttonElem = document.createElement('button');
        let h3Elem = document.createElement('h3');
        let h4Elem = document.createElement('h4'); 

        imageElem.setAttribute('src',products[i].imageUrl);
        h3Elem.innerHTML = products[i].name;
        h4Elem.innerHTML = products[i].price;
        buttonElem.innerHTML = 'add to cart';

        articleElem.append(divElem);
        divElem.append(imageElem);
        divElem.append(buttonElem);
        articleElem.append(h3Elem);
        articleElem.append(h4Elem);
        showProducts.append(articleElem);

        //Add CSS-classes
        articleElem.classList.add('product');
        divElem.classList.add('img-container');
        buttonElem.classList.add('bag-btn');
        imageElem.classList.add('product-img');

        buttonElem.addEventListener('click', () => {
            postItem(products[i].id, products[i].name, products[i].price, products[i].imageUrl);
        })

    }
}


