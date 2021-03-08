try{
	user=localStorage.getItem('E_user')
}
catch (errr){
	location.href="login.html";
}
async function my_attendance(){
    
    const data= { method:'GET',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
        const res= await  fetch('https://smilebotems.herokuapp.com/my_attendance/',data)
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
   
            div=document.getElementById('table')
             data.forEach(element => {
                 div.innerHTML+=` <tr>
                 <td>${element.attendance_id}</td>
                 <td>${element.date}</td>
                 <td>${element.status}</td>
               </tr>`    
             });
               console.log(data);
               
           }).catch((e)=>{
              {
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              }
           });
          }
 my_attendance()