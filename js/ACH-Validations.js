const required = "Required *";

function frmlogin_Validation(){
    var uname = "Priyansh";
    var pswd = "pswd";
    var username = $('#loginUsername').val();
    var password = $('#loginPswd').val();

    $('.validator').hide();

    var loginUserValid = document.querySelector('#loginUserValid');
    var loginPswdValid = document.querySelector('#loginPswdValid');

        if(username==null||username===""){
            loginUserValid.innerHTML = required;
            $('#loginUsername').addClass('error');
            $('#loginUserValid').show();
        }else if(username!==uname){
            loginUserValid.innerHTML = "Invalid Username *";
            $('#loginUsername').addClass('error');
            $('#loginUserValid').show();
        }else if(username===uname){
            $('#loginUsername').removeClass('error');
        }

        if(password==null||password===""){
            loginPswdValid.innerHTML = required;
            $('#loginPswd').addClass('error');
            $('#loginPswdValid').show();
        }else if(password!==pswd){
            loginPswdValid.innerHTML="Invalid Password *";
            $('#loginPswd').addClass('error');
            $('#loginPswdValid').show();
        }else if([password===pswd]){
            $('#loginPswd').removeClass('error');
        }
}
function frmregister_Validation(){

    var required = "Required";
    var fname = $('#registerFname').val();
    var lname = $('#registerLname').val();
    var email = $('#registerEmail').val();
    var phone = $('#registerPhone').val();
    var uname = $('#registerUsername').val();
    var pswd = $('#registerPswd').val();
    var cpswd = $('#registerConfirmpswd').val();

    $('.validator').hide();

    var fnameValid = document.querySelector('#fnameValid');
    var lnameValid = document.querySelector('#lnameValid');
    var emailValid = document.querySelector('#emailValid');
    var phoneValid = document.querySelector('#phoneValid');
    var unameValid = document.querySelector('#unameValid');
    var pswdValid = document.querySelector('#pswdValid');
    var cpswdValid = document.querySelector('#cpswdValid');


    if(fname==null||fname===""){
        fnameValid.innerHTML=required;
        $('#registerFname').addClass('error');
        $('#fnameValid').show();
    }
    if(lname==null||lname===""){
        lnameValid.innerHTML=required;
        $('#registerLname').addClass('error');
        $('#lnameValid').show();
    }
    if(email==null||email===""){
        emailValid.innerHTML=required;
        $('#registerEmail').addClass('error');
        $('#emailValid').show();
    }
    if(phone==null||phone===""){
        phoneValid.innerHTML=required;
        $('#registerPhone').addClass('error');
        $('#phoneValid').show();
    }
    if(uname==null||uname===""){
        unameValid.innerHTML=required;
        $('#registerUsername').addClass('error');
        $('#unameValid').show();
    }
    if(pswd==null||pswd===""){
        pswdValid.innerHTML=required;
        $('#registerPswd').addClass('error');
        $('#pswdValid').show();
    }
    if(cpswd==null||cpswd===""){
        cpswdValid.innerHTML=required;
        $('#registerConfirmpswd').addClass('error');
        $('#cpswdValid').show();
    }
}