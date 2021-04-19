try{
	user=localStorage.getItem('E_user')
}
catch (errr){
	location.href="login.html";
}
//document.getElementById('submit').addEventListener('click',projectdata)
var emp_id=localStorage.getItem('E_user')
var project_id;
async function profiledata(){
   

    const data1= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
        
         }
       
        const res= await  fetch('http://127.0.0.1:7002/employer_profile/'+emp_id+'/',data1)
         .then((res)=> {
            console.log(res.statusText)
           if(res.statusText=="Forbidden")
           {
            location.href="location.html"
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
            
            project_id=data.project_id
            document.getElementById('address').innerHTML=data.address;
            document.getElementById('contact').innerHTML=data.mobile_no;
            document.getElementById('gender').innerHTML=data.gender;
            document.getElementById('joining_date').innerHTML=data.joining_date;
            document.getElementById('dob').innerHTML=data.dob;
            document.getElementById('project').innerHTML=data.project_id;
            document.getElementById('department').innerHTML=data.department_id;
             
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
}       
profiledata()
async function projectdata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('http://127.0.0.1:7002/projects/'+project_id+'/',data)
         .then((res)=> {
              
           console.log(res.statusText)
           if(res.statusText=="Forbidden")
           {
            document.getElementById("message").innerHTML="please login"; 
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
                 console.log("no project assigned") 
              }
           });
    
    
        }
      projectdata()