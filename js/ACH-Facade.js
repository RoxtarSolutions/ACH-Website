const cart = () => {
    let listCartHTML = document.querySelector('.listCart');
    let cartDetails = document.querySelector('#tblCartDetails tbody');
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

    const addCartToCheckOut = () =>{
        try{
            cartDetails.innerHTML = '';
        }catch{}
        let subTotal= 0;
        if(cart.length > 0){
            cart.forEach(item => {
                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct];
                subTotal = subTotal + parseFloat(info.price * item.quantity);
                cartDetails.innerHTML += `
                            <tr>
                                <td><img src="${info.image}"></td>
                                <td>${info.name}</td>
                                <td>$ ${(info.price * item.quantity).toFixed(2)}</td>
                                <td>${item.quantity}</td>
                            </tr>                    
                `;
            })
        }
        cartDetails.innerHTML +=`<thred>
                                    <tr>
                                    <th colspan="2" style="text-align: right">Subtotal :</th>
                                    <th style="text-align: center">$ ${(subTotal).toFixed(2)}</th>
                                    <th></th>
                                    </tr>
                                    <tr>
                                    <th colspan="2" style="text-align: right">HST/GST :</th>
                                    <th style="text-align: center">$ ${(subTotal*0.13).toFixed(2)}</th>
                                    <th></th>
                                    </tr>
                                    <tr>
                                    <th colspan="2" style="text-align: right">Total :</th>
                                    <th style="text-align: center">$ ${(subTotal*1.13).toFixed(2)}</th>
                                    <th></th>
                                    </tr>
                                 </thred>`;
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
            addCartToCheckOut();
        }
    }
    initApp();
}
function ContactUser(){
   if($('#userNo').prop('checked')){
       $('#contactCheckUser').hide();
       return false;
   }else{
       $('#contactCheckUser').show();
       return true;
   }
}
function frmContactUs(){
    let fname = $('#contactFname');
    let lname = $('#contactLname');
    let email = $('#contactEmail');
    let user = $('#contactUser');
    let details = $('#contactDetails');
    let valid = true;

    let fnameValid = document.querySelector('#contactFnameValid');
    let lnameValid = document.querySelector('#contactLnameValid');
    let emailValid = document.querySelector('#contactEmailValid');
    let userValid = document.querySelector('#contactUserValid');
    let detailsValid = document.querySelector('#contactDetailsValid');

    if(fname.val()===""){
        fname.addClass('error');
        fnameValid.innerHTML='Required';
        $('#contactFnameValid').show();
        valid = false;
    }
    if(lname.val()===""){
        lname.addClass('error');
        lnameValid.innerHTML='Required';
        $('#contactLnameValid').show();
        valid = false;
    }
    if(email.val()===""){
        email.addClass('error');
        emailValid.innerHTML='Required';
        $('#contactEmailValid').show();
        valid = false;
    }
    if(details.val()===""){
        details.addClass('error');
        detailsValid.innerHTML='Required';
        $('#contactDetailsValid').show();
        valid = false;
    }
    if(!ContactUser && user.val()===""){
       user.addClass('error');
       userValid.innerHTML = 'Required';
       $('#contactUserValid').show();
        valid = false;
    }
    if(valid){
        document.querySelector('.sent').innerHTML = "! Your Message has been sent !";
        setTimeout(function(){
            document.querySelector('.sent').innerHTML = "";
        }, 5000);
        $('#frmContactUs')[0].reset();
        try{$('#frmContactUs input').removeClass('error');}catch{}
        $('.validator').hide();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

}
function ContactUserValidate(){
    let user = $('#contactUser');
    let userValid = document.querySelector('#contactUserValid');

    $('#contactUserValid').hide();
    user.removeClass('error').removeClass('valid');

    userdb.selectAll([],callback)

    function callback(tx, results){
        if(results.rows.length===0){
            user.addClass('error');
            userValid.innerHTML = 'User not found';
            $('#contactUserValid').show();
        }
        for(let i=0;i< results.rows.length; i++){
            let data = results.rows[i];

            if(user.val() === data['Username']){
                user.addClass('valid');
            }else{
                user.addClass('error');
                userValid.innerHTML = 'User not found';
                $('#contactUserValid').show();
            }
        }
    }
}
function frmlogin_Validation(){
    const required = "Required *";
    let username = $('#loginUsername').val();
    let options = [username];
    let password = $('#loginPswd').val();
    let remember = $('#remember').prop('checked');
    let uname="";
    let pswd = "";

    $('.frmdiv input').removeClass('error').removeClass('valid');
    $('.validator').hide();
    let loginUserValid = document.querySelector('#loginUserValid');
    let loginPswdValid = document.querySelector('#loginPswdValid');


    userdb.selectUser(options,callback);

    function callback(tx, results){
        try {
            let data = results.rows[0];
            uname = data['Username']
            fname = data['FirstName'];
            pswd = data['Password'];
            if(username===uname){
                $('#loginUsername').addClass('valid');
            }
            if(password===pswd){
                $.mobile.changePage($('#UserPage'));
                sessionStorage.setItem("Login",true);
                sessionStorage.setItem("Username", username);
            }
            if(username===uname && password===pswd && remember){
                localStorage.setItem("Remember", true);
                localStorage.setItem("Username", username);
            }else if(!remember){
                localStorage.setItem("Remember", false);
                sessionStorage.setItem("Username", username);
            }
            if(password==null||password===""){
                loginPswdValid.innerHTML = required;
                $('#loginPswd').addClass('error');
                $('#loginPswdValid').show();
            }else if(password!==pswd){
                loginPswdValid.innerHTML="Invalid Password *";
                $('#loginPswd').addClass('error');
                $('#loginPswdValid').show();
            }
        } catch (e) {
            if(username==null||username===""){
                loginUserValid.innerHTML = required;
                $('#loginUsername').addClass('error');
                $('#loginUserValid').show();
            }else{
                loginUserValid.innerHTML = "User not found *";
                $('#loginUsername').addClass('error');
                $('#loginUserValid').show();
            }
            if(password==null||password===""){
                loginPswdValid.innerHTML = required;
                $('#loginPswd').addClass('error');
                $('#loginPswdValid').show();
            }
        }
    }
}
function frmregister_Validation(){
    let phoneRegex = new RegExp(/^\d{10}$/);
    let pswdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,}$)");
    let required = "Required";
    let pswdFormat = "Password should contain at least<br>one digit,<br>one lower case,<br>one upper case,<br>( ! @ # $ % & * _ ) <br>any of the 8 special characters mentioned";

    let fname = $('#registerFname').val();
    let lname = $('#registerLname').val();
    let email = $('#registerEmail').val().toLowerCase();
    let code = $('#registerCode').val();
    let phone = $('#registerPhone').val();
    let uname = $('#registerUsername').val();
    let pswd = $('#registerPswd').val();
    let cpswd = $('#registerConfirmpswd').val();
    let cardRequired = cardRegisterRequired();
    let cname = $('#cName').val();
    let card = $('#Card').val();
    let exp = $('#Exp').val();
    let cvv = $('#CVV').val();

    $('.validator').hide();
    $('.frmdiv input').removeClass('error');

    let fnameValid = document.querySelector('#fnameValid');
    let lnameValid = document.querySelector('#lnameValid');
    let emailValid = document.querySelector('#emailValid');
    let codeValid = document.querySelector('#CodeValid');
    let phoneValid = document.querySelector('#phoneValid');
    let unameValid = document.querySelector('#unameValid');
    let pswdValid = document.querySelector('#pswdValid');
    let cpswdValid = document.querySelector('#cpswdValid');
    let cnameValid = document.querySelector('#cnameValid');
    let cardValid = document.querySelector('#CardValid');
    let expValid = document.querySelector('#ExpValid');
    let cvvValid = document.querySelector('#CVVValid');

    let options=[];
    userdb.selectAll(options,callback);

    function callback(tx, results){
        let valid = true;
        if(results.rows.length===0){
            if(fname==null||fname===""){
                fnameValid.innerHTML=required;
                $('#registerFname').addClass('error');
                $('#fnameValid').show();
                valid = false;
            }

            if(lname==null||lname===""){
                lnameValid.innerHTML=required;
                $('#registerLname').addClass('error');
                $('#lnameValid').show();
                valid = false;
            }

            if(email==null||email===""){
                emailValid.innerHTML=required;
                $('#registerEmail').addClass('error');
                $('#emailValid').show();
                valid=false;
            }

            if(code==null||code===""){
                codeValid.innerHTML=required;
                $('#registerCode').addClass('error');
                $('#CodeValid').show();
                valid=false;
            }

            if(phone==null||phone===""){
                phoneValid.innerHTML=required;
                $('#registerPhone').addClass('error');
                $('#phoneValid').show();
                valid = false;
            }
            else if(!phoneRegex.test(phone)){
                phoneValid.innerHTML=`Invalid Phone input`;
                $('#registerPhone').addClass('error');
                $('#phoneValid').show();
                valid = false;
            }

            if(uname==null||uname===""){
                unameValid.innerHTML=required;
                $('#registerUsername').addClass('error');
                $('#unameValid').show();
                valid = false;
            }

            if(pswd==null||pswd===""){
                pswdValid.innerHTML=required;
                $('#registerPswd').addClass('error');
                $('#pswdValid').show();
                valid = false;
            }
            else if(!pswdRegex.test(pswd)){
                pswdValid.innerHTML=pswdFormat;
                $('#registerPswd').addClass('error');
                $('#pswdValid').show();
                valid = false;
            }

            if(cpswd==null||cpswd===""){
                cpswdValid.innerHTML=required;
                $('#registerConfirmpswd').addClass('error');
                $('#cpswdValid').show();
                valid = false;
            }
            else if(cpswd!==pswd){
                cpswdValid.innerHTML=`Password didnt match`;
                $('#registerConfirmpswd').addClass('error');
                $('#cpswdValid').show();
                valid = false;
            }

        }
        for(let i=0;i< results.rows.length; i++){
            let data = results.rows[i];

            if(fname==null||fname===""){
                fnameValid.innerHTML=required;
                $('#registerFname').addClass('error');
                $('#fnameValid').show();
                valid = false;
            }

            if(lname==null||lname===""){
                lnameValid.innerHTML=required;
                $('#registerLname').addClass('error');
                $('#lnameValid').show();
                valid = false;
            }

            if(email==null||email===""){
                emailValid.innerHTML=required;
                $('#registerEmail').addClass('error');
                $('#emailValid').show();
                valid=false;
            }

            if(code==null||code===""){
                codeValid.innerHTML=required;
                $('#registerCode').addClass('error');
                $('#CodeValid').show();
                valid=false;
            }

            if(phone==null||phone===""){
                phoneValid.innerHTML=required;
                $('#registerPhone').addClass('error');
                $('#phoneValid').show();
                valid = false;
            }
            else if(!phoneRegex.test(phone)){
                phoneValid.innerHTML=`Invalid Phone input`;
                $('#registerPhone').addClass('error');
                $('#phoneValid').show();
                valid = false;
            }

            if(uname==null||uname===""){
                unameValid.innerHTML=required;
                $('#registerUsername').addClass('error');
                $('#unameValid').show();
                valid = false;
            }
            else if(uname===data['Username']){
                unameValid.innerHTML="Username already registered, Please Login";
                $('#registerUsername').addClass('error');
                $('#unameValid').show();
                valid = false;
            }

            if(pswd==null||pswd===""){
                pswdValid.innerHTML=required;
                $('#registerPswd').addClass('error');
                $('#pswdValid').show();
                valid = false;
            }
            else if(!pswdRegex.test(pswd)){
                pswdValid.innerHTML=pswdFormat;
                $('#registerPswd').addClass('error');
                $('#pswdValid').show();
                valid = false;
            }

            if(cpswd==null||cpswd===""){
                cpswdValid.innerHTML=required;
                $('#registerConfirmpswd').addClass('error');
                $('#cpswdValid').show();
                valid = false;
            }
            else if(cpswd!==pswd){
                cpswdValid.innerHTML=`Password didnt match`;
                $('#registerConfirmpswd').addClass('error');
                $('#cpswdValid').show();
                valid = false;
            }
        }
        if(cardRequired){
            if(cname==null||cname===""){
                cnameValid.innerHTML=required;
                $('#cName').addClass('error');
                $('#cnameValid').show();
                valid = false;
            }

            if(card==null||card===""){
                cardValid.innerHTML=required;
                $('#Card').addClass('error');
                $('#CardValid').show();
                valid = false;
            }

            if(exp==null||exp===""){
                expValid.innerHTML=required;
                $('#Exp').addClass('error');
                $('#ExpValid').show();
                valid = false;
            }

            if(cvv==null||cvv===""){
                cvvValid.innerHTML=required;
                $('#CVV').addClass('error');
                $('#CVVValid').show();
                valid = false;
            }
        }
        if(valid){
            let profile = ""
            if($('#user01').prop('checked')){
                profile = $('#user01').val();
            }else if($('#user02').prop('checked')){
                profile = $('#user02').val();
            }else if($('#mech01').prop('checked')){
                profile = $('#mech01').val();
            }else if($('#mech02').prop('checked')){
                profile = $('#mech02').val();
            }

            let FirstName = $("#registerFname").val();
            let LastName = $("#registerLname").val();
            let Email = $("#registerEmail").val();
            let Phone = $("#registerPhone").val();
            let Username = $("#registerUsername").val();
            let Password = $("#registerPswd").val();
            let Profile = profile;

            var userData = new User(FirstName, LastName, Email, Phone, Username, Password, Profile);
            userdb.insertData(userData);
            $.mobile.changePage($('#LoginPage'));

        }
    }
}
function RegisterEmail(){
    let emailRegex=new RegExp(/[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/);
    let email = $('#registerEmail').val().toLowerCase();
    let emailValid = document.querySelector('#emailValid');

    $('#emailValid').hide();
    $('#registerEmail').removeClass('error').removeClass('valid');

    userdb.selectAll([],callback);
    function callback(tx, results){
        let valid = true;
        if(results.rows.length === 0){
            if(email==null||email===""){
                emailValid.innerHTML=`Required`;
                $('#registerEmail').addClass('error');
                $('#emailValid').show();
                valid=false;
            }
            else if (!emailRegex.test(email)) {
                emailValid.innerHTML = `Invalid Email format i.e. john@mark.com`;
                $('#registerEmail').addClass('error');
                $('#emailValid').show();
                valid = false;
            }
        }
        for(let i=0;i< results.rows.length; i++) {
            let data = results.rows[i];
            if(email==null||email===""){
                emailValid.innerHTML=`Required`;
                $('#registerEmail').addClass('error');
                $('#emailValid').show();
                valid=false;
            }
            else if (!emailRegex.test(email)) {
                emailValid.innerHTML = `Invalid Email format i.e. john@mark.com`;
                $('#registerEmail').addClass('error');
                $('#emailValid').show();
                valid = false;
            }
            else if(email===data['Email'].toLowerCase()){
                emailValid.innerHTML="Email already registered, Please Login";
                $('#registerEmail').addClass('error');
                $('#emailValid').show();
                valid = false;
            }
        }
        if(valid){

            let code = Math.floor(100000 + Math.random() * 900000);
            let encrypted  = window.btoa(code);

            const serviceID = "service_roxtarsolutions";
            const templateID = "verify-temp";

            var params = {
                name: $('#registerFname').val(),
                email: email,
                verifycode : code
            };

            emailjs.send(serviceID, templateID, params)
                .then(res=>{
                    emailValid.innerHTML=`Verfication Code Sent`;
                    $('#registerEmail').addClass('valid');
                    $('#emailValid').show();
                    sessionStorage.setItem('code', encrypted);
                })
                .catch(err=>console.log(err));
        }
    }
}
function UserVerification(){
    let code = window.atob(sessionStorage.getItem('code'));
    let value = $('#registerCode');
    let valid = document.querySelector('#CodeValid');

    $('#CodeValid').hide();
    value.removeClass('error').removeClass('valid');

    if(value.val()===""){
        valid.innerHTML = 'Required';
        value.addClass('error');
        $('#CodeValid').show();
    }
    else if( code === value.val()){
        value.addClass('valid');
        sessionStorage.removeItem('code');
    }else{
        valid.innerHTML = 'Invalid Code';
        value.addClass('error');
        $('#CodeValid').show();
    }
}
function cardRegisterRequired(){
    let notRequired = $('#user01').prop('checked');
    if(!notRequired){
        $('.cardRegister').show();
        return true;
    }else{
        $('.cardRegister').hide();
        return false;
    }
}
function registerCardNumber(){
    $('#CardValid').hide();
    let cardnum = $('#Card');
        cardnum.removeClass('error').removeClass('valid');
    let cardValid = document.querySelector('#CardValid');
    let visaregex = new RegExp(/^4[0-9]{15}?$/);
    let mcregex = new RegExp(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/);
    let americanregex = new RegExp(/^3[47][0-9]{13}$/);
    let number = new String(`${cardnum.val()}`);
    number = number[12]+number[13]+number[14]+number[15]
    if (visaregex.test(cardnum.val())){
        cardnum.addClass('valid');
        cardnum.val(`XXXX-XXXX-XXXX-${number}`);
        cardValid.innerHTML='<img src="../css/lib/images/visa.png">';
        $('#CardValid').show();
    }else if(mcregex.test(cardnum.val())){
        cardnum.addClass('valid');
        cardnum.val(`XXXX-XXXX-XXXX-${number}`);
        cardValid.innerHTML='<img src="../css/lib/images/mcard.png">';
        $('#CardValid').show();
    }else if(americanregex.test(cardnum.val())){
        cardnum.addClass('valid');
        cardnum.val(`XXXX-XXXX-XXXX-${number}`);
        cardValid.innerHTML='<img src="../css/lib/images/amex.png">';
        $('#CardValid').show();
    }else {
        cardnum.addClass('error');
        cardValid.innerHTML='Invalid Card Number';
        $('#CardValid').show();
    }


}
function registerExpCard(){
    $('#ExpValid').hide();
    let exp = $('#Exp');
        exp.removeClass('error').removeClass('valid');
    let expValid = document.querySelector('#ExpValid');
    let expregex = new RegExp(/^(0[1-9]|1[0-2])\/([0-9]{4})$/);
    let month = 0;
    let year = 0

    if(!expregex.test(exp.val())){
        exp.addClass('error');
        expValid.innerHTML='Invalid Expiry Date';
        $('#ExpValid').show();
    }else{
        month = exp.val().split('/')[0];
        year = exp.val().split('/')[1];
    }

    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
    var currentDate = [fullDate.getDate(),parseFloat(twoDigitMonth),fullDate.getFullYear()];

    if(month < currentDate[1] && year <= currentDate[2]){
        exp.addClass('error');
        expValid.innerHTML='Invalid Expiry Date';
        $('#ExpValid').show();
    }else{
        exp.addClass('valid');
    }
}
function registerCVVCard(){
    $('#CVVValid').hide();
    let cvv = $('#CVV');
        cvv.removeClass('error').removeClass('valid');
    let cvvValid = document.querySelector('#CVVValid');

    if(cvv.val().length > 3 ||cvv.val().length < 3 ){
        cvv.addClass('error');
        cvvValid.innerHTML = 'Invalid CVV';
        $('#CVVValid').show();
    }else{
        cvv.addClass('valid');
    }

}
function frmCheckout(){
    let required = 'Required';
    let emailRegex=new RegExp(/[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/);
    let phoneRegex = new RegExp(/^\d{10}$/);
    let productsDetails="";
    let subTotal= 0;
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
    var date = `${fullDate.getDate()}/${parseFloat(twoDigitMonth)}/${fullDate.getFullYear()}`

    $('.validator').hide();

    let fname = $('#checkoutFname');
    let lname = $('#checkoutLname');
    let email = $('#checkoutEmail');
    let phone = $('#checkoutPhone');
    let address = $('#checkoutAddress');
    let city = $('#checkoutCity');
    let province = $('#checkoutProvince');
    let pcode = $('#checkoutPCode');
    let cname = $('#checkoutcName');
    let card = $('#checkoutCard');
    let exp = $('#checkoutExp');
    let cvv = $('#checkoutCVV');

    fname.removeClass('error');
    lname.removeClass('error');
    email.removeClass('error');
    phone.removeClass('error');
    address.removeClass('error');
    city.removeClass('error');
    cname.removeClass('error');

    let fnameValid = document.querySelector('#coutfnameValid');
    let lnameValid = document.querySelector('#coutlnameValid');
    let emailValid = document.querySelector('#coutemailValid');
    let phoneValid = document.querySelector('#coutphoneValid');
    let addressValid = document.querySelector('#coutAddressValid');
    let cityValid = document.querySelector('#coutCityValid');
    let pcodeValid = document.querySelector('#coutPCodeValid');
    let cnameValid = document.querySelector('#coutcnameValid');
    let cardValid = document.querySelector('#coutCardValid');
    let expValid = document.querySelector('#coutExpValid');
    let cvvValid = document.querySelector('#coutCVVValid');


    if(fname.val() === ""){
        fname.addClass('error');
        fnameValid.innerHTML=required;
        $('#coutfnameValid').show();
    }

    if(lname.val() === ""){
        lname.addClass('error');
        lnameValid.innerHTML=required;
        $('#coutlnameValid').show();
    }

    if(email.val() === ""){
        email.addClass('error');
        emailValid.innerHTML=required;
        $('#coutemailValid').show();
    }
    else if(!emailRegex.test(email.val())){
        email.addClass('error');
        emailValid.innerHTML='Invalid Email';
        $('#coutemailValid').show();
    }

    if(phone.val() === ""){
        phone.addClass('error');
        phoneValid.innerHTML=required;
        $('#coutphoneValid').show();
    }
    else if(!phoneRegex.test(phone.val())){
        phone.addClass('error');
        phoneValid.innerHTML='Invalid Phone number';
        $('#coutphoneValid').show();
    }

    if(address.val() === ""){
        address.addClass('error');
        addressValid.innerHTML=required;
        $('#coutAddressValid').show();
    }

    if(city.val() === ""){
        city.addClass('error');
        cityValid.innerHTML=required;
        $('#coutCityValid').show();
    }

    if(cname.val() === ""){
        cname.addClass('error');
        cnameValid.innerHTML=required;
        $('#coutcnameValid').show();
    }

    if(pcode.val() === ""){
        pcode.addClass('error');
        pcodeValid.innerHTML=`Required`;
        $('#coutPCodeValid').show();
    }

    if(card.val() === ""){
        card.addClass('error');
        cardValid.innerHTML=`Required`;
        $('#coutCardValid').show();
    }

    if(exp.val() === ""){
        exp.addClass('error');
        expValid.innerHTML=`Required`;
        $('#coutExpValid').show();
    }

    if(cvv.val() === ""){
        cvv.addClass('error');
        cvvValid.innerHTML=`Required`;
        $('#coutCVVValid').show();
    }

    if(localStorage.getItem('cart')){
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart.length > 0){
            cart.forEach(item => {
                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct];
                subTotal = subTotal + parseFloat(info.price * item.quantity);
                productsDetails += `Product Name : ${info.name} - Price : $ ${(info.price * item.quantity).toFixed(2)} - Quantity : ${item.quantity}\n `;
            })
        }

    }

    if(document.querySelector('#frmCheckout input').classList.contains('error')){
        console.log('invalid');
    }
    else{
        const serviceID = "service_roxtarsolutions";
        const templateID = "order-temp";

        var params = {
            name: fname.val(),
            email: email.val(),
            phone : phone.val(),
            ordernumber : `${fullDate.getDate()}${parseFloat(twoDigitMonth)}${fullDate.getFullYear()}${Math.floor(100000 + Math.random() * 900000)}`,
            date : `${date}`,
            card : card.val(),
            address : `${address.val()} ${city.val()} ${province.val()} ${pcode.val()}`,
            products : `${productsDetails}`,
            total : `${(subTotal*1.13).toFixed(2)}`
        };

        emailjs.send(serviceID, templateID, params)
            .then(res=>{
                document.querySelector('#CheckoutPage .frmdiv').innerHTML=`<div class="row text-center justify-content-center mb-4">
                                                <h1>Thank You</h1>
                                                <p>Your Order has been placed, and you will receive a conformation email from Roxtar Solutions with the details of your order</p>
                                              </div>`;
            })
            .catch(err=>console.log(err));

    }
}
function Pincode(){
    $('#coutPCodeValid').hide();
    let pincode = new RegExp(/^(?!.*[DFIOQU])[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/);
    let pcode = $('#checkoutPCode');
        pcode.removeClass('error').removeClass('valid');

    let pcodeValid = document.querySelector('#coutPCodeValid');
    let pincodeValid = true;

    if(!pincode.test(pcode.val())){
        pcode.addClass('error');
        pcodeValid.innerHTML='Invalid Pincode';
        $('#coutPCodeValid').show();
        pincodeValid = false;
    }else{
        pcode.addClass('valid');
    }

    return pincodeValid;
}
function CardNumber(){
    $('#coutCardValid').hide();
    let cardOk = true;
    let cardnum = $('#checkoutCard');
        cardnum.removeClass('error').removeClass('valid');
    let cardValid = document.querySelector('#coutCardValid');
    let visaregex = new RegExp(/^4[0-9]{15}?$/);
    let mcregex = new RegExp(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/);
    let americanregex = new RegExp(/^3[47][0-9]{13}$/);
    let number = new String(`${cardnum.val()}`);
        number = number[12]+number[13]+number[14]+number[15]
    if (visaregex.test(cardnum.val())){
        cardnum.addClass('valid');
        cardnum.val(`XXXX-XXXX-XXXX-${number}`);
        cardValid.innerHTML='<img src="../css/lib/images/visa.png">';
        $('#coutCardValid').show();
    }else if(mcregex.test(cardnum.val())){
        cardnum.addClass('valid');
        cardnum.val(`XXXX-XXXX-XXXX-${number}`);
        cardValid.innerHTML='<img src="../css/lib/images/mcard.png">';
        $('#coutCardValid').show();
    }else if(americanregex.test(cardnum.val())){
        cardnum.addClass('valid');
        cardnum.val(`XXXX-XXXX-XXXX-${number}`);
        cardValid.innerHTML='<img src="../css/lib/images/amex.png">';
        $('#coutCardValid').show();
    }else {
        cardnum.addClass('error');
        cardValid.innerHTML='Invalid Card Number';
        $('#CardValid').show();
    }

    return cardOk
}
function ExpCard(){
    $('#coutExpValid').hide();
    let expok = true;
    let exp = $('#checkoutExp');
        exp.removeClass('error').removeClass('valid');
    let expValid = document.querySelector('#coutExpValid');
    let expregex = new RegExp(/^(0[1-9]|1[0-2])\/([0-9]{4})$/);
    let month = 0;
    let year = 0

    if(!expregex.test(exp.val())){
        exp.addClass('error');
        expValid.innerHTML='Invalid Expiry Date';
        $('#coutExpValid').show();
    }else{
        month = exp.val().split('/')[0];
        year = exp.val().split('/')[1];
    }

    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
    var currentDate = [fullDate.getDate(),parseFloat(twoDigitMonth),fullDate.getFullYear()];

    if(month < currentDate[1] && year <= currentDate[2]){
        exp.addClass('error');
        expValid.innerHTML='Invalid Expiry Date';
        $('#coutExpValid').show();
        expok = false;
    }else{
        exp.addClass('valid');
    }

    return expok;
}
function CVVCard(){
    $('#coutCVVValid').hide();
    let cvvok = true;
    let cvv = $('#checkoutCVV');
        cvv.removeClass('error').removeClass('valid');
    let cvvValid = document.querySelector('#coutCVVValid');

    if(cvv.val().length > 3 ||cvv.val().length < 3 ){
        cvv.addClass('error');
        cvvValid.innerHTML = 'Invalid CVV';
        $('#coutCVVValid').show();
        cvvok = false;
    }else{
        cvv.addClass('valid');
    }

    return cvvok;
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
function CheckoutPopulate(){
    cart();
    let cartempty = localStorage.getItem('cart');
    if(cartempty != '[]'){
        $.mobile.changePage($('#CheckoutPage'));
    }
}
function btnCoutCancel(){
    $('.frmdiv form')[0].reset();
    $.mobile.changePage($('#Store'));
}
function RememberCheck(){
    let remember = localStorage.getItem("Remember");
    let username = localStorage.getItem('Username');
    let login = sessionStorage.getItem("Login");
    $('.menu-selection').hide();
    if(login === "true"){
        $.mobile.changePage($('#UserPage'));
        VehicleDetailsPage();
    }else if(remember==="true"){
        $.mobile.changePage($('#UserPage'));
        VehicleDetailsPage();
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
//Add Vehicle
function btnAddVehicle(){
    $('#frmAddVehicle')[0].reset();
    $('#frmAddVehicle input').removeClass('error').removeClass('valid');
    $('.validator').hide();
    try{
        document.querySelector('#tblAddDetails tbody').innerHTML = ``;
    }catch{}
    $('#addWTNo').prop('checked', true).checkboxradio('refresh');
    $('.menu-selection').hide();
    $('#AddVehicle').show()
}
async function addVINDetails(){
    let addVIN = $('#addVIN');
    let addVinValid = $('#addVinValid');
    let vin = addVIN.val().toUpperCase();
    let vinValid = document.querySelector('#addVinValid');
    let Details = document.querySelector('#tblAddDetails');
    Details.innerHTML=``;
    let vehicleFound = false;
    let data;
    let Drivetrain;

    $('#frmAddVehicle input').removeClass('error').removeClass('valid');
    addVinValid.hide();

    if(vin===null || vin===""){
    }else{
        const res = await fetch(`https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKcHJpeWFuc2hwY0BnbWFpbC5jb20=`)
        data = await res.json();
        try{
            if(data.message==null && data.make != null){
                vehicleFound = true;
                addVIN.addClass('valid');
            }else if(data.make == null ){
                vinValid.innerHTML=`Invalid VIN`;
                addVIN.addClass('error');
                addVinValid.show();
            }else{
                vinValid.innerHTML=`${data.message}`;
                addVIN.addClass('error');
                addVinValid.show();
            }
        }catch {
            vinValid.innerHTML=`Invalid Input`;
            addVIN.addClass('error');
            addVinValid.show();
        }
    }

    if(vehicleFound){

        let options=[vin];
        vehicledb.selectVINVehicle(options,callback);
        function callback(tx, results){
            let valid = true;
            for(let i=0;i< results.rows.length; i++) {
                try {
                    let data = results.rows[i];
                    let DATAVIN = data.VIN;
                    if (vin === DATAVIN) {
                        vinValid.innerHTML = 'VIN already Registered';
                        addVIN.removeClass('valid').addClass('error');
                        addVinValid.show();
                    }
                } catch {
                }
            }
        }
        try{
            Drivetrain = data.drivenWheels.charAt(0).toUpperCase() + data.drivenWheels.slice(1);
        }catch{
            Drivetrain = 'Not Available';
        }
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
                 <td>${Drivetrain}</td>
             </tr>
             <tr>
                 <th scope="row">Fuel</th>
                 <td>${data.engine.type.charAt(0).toUpperCase() + data.engine.type.slice(1)}</td>
             </tr>
        `;
        Details.appendChild(vehicle);
    }
}
function addODODetails(){
    let addODO = $('#addODO');
    let addODOValid = $('#addODOValid');

    addODO.removeClass('error').removeClass('valid');
    addODOValid.hide();

    let vin = $('#addVIN').val().toUpperCase();
    let ODO = addODO.val();
    let Details = document.querySelector('#tblAddDetails tbody');
    let ODOrow = document.querySelector('#ODOrow');
    let regexp = /^\d{8}$/;

    if(vin!=="" &&  ODO===""){
        document.querySelector('#addODOValid').innerHTML='Required';
        addODO.addClass('error');
        addODOValid.show();
        if(Details.contains(ODOrow)){
            Details.removeChild(ODOrow);
        }
    }else if(regexp.test(ODO)){
        document.querySelector('#addODOValid').innerHTML='Invalid Input';
        addODO.addClass('error');
        addODOValid.show();
        if(Details.contains(ODOrow)){
            Details.removeChild(ODOrow);
        }
    }else{
        if(ODOrow == null){
            Details.innerHTML += `<tr id="ODOrow"><th scope="row">ODO</th><td>${ODO} KM</td></tr>`;
            addODO.addClass('valid');
        }else{
            ODOrow.innerHTML = `<th scope="row">ODO</th><td>${ODO} KM</td>`;
            addODO.addClass('valid');
        }
    }
    WTire();
}
function WTireCheck(){
    let addNo = $('#addWTNo').prop('checked');
    let editNo = $('#editWTNo').prop('checked');
    let WTYN = true;
    if(addNo || editNo){
        WTYN = false;
    }
    return WTYN;
}
function WTire(){
    let Details = document.querySelector('#tblAddDetails tbody');
    let WTire = document.querySelector('#WTire');
    if(WTireCheck()){
        if(WTire == null){
            Details.innerHTML += `<tr id="WTire"><th scope="row">Winter Tire</th><td>Yes</td></tr>`;
        }
        else{
            WTire.innerHTML = `<th scope="row">Winter Tire</th><td>Yes</td>`;
        }
    }else{
        if(WTire == null){
            Details.innerHTML += `<tr id="WTire"><th scope="row">Winter Tire</th><td>No</td></tr>`;
        }
        else{
            WTire.innerHTML = `<th scope="row">Winter Tire</th><td>No</td>`;
        }
    }
}
function ModDetails(){
    let Mod = $('#addMod').val();
    let modrow = document.querySelector('#Modrow');

    if(modrow == null){
        let Details = document.querySelector('#tblAddDetails tbody');
        Details.innerHTML += `<tr id="Modrow"><th scope="row">Modifications</th><td>${Mod}</td></tr>`;
    }
    else{
        Modrow.innerHTML = `<th scope="row">Modifications</th><td>${Mod}</td>`;
    }
}
function AddVehicle(){
    let vinValid = document.querySelector('#addVinValid');
    let ODOValid = document.querySelector('#addODOValid');
    let vin = $('#addVIN').val().toUpperCase();
    let odo = $('#addODO').val();
    let mod = $('#addMod').val();
    let Username = sessionStorage.getItem('Username');

    if(vin === ""){
        vinValid.innerHTML='Required';
        $('#addVIN').addClass('error');
        $('#addVinValid').show();
    }
    if(odo === ""){
        ODOValid.innerHTML='Required';
        $('#addODO').addClass('error');
        $('#addODOValid').show();
    }
    if(document.querySelector('#addVIN').classList.contains('valid')&&document.querySelector('#addODO').classList.contains('valid')){
        let User = Username;
        let VIN = vin;
        let ODO = odo;
        let WTire = WTireCheck();
        let Mod = mod;
        let Image = "";
        var vehicleData = new Vehicle(User, VIN, ODO, WTire, Mod, Image)
        vehicledb.insertData(vehicleData);
        $('.validator').hide();
        $('.menu-selection').hide();
        VehicleDetailsPage();
        $('#VehicleDetails').show();
    }
}
function btnVehicleCancel(){
    $('#frmAddVehicle input').removeClass('error').removeClass('valid');
    $('#frmEditVehicle input').removeClass('error').removeClass('valid');
    $('.validator').hide();
    $('#frmAddVehicle')[0].reset();
    $('#frmEditVehicle')[0].reset();
    try{
        document.querySelector('#tblAddDetails tbody').innerHTML = ``;
        document.querySelector('#tblEditedDetails tbody').innerHTML = ``;
    }catch{}
    VehicleDetailsPage();
}
//Vehicle Page
function VehicleDetailsPage(){
    $('.menu-selection').hide();
    let cards = document.querySelector('.op-content');
    cards.innerHTML='';
    let options ="";
    if(sessionStorage.getItem('Username')){
        options=[sessionStorage.getItem('Username')];
    }else{
        options=[localStorage.getItem('Username')];
    }

    vehicledb.selectUserVehicle(options,callback);
    userdb.selectUser(options, callback2)
    async function callback(tx, results){
        for(let i=0;i< results.rows.length; i++) {
            try {
                let data = results.rows[i];
                const req =  await fetch(`https://auto.dev/api/vin/${data.VIN}?apikey=ZrQEPSkKcHJpeWFuc2hwY0BnbWFpbC5jb20=`)
                let res = await req.json();
                let body = res.categories.vehicleStyle;
                let SUV = /\W*(SUV)\W*/gm;
                let Sedan = /\W*(Sedan)\W*/gm;
                let Hatchback = /\W*(Hatchback)\W*/gm;
                let Coupe = /\W*(Coupe)\W*/gm;
                let Convertable = /\W*(Convertable)\W*/gm;

                if (SUV.test(body)){
                    body = 'SUV';
                }else if(Sedan.test(body)){
                    body = 'Sedan';
                }else if(Hatchback.test(body)){
                    body = 'Hatchback';
                }else if(Coupe.test(body)){
                    body='Coupe';
                }else if(Convertable.test(body)){
                    body='Coupe';
                }

                let card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('mb-2');
                card.onclick = EditVehicle;
                card.id = `${data.VIN}`;
                card.innerHTML = `
                  <div class="row g-0">
                  <div class="col-md-6">
                      <img src="./Images/User-Images/Default-${body}.png" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">${res.make.name} ${res.model.name}</h5>
                          <p class="card-text">VIN : ${data.VIN}</p>
                          <p class="card-text">Body : ${body}</p>
                          <p class="card-text">Year : ${res.years[0].year}</p>
                    </div>
                  </div>
                  </div>`;
                cards.appendChild(card);
            } catch {
            }
        }
        $('#VehicleDetails').show();
    }

    function callback2(tx, result){
        let data = result.rows[0];
        document.querySelector('#UP-menu-user').innerHTML= data['FirstName'];
    }
}
//Edit Vehicle
function EditVehicle(){
    let vin = this.id;
    vehicledb.selectVINVehicle([vin], callback);

    function callback(tx, result){
            try {
                let data = result.rows[0];
                $('#editVIN').val(data['VIN']);
                $('#editODO').val(data['ODO']);
                $('#editMod').val(data['Mod']);
                let WTire = data['WTire'];
                if(WTire==="true"){
                    $('#editWTYes').prop("checked", true);
                }else{
                    $('#editWTNo').prop("checked", true);
                }
                $('#editWTYes').checkboxradio('refresh');
                $('#editWTNo').checkboxradio('refresh');
                $('#editVIN').prop('disabled', true);
                editVINDetails();
            }catch{}
    }
        $('.menu-selection').hide();
        $('#EditVehicle').show();
}
async function editVINDetails(){
    let editVIN = $('#editVIN');
    let vin = editVIN.val().toUpperCase();
    let Details = document.querySelector('#tblEditedDetails');
        Details.innerHTML=``;
    let data;
    let Drivetrain;

        editVIN.addClass('valid');

        const res = await fetch(`https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKcHJpeWFuc2hwY0BnbWFpbC5jb20=`)
        data = await res.json();

            try{
                Drivetrain = data.drivenWheels.charAt(0).toUpperCase() + data.drivenWheels.slice(1);
            }catch{
                Drivetrain = 'Not Available';
            }

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
                 <td>${Drivetrain}</td>
             </tr>
             <tr>
                 <th scope="row">Fuel</th>
                 <td>${data.engine.type.charAt(0).toUpperCase() + data.engine.type.slice(1)}</td>
             </tr>
        `;
        Details.appendChild(vehicle);
    editODODetails();
    editWTire();
    if($('#editMod').val() !== ""){
        editModDetails();
    }
}
function editODODetails(){
    let vin = $('#editVIN').val();
    let editODO = $('#editODO');
    let editODOValid = $('#editODOValid');

    editODO.removeClass('error').removeClass('valid');
    editODOValid.hide();

    let ODO = editODO.val();
    let Details = document.querySelector('#tblEditedDetails tbody');
    let editODOrow = document.querySelector('#editODOrow');
    let regexp = /^\d{8}$/;

    vehicledb.selectVINVehicle([vin], callback);
    function callback(tx, result) {
        try {
            let odo = result.rows[0]['ODO'];

            if (ODO === "") {
                document.querySelector('#editODOValid').innerHTML = 'Required';
                editODO.addClass('error');
                editODOValid.show();
            } else if (regexp.test(ODO)) {
                document.querySelector('#editODOValid').innerHTML = 'Invalid Input';
                editODO.addClass('error');
                editODOValid.show();
            } else if (ODO < odo) {
                document.querySelector('#editODOValid').innerHTML = 'New ODO cannot be less than current ODO';
                editODO.addClass('error');
                editODOValid.show();
            } else {
                if (editODOrow == null) {
                    Details.innerHTML += `<tr id="editODOrow"><th scope="row">ODO</th><td>${ODO} KM</td></tr>`;
                    editODO.addClass('valid');
                } else {
                    editODOrow.innerHTML = `<th scope="row">ODO</th><td>${ODO} KM</td>`;
                    editODO.addClass('valid');
                }
            }

        } catch {
        }
    }

}
function editWTire(){
    let Details = document.querySelector('#tblEditedDetails tbody');
    let WTire = document.querySelector('#editWTire');

    if(WTireCheck()){
        if(WTire == null){
            Details.innerHTML += `<tr id="editWTire"><th scope="row">Winter Tire</th><td>Yes</td></tr>`;
        }
        else{
            WTire.innerHTML = `<th scope="row">Winter Tire</th><td>Yes</td>`;
        }
    }else{
        if(WTire == null){
            Details.innerHTML += `<tr id="editWTire"><th scope="row">Winter Tire</th><td>No</td></tr>`;
        }
        else{
            WTire.innerHTML = `<th scope="row">Winter Tire</th><td>No</td>`;
        }
    }
}
function editModDetails(){
    let Mod = $('#editMod').val();
    let modrow = document.querySelector('#editModrow');

    if(modrow == null){
        let Details = document.querySelector('#tblEditedDetails tbody');
        Details.innerHTML += `<tr id="editModrow"><th scope="row">Modifications</th><td>${Mod}</td></tr>`;
    }
    else{
        Modrow.innerHTML = `<th scope="row">Modifications</th><td>${Mod}</td>`;
    }
}
function DeleteVehicle(){
    let vin = $('#editVIN').val().toUpperCase();
    vehicledb.delete([vin]);
    $('.menu-selection').hide();
    VehicleDetailsPage();
    $('#VehicleDetails').show();
}
function UpdateVehicle(){

    let vin = $('#editVIN').val().toUpperCase();
    let odo = $('#editODO').val();
    let mod = $('#editMod').val();
    let Username = sessionStorage.getItem('Username');

    if(document.querySelector('#editODO').classList.contains('valid')){
        let User = Username;
        let VIN = vin;
        let ODO = odo;
        let WTire = WTireCheck();
        let Mod = mod;
        let Image = "";
        var vehicleData = new Vehicle(User,VIN, ODO, WTire, Mod, Image);
        vehicledb.update(vehicleData, VIN );
        $('.validator').hide();
        $('.menu-selection').hide();
        VehicleDetailsPage();
        $('#VehicleDetails').show();
    }
}
//History
function HistoryDetails(){
    $('.menu-selection').hide();
    let Selector = $('#selectVehicle');
    Selector.empty();
    let options=[sessionStorage.getItem('Username')];
    vehicledb.selectUserVehicle(options,callback);
    let option = `<option value="" selected="selected">Select Vehicle</option>` ;
    async function callback(tx, results){
        for(let i=0;i< results.rows.length; i++) {
            try {
                let data = results.rows[i];
                const req =  await fetch(`https://auto.dev/api/vin/${data.VIN}?apikey=ZrQEPSkKcHJpeWFuc2hwY0BnbWFpbC5jb20=`)
                let res = await req.json();
                option += `<option value="${data.VIN}">${res.make.name} ${res.model.name}</option>`;
            } catch {
            }
        }
        Selector.append(option);
        try{
            document.querySelector('#selectVehicle-button span').innerHTML="Select Vehicle";
        }catch{}

        document.querySelector('#tblHistoryDetails').innerHTML='';
        document.querySelector('#HistoryRecord').innerHTML =``;
        $('#History').show();
    }
}
async function Selector(){
    let vin =  $('#selectVehicle').val();
    let Details = document.querySelector('#tblHistoryDetails');
    Details.innerHTML=``;
    let Record = document.querySelector('#HistoryRecord');
    Record.innerHTML =``;
    let odo;
    let wtire;
    let mod;
    let data;
        if(vin !== ""){
            const res = await fetch(`https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKcHJpeWFuc2hwY0BnbWFpbC5jb20=`)
            data = await res.json();

            vehicledb.selectVINVehicle([vin], callback);
            function callback(tx,result){
                let dbdata = result.rows[0];
                odo = dbdata['ODO'];
                if(dbdata['WTire']==='true'){
                    wtire = 'Yes';
                }else{
                    wtire = 'No';
                }
                mod = dbdata['Mod'];
                let year = "NA";
                try{
                    year = data.years[0].year;
                }catch {}
                let vehicle = document.createElement('tbody');
                vehicle.innerHTML =`
                <tr>
                    <th scope="row">VIN</th>
                    <td>${vin}</td>
                </tr>
                <tr>
                     <th scope="row">Year</th>
                     <td>${year}</td>
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
                        <th scope="row">ODO</th>
                        <td>${odo}</td>
                </tr>
                <tr>
                    <th scope="row">Winter Tire</th>
                    <td>${wtire}</td>
                </tr>
                <tr>
                    <th scope="row">Modifications</th>
                    <td>${mod}</td>
                </tr>
                 
        `;

                Details.appendChild(vehicle);
            }

            historydb.selectHistory([vin], callback2);
            function callback2(tx, results){
                for(let i=0;i< results.rows.length; i++) {
                    try{
                        let data = results.rows[i];
                        let date = data['Date'];
                        let recorder = data['User'];
                        let odo = data['ODO'];
                        let type = data['Type'];
                        let des = data['Description'];

                        let card= document.createElement('div');
                        card.classList.add('card');
                        card.innerHTML += `
                          <div class="card-body">
                            <table class="table">
                              <tbody>
                                    <tr><th>Date: </th><td>${date}</td></tr>
                                    <tr><th>Recorded By: </th><td>${recorder}</td></tr>
                                    <tr><th>ODO: </th><td>${odo} KM</td></tr>
                                    <tr><th>Job Type: </th><td>${type}</td></tr>
                                    <tr><th>Job Details: </th><td>${des}</td></tr>
                              </tbody>
                            </table>
                          </div>
                `;
                        Record.appendChild(card);
                    }catch{}
                }
            }
        }

}
function UserAddRecord(){
    let vin = $('#selectVehicle').val();

    vehicledb.selectVINVehicle([vin], callback);
    function callback(tx, result){
        try{
           let  odo = result.rows[0]['ODO'];
            $('#addrecordODO').val(odo).addClass('valid');
        }catch{}
    }
    if(vin === ""){
        console.log('select vehicle');
    }else{
        $('#recordVin').val(vin).prop('disabled', true).addClass('valid');
        $('.menu-selection').hide();
        $('#UserAddRecord').show()
    }
}
function btnCancelRecord(){
    $('#frmUserAddRecord')[0].reset();
    $('.validator').hide();
    Selector();
    $('.menu-selection').hide();
    $('#History').show();
}
function UserRecordODO(){
    let vin = $('#recordVin').val();
    let recordODO =  $('#addrecordODO');
    let odoValid = document.querySelector('#addrecordODOValid');

    recordODO.removeClass('valid').removeClass('error');
    $('#addrecordODOValid').hide();

    vehicledb.selectVINVehicle([vin], callback);
    function callback(tx, result){
        try{
            let  odo = result.rows[0]['ODO'];

            if (recordODO.val()===""){
                recordODO.addClass('error');
                odoValid.innerHTML = 'Required';
                $('#addrecordODOValid').show();
            }else if(recordODO.val()< odo){
                recordODO.addClass('error');
                odoValid.innerHTML = 'New ODO cannot be less than current ODO';
                $('#addrecordODOValid').show();
            }else {
                recordODO.addClass('valid');
            }

        }catch{}
    }

}
function AddRecord(){
    let valid = true;
    let type = "";
    if(document.querySelector('#addrecordODO').classList.contains('error')){
        valid = false;
    }

    $('#addrecordTypeValid').hide();
    $('#addrecordDesValid').hide();

    if($('#OilChange').prop('checked')){
        type += 'Oil Change, '
    }
    if($('#Inspection').prop('checked')){
        type += 'Inspection, '
    }
    if($('#Tire').prop('checked')){
        type += 'Tire, '
    }
    if($('#Mechanical').prop('checked')){
        type += 'Mechanical, '
    }
    if($('#Electronics').prop('checked')){
        type += 'Electronics, '
    }
    if($('#Other').prop('checked')){
        type += 'Other'
    }

    if(type === ""){
        document.querySelector('#addrecordTypeValid').innerHTML = 'Please select one of the following option';
        $('#addrecordTypeValid').show();
        valid = false;
    }

    if($('#addrecordDescription').val()===""){
        document.querySelector('#addrecordDesValid').innerHTML = 'Required';
        $('#addrecordDesValid').show();
        valid = false;
    }

    if(valid){
        let vin = $('#recordVin').val();
        let user = sessionStorage.getItem('Username');
        let recordODO =  $('#addrecordODO').val();
        let description = $('#addrecordDescription').val();
        var fullDate = new Date();
        var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
        var date = `${fullDate.getDate()}/${parseFloat(twoDigitMonth)}/${fullDate.getFullYear()}`
        vehicledb.updateODO(recordODO,vin);

        userdb.selectUser([user], callback);
        function callback (tx, result){
            let profile = result.rows[0]['Profile'];
            let mechanic = `${result.rows[0]['FirstName']} ${result.rows[0]['LastName']}`
            if (profile === "user01" || profile === "user02"){
                let User = "Owner";
                let VIN = vin;
                let ODO = recordODO;
                let Date = date;
                let Type = type;
                let Description = description;
                let historyData = new History(User, VIN, ODO, Date, Type, Description);
                historydb.insertData(historyData);
                $('#frmUserAddRecord')[0].reset();
                $('.validator').hide();
                Selector();
                $('.menu-selection').hide();
                $('#History').show();
            }else{
                let User = `Mechanic : ${mechanic}`;
                let VIN = vin;
                let ODO = recordODO;
                let Date = date;
                let Type = type;
                let Description = description;
                let historyData = new History(User, VIN, ODO, Date, Type, Description);
                historydb.insertData(historyData);
                $('#frmUserAddRecord')[0].reset();
                $('.validator').hide();
                Selector();
                $('.menu-selection').hide();
                $('#History').show();
            }
        }

    }
}
function PrintRecord(){
    let selectedVehicle = $('#selectVehicle').val();

    if(selectedVehicle !== ""){

        let vehicle = document.querySelector('.printVehicle').innerHTML
        let record = document.querySelector('.historyDetails').innerHTML;
        var a = window.open('', '', 'height=720, width=1270');
        a.document.write(`
        <html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </head>
        <body class="container">
        <br>
        <h1 style="text-align: center">Auto Care Hub</h1>
        <h3 style="text-align: center">Vehicle History Report</h3>
        <br>
        ${vehicle}
        <br>
        ${record}
        </body>
        </html>
        `);
        a.document.close();
        a.print();
    }

}