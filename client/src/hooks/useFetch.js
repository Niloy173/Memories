import axios from 'axios';
import { useEffect, useState } from "react";
import ToastMsg from '../util/ToastMsg';


const useFetch = (url,token) => {

  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  // console.log(url);

  useEffect(() => {

    const FetchData = async () => {
      
      setIsLoading(true);
      try {

        const response = await axios.get(url, token &&{
          headers: { 'authorization': token}
        });
        setData(response.data);
        
      } catch (error) {
        console.log(error);
        ToastMsg(error.response.data.message, false);
      }

      setIsLoading(false);
    
    }

    FetchData();
  },[url,token])


  const reFetch = async (...params) => {

    const options = params.length > 0 ? {...params[0]} : {};
    try {

      const response = await axios.get(url,options); // should be evaluated later
      setData(response.data);
      
    } catch (error) {
      ToastMsg(error.response.data.message, false)
    }
  }

  return [data,isloading, reFetch];
} 

export default useFetch;