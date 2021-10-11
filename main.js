let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "TEECCINO HERBAL COFFEE",
        tag : "TEECCINO HERBAL COFFEE",
        price: 50,
        inCart: 0,
    },
    {
        name: "DON FRANCISCO HAWAIIAN HAZELNUT",
        tag : "DON FRANCISCO HAWAIIAN HAZELNUT",
        price: 50,
        inCart: 0,
    },
    {
        name: "CAFÉ DU MONDE FRENCH ROAST",
        tag : "CAFÉ DU MONDE FRENCH ROAST",
        price: 50,
        inCart: 0,
    },
    {
        name: "KICKING HORSE COFFEE",
        tag : "KICKING HORSE COFFEE",
        price: 50,
        inCart: 0,
    },
    {
        name: "LAVAZZA CREMA E GUSTO",
        tag : "LAVAZZA CREMA E GUSTO",
        price: 50,
        inCart: 0,
    },
    {
        name: "ILLY GROUND COFFEE DRIP GRIND",
        tag : "ILLY GROUND COFFEE DRIP GRIND",
        price: 50,
        inCart: 0,
    }
]
for (let i =0; i < carts.length; i++){
    carts[i].addEventListener('click',() =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cartn span').textContent = productNumbers
    }
}
function cartNumbers(product){
    console.log("prduct is",product)
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cartn span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cartn span').textContent = 1;
    }
    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
   
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    // console.log("the product price is",product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    localStorage.setItem("totalCost",product.price);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price)
    } else {
        localStorage.setItem("totalCost",product.price)
    }

}



function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartContainer = document.querySelector(".cart-page-pro");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && cartContainer){
          cartContainer.innerHTML = '';
          Object.values(cartItems).map(item => {
              cartContainer.innerHTML += `
            <div class = "page-content">
                <div class = "product-info">
                    <img src = "./images/${item.tag}.png">
                    <span class ="name-info">${item.name}</span>
                </div>
                <div class ="price-info">
                    $${item.price}.00
                </div>
                <div class = "quantity-info">
                    
                    <span>${item.inCart}</span>
                    
                </div>

                <div class = "total-info">
                    $${item.inCart * item.price}.00
                </div>
            
            </div> 
              `;
          });
          cartContainer.innerHTML += `
            <div class = "cartTotalContainer">
                <h4 class = "cartTotalTitle">
                Basket Total
                </h4>
                <h4 class = "cartTotal">
                $${cartCost}.00
                </h4>
                `;
    }
}



onLoadCartNumbers();
displayCart();