var mainPopUp = document.getElementById('SignUpModal');
var signIn = document.getElementById('sign-in');
var SignUp = document.getElementById('Sign-Up');
var formSignIn = document.getElementById('sign');
var formSignUp = document.getElementById('SignUp');







    mainPopUp.className += ' visible';
    signIn.className += ' active';
    SignUp.className = 'Sign-Up';
    formSignUp.className = 'SignUp';
    formSignIn.className = 'sign';



signIn.onclick = function () {
    signIn.className += ' active';
    SignUp.className = 'SignUp';
    formSignIn.className = 'sign';
    formSignUp.className = 'SignUp';
};

SignUp.onclick = function () {
    signIn.className = 'sign-in';
    SignUp.className += ' active';
    formSignIn.className += ' move-left';
    formSignUp.className += ' move-left';
};


