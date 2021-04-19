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
  let email=document.getElementById('email').value
  localStorage.setItem('email',email)
  
  const data= { method:'POST',
                 
  headers:{
    'Content-Type':'application/json',
    
  },
    body:JSON.stringify({email:email})
  }

const respons=await fetch('http://127.0.0.1:7002/E_forget_password/',data)
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
    console.log(data)

   localStorage.setItem('message',data.message)
   location.href='E_submit_otp.html'

	}).catch((e)=>{
		console.log(e);
	});
  
}