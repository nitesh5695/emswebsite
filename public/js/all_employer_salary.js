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
 var all_emp;
 var next_url="http://127.0.0.1:7002/salary/"
 var prev_url="http://127.0.0.1:7002/salary/"
 //document.getElementById('next_page').addEventListener('click',get_url(url))
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
               console.log(data);
               let div=document.getElementById('table')
               data.forEach(element => {
                   div.innerHTML +=`  <tr>
                   <td>${element.emp_id}</td>
                   <td>${element.name}</td>
                   <td>${element.email}</td>

                   <td><button id=${element.emp_id} class="btn btn-sm btn-primary" onclick="getid(${element.emp_id})">Pay Now</button></td>
                     

                 </tr>`
                   
               });
            
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
           salary_data('http://127.0.0.1:7002/salary/')
        }
    employersdata()  
    
    async function salary_data(url){
    
      const data= { method:'GET',
                      
        
       
           headers:{
             'Content-Type':'application/json',
              Authorization: 'Bearer ' + localStorage.getItem("user_token")
             
           },
             
           }
         
          const res= await  fetch(url,data)
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
                 let div=document.getElementById('table_history')
                 data.results .forEach(element => {
                     div.innerHTML +=`  <tr>
                     <td>${element.paid_date}</td>
                     <td class=${element.emp_id}>name</td>
                     <td>${element.month}</td>
                     <td>${element.salary}</td>                 
                   </tr>`
                     
                 });
                 next_url=data.next
                 prev_url=data.previous
                 document.getElementById('next_page').setAttribute('onclick','Next_url()')
                 document.getElementById('prev_page').setAttribute('onclick','previous_url()')
                
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
  
    function getid(emp_id){
        localStorage.setItem("emp_id",emp_id)
        location.href='pay_now_form.html'
    }  
function previous_url(){
  document.getElementById('table_history').innerHTML=null
 salary_data(prev_url)
}  
function Next_url(){
  document.getElementById('table_history').innerHTML=null
  salary_data(next_url)
}