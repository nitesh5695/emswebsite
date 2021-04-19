if(localStorage.getItem('message')!=null)
 {
   message=localStorage.getItem('message')
   document.getElementById('message').innerHTML=`<div class="alert alert-success my-4 " role="alert">
  <strong>Success!</strong> ${message}
</div>
`
localStorage.removeItem('message')
 }

document.getElementById('submit').addEventListener('click',send_otp);

async function send_otp(){
  let new_password=document.getElementById('new_password').value
  let confirm_password=document.getElementById('confirm_password').value
  console.log(new_password,confirm_password)
  email=localStorage.getItem('email')
  otp=localStorage.getItem('otp')
  
  const data= { method:'PATCH',
                 
  headers:{
    'Content-Type':'application/json',
    
  },
    body:JSON.stringify({password:new_password,confirm_password:confirm_password,email:email,otp:otp})
  }

const response=await fetch('http://127.0.0.1:7002/E_otp/',data)
  .then((response)=> {
    if(!response.ok)
    {
      document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
     <strong>Failed!</strong> Email is not valid...
   </div>
   ` 
   throw Error(res.statusText)
    }

    return response.json()
	}).then((data)=> {
   
   localStorage.setItem('message',data.message)
   location.href='login.html'

    console.log(data)
   
	
	}).catch((e)=>{
		console.log(e);
	});
  }
 

