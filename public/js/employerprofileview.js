try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
const emp_id=localStorage.getItem('emp_id')
async function employerdata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/employer_register/'+emp_id+'/',data)
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
               document.getElementById('email').innerHTML=data.email;
               document.getElementById('head').innerHTML=data.name;
               document.getElementById('employee_id').innerHTML=data.emp_id;
                 
                
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
       

     

async function profiledata(){
   

    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
        
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/employer_profile/'+emp_id+'/',data)
         .then((res)=> {
            console.log(res.statusText)
           if(res.statusText=="Forbidden")
           {
            console.log('token expired') 
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
              
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
employerdata()