console.log("javascript run");
document.getElementById('submit').addEventListener('click',check2);

async function check2(){
  let email=document.getElementById('email').value
  let name=document.getElementById('name').value
  let password=document.getElementById('password').value
  let confirmpassword=document.getElementById('confirmpassword').value
  if (password==confirmpassword)
  {
  const data= { method:'POST',
                
  
 
  headers:{
    'Content-Type':'application/json',
    
  },
    body:JSON.stringify({email:email,company_name:name,password:password})
  }

const response=await fetch('http://127.0.0.1:7002/new_user/',data)
  .then((response)=> {
		if (!response.ok){
      throw Error(res.statusText)
    }
    return response.json()
	}).then((data)=> {
    document.getElementById("message").innerHTML=data.message;
		console.log(data);
	}).catch((e)=>{
		console.log(e);
	});
  }
 else{
  document.getElementById("message").innerHTML="passsword  not matched";
 } 
}
