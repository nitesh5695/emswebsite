try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
const project_id=localStorage.getItem('project_id')
//document.getElementById('submit').addEventListener('click',projectdata)
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
               document.getElementById('name').innerHTML=data.title;
               document.getElementById('from_date').innerHTML=data.start_date;
               document.getElementById('end_date').innerHTML=data.end_date;
               document.getElementById('client_name').innerHTML=data.client_name;
               document.getElementById('project_leader').innerHTML=data.project_leader;
               document.getElementById('description').innerHTML=data.description;  
               document.getElementById('status').innerHTML=data.status
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
      projectdata()

      async function Delete()
      {
         const data= { method:'DELETE',
                    
      
     
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
              
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
      }