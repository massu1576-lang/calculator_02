let result = "";
let is_calc = false;

onload = function(){
    result = document.querySelector(".result");

    document.querySelectorAll(".num-btn").forEach(function(btn){
        btn.addEventListener("click", () => {
            num_click(btn.innerHTML);
        });
    });

    document.querySelectorAll(".ope-btn").forEach(function(btn){
        btn.addEventListener("click", () => {
            ope_click(btn.innerHTML);
        });
    });

    document.querySelector(".clear-btn").addEventListener("click", clear_click);

    document.querySelector(".equal-btn").addEventListener("click", equal_click);
}

function clear_click(){
    result.value = "0";
    is_calc = false;
}

function num_click(val){
    if(is_calc){
        result.value = "0";
    }
    is_calc = false;

    if(result.value == "0" && val == "0"){
        result.value = "0";
    }else if(result.value == "0" && val == "."){
        result.value = "0.";
    }else if(result.value == "0"){
        result.value = val;
    }else{
        result.value += val;
    }
}

function ope_click(val){
    if(is_calc){
        is_calc = false;
    }
    if(result.value == "ERROR"){
        result.value = "0";
        return;
    }

    if(is_ope_last()){
        result.value = result.value.slice(0, -1) + val;
    }else{
        result.value += val;
    }
}

function equal_click(){
    if(is_ope_last()){
        result.value = result.value.slice(0, -1);
    }

    let temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();
    
    if(temp == Infinity || Number.isNaN(temp)){
        result.value = "ERROR";
    }else{
        result.value = temp;
    }
    is_calc = true;
    
}

function is_ope_last(){
    return ["+", "-", "×", "÷"].includes(result.value.toString().slice(-1));
}