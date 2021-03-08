try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
}
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
    
    
        }
    employersdata()  
    function getid(emp_id){
        localStorage.setItem("emp_id",emp_id)
        location.href='pay_now_form.html'
    }  