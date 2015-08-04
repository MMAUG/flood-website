$(function(){

	var page = document.body.getAttribute("data-page");
	  if(page !== "dashboard"){
	    return false;
	  }else{
	  	alert("This is Dashboard");
	  }
});