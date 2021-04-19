console.log("javascript run");
const company_id=localStorage.getItem('C_user')
if(localStorage.getItem('message')!=null)
 {
   message=localStorage.getItem('message')
  document.getElementById('message').innerHTML=`<div class="alert alert-success my-4 " role="alert">
  <strong>Success!</strong> ${message}
</div>
`
localStorage.removeItem('message')
 }
document.getElementById('create_user').addEventListener('click',register);

async function register(){
  let email=document.getElementById('email').value
  let name=document.getElementById('name').value
  let password=document.getElementById('password').value
  let gender=document.getElementById('gender').value
  let role=document.getElementById('role').value
  let confirmpassword=document.getElementById('confirmpassword').value
  if (password==confirmpassword)
  {
  const data= { method:'POST',
                
  
 
  headers:{
    'Content-Type':'application/json',
    Authorization: 'Bearer ' + localStorage.getItem("user_token")
          
    
    
  },
    body:JSON.stringify({company_id:company_id,email:email,name:name,password:password,role:role,gender:gender})
  }

const response=await fetch('http://127.0.0.1:7002/user_register/',data)
  .then((response)=> {
		if (!response.ok){
      throw Error(res.statusText)
    }
    return response.json()
	}).then((data)=> {
    
    console.log(data);
    localStorage.setItem('message',data.message)
    location.href='user_profile.html'
		console.log(data);
	}).catch((e)=>{
		console.log(e);
	});
  }
 else{
  document.getElementById("message").innerHTML="passsword  not matched";
 } 
}
