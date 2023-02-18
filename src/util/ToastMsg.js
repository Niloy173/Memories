import { toast } from 'react-toastify';

const ToastMsg = (msg, flag,position="TOP_RIGHT") => {
  
  console.log(msg)

    if(flag){
      return toast.success(msg,{
        position: toast.POSITION[position]
      });
    }else{
      return toast.error(msg,{
        position: toast.POSITION[position]
      });
    }
    
  
}

export default ToastMsg;
