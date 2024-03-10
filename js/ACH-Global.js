$(document).ready(function () {
  init();
  populate_video();
  populate_store();
  cart();
});

function init() {
  $('#UserPackages').show();
  $('#MechanicPackages').hide();
  $('#WorkshopPackages').hide();
  $('.cartTab').hide();
  $('.icon-cart').on('click', enable_cart);
}

function sub_toggle_user(){
  $('#UserPackages').show();
  $('#MechanicPackages').hide();
  $('#WorkshopPackages').hide();
}
function sub_toggle_mech(){
  $('#UserPackages').hide();
  $('#MechanicPackages').show();
  $('#WorkshopPackages').hide();
}
function sub_toggle_work(){
  $('#UserPackages').hide();
  $('#MechanicPackages').hide();
  $('#WorkshopPackages').show();
}

function populate_video(){
  let videoFrame = document.querySelector('.video-frames');
  videoFrame.innerHTML = null;

  videos.forEach(video => {
    let newVideo = document.createElement('div');
    newVideo.classList.add('item');
    newVideo.innerHTML =
        ` <iframe src="${video.url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ></iframe>
            <h2>${video.description}</h2>`;
    videoFrame.appendChild(newVideo);
  });
}
function populate_store(){
  let listProductHTML = document.querySelector('.listProduct');
  listProductHTML.innerHTML = null;

  products.forEach(product => {
    let newProduct = document.createElement('div');
    newProduct.classList.add('item');
    newProduct.innerHTML =
        `<a href="./detail.html?id=${product.id}">
             <img src="${product.image}">
         </a>
         <h2>${product.name}</h2>
         <div class="price">$${product.price}</div>
         <button 
             class="addCart" 
             data-id='${product.id}'>
                 Add To Cart
         </button>`;
    listProductHTML.appendChild(newProduct);
  });
}

function enable_cart(){
  let container = document.querySelector('.store-content')
  $('.cartTab').toggle(200);
  container.classList.toggle('activeTabCart')  ;
}
const cart = () => {
  let listCartHTML = document.querySelector('.listCart');
  let iconCart = document.querySelector('.icon-cart');
  let iconCartSpan = iconCart.querySelector('span');
  let cart = [];

  const setProductInCart = (idProduct, value) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == idProduct);
    if(value <= 0){
      cart.splice(positionThisProductInCart, 1);
    }else if(positionThisProductInCart < 0){
      cart.push({
        product_id: idProduct,
        quantity: 1
      });
    }else{
      cart[positionThisProductInCart].quantity = value;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    addCartToHTML();
  }

  const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let subTotal= 0;
    let totalQuantity = 0;
    if(cart.length > 0){
      cart.forEach(item => {
        totalQuantity = totalQuantity +  item.quantity;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = item.product_id;

        let positionProduct = products.findIndex((value) => value.id == item.product_id);
        let info = products[positionProduct];
        subTotal = subTotal + parseFloat(info.price * item.quantity);
        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
                    <div class="row">
                        <div class="image col-md-auto">
                            <img src="${info.image}">
                        </div>
                        <div class="name col">
                            ${info.name}
                        </div>
                        <div class="totalPrice col-md-auto">
                            $ ${(info.price * item.quantity).toFixed(2)}
                        </div>
                        <div class="quantity col-md-auto">
                            <span class="minus" data-id="${info.id}"><</span>
                            <span>${item.quantity}</span>
                            <span class="plus" data-id="${info.id}">></span>
                    </div>
                    </div>
                    
                `;
      })
    }
    document.querySelector('.subtotal h5:last-child').innerHTML = `$ ${subTotal.toFixed(2)}`;
    iconCartSpan.innerText = totalQuantity;
  }

  document.addEventListener('click', (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let quantity = null;
    let positionProductInCart = cart.findIndex((value) => value.product_id == idProduct);
    switch (true) {
      case (buttonClick.classList.contains('addCart')):
        quantity = (positionProductInCart < 0) ? 1 : cart[positionProductInCart].quantity+1;
        setProductInCart(idProduct, quantity);
        break;
      case (buttonClick.classList.contains('minus')):
        quantity = cart[positionProductInCart].quantity-1;
        setProductInCart(idProduct, quantity);
        break;
      case (buttonClick.classList.contains('plus')):
        quantity = cart[positionProductInCart].quantity+1;
        setProductInCart(idProduct, quantity);
        break;
      default:
        break;
    }
  })

  const initApp = () => {

    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'));
      addCartToHTML();
    }
  }
  initApp();
}