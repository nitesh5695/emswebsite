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

async function homedata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('http://127.0.0.1:7002/company_register/',data)
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

    const formdata=new FormData()
    formdata.append('company_id',company_id)
    formdata.append('ceo',ceo_name)
    formdata.append('established_year',established_year)
    formdata.append('address',address)
    formdata.append('contact_no',contact_no)
    formdata.append('gst_no',gst_no)
    formdata.append('company_logo',logo.files[0])

    const data= { method:'POST',
                    
      
     
         headers:{
           
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         body:formdata
         }
       
        const res= await  fetch('http://127.0.0.1:7002/company_profile/',data)
         .then((res)=> {

            console.log(res)
           if(res.statusText=="Forbidden")
           {
            location.href='login.html'
           }
           if (!res.ok){
            document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
            <strong>Failed!</strong> Any of the field is empty or wrong
          </div>
          `
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
            if (data.message!=undefined)
            {
           localStorage.setItem('message',data.message)
           location.href='editcompanyprofile.html'
            }else{
             document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
             <strong>Failed!</strong> Any of the field is empty or wrong check filename
           </div>
           `
            }
               
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
}       
