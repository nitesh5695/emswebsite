var companyid ;
try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
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
async function setdata(){
    
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
            location.href="login.html"
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

    ceo_name= document.getElementById('ceo').value
    established_year= document.getElementById('established_year').value
    address= document.getElementById('address').value
    contact_no= document.getElementById('contact_no').value
    gst_no= document.getElementById('gst_no').value

    const data1= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
        
         }
       
        const resprofile= await  fetch('https://smilebotems.herokuapp.com/company_profile/',data1)
         .then((resprofile)=> {

            console.log(resprofile)
           if(resprofile.statusText=="Forbidden")
           {
            console.log('token expired') 
           }
           if (!resprofile.ok){
            throw Error(resprofile.statusText)
          }
           return resprofile.json()
           }).then((data)=> {
            document.getElementById('ceo').value=data.ceo
            document.getElementById('established_year').value=data.established_year
            document.getElementById('address').value=data.address
            document.getElementById('contact_no').value=data.contact_no
            document.getElementById('gst_no').value=data.gst_no
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
       setdata()

       document.getElementById('submit').addEventListener('click',putdata)

async function putdata(){
    ceo_name= document.getElementById('ceo').value
    established_year= document.getElementById('established_year').value
    address= document.getElementById('address').value
    contact_no= document.getElementById('contact_no').value
    gst_no= document.getElementById('gst_no').value

    const putdata= { method:'PUT',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         body:JSON.stringify({company_id:companyid,ceo:ceo_name,established_year:established_year,address:address,contact_no:contact_no,gst_no:gst_no})
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/company_profile/',putdata)
         .then((res)=> {

            console.log(res)
           if(res.statusText=="Forbidden")
           {
            console.log('token expired') 
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