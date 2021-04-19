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
 var company_id=localStorage.getItem('C_user')
 console.log(company_id)
var emp_data;
var arr=[]
document.getElementById('submit').addEventListener('click',submit_attendance)
async function employersdata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('http://127.0.0.1:7002/employer_register/',data)
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
               emp_data=data;
               let div=document.getElementById('table')
               data.forEach(element => {
                   div.innerHTML +=`
                   <tr>
                   <td>${element.emp_id}</td>
                   <td>${element.name}</td>
                   <td>
                    <td><label  for "present" >Present</label>
                        <input type="radio" name="${element.emp_id}" value="Present"></td>
                        <td><label for "absent">Absent</label>
                        <input type="radio" name="${element.emp_id}" value="Absent"></td>
                   </td>

                   
                     

                 </tr>
                   `
                   
               });
            
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }

      function submit_attendance()
       {
        
        var date=document.getElementById('date').value
         emp_data.forEach(element=>{
           console.log(element.emp_id)
            
           var checkbox= document.getElementsByName(element.emp_id);
    
    
           for(var i = 0; i < 2; i++){
               if(checkbox[i].checked){
                   var value = checkbox[i].value;
                   var id=checkbox[i].name;
                   var data={
                       "company_id":company_id,
                       "emp_id":id,
                       "status":value,
                       "date":date,
                   }
                   
               
                 arr.push(data)
               }
           }


           console.log(arr)
           const data1= { method:'POST',
                  
    
   
           headers:{
             'Content-Type':'application/json',
             Authorization: 'Bearer ' + localStorage.getItem("user_token")
             
           },
             body:JSON.stringify(arr)
           }
         
         const res= fetch('http://127.0.0.1:7002/attendance/',data1)
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
             location.href='attendance.html'
              }else{
               document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
               <strong>Failed!</strong> Any field is missing ...all field required
             </div>
             `
              }
                 console.log(data);
             }).catch((e)=>{
                 console.log(e);
             });
           console.log(arr)
         })
       } 
    employersdata()  
    