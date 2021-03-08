try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
var emp_id;
async function employersleavedata(){

    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/leaves/',data)
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
               let div=document.getElementById('table')
               data.forEach(element => {
                   if(element.status=="Pending")
                   {
                   div.innerHTML +=`  <tr>
                   <td>${element.emp_id}</td>
                   <td>name</td>
                   <td>${element.from_date}</td>
                   <td>${element.to_date}</td>
                   <td><button class="btn btn-primary" onclick="detail(${element.leave_id},${element.emp_id})">details</button>
                     <button  class="btn btn-danger" onclick="reject(${element.leave_id},'Rejected')">Reject</button>
                     <button class="btn btn-success" onclick="reject(${element.leave_id},'Accepted')">Approved</button></td>

                 </tr>`
                   }
               });
            
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
    employersleavedata()  
    function reject(leave_id,status){
        const data= { method:'PATCH',
        headers:{
          'Content-Type':'application/json',
           Authorization: 'Bearer ' + localStorage.getItem("user_token")
          
        },
        body:JSON.stringify({status:status})
        }
      
        fetch('https://smilebotems.herokuapp.com/leaves/'+leave_id+'/',data)
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
          }).catch((e)=>{
             {
                console.log(e) 
               
             }
          });
   
   
       }  
      
       function detail(leave_id,emp_id)
       {
           localStorage.setItem('leave_id',leave_id)
           localStorage.setItem('emp_id',emp_id)
           location.href="leave_request_detail_form.html"
       }