document.getElementById('Add').addEventListener('click',add_more);
document.getElementById('remove').addEventListener('click',Remove);
document.getElementById('Submit').addEventListener('click',Submit_data);
document.getElementById('add_choice').addEventListener('click',add_choice);

 if(localStorage.getItem('message')!=null)
 {
   message=localStorage.getItem('message')
  document.getElementById('message').innerHTML=`<div class="alert alert-success my-4 " role="alert">
  <strong>Success!</strong> ${message}
</div>
`
  localStorage.removeItem('message')
 }



var count=2;
var divQ=document.getElementById('questions')
var cmp_id=localStorage.getItem('C_user')
console.log(cmp_id)
myquestions()
function add_more(){
//    divQ.innerHTML+=` <div id="questions" class="col-sm-6">
//    <div class="form-group">
//      <label>Question ${{count}}</label>
//     <input id=${{count}} type="text" class="form-control" placeholder="Enter Title">
//    </div>
//  </div>`
var x = document.createElement("DIV");
x.setAttribute("id",count+"A");
x.setAttribute("class","form-group");
divQ.appendChild(x);
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("id",count);
    x.setAttribute("name","question");
    x.setAttribute("placeholder","next question");
    x.setAttribute("class","form-control");
    divQ.appendChild(x);

   
   
    count=count+1;

}
function Remove()
{
 var n=document.getElementById("questions").lastChild
 if(n.tagName1!="DIV")
 {
    n.remove()
    count=count-1
 }
 
 
 
}

async function Submit_data()
 {
     
  var q_arr=[]
 var phase=document.getElementById("title").value
   var all= document.getElementsByName("question")
    for(x=0;x<count-1;x++)
{
        data={
            "phase_id":21,
            "question":all[x].value
        }
        q_arr.push(data)
    }

    const data1= { method:'POST',
                  
    
   
    headers:{
      'Content-Type':'application/json',
      Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
      body:JSON.stringify({"company_id":cmp_id,"phase_name":phase,"questions":q_arr})
    }
  
  await  fetch('http://127.0.0.1:7002/phases/',data1)
    .then((response)=> {
          if (!response.ok){
            console.log(response.json())
            document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
            <strong>Failed!</strong> Any of the field is empty or wrong
          </div>
          `
        throw Error(response.statusText)
      }
      return response.json()
      }).then((data)=> {
        if (data.message!=undefined)
        {
       localStorage.setItem('message',data.message)
       location.href='setup_analysis.html'
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
      myquestions()

}
async function myquestions(){
    
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
            location.href="index.html"
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
                 <td id=${element.phase_id}></td>
                 <td><button class="btn btn-danger" onclick="Delete(${element.phase_id})">Delete</button>
                 <button class="btn btn-danger" onclick="Edit(${element.phase_id})">Edit</button>
               </tr>`
               element.questions.forEach(ques=>{
                td=document.getElementById(element.phase_id)
                td.innerHTML+=ques.question +"<br>"                  
               })    
             });
               
           }).catch((e)=>{
              
                 console.log(e) 
                 document.getElementById('message').innerHTML="something error";
              
           });
          }

          
   async function Delete(id){

    const data= { method:'DELETE',
             headers:{
               'Content-Type':'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("user_token")
               
             },
             }
            await fetch('http://127.0.0.1:7002/phases/'+id+'/',data)
             .then((res)=> {
               if (!res.ok){
                document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
                <strong>Failed!</strong> Any of the field is empty or wrong or anyother problem..
              </div>
              `
                throw Error(res.statusText)
              }
               return res.json()
               }).then((data)=> {
                   console.log(data);
                   document.getElementById("message").innerHTML=data.message;localStorage.setItem('message',data.message)
                   location.href='setup_analysis.html'
               }).catch((e)=>{
                  {
                     console.log(e) 
                     document.getElementById('message').innerHTML="something error";
                  }
               });
               myquestions()
              
       }
  async function add_choice(){
   var choice=document.getElementById('option_name').value
   var marks=document.getElementById('mark').value
    const choice_data1= { method:'POST',
    headers:{
      'Content-Type':'application/json',
      Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
      body:JSON.stringify({"company_id":cmp_id,"choice_name":choice,"marks":marks})
    }
  await  fetch('http://127.0.0.1:7002/choices/',choice_data1)
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
        document.getElementById("message").innerHTML=data.message;localStorage.setItem('message',data.message)
        location.href='setup_analysis.html'
          console.log(data);
      }).catch((e)=>{
          console.log(e);
      });
  }     

  async function myoptions(){
    
    const getdata= { method:'GET',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
         await  fetch('http://127.0.0.1:7002/choices/',getdata)
         .then((res)=> {
   
            console.log(res)
           if(res.statusText=="Forbidden")
           {
            console.log('token expired') 
            location.href="index.html"
           }
           if (!res.ok){
            throw Error(res.statusText)
          }
           return res.json()
           }).then((data)=> {
   
            div=document.getElementById('option_table')
             data.forEach(element => {
                 div.innerHTML+=` <tr>
                 <td>${element.choice_name}</td>
                 <td id=${element.marks}>${element.marks}</td>
                 <td><button class="btn btn-danger" onclick="Deletechoice(${element.choice_id})">Delete</button>
               </tr>`
             
             });
               
           }).catch((e)=>{
              
                 console.log(e) 
                 
              
           });
          }
myoptions()
async function Deletechoice(id){

  const data= { method:'DELETE',
           headers:{
             'Content-Type':'application/json',
              Authorization: 'Bearer ' + localStorage.getItem("user_token")
             
           },
           }
          await fetch('http://127.0.0.1:7002/choices/'+id+'/',data)
           .then((res)=> {
             if (!res.ok){
              document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
              <strong>Failed!</strong> Any of the field is empty or wrong
            </div>
            `
              throw Error(res.statusText)
            }
             return res.json()
             }).then((data)=> {
              document.getElementById("message").innerHTML=data.message;localStorage.setItem('message',data.message)
              location.href='setup_analysis.html'
                 console.log(data);
                
                 
             }).catch((e)=>{
                {
                   console.log(e) 
                   document.getElementById('message').innerHTML="something error";
                }
             });
             myquestions()
            
    }
     

  function Edit(id){
    localStorage.setItem('phase_id',id)
    location.href="edit_question.html"
  }