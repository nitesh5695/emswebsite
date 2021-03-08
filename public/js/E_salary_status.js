try{
	user=localStorage.getItem('E_user')
}
catch (errr){
	location.href="login.html";
}
async function employer_all_salary(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/salary_detail/',data)
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
                   div.innerHTML +=`  <tr>
                   <td>${element.month}</td>
                   <td>${element.paid_date}</td>
                   <td>paid</td>
                   <td>${element.salary}</td>
                   <td>description</td>
                 </tr>`
                   
               });
            
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
    employer_all_salary()  
    function getid(emp_id){
        localStorage.setItem("emp_id",emp_id)
        location.href='pay_now_form.html'
    }  