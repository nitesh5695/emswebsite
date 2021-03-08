try{
	user=localStorage.getItem('E_user')
}
catch (errr){
	location.href="login.html";
}
document.getElementById('request').addEventListener('click',apply_leave)
async function apply_leave(){
    subject=document.getElementById('subject').value
    from_date=document.getElementById('from_date').value
    to_date=document.getElementById('to_date').value
    leave_type=document.getElementById('leave_type').value
    reason=document.getElementById('reason').value
    const data= { method:'POST',
         
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         body:JSON.stringify({subject:subject,from_date:from_date,to_date:to_date,leave_type:leave_type,reason:reason})
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/leave_detail/',data)
         .then((res)=> {

            console.log(res)
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
               document.getElementById('message').innerHTML=data.message;
               
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
}
