try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
var companyid ;
async function companydata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/company_register/',data)
         .then((res)=> {
              
           console.log(res.statusText)
           if(res.statusText=="Forbidden")
           {
            location.href="login.html"; 
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
               console.log(data);
               document.getElementById('email').innerHTML=data.email;
               document.getElementById('head').innerHTML=data.company_name;
               companyid=data.company_id;
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
       companydata()

     

async function otherdata(){
   

    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
        
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/company_profile/',data)
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
            document.getElementById('contact').innerHTML=data.contact_no;
            document.getElementById('ceo').innerHTML=data.ceo;
            document.getElementById('establish').innerHTML=data.established_year;
            document.getElementById('gst').innerHTML=data.gst_no;
             
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
}       
otherdata()