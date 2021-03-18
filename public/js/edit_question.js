 var phase_id=localStorage.getItem('phase_id')
 var phase_data;
 cmp_id=localStorage.getItem('C_user')
 document.getElementById('update').addEventListener('click',update_question)
async function update_question(){
    var arr=[];
    phase_data.forEach(element=>{
        question=document.getElementById(element.question_id).value
        data={
            "question_id":element.question_id,
            "question":question,
            "company_id":cmp_id
             
        }
        arr.push(data)
    })
    

    const question_data= { method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'Accept': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem("user_token")
      
    },
      body:JSON.stringify(arr)
    }
  await  fetch('http://127.0.0.1:7002/questions/',question_data)
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
   }
   async function get_question(){
    
    const getdata= { method:'GET',
         headers:{
           'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("user_token")
           
         },
         }
         await  fetch('http://127.0.0.1:7002/questions/'+phase_id+'/',getdata)
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
               phase_data=data
            div=document.getElementById('body')
            data.forEach(elem=>{
              document.getElementById("phase_name").value=elem.phase_name;
              console.log(elem.phase_name)
             elem.questions.forEach(element => {
        
                 div.innerHTML+=`
                 <div class="form-group" >
                 <label for="inputName">Question</label>
                 <input type="text" id=${element.question_id} class="form-control" value="${element.question}">
               </div>
                 `
             });
            })
           }).catch((e)=>{
                 console.log(e)     
           });
          }
          get_question()