try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
}
async function homedata(){
    
const data= { method:'GET',
                
  
 
	 headers:{
	   'Content-Type':'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("user_token")
	   
	 },
	   
	 }
   
	const res= await  fetch('https://smilebotems.herokuapp.com/company_register/',data)
	 .then((res)=> {
		  
	   console.log(res.statusText)
	   if(res.statusText=="Forbidden")
	   {
		location.href='index.html'; 
	   }
	   if (!res.ok){
		throw Error(res.statusText)
	  }
	   return res.json()
	   }).then((data)=> {
		   console.log(data);
           document.getElementById('company_name').innerHTML=data.company_name;
	   }).catch((e)=>{
		  {
			 console.log(e) 
			
		  }
	   });


    }
   homedata()
var frame = document.getElementById("frame");
frame.src="dashboard.html"
document.getElementById("Logout").addEventListener("click",logout)
document.getElementById("home").addEventListener("click",home)

var profilebutton = document.getElementById("companyProfile");
var addemployer=document.getElementById("addemployer")
var allemployer=document.getElementById("allemployer")
var addproject=document.getElementById("addproject")
var view_projects=document.getElementById("view_projects")
var profileview=document.getElementById("profileview")
var manageleaves=document.getElementById("manageleaves")
var add_department=document.getElementById("add_department")
var manage_salary=document.getElementById("manage_salary")
var attendance=document.getElementById("attendance")

profilebutton.addEventListener("click",link1)
addemployer.addEventListener("click",link5)
allemployer.addEventListener("click",link6)
profileview.addEventListener('click',link3)
addproject.addEventListener("click",link2)
manageleaves.addEventListener("click",link4)
add_department.addEventListener("click",link7)
manage_salary.addEventListener("click",link8)
view_projects.addEventListener('click',link9)
attendance.addEventListener('click',link10)
if(localStorage.getItem('src'))
{
	frame.src=localStorage.getItem('src')
}else
{
	frame.src="dashboard.html"
}

function link1(){
    console.log("run")
  frame.src="companyprofileform.html"
  localStorage.setItem('src',frame.src)
}
function link2(){
  frame.src="addprojectform.html"
  localStorage.setItem('src',frame.src)
}
function link3(){
  frame.src="companyprofileview.html"
  localStorage.setItem('src',frame.src)
}
function link4(){
	frame.src="manageleavesform.html"
	localStorage.setItem('src',frame.src)
  }
function link5(){
	frame.src="add_employer_form.html"
	localStorage.setItem('src',frame.src)
  }
function link6(){
	frame.src="allemployer.html"
	localStorage.setItem('src',frame.src)
  }  

function link7(){
	frame.src="add_department_form.html"
	localStorage.setItem('src',frame.src)
  }  
function link8(){
	frame.src="salary_all_employer.html"
	localStorage.setItem('src',frame.src)
  }    
  function link9(){
	frame.src="all_projects.html"
	localStorage.setItem('src',frame.src)  
} 

  
  function link10(){
	frame.src="attendance.html"
	localStorage.setItem('src',frame.src)
  }    
  function logout(){
	localStorage.clear();
	location.href="login.html";
  }
  function home(){
	frame.src="dashboard.html"
	localStorage.setItem('src',frame.src)
  }
