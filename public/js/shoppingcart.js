// import {postItem} from "./modules/module.js";

const displayCartContainer = document.querySelector("#cart-list");

// const cartContent = document.querySelector('.cart-content');
 const baseURLShoppingcart = 'http://localhost:8000/api/shoppingcart';


//  const getShoppingcart = () => {
     fetch(baseURLShoppingcart, { method: 'GET' })
     .then((response) => {
         return response.json();
     }).then((data) => {
         console.log('Products: ', data);
        data.forEach(data => {
            console.log(data.name);
        });
        displayProductsInShoppingcart(data);
    });


     const displayProductsInShoppingcart = (products) => { 
        for(let i = 0; i < products.length; i++) {
            console.log(displayCartContainer);

            let div = document.createElement("div");
            div.setAttribute("class", "cart");
            div.setAttribute("id", products[i].name + "div");
            displayCartContainer.append(div);

            let nameElem = document.createElement("p");
            let priceElem = document.createElement("p");
            let imageElem = document.createElement("img");
            let deleteButton = document.createElement("button");

            nameElem.setAttribute("class", "name-cart");
            nameElem.setAttribute("id", products[i].name);
            priceElem.setAttribute("class", "price-cart");
            priceElem.setAttribute("id", products[i].price);
            imageElem.setAttribute("class", "image-cart");
            imageElem.setAttribute("id", products[i].imageUrl);
            deleteButton.setAttribute("class", "delete-item");
            deleteButton.setAttribute("type", "submit");

            nameElem.innerHTML = products[i].name;
            priceElem.innerHTML = products[i].price;
            imageElem.src = products[i].imageUrl;
            deleteButton.innerHTML = "Remove the item";

            


            const deleteProduct = () => {
                let name = document.getElementById(products[i].name).innerHTML;
                let price = document.getElementById(products[i].price).innerHTML;
                let image = document.getElementById(products[i].imageUrl).src;
                let div = document.querySelector("#" + products[i].name + "div")

                const url =
                baseURLShoppingcart +
               "?id=" +
                id +
               "&name=" +
                name +
              "&price=" +
              price +
              "&imageUrl=" +
              image;
            

              fetch(url, { method: "DELETE" })
        .then(response => {
          return response.json();
        })
        .then(data => {
          div.remove(); 
        });
    };
     // Add event listener to delete button and remove item from shopping cart 
     deleteButton.addEventListener("click", e => {
        let name = e.target.parentNode.id;
        console.log(name);
        deleteProduct();
      });

      div.append(nameElem);
            div.append(priceElem);
            div.append(imageElem);
            div.append(deleteButton);
        }
    }

