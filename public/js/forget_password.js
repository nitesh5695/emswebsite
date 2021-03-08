document.getElementById('submit').addEventListener('click',send_otp);

async function send_otp(){
  let email=document.getElementById('email').value
  
  const data= { method:'POST',
                 
  headers:{
    'Content-Type':'application/json',
    
  },
    body:JSON.stringify({email:email})
  }

const response=await fetch('https://smilebotems.herokuapp.com/forget_password/',data)
  .then((response)=> {
		if (!response.ok){
      throw Error(res.statusText)
    }
    return response.json()
	}).then((data)=> {
    console.log(data)
    location.href="submit_otp.html"
		console.log(data);
	}).catch((e)=>{
		console.log(e);
	});
  }
 

