try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
}
async function data(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('http://127.0.0.1:7002/dashboard/',data)
         .then((res)=> {
              
           console.log(res.statusText)
           if(res.statusText=="Forbidden")
           {
            location.href='login.html' 
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
               console.log(data);
              document.getElementById('employers').innerHTML=data.total_employer;
              document.getElementById('projects').innerHTML=data.total_projects;
              document.getElementById('Leaves').innerHTML=data.leave_requests;   
              document.getElementById('running').innerHTML=data.running_projects;
              document.getElementById('completed').innerHTML=data.completed_projects;  
              document.getElementById('salary').innerHTML=data.total_salary;
            
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
data()        