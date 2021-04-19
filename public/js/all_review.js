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
document.getElementById('search').addEventListener('click',search)
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
            location.href='login.html';
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
               console.log(data);
               let div=document.getElementById('appendablediv')
             
               data.forEach(element => {
                var  employee_image="../../dist/img/user2-160x160.jpg"
                if (element.profile!=null && element.profile.profile_image!=null){
                  employee_image="http://127.0.0.1:7002"+element.profile.profile_image
                  console.log(employee_image)
                }
                   div.innerHTML +=`
                   <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                    <div class="card bg-light">
                      
                      <div class="card-body pt-0">
                        <div class="row">
                          <div class="col-7">
                            <h2 class="lead"><b>${element.name}</b></h2>
                            <p class="text-muted text-sm"><b>Email id: </b>${element.email}  </p><br>
                            <p class="text-muted text-sm"><b>Employee id: </b>${element.emp_id} </p>
                              <span>Rating:</span><br>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star"></span>
                           
                          </div>
                          <div class="col-5 text-center">
                            <img id="img${element.emp_id}"" alt="no-image" class="img-circle img-fluid">
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                      <div class="text-left">
                          
                      
                    </div>
                        <div >
                        <button id=${element.emp_id} class="btn btn-sm btn-primary text-left" onclick="employee_reviews(${element.emp_id},'${element.name}')">
                        <i class="fas fa-user"></i> Past Reviews
                      </button>
                          
                          <button id=${element.emp_id} class="btn btn-sm btn-primary" onclick="getid(${element.emp_id},'${element.name}')">
                            <i class="fas fa-user"></i> Give Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                   `
                   document.getElementById("img"+element.emp_id).src=employee_image
               });
            
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
    employersdata()  
    function getid(emp_id,name){
        localStorage.setItem("emp_id",emp_id)
        localStorage.setItem("emp_name",name)
        location.href='review.html'
    }  
    function employee_reviews(emp_id,name){
        localStorage.setItem("emp_id",emp_id)
        localStorage.setItem("emp_name",name)
        location.href='employee_review.html'
    }  


  async  function search()
    {
     var name=document.getElementById('searchbox').value
 
      const data= { method:'GET',
                    
      
     
      headers:{
        'Content-Type':'application/json',
         Authorization: 'Bearer ' + localStorage.getItem("user_token")
        
      },
        
      }
    
     const res= await  fetch('http://127.0.0.1:7002/search/'+name+'/',data)
      .then((res)=> {
           
        console.log(res.statusText)
        if(res.statusText=="Forbidden")
        {
         location.href='login.html';
        }
        if (!res.ok){
         throw Error(res.statusText)
       }
        return res.json()
        }).then((data)=> {
            console.log(data);
            let div=document.getElementById('appendablediv')
            div.innerHTML="."
            data.forEach(element => {
              if (element.profile!=null && element.profile.profile_image!=null){
                employee_image="http://127.0.0.1:7002"+element.profile.profile_image
                console.log(employee_image)
              }
              
                div.innerHTML +=`
                <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                 <div class="card bg-light">
                   
                   <div class="card-body pt-0">
                     <div class="row">
                       <div class="col-7">
                         <h2 class="lead"><b>${element.name}</b></h2>
                         
                         <p class="text-muted text-sm"><b>Email id: </b>${element.email}  </p><br>
                         <p class="text-muted text-sm"><b>Employee id: </b>${element.emp_id} </p>
                         
                        
                       </div>
                       <div class="col-5 text-center">
                         <img  id="img${element.emp_id}" src="" alt="no-image" class="img-circle img-fluid">
                       </div>
                     </div>
                   </div>
                   <div class="card-footer">
                     <div class="text-right">
                     </div>
                       
                     <div >
                     <button id=${element.emp_id} class="btn btn-sm btn-primary text-left" onclick="employee_reviews(${element.emp_id},'${element.name}')">
                     <i class="fas fa-user"></i> Past Reviews
                   </button>
                       
                       <button id=${element.emp_id} class="btn btn-sm btn-primary" onclick="getid(${element.emp_id},'${element.name}')">
                         <i class="fas fa-user"></i> Give Review
                       </button>
                     </div>
                     
                   </div>
                 </div>
               </div>
                `
                document.getElementById("img"+element.emp_id).src=employee_image
            });
         
        }).catch((e)=>{
           {
              console.log(e) 
             
           }
        });
 

    }