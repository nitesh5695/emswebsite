
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
async function getdata(){
      project= document.getElementById('project').value
      department= document.getElementById('department').value
   const data= { method:'GET',
        headers:{
          'Content-Type':'application/json',
           Authorization: 'Bearer ' + localStorage.getItem("user_token")
          
        },
        }
       const res= await  fetch('https://smilebotems.herokuapp.com/departments/',data)
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

    const res= await  fetch('https://smilebotems.herokuapp.com/projects/',pdata)
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

   


async function Postdata(){
    email= document.getElementById('email').value
    password= document.getElementById('password').value
    confirmpassword= document.getElementById('confirmpassword').value
    fullname=document.getElementById('fullname').value
     address= document.getElementById('address').value
     contact_no= document.getElementById('contact_no').value
     jobtype= document.getElementById('job_type').value
     dob= document.getElementById('dob').value
     joining_date= document.getElementById('joining_date').value
     project= 2//document.getElementById('project').value
     department=1//document.getElementById('department').value
     status="Active"
    gender=document.getElementById('gender').value
    

    const postdata= { method:'POST',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         body:JSON.stringify({email:email,password:password,name:fullname})
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/employer_register/',postdata)
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
               document.getElementById('message').innerHTML=data.message;
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              }
           });
         
           const data3= { method:'POST',
           headers:{
             'Content-Type':'application/json',
              Authorization: 'Bearer ' + localStorage.getItem("user_token")
             
           },
           body:JSON.stringify({email:email})
           }
          const res2= await  fetch('https://smilebotems.herokuapp.com/employer_id/',data3)
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

              emp_id=data.emp_id
              console.log(data)
               
                 
             }).catch((e)=>{
                {
                   console.log(e) 
                   document.getElementById('message').innerHTML="something error";
                }
             });




            const postdata2= { method:'POST',
                    
      
     
          headers:{
            'Content-Type':'application/json',
             Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
          },
          body:JSON.stringify({address:address,
            mobile_no:contact_no,
            dob:dob,
            joining_date:joining_date,
            project_id:project,
            department_id:department,
            status:status,
            job_type:jobtype,
            emp_id:emp_id,
            gender:gender,
         })
          }
       
         const response= await  fetch('https://smilebotems.herokuapp.com/employer_profile/',postdata2)
          .then((response)=> {

             console.log(response)
            if(response.statusText=="Forbidden")
            {
             console.log('token expired') 
            }
            if (!response.ok){
             throw Error(response.statusText)
           }
            return response.json()
            }).then((data)=> {
                document.getElementById('message').innerHTML=data.message;
                console.log(data);
               
            }).catch((e)=>{
               {
                  console.log(e) 
                
               }
            });
         }