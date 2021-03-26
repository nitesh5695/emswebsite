try{
	user=localStorage.getItem('E_user')
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
           location.href='E_apply_leave.html'
            }else{
             document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
             <strong>Failed!</strong> Any of the field is empty or wrong
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
