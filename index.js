//Set date to be correct
function updateDate(){
let date = new Date();
document.getElementById("date").innerHTML = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
}

let selected = 0;
let amount = 2;

let takings = (JSON.parse(localStorage.getItem("takings")) == null)? []: JSON.parse(localStorage.getItem("takings"));
let pastIndex = 0;


function select(buttonIdNum){
  //wipe all other colers:
  for(let i = 1; i <= 6; i++){
    document.getElementById("leg-"+i).style.backgroundColor = "white";
  }
  document.getElementById("leg-"+buttonIdNum).style.backgroundColor = "violet";

  selected = buttonIdNum;
}

function changeAmount(d){
  // let newAmount = document.getElementById("amount-slider").value;
let newAmount = Math.round((amount+d)*10)/10;//This acount for floating point errors
  if(newAmount >=0 && newAmount <= 3){
  amount = newAmount;
}

// document.getElementById("amount").innerHTML = (Math.floor(amount)==amount)? amount+".0": amount;
document.getElementById("amount").innerHTML=amount;
//This weird logic acounts for a consistant .0 even when it is a whole number
}

function buttonTake(){
  if(amount>0&&selected>0){
    let taking = {
      amount: amount,
      location: selected,
      date: document.getElementById("date").innerHTML
    }
    console.log(taking);
   logTake(taking);
  //  take(taking);


  }
}

function logTake(taking){
  addToForm(taking);
  takings.push(taking);
  localStorage.setItem("takings",JSON.stringify(takings));
}

function showPast(taking){
  let dateString = taking.date;
 document.getElementById("past-date").innerHTML = dateString;
  let location = taking.location;
  for(let i = 1; i <= 6; i++){
    document.getElementById("past"+i).style.backgroundColor = "white";
  }
document.getElementById("past"+location).style.backgroundColor = "yellow";

document.getElementById("past-amount").innerHTML = taking.amount;

}

function changePast(d){
  console.log(d);
  if(d==1&&pastIndex<takings.length-1){
    pastIndex++;
  }else if(d==-1&pastIndex>0){
    pastIndex--;
  }

  showPast(takings[pastIndex]);
}

function addToForm(taking){
  let _amount = taking.amount+"ml";
  let location;

  switch(taking.location){
    case 1:
      location = "Upper Right"
      break;
    case 2:
      location = "Middle Right"
      break;
    case 3:
      location = "Lower Right"
      break;
    case 4:
      location = "Upper Left"
      break;
    case 5:
      location = "Middle Left"
      break;
    case 6:
      location = "Lower Left"
      break;
  }
let url = "https://docs.google.com/forms/d/e/1FAIpQLSfXnjfNkYbxO_XFAQ_M47zyhukGeQRHjwGnbTn-MHmmC4GcXw/formResponse?usp=pp_url&entry.897071781="+location+"&entry.1653408895="+_amount+"&submit=Submit"
fetch(url);
}
