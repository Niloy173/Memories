const MemoryVerification = (data,type) =>{

  const error = {};

  if(type === "create"){

    if(!data.title) error.title = "please enter a title";
    
    if(!data.description) error.description = "please provide a description";
    
    if(!data.file || data.file.size > (3*1024*1024)) error.file = "file must be less than 3MB";

  }

  return error;

}

export default MemoryVerification;