$(document).ready(function () {
  init();
  initDb();
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
  $('#btnLogin').on('click', frmlogin_Validation);
  $('#btnRegister').on('click', frmregister_Validation);
  $('body').on('pageshow', resetValidation);
}
function initDb(){
  try{
    db.createDatabase();
    if(dbOpen){
      console.info("DB Open");
      // db.createTable();
      // states.insertData();
    }
    else{
      console.error("Error while creating the database");
    }
  }
  catch (error){
    console.error("ERRORS"+error);
  }
}

function resetValidation(){
  $('.validator').hide();
  $('.frmdiv input').removeClass('error');
  $('.frmdiv form')[0].reset();
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
