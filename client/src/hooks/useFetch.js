import axios from 'axios';
import { useEffect, useState } from "react";
import ToastMsg from '../util/ToastMsg';


const useFetch = (url,token) => {

  console.log(url);
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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


  const reFetch = async () => {
    try {

      const response = await axios.get(url);
      setData(response.data);
      
    } catch (error) {
      ToastMsg(error.response.data.message, false)
    }
  }

  return [data,isloading, reFetch];
} 

export default useFetch;