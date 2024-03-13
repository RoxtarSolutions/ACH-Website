const required = "Required *";

function frmlogin_Validation(){
    let username = $('#loginUsername').val();
    let options = [username];
    let password = $('#loginPswd').val();
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
            localStorage.setItem("id",data["id"]);
                uname = data['Username']
                pswd = data['Password'];
            if(username===uname){
                $('#loginUsername').addClass('valid');
            }
            if(password===pswd){
                $.mobile.changePage($('#UserPage'));
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

    let emailRegex=new RegExp(/[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/);
    let phoneRegex = new RegExp(/\d{10}$/);
    let pswdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,}$)");
    let required = "Required";
    let pswdFormat = "Password should contain at least<br>one digit,<br>one lower case,<br>one upper case,<br>( ! @ # $ % & * _ ) <br>any of the 8 special characters mentioned";
    let valid = true;

    let fname = $('#registerFname').val();
    let lname = $('#registerLname').val();
    let email = $('#registerEmail').val();
    let phone = $('#registerPhone').val();
    let uname = $('#registerUsername').val();
    let pswd = $('#registerPswd').val();
    let cpswd = $('#registerConfirmpswd').val();

    $('.validator').hide();
    $('.frmdiv input').removeClass('error');

    let fnameValid = document.querySelector('#fnameValid');
    let lnameValid = document.querySelector('#lnameValid');
    let emailValid = document.querySelector('#emailValid');
    let phoneValid = document.querySelector('#phoneValid');
    let unameValid = document.querySelector('#unameValid');
    let pswdValid = document.querySelector('#pswdValid');
    let cpswdValid = document.querySelector('#cpswdValid');


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
    }else if (!emailRegex.test(email)){
        emailValid.innerHTML=`Invalid Email format i.e. john@mark.com`;
        $('#registerEmail').addClass('error');
        $('#emailValid').show();
        valid = false;
    }

    if(phone==null||phone===""){
        phoneValid.innerHTML=required;
        $('#registerPhone').addClass('error');
        $('#phoneValid').show();
    }else if(!phoneRegex.test(phone)){
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
    }else if(!pswdRegex.test(pswd)){
        pswdValid.innerHTML=pswdFormat;
        $('#registerPswd').addClass('error');
        $('#pswdValid').show();
        valid = false;
    }

    if(cpswd==null||cpswd===""){
        cpswdValid.innerHTML=required;
        $('#registerConfirmpswd').addClass('error');
        $('#cpswdValid').show();
    }else if(cpswd!==pswd){
        cpswdValid.innerHTML=`Password didnt match`;
        $('#registerConfirmpswd').addClass('error');
        $('#cpswdValid').show();
        valid = false;
    }

   return(valid);
}