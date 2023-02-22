const MemoryVerification = (data,type) =>{

  const error = {};

  if(type === "create"){

    if(!data.title) error.title = "title is empty";
    
    if(!data.description) error.description = "description is empty";
    
    if(!data.photo || data.photo.size > (5*1024*1024)) error.file = "file must be less than 5MB";

  }

  return error;

}

export default MemoryVerification;