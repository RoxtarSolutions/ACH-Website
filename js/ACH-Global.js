$(document).ready(function () {
  init();
  populate_store();
});

function init() {
  $('#UserPackages').show();
  $('#MechanicPackages').hide();
  $('#WorkshopPackages').hide();
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