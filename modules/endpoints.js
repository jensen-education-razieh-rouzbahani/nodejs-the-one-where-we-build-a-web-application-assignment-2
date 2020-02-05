const database = require('./database-operations');

module.exports = (app) => {
    // Add or post product to products

    app.post('/api/product', async (request, response) => {
        console.log(request.url);
        const id = request.body.id;
        console.log(id);
        const name = request.body.name;
        const price = request.body.price;
        const imageUrl = request.body.imageUrl;

        let message = {
            success: true,
            message: 'Product added!'
          };
          
          
          const res = database.insertProduct(id, name, price, imageUrl);
          message.data = res[0];
          response.send(message);
        });



    // Get all products from products

  app.get('/api/products', (request, response) => {
    const products = database.getProducts();
    response.send(products);
  });
  

  // Get products from shopping cart 

  app.get('/api/shoppingcart', async (request, response) => {
    const shoppingcart = database.getShoppingcart();
    response.send(shoppingcart);
  });
                      
  
  //Post or add product to the shopping cart

  app.post('/api/shoppingcart', async (request, response) => {
    console.log(request.url);
    const id = request.body.id;
    
    const name = request.body.name;
    const price = request.body.price;
    const imageUrl = request.body.imageUrl;

    let message = {
      success: true,
      message: 'Product added'
    };

    const productInShoppingcart = database.hasProductInShoppingcart(id, name, price, imageUrl);
    const productInProducts = database.hasProductInProducts(id);
    console.log(productInProducts);

    if (productInShoppingcart) {
        console.log(productInShoppingcart);
      const errorMessage = {
        error: 'Error',
        message: 'Ooops product is already there, cannot be added'
      };
      response.send(errorMessage);
    } else if (!productInProducts) {
      const errorMessage = {
        error: 'Error',
        message: 'Ooops product is not in the product list, cannot be added.'
      };
      response.send(errorMessage);
    } else {
      const res = database.addProductToShoppingcart(id, name, price, imageUrl); 
      message.data = res[0];
      response.send(message);
    }
  });

  // Remove product from the shopping cart

  app.delete('/api/shoppingcart', async (request, response) => {
    console.log(request.url);
    const id = request.body.id;
    const name = request.body.name;
    const price = request.body.price;
    const imageUrl = request.body.imageUrl;

    let message = {
      success: true,
      message: 'Product deleted'
    };

    const productInShoppingcart = database.hasProductInShoppingcart(id, name, price, imageUrl);
    if (!productInShoppingcart) {
      const errorMessage = {
        error: 'Error',
        message: 'Product not found to be deleted.'
      };
      response.send(errorMessage);
    } else {
      const res = database.removeProductFromShoppingcart(id, name, price, imageUrl);
      message.data = res[0];
      response.send(message);
    }
  });
};

   



