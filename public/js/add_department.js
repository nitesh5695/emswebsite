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
document.getElementById('requestbutton').addEventListener('click',make_request)
async function getdata(){
    
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
          location.href="login.html"
        }
        if (!res.ok){
         throw Error(res.statusText)
       }
        return res.json()
        }).then((data)=> {

          var select=document.getElementById('department')
          data.forEach(element => {
             console.log(element.department_name)
             var option = document.createElement("option");
                option.text =element.department_name
                option.id=element.dept_id
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
document.getElementById('add').addEventListener('click',add_department)
async function add_department(){
    let department_id =document.getElementById('department').value
    console.log(department_id)
   
    
    const data= { method:'POST',
                  
    
   
    headers:{
      'Content-Type':'application/json',
       Authorization: 'Bearer ' + localStorage.getItem("user_token")
    },
      body:JSON.stringify({department_id:department_id})
    }
  
  const response=await fetch('https://smilebotems.herokuapp.com/add_department/',data)
    .then((response)=> {
          if (!response.ok){
            document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
            <strong>Failed!</strong> Any of the field is empty or wrong
          </div>
          `
        throw Error(res.statusText)
      }
      return response.json()
      }).then((data)=> {
        if (data.message!=undefined)
        {
       localStorage.setItem('message',data.message)
       location.href='add_department_form.html'
        }else{
         document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
         <strong>Failed!</strong> Any of the field is empty or wrong
       </div>
       `
        }
          console.log(data);
      }).catch((e)=>{
          console.log(e);
      });
  }
  async function mydepartments(){
    
    const data= { method:'GET',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
        const res= await  fetch('https://smilebotems.herokuapp.com/add_department/',data)
         .then((res)=> {
   
            console.log(res)
           if(res.statusText=="Forbidden")
           {
            console.log('token expired') 
            location.href="index.html"
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
   
            div=document.getElementById('table')
             data.forEach(element => {
                 div.innerHTML+=` <tr>
                 <td>${element.id}</td>
                 <td>${element.dept_id}</td>
                 <td><button class="btn btn-danger" onclick="Delete(${element.id})">Delete</button>
               </tr>`    
             });
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              }
           });
          }
   mydepartments()

   function Delete(id){

const deldata= { method:'DELETE',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
        const res= fetch('https://smilebotems.herokuapp.com/add_department/'+id+'/',deldata)
         .then((res)=> {
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
               console.log(data);
               if (data.message!=undefined)
        {
       localStorage.setItem('message',data.message)
       location.href='add_department_form.html'
        }else{
         document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
         <strong>Failed!</strong> Any of the field is empty or wrong
       </div>
       `
        }
               
           }).catch((e)=>{
              {
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              }
           });
          
   }



   async function make_request(){
    department_name=document.getElementById('department_name').value
    console.log(department_name)
   
    
    const data= { method:'POST',
                  
    
   
    headers:{
      'Content-Type':'application/json',
       Authorization: 'Bearer ' + localStorage.getItem("user_token")
    },
      body:JSON.stringify({department_name:department_name})
    }
  
  const response=await fetch('https://smilebotems.herokuapp.com/departments/',data)
    .then((response)=> {
          if (!response.ok){
            document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
            <strong>Failed!</strong> Any of the field is empty or wrong
          </div>
          `
        throw Error(res.statusText)
      }
      return response.json()
      }).then((data)=> {
        if (data.message!=undefined)
        {
       localStorage.setItem('message',data.message)
       location.href='add_department_form.html'
        }else{
         document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
         <strong>Failed!</strong> Any of the field is empty or wrong
       </div>
       `
        }
          console.log(data);
      }).catch((e)=>{
          console.log(e);
      });
  }
