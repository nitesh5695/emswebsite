try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html"
}
async function projectdata(){
    
    const data= { method:'GET',
                    
      
     
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           
         }
       
        const res= await  fetch('https://smilebotems.herokuapp.com/projects/',data)
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
                   <td>${element.project_id}</td>
                   <td>${element.title}</td>
                   <td>${element.status}</td>

                   <td><button id=${element.project_id} class="btn btn-sm btn-primary" onclick="getid(${element.project_id})">Detail</button></td>
                     

                 </tr>`
                   
               });
            
           }).catch((e)=>{
              {
                 console.log(e) 
                
              }
           });
    
    
        }
    projectdata()  
    function getid(project_id){
        localStorage.setItem("project_id",project_id)
        location.href='project_detail.html'
    }  