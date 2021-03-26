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
const project_id=localStorage.getItem('project_id')
document.getElementById('create_project').addEventListener('click',update_project)

async function projectdata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/projects/'+project_id+'/',data)
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
               document.getElementById('name').value=data.title;
               document.getElementById('start_date').value=data.start_date;
               document.getElementById('end_date').value=data.end_date;
               document.getElementById('client_company').value=data.client_name;
               document.getElementById('project_leader').value=data.project_leader;
               document.getElementById('description').value=data.description;  
               document.getElementById('status').value=data.status
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
        }
        projectdata()

async function update_project(){
    let title=document.getElementById('name').value
    let description=document.getElementById('description').value
    let client_name=document.getElementById('client_company').value
    let project_leader=document.getElementById('project_leader').value
    let start_date=document.getElementById('start_date').value
    let end_date=document.getElementById('end_date').value
    let status=document.getElementById('status').value
    
    const data= { method:'PATCH',
                  
    
   
    headers:{
      'Content-Type':'application/json',
      Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
      body:JSON.stringify({title:title,description:description,client_name:client_name,
        project_leader:project_leader,start_date:start_date,end_date:end_date,status:status,
        })
    }
  
  const response=await fetch('https://smilebotems.herokuapp.com/projects/'+project_id+'/',data)
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
       location.href='addprojectform.html'
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