var week=localStorage.getItem('r_week')
var month=localStorage.getItem('r_month')
var year=localStorage.getItem('r_year')
var emp_id=localStorage.getItem('emp_id')

var arr=[];
document.getElementById('submit').addEventListener('click',update)

async function getQuestions()
{
    const getdata= { method:'GET',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
         await  fetch('http://127.0.0.1:7002/phases/',getdata)
         .then((res)=> {
   
            console.log(res)
           if(res.statusText=="Forbidden")
           {
            console.log('token expired') 
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {

             all_phases=data
            div=document.getElementById('body')
             data.forEach(element => {
                 div.innerHTML+=`
                 <div class="card card-info">
              <div class="card-header">
                <h3 id=$class="card-title">${element.phase_name}</h3>
              </div>
              <form class="form-horizontal">
                <div  id=${element.phase_name} class="card-body">
                 
                </div>
    
              </form>
            </div>
                 `
                 element.questions.forEach(ques=>{
                    td=document.getElementById(element.phase_name)
                    td.innerHTML+=`
                    <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">${ques.question}</label>
                    <div class="col-12 col-sm-6">
                <div class="form-group">
                 
                  <div class="select2-purple">
                    <select id=${ques.question_id} class="select2" placeholder="select one" data-dropdown-css-class="select2-purple" style="width: 50%;">
                      <option>Exceptional</option>
                      <option>Meet Requirements</option>
                      <option>Gets By</option>
                      <option>Needs Improvement</option>
                    </select>
                  </div>
                  
                </div>
                <div><input type="text" class=${ques.question_id} placeholder="comment reason...."><div>
                <!-- /.form-group -->
              </div>
                  </div>
                    `                  
                   }) 

                
             });
             
               
           }).catch((e)=>{
              
                 console.log(e) 
                //  document.getElementById('message').innerHTML="something error";
              
           });
}
getQuestions()

async function update(){
    const getdata= { method:'GET',
    headers:{
      'Content-Type':'application/json',
       Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
    }
    await  fetch('http://127.0.0.1:7002/get_review/'+year+'/'+month+'/'+week+'/'+emp_id+'/',getdata)
    .then((res)=> {
  
       console.log(res)
      if(res.statusText=="Forbidden")
      {
       console.log('token expired') 
      }
      if (!res.ok){
       throw Error(res.statusText)
     }
      return res.json()
      }).then((data)=> {
        data.forEach(element=>{
         review=document.getElementById(element.questions_id).value
            comment=document.getElementsByClassName(element.questions_id).value
            arr_data={
                "review_id":element.review_id ,
                "review":review,
                "comment":comment ,
                "reviewed_by":"nitesh"
            }
            arr.push(arr_data)
        }) 
        
        submit_data()
      }).catch((e)=>{
          console.log(e) 
           document.getElementById('message').innerHTML="something error";
         });
     }
  



     async function submit_data()
     {
       const data1= { method:'PATCH',        
         headers:{
           'Content-Type':'application/json',
           Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           body:JSON.stringify(arr)
         }
       
       await  fetch('http://127.0.0.1:7002/review/',data1)
         .then((response)=> {
               if (!response.ok){
               console.log(response.json())
             throw Error(response.statusText)
           }
           return response.json()
           }).then((data)=> {
           document.getElementById("message").innerHTML=data.message;
               console.log(data);
           }).catch((e)=>{
               console.log(e);
           });
       console.log(arr)
                   
     }
         