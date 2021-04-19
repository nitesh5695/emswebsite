document.getElementById('submit').addEventListener('click',submit_data)

var all_phases;
var choice_data;
var weekdate;
var week_selected;
var user_name=localStorage.getItem('admin_name')
if (user_name==null)
{user_name="superuser"}
console.log(user_name)

document.getElementById('emp_name').innerHTML=localStorage.getItem('emp_name')
var emp_id=localStorage.getItem("emp_id")
var company_id=localStorage.getItem("C_user")
var d=new Date;
var compare_date=d.getDate()
var current_month=(d.getMonth()+1)
var current_year=(d.getFullYear())

if(current_month>9){var max=current_year+"-"+current_month}
else{var max=current_year+"-0"+current_month}
 
console.log(max)

//document.getElementById('select_month').max=max
const monthNames = ["null","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

document.getElementById('month_button').addEventListener('click',set_date)
function set_date(){
  month_input=document.getElementById('select_month').value
 
   var only_month=month_input.split("-")
  
   month=only_month[1]
   year=only_month[0]
   compare_date=d.getDate()
   document.getElementById('message').innerHTML=null
   if(month>current_month ||  year>current_year)
   {
     compare_date=1
    document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
    <strong>Failed!</strong> Please select current month or before current month
  </div>
  `
   }
   else if(current_month==month && current_year==year)
   {compare_date=d.getDate()}
   else{compare_date=30}
  
   weekdata(year,month,compare_date)
   console.log(year,month)
   if (month==01){month=1}
   if (month==02){month=2}
   if (month==03){month=3}
   if (month==04){month=4}
   if (month==05){month=5}
   if (month==06){month=6}
   if (month==07){month=7}
   if (month==08){month=8}
   if (month==09){month=9}
   document.getElementById("month").innerHTML=monthNames[month]
}

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
                <h6 id=$class="card-title">${element.phase_name}</h6>
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
                    <label  class="col-sm-4 ">${ques.question}</label>
                    <div class="col-sm-3">
                <div class="form-group">
                 
                  <div class="select2-purple">
                    <select id=${ques.question_id} class="form-control" placeholder="select one" data-dropdown-css-class="select2-purple" style="width: 50%;">
                      
                    </select>
                  </div>
                  
                </div>
                </div>
                <div class="col-sm-5">
                <div class="form-group">
                <div><input type="text" class="form-control"  id="comment${ques.question_id}" placeholder="comment reason...."></div>
               
               </div> <!-- /.form-group -->
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

var arr=[];
async function submit_data()
{
  if(weekdate==null)
  {alert("please select a week")}
  else{
    confirm("are you submit review for Week1")
  all_phases.forEach(element=>{
    element.questions.forEach(ques=>{
     mark=document.getElementById(ques.question_id).value
     review=document.getElementById("marks"+mark).className
     comment=document.getElementById("comment"+ques.question_id).value
      data={
        "company_id":company_id,
        "emp_id":emp_id,
        "weeks":weekdate,
        "phase_id":element.phase_id  ,
        "questions_id":ques.question_id ,
        "review": review,
        "comment":comment,
        "marks":mark,
        "reviewed_by":user_name,

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
       location.href='all_review.html'
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
              
}}

async function weekdata(year,month,date){
 
  
  var d=new Date();
 
  console.log(d.getMonth()+1)
  console.log(d.getFullYear())
  current_date=d.getMonth()+1+"-"+d.getDate()
  week1=year+"-"+month+"-"+"07"
  var w1=7
  week2=year+"-"+month+"-"+"14"
  var w2=14
  week3=year+"-"+month+"-"+"21"
  var w3=21
  week4=year+"-"+month+"-"+"28"
  var w4=28
  month_name=monthNames[d.getMonth()+1]
  document.getElementById("month").innerHTML=month_name
  console.log(week1)
  console.log(d.getTime())
  const getdata= { method:'GET',
    headers:{
      'Content-Type':'application/json',
       Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
    }
    var week=[]
  if (w1<date){
    var weekdate="week1"
    
    await  fetch('http://127.0.0.1:7002/get_review/'+year+'/'+month+'/'+weekdate+'/'+emp_id+'/',getdata)
    .then((res)=> {
      console.log(res)
      return res.json()
      }).then((data)=> {
        if(data.length==0)
        {week.push({"current_week":week1,"name":"Week1"})}
      });
      
  }
  if (w2<date){
    weekdate="week2"
    await  fetch('http://127.0.0.1:7002/get_review/'+year+'/'+month+'/'+weekdate+'/'+emp_id+'/',getdata)
    .then((res)=> {
      console.log(res)
      return res.json()
      }).then((data)=> {
        if(data.length==0)
        {week.push({"current_week":week2,"name":"Week2"})}
      });
   
}
if (w3<date){ 
  weekdate="week3"
  await  fetch('http://127.0.0.1:7002/get_review/'+year+'/'+month+'/'+weekdate+'/'+emp_id+'/',getdata)
  .then((res)=> {
    console.log(res)
    return res.json()
    }).then((data)=> {
      if(data.length==0)
      {week.push({"current_week":week3,"name":"Week3"})}
    });
}
if (w4<date){
  weekdate="week4"
  await  fetch('http://127.0.0.1:7002/get_review/'+year+'/'+month+'/'+weekdate+'/'+emp_id+'/',getdata)
  .then((res)=> {
    console.log(res)
    return res.json()
    }).then((data)=> {
      if(data.length==0)
      {week.push({"current_week":week4,"name":"Week4"})}
    });
}
week_selected=week
div=document.getElementById("week_row")
div.innerHTML=null
var count=1
if (week.length==0)
{div.innerHTML=`<div class="alert alert-danger my-4 " role="alert">
<strong>Alert!</strong> You can't give review Now
</div>`}
week.forEach(w=>{
  
div.innerHTML+=`
<div class="col-sm-3 my-2">
<button class='btn btn-danger' onclick='getdate("${w.current_week}")' id="${w.current_week}">${w.name}</button> 

</div>`
count+=1

})

}
weekdata(current_year,current_month,compare_date)
function getdate(id){
  week_selected.forEach(w=>{
    if(w.current_week==id){
      document.getElementById(id).innerHTML="selected";
      document.getElementById(id).style.backgroundColor="green";
      weekdate=id;
    }else
    {
     btn=document.getElementById(w.current_week);
     btn.innerHTML=w.name
     btn.style.backgroundColor="red";
  
    }
  })
 
  console.log(weekdate)
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
