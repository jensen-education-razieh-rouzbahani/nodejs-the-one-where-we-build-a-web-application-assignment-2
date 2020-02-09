const baseURLShoppingcart = 'http://localhost:8000/api/shoppingcart';


export const updateTotalPrice = () => {
    fetch(baseURLShoppingcart)
      .then((response) => {
        return response.json();
      }).then((data) => {
        totalPrice(data);
      }).catch((error) => {
        console.error('Error: ', error);
      });
  };
  
  export const totalPrice = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      let sum = parseInt(data[i].price);
      total += sum;
    }
    document.querySelector('.cart-total').innerHTML = 'Total: ' + '$' + total;
  };