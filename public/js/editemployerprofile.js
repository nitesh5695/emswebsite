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


emp_id=localStorage.getItem('emp_id')
document.getElementById('submit').addEventListener('click',update)
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
         document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
         <strong>Failed!</strong> Any of the field is empty or wrong
       </div>
       `
        throw Error(res.statusText)
      }
       return res.json()
       }).then((data)=> {

         var select=document.getElementById('department')
         data.forEach(element => {
            console.log(element.department_name)
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

    
    const data1= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
        
         }
       
        const resprofile= await  fetch('http://127.0.0.1:7002/employer_profile/'+emp_id+'/',data1)
         .then((resprofile)=> {

            console.log(resprofile)
           if(resprofile.statusText=="Forbidden")
           {
            location.href="login.html"
           }
           if (!resprofile.ok){
            throw Error(resprofile.statusText)
          }
           return resprofile.json()
           }).then((data)=> {
             
             document.getElementById('password').value=data.password
            
           
            document.getElementById('address').value=data.address
            document.getElementById('contact_no').value=data.mobile_no
            document.getElementById('job_type').value=job_type
            document.getElementById('dob').value=data.dob
            document.getElementById('joining_date').value=data.joining_date
            document.getElementById('project').value=data.project_id
            document.getElementById('gender').value=data.gender
            document.getElementById('department').value =data.department_id           
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
       setdata()



async function update(){
   
    email= document.getElementById('email').value
    password= document.getElementById('password').value
    confirmpassword= document.getElementById('confirmpassword').value
    fullname=document.getElementById('fullname').value
    address= document.getElementById('address').value
    contact_no= document.getElementById('contact_no').value
    gender=document.getElementById('gender').value
    jobtype= document.getElementById('job_type').value
    dob= document.getElementById('dob').value
    joining_date= document.getElementById('joining_date').value
    project=document.getElementById('project').value
    department= document.getElementById('department').value
    profile=document.getElementById('profile')

    

    const formdata=new FormData()
     
      formdata.append('address',address)
      formdata.append('mobile_no',contact_no)
      formdata.append('job_type',jobtype)
      formdata.append('dob',dob)
      formdata.append('joining_date',joining_date)
      formdata.append('project',project)
      formdata.append('department_id',department)
      formdata.append('gender',gender)
      if(profile.files[0]!=undefined){
         formdata.append('profile_image',profile.files[0])
        
       }
      


    const postdata= { method:'PATCH',
                    
      
     
         headers:{
           
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         body:formdata
            
         }
       
        const res= await  fetch('http://127.0.0.1:7002/employer_profile/'+emp_id+'/',postdata)
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
       location.href='editemployerProfile.html'
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
