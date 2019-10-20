document.getElementById("opcions").addEventListener("click", function(){
    showhideoptions();
})
var optshow = false;


function showhideoptions(){
    var div = document.getElementById("opcionsDIV");
    if(optshow){
        optshow = false;
        div.className = "optionshide";
    }
    else{
        optshow = true;
        div.className = "opcions" ;
    }

}