//https://archive.org/services/img/theworksofplato01platiala


//showMyBooks and Close open and close the My Books pop up.
function showMyBooks(){
  document.getElementById("myBooks").style.display = "block"
}

function out(){
  document.getElementById("myBooks").style.display = "none"
}

function trade(x){

  var a = confirm("Do you want to Request a Trade for: "+ event.target.alt+"?")
  if(a){
  document.getElementById(x).submit();
  }
}