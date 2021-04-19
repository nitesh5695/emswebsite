if(localStorage.getItem('message')!=null)
 {
   message=localStorage.getItem('message')
   document.getElementById('message').innerHTML=`<div class="alert alert-success my-4 " role="alert">
  <strong>Success!</strong> ${message}
</div>
`
localStorage.removeItem('message')
 }

document.getElementById('submit').addEventListener('click',send_otp);

 function send_otp(){
  let otp=document.getElementById('otp').value
  
  var myHeaders = new Headers();


var formdata = new FormData();
formdata.append("otp",otp);
email=localStorage.getItem('email')
localStorage.setItem('otp',otp)
formdata.append("email",email)

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("http://127.0.0.1:7002/E_otp/", requestOptions)
.then((response)=> {
  if (!response.ok)
  {
    document.getElementById('message').innerHTML=`<div class="alert alert-danger my-4 " role="alert">
    <strong>Failed!</strong> Incorrect Otp try again..
  </div>
  `
  throw Error(res.statusText)
  }
  return response.json()
}).then((data)=> {
  console.log(data)

   localStorage.setItem('message',data.message)
   location.href="E_new_password.html"

  
}).catch((e)=>{
  console.log(e);
});
}