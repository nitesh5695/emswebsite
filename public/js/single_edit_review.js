var week=localStorage.getItem('r_week')
var month=localStorage.getItem('r_month')
var year=localStorage.getItem('r_year')
var emp_id=localStorage.getItem('emp_id')
var phase_id=localStorage.getItem('phase_id')
var question_id=localStorage.getItem('question_id')
var review_id=localStorage.getItem('review_id')
var user_name=localStorage.getItem('admin_name')
if (user_name==null)
{user_name="superuser"}
var arr=[];
var choice_data;
var choice=[]
document.getElementById('submit').addEventListener('click',submit_data)
document.getElementById('emp_name').innerHTML=localStorage.getItem('emp_name')
async function getQuestions()
{ await getoptions()
    const getdata= { method:'GET',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
         await  fetch('http://127.0.0.1:7002/phases/'+phase_id+'/',getdata)
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
                    <label  class="col-sm-3 col-form-label">${ques.question}</label>
              <div class="col-sm-4">
                <div class="form-group">
                 
                  <div class="select2-purple">
                    <select id="select${ques.question_id}" class="form-control"  placeholder="select one" data-dropdown-css-class="select2-purple" style="width: 50%;" disabled >
                     
                    </select>
                  </div>
                  
                </div>
                </div>
                <div class="col-sm-5">
                <div><input type="text" class="form-control"  id="comment${ques.question_id}" placeholder="comment reason...." disabled></div>
                </div>
              
                  </div>
                    `                  
                    choice_data.forEach(elem=>{
                        body=document.getElementById("select"+ques.question_id)
                        
                        body.innerHTML+=`<option id="marks${elem.marks}" class=${elem.choice_name} value=${elem.marks}>${elem.choice_name}</option>`
                       
                      })  
                      comments=document.getElementById("comment"+ques.question_id)
                      
                     
                      if(ques.question_id==question_id)
                      {body.disabled=false
                          
                      comments.disabled=false}
                }) 
             });
             
               
           }).catch((e)=>{
              
                 console.log(e) 
                //  document.getElementById('message').innerHTML="something error";
              
           });
}
getQuestions()



     async function submit_data()
     {
         mark=document.getElementById("select"+question_id).value
         review=document.getElementById("marks"+mark).className
        var comment=document.getElementById("comment"+question_id).value
         console.log(mark,review,comment)
       const data1= { method:'PATCH',        
         headers:{
           'Content-Type':'application/json',
           Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
           body:JSON.stringify({
            
            
            "review": review,
            "comment": comment,
            "marks": mark,
            "reviewed_by": user_name,
           
           })
         }
       
       await  fetch('http://127.0.0.1:7002/get_review/'+review_id+'/',data1)
         .then((response)=> {
               if (!response.ok){
                document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
                <strong>Failed!</strong> Any of the field is empty or wrong
              </div>
              `
               console.log(response.json())
             throw Error(response.statusText)
           }
           return response.json()
           }).then((data)=> {
            if (data.message!=undefined)
        {
       localStorage.setItem('message',data.message)
       location.href='employee_review.html'
        }else{
         document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
         <strong>Failed!</strong> Any of the field is empty or wrong
       </div>
       `
        }
               console.log(data);
           }).catch((e)=>{
               console.log(e);
           });
       console.log(arr)
                   
     }
     async function getoptions(){
        const getdata= { method:'GET',
               headers:{
                 'Content-Type':'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem("user_token")
                  },}
               await  fetch('http://127.0.0.1:7002/choices/',getdata)
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
                   choice_data=data
                   console.log(data)
      
                 }).catch((e)=>{
                    
                       console.log(e) 
                      //  document.getElementById('message').innerHTML="something error";
                    
                 });
      }
      
         