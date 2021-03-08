console.log("javascript run");
document.getElementById('submit').addEventListener('click',check2);

async function check2(){
  
  
  const data= { method:'POST',
                
  
 
  headers:{
    'Content-Type':'application/json',
    Authorization: "Bearer " + localStorage.getItem("user_token")
  },
    
        body:JSON.stringify({email: "nitesh.singh5695@gmail.com"}),
    
  }

const response=await fetch("https://smilebotems.herokuapp.com/employer/",data)
  .then((response)=> {
		if (!response.ok){
      throw Error(response.statusText)
    }
    return response.json()
	}).then((data)=> {
    
		console.log(data);
	}).catch((e)=>{
		console.log(e);
	});
  }


