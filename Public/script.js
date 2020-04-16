var submit=document.getElementById("submit");
submit.onclick=function(){
    function reqListener () {
        console.log(this.responseText);
      }
      
      var Req = new XMLHttpRequest();
      Req.addEventListener("load", reqListener);
      Req.open("GET", "/todo");
      Req.send();
}