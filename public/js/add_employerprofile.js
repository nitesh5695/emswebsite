try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
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
const company_id=localStorage.getItem('C_user')
var email=localStorage.getItem('emp_email')
var emp_id;
var department={}
var project={}
document.getElementById('submit').addEventListener('click',Postdata)
async function getdata(){
      project= document.getElementById('project').value
      department= document.getElementById('department').value
   const data= { method:'GET',
        headers:{
          'Content-Type':'application/json',
           Authorization: 'Bearer ' + localStorage.getItem("user_token")
          
        },
        }
       const res= await  fetch('http://127.0.0.1:7002/departments/',data)
        .then((res)=> {

           console.log(res)
          if(res.statusText=="Forbidden")
          {
           location.href="login.html";
          }
          if (!res.ok){
           throw Error(res.statusText)
         }
          return res.json()
          }).then((data)=> {

            var select=document.getElementById('department')
            data.forEach(element => {
               
               
               var option = document.createElement("option");
                  option.text =element.department_name
                  option.value=element.dept_id
                  select.add(option)       
            });
              console.log(data);
              
          }).catch((e)=>{
             {
                console.log(e) 
                document.getElementById('message').innerHTML="something error";
             }
          });
         }
   
 getdata()         
   
 async function getprojects(){
   project= document.getElementById('project').value
   department= document.getElementById('department').value
   const pdata= { method:'GET',
        headers:{
          'Content-Type':'application/json',
           Authorization: 'Bearer ' + localStorage.getItem("user_token")
          
        },
        }

    const res= await  fetch('http://127.0.0.1:7002/projects/',pdata)
     .then((res)=> {

        console.log(res)
       if(res.statusText=="Forbidden")
       {
        console.log('token expired') 
       }
       if (!res.ok){
        throw Error(res.statusText)
      }
       return res.json()
       }).then((data)=> {

         var select=document.getElementById('project')
         data.forEach(element => {
           
            var option = document.createElement("option");
               option.text =element.title
               option.value=element.project_id
               select.add(option)       
         });
           console.log(data);
           
       }).catch((e)=>{
          {
             console.log(e) 
             document.getElementById('message').innerHTML="something error";
          }
       });
      }
      getprojects()


      async function setdata(){
        const data3= { method:'POST',
        headers:{
          'Content-Type':'application/json',
           Authorization: 'Bearer ' + localStorage.getItem("user_token")
          
        },
        body:JSON.stringify({email:email})
        }
       const res2= await  fetch('http://127.0.0.1:7002/employer_id/',data3)
        .then((res)=> {

           console.log(res)
          if(res.statusText=="Forbidden")
          {
           location.href="login.html";
          }
          if (!res.ok){
            document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
            <strong>Failed!</strong> something was wrong with registration 
          </div>
          `
           throw Error(res.statusText)
         }
          return res.json()
          }).then((data)=> {

           emp_id=data.emp_id
           
           console.log(data)
            
              
          }).catch((e)=>{
             {
                console.log(e) 
                document.getElementById('message').innerHTML="something error";
             }
          });

    
        const data= { method:'GET',
                        
          
         
             headers:{
               'Content-Type':'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("user_token")
               
             },
               
             }
           
            const res= await  fetch('http://127.0.0.1:7002/employer_register/'+emp_id+'/',data)
             .then((res)=> {
                  
               console.log(res.statusText)
               if(res.statusText=="Forbidden")
               {
                document.getElementById("message").innerHTML="username or password is wrong"; 
               }
               if (!res.ok){
                throw Error(res.statusText)
              }
               return res.json()
               }).then((data)=> {
                   console.log(data);
                   document.getElementById('email').value=data.email;
                   document.getElementById('fullname').value=data.name;
                   
               }).catch((e)=>{
                  {
                     console.log(e) 
                    
                  }
               });
            }
               setdata()
   


async function Postdata(){
   
     address= document.getElementById('address').value
     contact_no= document.getElementById('contact_no').value
     jobtype= document.getElementById('job_type').value
     dob= document.getElementById('dob').value
     joining_date= document.getElementById('joining_date').value
     project=document.getElementById('project').value
     department=document.getElementById('department').value
     status="Active"
     gender=document.getElementById('gender').value
     profile_image=document.getElementById('profile')
     const formdata=new FormData()
     
      formdata.append('address',address)
      formdata.append('mobile_no',contact_no)
      formdata.append('job_type',jobtype)
      formdata.append('dob',dob)
      formdata.append('joining_date',joining_date)
      formdata.append('project',project)
      formdata.append('department_id',department)
      formdata.append('status',status)
      formdata.append('gender',gender)
      formdata.append('profile_image',profile_image.files[0])
      formdata.append('emp_id',emp_id)

   
         
      



            const postdata2= { method:'POST',
                    
      
     
          headers:{
            
             Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
          },
          body:formdata
          }
       
         const response= await  fetch('http://127.0.0.1:7002/employer_profile/',postdata2)
          .then((response)=> {

             if(response.statusText=="Forbidden")
            {
             console.log('token expired') 
            }
            if (!response.ok){
               document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
               <strong>Failed!</strong> Any of the field is empty or wrong
             </div>
             `
             throw Error(response.statusText)
           }
            return response.json()
            }).then((data)=> {
               if (data.message!=undefined)
               {
              localStorage.setItem('message',data.message)
              location.href='add_employerprofile.html'
               }else{
                document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
                <strong>Failed!</strong> Any of the field is empty or wrong
              </div>
              `
               }
               
            }).catch((e)=>{
               {
                  console.log(e) 
                
               }
            });
         }