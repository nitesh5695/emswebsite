document.getElementById('submit').addEventListener('click',submit_data)
var week=[]
var all_phases;
var weekdate;
var emp_id=localStorage.getItem("emp_id")
var company_id=localStorage.getItem("C_user")

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

var arr=[];
async function submit_data()
{
  if(weekdate==null)
  {alert("please select a week")}
  else{
    confirm("are you submit review for Week1")
  all_phases.forEach(element=>{
    element.questions.forEach(ques=>{
     review=document.getElementById(ques.question_id).value
     comment=document.getElementsByClassName(ques.question_id).value
      data={
        "company_id":company_id,
        "emp_id":emp_id,
        "weeks":weekdate,
        "phase_id":element.phase_id  ,
        "questions_id":ques.question_id ,
        "review": review,
        "comment":comment,
        "reviewed_by":"Nitesh"

     }
        arr.push(data)

    })
  })
  const data1= { method:'POST',
                  
    
   
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
              
}}

function weekdata(){
 
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  var d=new Date();
 
  console.log(d.getMonth()+1)
  console.log(d.getFullYear())
  current_date=d.getMonth()+1+"-"+d.getDate()
  week1=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"07"
  var w1=7
  week2=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"14"
  var w2=14
  week3=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"21"
  var w3=21
  week4=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"28"
  var w4=28
  month_name=monthNames[d.getMonth()]
  document.getElementById("month").innerHTML=month_name
  console.log(week1)
  console.log(d.getTime())
  if (w1<d.getDate()){
      week.push(week1)
  }
  if (w2<d.getDate()){
   week.push(week2)
}
if (w3<d.getDate()){ 
 week.push(week3)
}
if (w4<d.getDate()){
 week.push(week4)
}
div=document.getElementById("week_row")
var count=1
week.forEach(w=>{
div.innerHTML+=`
<div class="col-sm-3 my-2">
<button class='btn btn-danger' onclick='getdate("${w}")' id="${w}">Week${count}</button> 

</div>
`
count+=1
})
}
weekdata()
function getdate(id){
  
   weekdate=id;
   console.log(weekdate)
  document.getElementById(id).innerHTML="selected";
  document.getElementById(id).style.backgroundColor="green";
}