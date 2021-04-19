
try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
}

const company_id=localStorage.getItem('C_user')
var emp_id;
var department={}
var project={}
document.getElementById('submit').addEventListener('click',Postdata)


   


async function Postdata(){
    email= document.getElementById('email').value
    password= document.getElementById('password').value
    confirmpassword= document.getElementById('confirmpassword').value
    fullname=document.getElementById('fullname').value
    
   

    const postdata= { method:'POST',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         body:JSON.stringify({email:email,password:password,name:fullname})
         }
       if (password==confirmpassword)
       {
        const res= await  fetch('http://127.0.0.1:7002/employer_register/',postdata)
         .then((res)=> {

            console.log(res)
           if(res.statusText=="Forbidden")
           {
            console.log('token expired') 
           }
           if (!res.ok){
            document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
            <strong>Failed!</strong> Any of the field is empty or wrong or employee already exist...
          </div>
          `
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
            localStorage.setItem('message',data.message)
            localStorage.setItem('emp_email',email)
            location.href='add_employerprofile.html'
          
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              }
           });
       }
       else{document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
       <strong>Failed!</strong> Password not matched
     </div>
     `}
        
         }