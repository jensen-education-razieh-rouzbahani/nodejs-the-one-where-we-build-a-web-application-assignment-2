const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);


// Initiatie database or set some defaults (required if the JSON file is empty)

exports.initiateDatabase = () => {
    const hasDatabase4Products = database.has('products').value();

    if (!hasDatabase4Products) {
        database.defaults({ products: [] }).write();
    }

    const hasDatabase4Shoppingcart = database.has('shoppingcart').value();
    if (!hasDatabase4Shoppingcart) {
        database.defaults({shoppingcart: [] }).write();
    }
};

// Insert all products

exports.insertProduct = async (id,name,price, imageUrl) => {
    const response = await database.get('products')
                                   .push({ id: id, name: name, price:price, imageUrl:imageUrl })
                                   .write();
                                   return response;
};

//  Get all products

exports.getProducts = () => {
      return database.get('products').value();
    };

// Insert product to the shopping cart

exports.addProductToShoppingcart = async (id,name,price, imageUrl) => {
    const response = await database.get('shoppingcart')
                                   .push({id:id, name:name, price:price,imageUrl:imageUrl})
                                   .write()
                                   return response;
                                };


// Get products from shopping cart                               

exports.getShoppingcart = () => {
    return database.get('shoppingcart').value();
};
  


// check if product exists in the shopping cart

exports.hasProductInShoppingcart =  (id,name,price,imageUrl) => {
    const response =  database.get('shoppingcart')
                             .find({ id:id, name:name, price:price, imageUrl:imageUrl })
                             .value();
                             return response;
                            };
  
// Check if product exists in the products array

exports.hasProductInProducts =  (id) => {
    console.log(id);
    const response =  database.get('products')
                              .find({id:id.toString()})
                              .value();
                              //  console.log(database.get('products').find({ id:"1" }).value())
                              return response;
                              console.log(response);
                            };


// Remove product from the shopping cart

exports.removeProductFromShoppingcart = async(id,name,price, imageUrl) => {
    const response = await database.get('shoppingcart')
                                   .remove({id:id})
                                   .write();
                                   return response;
                                };

    
