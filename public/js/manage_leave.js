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
var all_emp;
var emp_id;
var count=0;
async function employersleavedata(){
    await  employersdata()

    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('http://127.0.0.1:7002/leaves/',data)
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
               let rejected_div=document.getElementById('table_rejected')
               let approved_div=document.getElementById('table_approved')
               
               data.forEach(element => {
                   if(element.status=="Pending")
                   {
                     count+=1
                   div.innerHTML +=`<tr>
                   <td>${element.emp_id}</td>
                   <td class=${element.emp_id}>loading..</td>
                   <td>${element.from_date}</td>
                   <td>${element.to_date}</td>
                   <td><button class="btn btn-primary" onclick="detail(${element.leave_id},${element.emp_id})">details</button>
                     <button  class="btn btn-danger" onclick="reject(${element.leave_id},'Rejected')">Reject</button>
                     <button class="btn btn-success" onclick="reject(${element.leave_id},'Accepted')">Approved</button></td>
                   </tr>`
                   }else if(element.status=="Rejected")
                   {
                    rejected_div.innerHTML +=`<tr>
                    <td>${element.emp_id}</td>
                    <td class=${element.emp_id}>name</td>
                    <td>${element.from_date}</td>
                    <td>${element.to_date}</td>
                    </tr>`
                   }
                   else{
                    approved_div.innerHTML +=`<tr>
                    <td>${element.emp_id}</td>
                    <td class=${element.emp_id}></td>
                    <td>${element.from_date}</td>
                    <td>${element.to_date}</td>
                    </tr>`
                   }
               });
               all_emp.forEach(emp=>{
                try{
                  td=document.getElementsByClassName(emp.emp_id);
                  
                  [].slice.call(td).forEach(elem=>{
                    elem.innerHTML=emp.name
                  })
                 }
                catch{
                        console.log(emp.emp_id)
                }
              })
            
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
      
        fetch('http://127.0.0.1:7002/leaves/'+leave_id+'/',data)
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
            if (data.message!=undefined)
            {
           localStorage.setItem('message','Leave Request Response submitted')
           location.href='manageleavesform.html'
            }else{
             document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
             <strong>Failed!</strong> Process Failed ...try again
           </div>
           `
            }
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
                 all_emp=data
                
               }).catch((e)=>{console.log(e)});
        
  
            }
           
            if(count==0){
              console.log(count)
              document.getElementById('table').innerHTML=`<h6 style="color:red";>No requests are Pending</h6>`;
            }