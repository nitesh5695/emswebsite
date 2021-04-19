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
document.getElementById('create_project').addEventListener('click',add_project)

async function add_project(){
    let title=document.getElementById('name').value
    let description=document.getElementById('description').value
    let client_name=document.getElementById('client_company').value
    let project_leader=document.getElementById('project_leader').value
    let start_date=document.getElementById('start_date').value
    let end_date=document.getElementById('end_date').value
    let status=document.getElementById('status').value
    
    const data= { method:'POST',
                  
    
   
    headers:{
      'Content-Type':'application/json',
      Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
      body:JSON.stringify({title:title,description:description,client_name:client_name,
        project_leader:project_leader,start_date:start_date,end_date:end_date,status:status,
        company_id:2})
    }
  
  const response=await fetch('http://127.0.0.1:7002/projects/',data)
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