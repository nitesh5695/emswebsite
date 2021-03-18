var allques=[];
var f_month;
var year;
const monthNames = ["null","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var d=new Date;
var emp_id=localStorage.getItem('emp_id')
var current_month=(d.getMonth()+1)
var current_year=(d.getFullYear())
var selected_week="week1"
f_month=current_month
year=current_year
document.getElementById('emp_name').innerHTML=localStorage.getItem('emp_name')
async function myquestions(){
 
  document.getElementById("month").innerHTML=monthNames[f_month]
    
    const getdata= { method:'GET',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
         await  fetch('http://127.0.0.1:7002/phases',getdata)
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
   
            div=document.getElementById('expandable')
            console.log(div)
            
             data.forEach(element => {

              div.innerHTML+=`
             
    <div class="card-header" id="headingOne">
    <h3><b>${element.phase_name}</b></h3>
       <div class="card" id="phase${element.phase_id}">
  
   </div>

  
 </div>

              `
               
               element.questions.forEach(ques=>{
                count=1
                td=document.getElementById("phase"+element.phase_id)
                td.innerHTML+=`  <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#ques${ques.question_id}" aria-expanded="false" aria-controls="collapseTwo">
                    ${ques.question}
                  </button>
                </h5>
              </div>
              <div id="ques${ques.question_id}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body">
                   <div class="row">
                       <h5 id="${ques.question_id}">Exceptional</h4>    
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <p><b>Reviewed By</b></p>
                            
                              </div>
                              <div class="col-sm-6">
                                <p id="by${ques.question_id}">Nitesh singh</p>
                              </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <p><b>comment</b></p>
                            
                              </div>
                              <div class="col-sm-6">
                                <p id="comment${ques.question_id}"></p>
                              </div>
           
                  </div>
                  <div class="row">
                  <div class="col-sm-6">
                      <p><b>Rating</b></p>
                      
                        </div>
                        <div class="col-sm-6">
                          <p id="mark${ques.question_id}"></p>
                        </div>
     
            </div>
                   <div class="row">
                        <div class="col-sm-6">
                            <button onclick="update_review()" class="btn btn-danger">Edit</button>
                              </div>
                             
           
                  </div>
              </div>
            </div>
               
                `
                
                   
                  data={
                    "count":count,
                    "question_id":ques.question_id
    
                  } 
                 
                  allques.push(data)   
                  count+=1       
               })    
              
              });
               
           }).catch((e)=>{
              
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              
           });
           getweek1(year,f_month,"week1")
          }

          myquestions()

async function getweek1(year,month,week){
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
      if(data.length==0)
      {
        allques.forEach(element => {
        
          td=document.getElementById(element.question_id)
          td.innerHTML="<h6 style='color:red'>No review</h6>"           
         });   
      }else{
       var row_counter=0
     

   
      data.forEach(element => {
        console.log(element)
        
         td=document.getElementById(element.questions_id)
         com_td=document.getElementById("comment"+element.questions_id)
         by=document.getElementById("by"+element.questions_id)
         rating=document.getElementById("mark"+element.questions_id)
         td.innerHTML=element.review
         com_td.innerHTML=element.comment
         by.innerHTML=element.reviewed_by
         rating.innerHTML=element.marks
            
        });       
  }  }).catch((e)=>{
        console.log(e) 
         document.getElementById('message').innerHTML="something error";
       });
   }
  
   function getdate(id){
     selected_week=id
    getweek1(year,f_month,id) 
  
 }

 document.getElementById('month_button').addEventListener('click',by_month)
 function by_month(){
   month=document.getElementById('select_month').value
   document.getElementById("month").innerHTML=monthNames[f_month]
   var only_month=month.split("-")
  
   f_month=only_month[1]
   year=only_month[0]
   getweek1(year,f_month,"week1")
   console.log(year,f_month)
   if (f_month==01){f_month=1}
   if (f_month==02){f_month=2}
   if (f_month==03){f_month=3}
   if (f_month==04){f_month=4}
   if (f_month==05){f_month=5}
   if (f_month==06){f_month=6}
   if (f_month==07){f_month=7}
   if (f_month==08){f_month=8}
   if (f_month==09){f_month=9}
   document.getElementById("month").innerHTML=monthNames[f_month]
 }
  //document.getElementById("edit_review").addEventListener('click',update_review)
 function update_review(){
   localStorage.setItem('r_year',year)
   localStorage.setItem('r_month',f_month)
   localStorage.setItem('r_week',selected_week)
   location.href="edit_review.html"
 }