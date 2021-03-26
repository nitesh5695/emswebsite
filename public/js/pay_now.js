const emp_id = localStorage.getItem("emp_id");
try{
	user=localStorage.getItem('C_user')
}
catch (errr){
	location.href="login.html";
}
document.getElementById("submit").addEventListener("click", post_salary_data);
async function employerdata() {
  const data = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  };

  const res = await fetch("https://smilebotems.herokuapp.com/employer_register/" + emp_id + "/",
    data
  )
    .then((res) => {
      console.log(res.statusText);
      if (res.statusText == "Forbidden") {
        document.getElementById("message").innerHTML = "please login";
      }
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("email").value = data.email;
      document.getElementById("fullname").value = data.name;
    })
    .catch((e) => {
      {
        console.log(e);
      }
    });
}
employerdata();
async function post_salary_data() {
   console.log("run")
  month = document.getElementById("month").value;
  pay_date = document.getElementById("pay_date").value;
  salary_rs = document.getElementById("pay_rs").value;
  // description = document.getElementById("description").value;

  const data = {
    method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: "Bearer " + localStorage.getItem("user_token"),
     },
    body: JSON.stringify({
      month: month,
      paid_date: pay_date,
      salary: salary_rs,
      description: description,
      
    }),
  };
  
  const res=await fetch("https://smilebotems.herokuapp.com/salary/" +emp_id+"/", data)
    .then((res)=> {

     console.log(res)
    if(res.statusText=="Forbidden")
     {
      location.href="login.html"
     }
    if (res.status_code==400){
      document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
      <strong>Failed!</strong> Any of the field is empty or wrong
    </div>
    `
      throw Error(res.status)
    }
     return res.json()
     }).then((data)=> {
       if (data.message!=undefined)
       {
      localStorage.setItem('message',data.message)
      location.href='salary_all_employer.html'
       }else{
        document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
        <strong>Failed!</strong> Any of the field is empty or wrong
      </div>
      `
       }
         console.log(data);
     }).catch((e)=>{
        {
           console.log("eroor",e)

        }
     });
}
