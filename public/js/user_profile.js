try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
const emp_id=localStorage.getItem('emp_id')
document.getElementById('delete_button').addEventListener('click',delete_user)
async function employerdata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('http://127.0.0.1:7002/user_register/'+emp_id+'/',data)
         .then((res)=> {
              
           console.log(res.statusText)
           if(res.statusText=="Forbidden")
           {
            location.href="session.html"
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
               console.log(data);
               document.getElementById('email').innerHTML=data.email;
               document.getElementById('head').innerHTML=data.name;
               document.getElementById('employee_id').innerHTML=data.user_id;
               document.getElementById('role').innerHTML=data.role;
               document.getElementById('contact').innerHTML=data.mobile_no;
               document.getElementById('address').innerHTML=data.address;  
               document.getElementById('gender').innerHTML=data.gender;
                
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
       

   
employerdata()

function delete_user()
{
  if(confirm("Are you really want to delete this user"))
  {
    const data= { method:'DELETE',
                    
      
     
    headers:{
      'Content-Type':'application/json',
       Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
      
    }
  
   fetch('http://127.0.0.1:7002/user_register/'+emp_id+'/',data)
    .then((res)=> {
         
      console.log(res.statusText)
      if(res.statusText=="Forbidden")
      {
       location.href="login.html"
      }
      if (!res.ok){
       throw Error(res.statusText)
     }
      return res.json()
      }).then((data)=> {
          console.log(data);
          localStorage.setItem('message',data.message)
          location.href='user_profile.html'
         
           
      }).catch((e)=>{
         {
            console.log(e) 
           
         }
      });
   }
}