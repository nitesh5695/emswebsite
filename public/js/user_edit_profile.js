var company_id ;
var emp_id=localStorage.getItem('emp_id')
console.log(emp_id)
try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
if(localStorage.getItem('message')!=null)
 {
   message=localStorage.getItem('message')
  document.getElementById('message').innerHTML=`<div class="alert alert-success my-4 " role="alert">
  <strong>Success!</strong> ${message}
</div>
`
localStorage.removeItem('message')
 }
async function setdata(){
    
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
            location.href="login.html"
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
               console.log(data);
               document.getElementById('email').value=data.email;
               document.getElementById('fullname').value=data.name;
               address= document.getElementById('address').value
               gender=document.getElementById('gender').value=data.gender
               contact_no= document.getElementById('contact_no').value
               role=document.getElementById('role').value=data.role
               
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
        }
       setdata()

       document.getElementById('submit').addEventListener('click',update)


       async function update(){
   
        email= document.getElementById('email').value
        fullname=document.getElementById('fullname').value
        address= document.getElementById('address').value
        contact_no= document.getElementById('contact_no').value
        gender=document.getElementById('gender').value
        dob= document.getElementById('dob').value
       
        
    
        
    
        const postdata= { method:'PATCH',
                        
          
         
             headers:{
               'Content-Type':'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("user_token")
               
             },
             body:JSON.stringify({name:fullname,gender:gender,role:"manager"})
                
             }
           
            const res= await  fetch('http://127.0.0.1:7002/user_register/'+emp_id+'/',postdata)
             .then((res)=> {
    
                console.log(res)
               if(res.statusText=="Forbidden")
               {
                console.log('token expired') 
               }
               if (!res.ok){
                document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
                <strong>Failed!</strong> Any of the field is empty or wrong
              </div>
              `
                throw Error(res.statusText)
              }
               return res.json()
               }).then((data)=> {
                if (data.message!=undefined)
            {
           localStorage.setItem('message',data.message)
           location.href='user_edit_profile.html'
            }else{
             document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
             <strong>Failed!</strong> Any of the field is empty or wrong
           </div>
           `
            }
                   console.log(data);
                   
               }).catch((e)=>{
                  {
                     console.log(e) 
                     document.getElementById('message').innerHTML="something error";
                  }
               });
    
    }