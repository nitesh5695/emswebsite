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
async function employersdata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/employer_register/',data)
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
    
           salary_data()
        }
    employersdata()  
    
    async function salary_data(){
    
      const data= { method:'GET',
                      
        
       
           headers:{
             'Content-Type':'application/json',
              Authorization: 'Bearer ' + localStorage.getItem("user_token")
             
           },
             
           }
         
          const res= await  fetch('https://smilebotems.herokuapp.com/salary/',data)
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
                 data.forEach(element => {
                     div.innerHTML +=`  <tr>
                     <td>${element.paid_date}</td>
                     <td class=${element.emp_id}>name</td>
                     <td>${element.month}</td>
                     <td>${element.salary}</td>                 
  
                   </tr>`
                     
                 });
                 all_emp.forEach(emp=>{
                   try{
                     td=document.getElementsByClassName(emp.emp_id)
                     
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