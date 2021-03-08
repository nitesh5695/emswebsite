try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
}
document.getElementById('search').addEventListener('click',search)
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
                   div.innerHTML +=`
                   <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                    <div class="card bg-light">
                      
                      <div class="card-body pt-0">
                        <div class="row">
                          <div class="col-7">
                            <h2 class="lead"><b>${element.name}</b></h2>
                            <p class="text-muted text-sm"><b>Email id: </b>${element.email}  </p><br>
                            <p class="text-muted text-sm"><b>Employer id: </b>${element.emp_id} </p>
                           
                          </div>
                          <div class="col-5 text-center">
                            <img src="../../dist/img/user2-160x160.jpg" alt="" class="img-circle img-fluid">
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <div class="text-right">
                          
                          <button id=${element.emp_id} class="btn btn-sm btn-primary" onclick="getid(${element.emp_id})">
                            <i class="fas fa-user"></i> View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                   `
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
        location.href='employerprofile.html'
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
              
                div.innerHTML +=`
                <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                 <div class="card bg-light">
                   
                   <div class="card-body pt-0">
                     <div class="row">
                       <div class="col-7">
                         <h2 class="lead"><b>${element.name}</b></h2>
                         <p class="text-muted text-sm"><b>Email id: </b>${element.email}  </p><br>
                         <p class="text-muted text-sm"><b>Employer id: </b>${element.emp_id} </p>
                        
                       </div>
                       <div class="col-5 text-center">
                         <img src="../../dist/img/user2-160x160.jpg" alt="" class="img-circle img-fluid">
                       </div>
                     </div>
                   </div>
                   <div class="card-footer">
                     <div class="text-right">
                       
                       <button id=${element.emp_id} class="btn btn-sm btn-primary" onclick="getid(${element.emp_id})">
                         <i class="fas fa-user"></i> View Profile
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
                `
            });
         
        }).catch((e)=>{
           {
              console.log(e) 
             
           }
        });
 

    }