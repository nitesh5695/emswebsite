
try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
emp_id=localStorage.getItem('emp_id')
leave_id=localStorage.getItem('leave_id')
async function employerdata(){
    
    const data= { method:'GET',
                     headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
        const res= await  fetch('http://127.0.0.1:7002/employer_register/'+emp_id+'/',data)
         .then((res)=> {
              console.log(res.statusText)
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data1)=> {
               console.log(data1); 
               document.getElementById('name').innerHTML=data1.name;   
           }).catch((e)=>{
              {console.log(e) }
           });
    
    
        }
        employerdata()
async function leavedata(){

    const data= { method:'GET',
                    headers:{
        'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
        
        },
        
        }
        const res= await  fetch('http://127.0.0.1:7002/leaves/'+leave_id+'/',data)
        .then((res)=> {
            console.log(res.statusText)
        if (!res.ok){
            throw Error(res.statusText)
        }
        return res.json()
        }).then((data)=> {
            console.log(data); 
            
            document.getElementById('from_date').innerHTML=data.from_date
            document.getElementById('to_date').innerHTML=data.to_date
            document.getElementById('subject').innerHTML=data.subject
            document.getElementById('reason').innerHTML=data.reason
            document.getElementById('leave_type').innerHTML=data.leave_type
            document.getElementById('status').innerHTML= data.status
        }).catch((e)=>{
            {console.log(e) }
        });
    
    
        }
        leavedata()

        function response(status){
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
               localStorage.setItem('message','Leave Request Response submited')
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