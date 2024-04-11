$(document).ready(function () {
  init();
  initDb();
  populate_video();
  populate_store();
  cart();
  hiddendivs();
});

function init() {
  $('.icon-cart').on('click', enable_cart);
  $('#btnLogin').on('click', frmlogin_Validation);
  $('#btnRegister').on('click', frmregister_Validation);
  $('#UP-Vehicles').on('click',VehicleDetailsPage);
  $('#UP-History').on('click', HistoryDetails);
  $('#btnAddVehicle').on('click', btnAddVehicle);
  $('#tt-search').on('input', search_tt);
  $('#store-search').on('input', search_store);
  $('#btnCheckout').on('click', CheckoutPopulate);
  $('#checkoutPCode').on('change', Pincode);
  $('#checkoutCard').on('change', CardNumber);
  $('#checkoutExp').on('change', ExpCard);
  $('#checkoutCVV').on('change', CVVCard);
  $('#btnOrder').on('click', frmCheckout);
  $('#btnCoutCancel').on('click', btnCoutCancel);
  $('#UserPage').on('pageshow', RememberCheck);
  $('#btnVehicleAdd').on('click', AddVehicle);
  $('#btnVehicleCancel').on('click', btnVehicleCancel);
  $('#btnEditCancel').on('click', btnVehicleCancel);
  $('#addVIN').on('change',addVINDetails);
  $('#addODO').on('change', addODODetails);
  $('#addWTNo').on('click', WTire);
  $('#addWTYes').on('click', WTire);
  $('#addMod').on('change', ModDetails);
  $('#editODO').on('change', editODODetails);
  $('#editWTNo').on('click', editWTire);
  $('#editWTYes').on('click', editWTire);
  $('#editMod').on('change', editModDetails);
  $('#btnVehicleUpdate').on('click', UpdateVehicle);
  $('#btnVehicleDelete').on('click', DeleteVehicle);
  $('#selectVehicle').on('change', Selector);
  $('body').on('pageshow', resetPages);
}
function initDb(){
  try{
    DB.createDatabase();
    if(db){
      DB.createTables();
    }
    else{
      console.error("Error while opening the database");
    }
  }
  catch (error){
    console.error("ERRORS :"+error);
  }
}

function hiddendivs(){
  $('#UserPackages').show();
  $('#MechanicPackages').hide();
  $('#WorkshopPackages').hide();
  $('.menu-selection').hide();
  $('.cartTab').hide();
}
function resetPages(){
  $('.validator').hide();
  $('.frmdiv input').removeClass('error').removeClass('valid');
  $('.frmdiv form')[0].reset();
  $('#frmRegister')[0].reset();
  $('.popuptext').hide();
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
    newVideo.id = `${video.description}`;
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
    newProduct.id =`${product.name}`;
    newProduct.innerHTML =
        `<a href="" onclick="pdetails(${product.id})">
             <img src="${product.image}" alt="">
         </a>
         <h2>${product.name}</h2>
         <p class="price">$${product.price}</p>
         <button 
             class="addCart" 
             data-id='${product.id}'>
                 Add To Cart
         </button>
        <span class="popuptext" id="myPopup_${product.id}">${product.description}</span>
        `;
    listProductHTML.appendChild(newProduct);
    $('.popuptext').hide();
  });
}
function pdetails(id){
    $(`#myPopup_${id}`).toggle();
}
function enable_cart(){
  let container = document.querySelector('.store-content')
  $('.cartTab').toggle(250);
  container.classList.toggle('activeTabCart')  ;
}