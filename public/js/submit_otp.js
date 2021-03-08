document.getElementById('submit').addEventListener('click',send_otp);

async function send_otp(){
  let otp=document.getElementById('otp').value
  
  const data= { method:'POST',
                 
  headers:{
    'Content-Type':'application/json',
    
  },
    body:JSON.stringify({otp:otp})
  }

const response=await fetch('https://smilebotems.herokuapp.com/otp/',data)
  .then((response)=> {
		if (!response.ok){
      throw Error(res.statusText)
    }
    return response.json()
	}).then((data)=> {
    console.log(data)
    location.href="new_password.html"
		console.log(data);
	}).catch((e)=>{
		console.log(e);
	});
  }
 

