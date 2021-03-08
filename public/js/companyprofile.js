var companyid ;
try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
async function homedata(){
    
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
               document.getElementById('companyemail').value=data.email;
               document.getElementById('companyname').value=data.company_name;
               companyid=data.company_id;
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
       homedata()

       document.getElementById('submit').addEventListener('click',postdata)

async function postdata(){
    ceo_name= document.getElementById('ceo').value
    established_year= document.getElementById('established_year').value
    address= document.getElementById('address').value
    contact_no= document.getElementById('contact_no').value
    gst_no= document.getElementById('gst_no').value

    const data= { method:'POST',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         body:JSON.stringify({company_id:companyid,ceo:ceo_name,established_year:established_year,address:address,contact_no:contact_no,gst_no:gst_no})
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/company_profile/',data)
         .then((res)=> {

            console.log(res)
           if(res.statusText=="Forbidden")
           {
            location.href='login.html'
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
                
              }
           });
}       
