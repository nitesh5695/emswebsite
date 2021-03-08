document.getElementById('submit').addEventListener('click',send_otp);

async function send_otp(){
  let new_password=document.getElementById('new_password').value
  let confirm_password=document.getElementById('confirm_password').value
  
  const data= { method:'PATCH',
                 
  headers:{
    'Content-Type':'application/json',
    
  },
    body:JSON.stringify({new_passsword:new_password,confirm_password:confirm_password})
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
 

