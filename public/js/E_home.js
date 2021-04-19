try{
 	var nuser=localStorage.getItem('E_user')
  
 }
 catch (errr){
   console.log("error cached")
 	 location.href="login.html";
 }
const user=localStorage.getItem('E_user')
console.log(user)
function preloader(){
  preloader=document.getElementById('loading')
  preloader.style.display='none';
  }
async function E_homedata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('http://127.0.0.1:7002/employer_register/'+user+"/",data)
         .then((res)=> {
              
           console.log(res.statusText)
           if(res.statusText=="Forbidden")
           {
            location.href="login.html"; 
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
               company_id=data.company_id
               document.getElementById('login_name').innerHTML=data.name;
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
      E_homedata()

       async function C_homedata(){
    
        const data= { method:'GET',
                        
          
         
             headers:{
               'Content-Type':'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("user_token")
               
             },
               
             }
           
            const res= await  fetch('http://127.0.0.1:7002/company_register/',data)
             .then((res)=> {
                  
               console.log(res.statusText)
               if(res.statusText=="Forbidden")
               {
                location.href="login.html"; 
               }
               if (!res.ok){
                throw Error(res.statusText)
              }
               return res.json()
               }).then((data)=> {
                   
                   document.getElementById('company_name').innerHTML=data.company_name;
               }).catch((e)=>{
                  {
                     console.log(e) 
                    
                  }
               });
        
        
            }
            C_homedata()


    var frame = document.getElementById("frame");
    frame.src="E_dashboard.html"
    document.getElementById("Logout").addEventListener('click',logout)
    document.getElementById("home").addEventListener("click",home)
    var my_profile = document.getElementById("my_profile");
    var company_profile=document.getElementById("my_company")
    var attendance=document.getElementById("attendance")
    var salary_status=document.getElementById("salary_status")
    var apply_leaves=document.getElementById("apply_leaves")
    var project_detail=document.getElementById("project_detail")
    
    
    my_profile.addEventListener("click",link1)
    company_profile.addEventListener("click",link2)
    attendance.addEventListener('click',link3)
    salary_status.addEventListener("click",link4)
    apply_leaves.addEventListener("click",link5)
    project_detail.addEventListener("click",link6)
    
    if(localStorage.getItem('E_src'))
    {
      frame.src=localStorage.getItem('E_src')
    }else
    {
      frame.src="E_dashboard.html"
    }
    function link1(){
        console.log("run")
      frame.src="E_employerProfile.html"
      localStorage.setItem('E_src',frame.src)
    }
    function link2(){
      frame.src="E_companyprofileview.html"
      localStorage.setItem('src1',frame.src)
    }
    function link3(){
      frame.src="E_attendance.html"
      localStorage.setItem('E_src',frame.src)
    }
    function link4(){
        frame.src="E_salary_status.html"
        localStorage.setItem('E_src',frame.src)
      }
    function link5(){
        frame.src="E_apply_leave.html"
        localStorage.setItem('E_src',frame.src)
      }
    function link6(){
        frame.src="E_project_detail.html"
        localStorage.setItem('E_src',frame.src)
      }  
    
      function logout(){
        localStorage.clear();
        location.href="login.html";
        }
        function home(){
          frame.src="E_dashboard.html"
          localStorage.setItem('E_src',frame.src)
          }