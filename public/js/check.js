console.log("javascript run");
document.getElementById('submit').addEventListener('click',check2);

function check2(){
   var week=[]
   const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  
   var d=new Date();
   month_name=monthNames[d.getMonth()]
   console.log(month_name)
   console.log(d.getMonth()+1)
   console.log(d.getFullYear())
   current_date=d.getMonth()+1+"-"+d.getDate()
   week1=d.getFullYear()+"-"+d.getMonth()+1+"-"+"07"
   var w1=7
   week2=d.getFullYear()+"-"+d.getMonth()+1+"-"+"14"
   var w2=14
   week3=d.getFullYear()+"-"+d.getMonth()+1+"-"+"21"
   var w3=21
   week4=d.getFullYear()+"-"+d.getMonth()+1+"-"+"28"
   var w4=28
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
   
console.log(week)
  }


