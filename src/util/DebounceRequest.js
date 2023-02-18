const debounce = (fn,delay) => {
  let timerid ;
  return function(...args) {
    clearTimeout(timerid);
    timerid = setTimeout(() =>{
      fn(...args);
    },delay);
  }
}

export default debounce;