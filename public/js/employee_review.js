var allques=[];
const monthNames = ["null","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var d=new Date;
var emp_id=localStorage.getItem('emp_id')
var current_month=(d.getMonth()+1)
async function myquestions(){
 
  console.log(current_month)
  document.getElementById("month").innerHTML=monthNames[current_month]
    
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
   
            div=document.getElementById('table')
             data.forEach(element => {
                 div.innerHTML+=` <tr>
                 <td>${element.phase_name}</td>
                 <td id=${element.phase_name}></td>
                 <td id=${element.phase_id}></td>
                 <td class=${element.phase_id}></td>
               </tr>`
               element.questions.forEach(ques=>{
                count=1
                td=document.getElementById(element.phase_name)
                td.innerHTML+=ques.question +"<br>" 
                  count+=1            
               })    
               data={
                "count":count,
                "phase_id":element.phase_id

              } 
              allques.push(data)
             });
               
           }).catch((e)=>{
              
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              
           });
           getweek1("03","week1")
          }

          myquestions()

async function getweek1(month,week){
  const getdata= { method:'GET',
  headers:{
    'Content-Type':'application/json',
     Authorization: 'Bearer ' + localStorage.getItem("user_token")
    
  },
  }
  await  fetch('http://127.0.0.1:7002/check/'+month+'/'+week+'/'+emp_id+'/',getdata)
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
        
          td=document.getElementById(element.phase_id)
          td.innerHTML="<h6 style='color:red'>No review</h6>"           
         });   
      }else{
       var row_counter=0
     

   
      allques.forEach(element => {
        
         td=document.getElementById(element.phase_id)
         com_td=document.getElementsByClassName(element.phase_id)
         td.innerHTML=null
         com_td.innerHTML=null
         for(x=1;x<element.count+1;x++)
         {
          
          td.innerHTML+= data[row_counter].review+"<br>"
          com_td.innerHTML+=data[row_counter].comment+'<br>' 
          row_counter+=1
         }              
        });       
    }}).catch((e)=>{
        console.log(e) 
         document.getElementById('message').innerHTML="something error";
       });
   }

   function getdate(id){
    
  //  document.getElementById(id).innerHTML="selected";
  
   document.getElementById(id).style.backgroundColor="green";
   if ( document.getElementById(id).value=="selected")
   {
     
   }else{
    getweek1("03",id) 
    document.getElementById(id).value="selected";

   }
   if (document.getElementById(id).value=="selected" && id=="week1")
   {
    document.getElementById("week2").style.backgroundColor="red";
    document.getElementById("week3").style.backgroundColor="red";
    document.getElementById("week4").style.backgroundColor="red";
    document.getElementById("week2").value="unselected";
    document.getElementById("week3").value="unselected";
    document.getElementById("week4").value="unselected";
   }
   if (document.getElementById(id).value=="selected" && id=="week2")
   {
    document.getElementById("week1").style.backgroundColor="red";
    document.getElementById("week3").style.backgroundColor="red";
    document.getElementById("week4").style.backgroundColor="red";
    document.getElementById("week1").value="unselected";
    document.getElementById("week3").value="unselected";
    document.getElementById("week4").value="unselected";
   }
   if (document.getElementById(id).value=="selected" && id=="week3")
   {
    document.getElementById("week2").style.backgroundColor="red";
    document.getElementById("week1").style.backgroundColor="red";
    document.getElementById("week4").style.backgroundColor="red";
    document.getElementById("week2").value="unselected";
    document.getElementById("week1").value="unselected";
    document.getElementById("week4").value="unselected";
   }
   if (document.getElementById(id).value=="selected" && id=="week4")
   {
    document.getElementById("week2").style.backgroundColor="red";
    document.getElementById("week3").style.backgroundColor="red";
    document.getElementById("week1").style.backgroundColor="red";
    document.getElementById("week2").value="unselected";
    document.getElementById("week3").value="unselected";
    document.getElementById("week1").value="unselected";
   }
   document.getElementById("week").innerHTML=id
 }
 