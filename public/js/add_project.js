try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
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
  
  const response=await fetch('https://smilebotems.herokuapp.com/projects/',data)
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