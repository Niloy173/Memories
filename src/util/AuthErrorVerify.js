const CheckAuthError = (data,type) => {

  /* type determines which form we are checking in case of error */
  /* data is the object to check coming from login or registration form */
  const error = {};

  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

  if(type === "registration"){

    if(data.username === "" || data.username.length < 4) {
      error.username = "username is too short or empty";
    }
  
    if(data.password === "" || !(data.password.length >= 4 && data.password.length <=8)){
      error.password = "password must contain (4-8) characters"
    }
  
    if(data.email === "" || !regex.test(data.email)){
      error.email = "Invalid email address";
    }
  }

  if(type === "login"){

    if(data.Luser === ""){
      error.user = "Field is empty";
    }
  
    if(data.Lpass === ""){
      error.pass = "Field is empty";
    }

  }





  return error;
}

export default CheckAuthError;