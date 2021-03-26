var week=localStorage.getItem('r_week')
var month=localStorage.getItem('r_month')
var year=localStorage.getItem('r_year')
var emp_id=localStorage.getItem('emp_id')
var choice_data;

var arr=[];
document.getElementById('submit').addEventListener('click',update)
document.getElementById('emp_name').innerHTML=localStorage.getItem('emp_name')

async function getQuestions()
{ await getoptions()
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
                <h3 class="card-title">${element.phase_name}</h3>
              </div>
              <form >
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
                    <select id=${ques.question_id} class="form-control"  placeholder="select one" data-dropdown-css-class="select2-purple" style="width: 50%;">
                     
                    </select>
                  </div>
                  
                </div></div>
                <div class="col-sm-5">
                <div><input type="text" class="form-control"  id="comment${ques.question_id}" placeholder="comment reason...."></div>
                <!-- /.form-group -->
                </div>
              
                  </div>
                    `                  
                   
                   choice_data.forEach(elem=>{
                    body=document.getElementById(ques.question_id)
                    body.innerHTML+=`<option id="marks${elem.marks}" class=${elem.choice_name} value=${elem.marks}>${elem.choice_name}</option>`

                  })  

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
            mark=document.getElementById(element.questions_id).value
            review=document.getElementById("marks"+mark).className
            comment=document.getElementById("comment"+element.questions_id).value
            
            arr_data={
                "review_id":element.review_id ,
                "review":review,
                "marks":mark,
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
                document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
                <strong>Failed!</strong> Any of the field is empty or wrong
              </div>
              `
               console.log(response.json())
             throw Error(response.statusText)
           }
           return response.json()
           }).then((data)=> {
            localStorage.setItem('message',data.message)
            location.href='employee_review.html'
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
         