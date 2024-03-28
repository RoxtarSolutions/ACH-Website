
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

function search_tt(){
    var value = $(this).val().toLowerCase();
    $('.video-frames div').each( function(){
        var divId = $(this).attr('id');
        if (divId.toLowerCase().indexOf(value) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
}
function search_store(){
    var value = $(this).val().toLowerCase();
    $('.listProduct div').each( function(){
        var divId = $(this).attr('id');
        if (divId.toLowerCase().indexOf(value) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
}
function RememberCheck(){
    let remember = localStorage.getItem("Remember");
    let username = localStorage.getItem('Username');
    let login = sessionStorage.getItem("Login");

    $('.menu-selection').hide();

    if(login === "true"){
        $.mobile.changePage($('#UserPage'));
        $('#VehicleDetails').show();
    }else if(remember==="true"){
        $.mobile.changePage($('#UserPage'));
        $('#VehicleDetails').show();
        sessionStorage.setItem("Login", true);
        sessionStorage.setItem("Username", username);
    }else if(remember==="false" || remember === null){
        $.mobile.changePage($('#LoginPage'));
    }
}
function LogOut(){
    localStorage.removeItem("Username");
    sessionStorage.clear();
    localStorage.setItem("Remember", false);
    $.mobile.changePage($('#LoginPage'));
}
function addODODetails(){
    let ODO = $('#addODO').val();
    let ODOrow = document.querySelector('#ODOrow');
    if(ODOrow == null){
        let Details = document.querySelector('#tblAddDetails tbody');
        Details.innerHTML += `<tr id="ODOrow"><th scope="row">ODO</th><td>${ODO} KM</td></tr>`;
        $('#addODO').addClass('valid');
    }else{
        ODOrow.innerHTML = `<th scope="row">ODO</th><td>${ODO} KM</td>`;
        $('#addODO').addClass('valid');
    }

}
function ModDetails(){
    let mods = $('#addMod').val();
    let modrow = document.querySelector('#Modrow');

    if(modrow == null){
        let Details = document.querySelector('#tblAddDetails tbody');
        Details.innerHTML += `<tr id="Modrow"><th scope="row">Modifications</th><td>${mods}</td></tr>`;
    }
    else{
        Modrow.innerHTML = `<th scope="row">Modifications</th><td>${mods}</td>`;
    }
}
async function addVINDetails(){
    let vin = $('#addVIN').val().toUpperCase();
    let vinValid = document.querySelector('#addVinValid');
    let Details = document.querySelector('#tblAddDetails');
    Details.innerHTML=``;
    let vehicleFound = false;
    let data;

    $('#frmAddVehicle input').removeClass('error').removeClass('valid');
    $('.validator').hide();

        if(vin===null || vin===""){
        }else{
            const res = await fetch(`https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKcHJpeWFuc2hwY0BnbWFpbC5jb20=`)
            data = await res.json();
            try{
                if(data.message==null && data.make != null){
                    vehicleFound = true;
                    $('#addVIN').addClass('valid');
                }else if(data.make == null ){
                    vinValid.innerHTML=`Invalid VIN`;
                    $('#addVIN').addClass('error');
                    $('#addVinValid').show();
                }else{
                    vinValid.innerHTML=`${data.message}`;
                    $('#addVIN').addClass('error');
                    $('#addVinValid').show();
                }
            }catch {
                vinValid.innerHTML=`Invalid Input`;
                $('#addVIN').addClass('error');
                $('#addVinValid').show();
            }
        }

    if(vehicleFound){
        let vehicle = document.createElement('tbody');
        vehicle.innerHTML =
            `<tr>
                 <th scope="row">Year</th>
                 <td>${data.years[0].year}</td>
             </tr>
            <tr>
                 <th scope="row">Make</th>
                 <td>${data.make.name}</td>
             </tr>
             <tr>
                 <th scope="row">Model</th>
                 <td>${data.model.name}</td>
             </tr>
             <tr>
                 <th scope="row">Body</th>
                 <td>${data.categories.vehicleStyle}</td>
             </tr>
              <tr>
                 <th scope="row">Engine</th>
                 <td>${data.engine.size}L ${data.engine.configuration}-${data.engine.cylinder} cylinder, ${data.engine.compressorType}</td>
             </tr>
              <tr>
                 <th scope="row">Horsepower</th>
                 <td>${data.engine.horsepower}</td>
             </tr>
              <tr>
                 <th scope="row">Torque</th>
                 <td>${data.engine.torque}</td>
             </tr>
             <tr>
                 <th scope="row">Transmission</th>
                 <td>${data.transmission.numberOfSpeeds} speed, ${data.transmission.transmissionType}</td>
             </tr>
              <tr>
                 <th scope="row">Drivetrain</th>
                 <td>${data.drivenWheels.charAt(0).toUpperCase() + data.drivenWheels.slice(1)}</td>
             </tr>
             <tr>
                 <th scope="row">Fuel</th>
                 <td>${data.engine.type.charAt(0).toUpperCase() + data.engine.type.slice(1)}</td>
             </tr>
        `;
        Details.appendChild(vehicle);
    }
}
function AddVehicle(){
    $('.validator').removeClass('error').removeClass('valid');

    let vinValid = document.querySelector('#addVinValid');
    let ODOValid = document.querySelector('#addODOValid');
    let vin = $('#addVIN').val().toUpperCase();
    let ODO = $('#addODO').val();

    if(vin === ""){
        vinValid.innerHTML='Required';
        $('#addVIN').addClass('error');
        $('#addVinValid').show();
    }
    if(ODO === ""){
        ODOValid.innerHTML='Required';
        $('#addODO').addClass('error');
        $('#addODOValid').show();
    }
}
function btnVehicleCancel(){
    $('#frmAddVehicle input').removeClass('error').removeClass('valid');
    $('#frmAddVehicle')[0].reset();
    document.querySelector('#tblAddDetails tbody').innerHTML = ``;
    $('.menu-selection').hide();
    $('#VehicleDetails').show();
}