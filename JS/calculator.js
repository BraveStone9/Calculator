document.addEventListener("keydown",function(event){
    console.log(event.keyCode)
    if(event.keycode === 13){
        operate();
    }
    if(event.keyCode >= 96 && event.keyCode <= 109 
        || event.keyCode >= 48 && event.keyCode <= 57 
        || event.keyCode === 189
        || event.keyCode === 187
        || event.keyCode === 111
        || event.keyCode === 57){
            document.getElementById("displayMain").textContent += event.key;
    }
    if(event.keyCode === 8 || event.keyCode === 46){
        deletebtn();
    }
    if(event.keyCode === 110 || event.keycode === 190){
        decimalBtn();
    }
})

function operate(){
    var equationCompleted = document.getElementById("displayMain").textContent;
    document.getElementById("displayMain").textContent = eval(equationCompleted);
    document.getElementById("displayMemory").textContent += `${equationCompleted} = ${eval(equationCompleted)} \r\n`;
}

function btnpressed(displayText){
    document.getElementById("displayMain").textContent += displayText;
}
function allClearBtn(){
    document.getElementById("displayMain").textContent = "";
}
function decimalBtn(displayText) {
    var equationInProgress = document.getElementById("displayMain").textContent;
    if (equationInProgress.includes(".")){
    } else {
        document.getElementById("displayMain").textContent += displayText;
    }
}
function deleteBtn(){
    var str = document.getElementById("displayMain").textContent;
    var newStr = str.slice(0,-1);
    document.getElementById("displayMain").textContent = newStr;
}