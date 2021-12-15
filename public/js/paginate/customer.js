var uList = document.getElementById("listpage");
var numPage = 3;
var i = 1;  
var tagLi = document.createElement("li");
var link = document.createElement("a");

const current = document.getElementById("current").value;
const pages = document.getElementById("pages").value;
if(current == null){
    current == 1
}
//
if(current  >= 3){
    i = current - 2;
}

// <
if(current == 1){
    link.href  = "#";
    link.textContent = "Previous";
}
else{
    var s = current  - 1
    link.href  = "/customer/" + s;
    link.textContent = "Previous";
}
tagLi.appendChild(link);
uList.appendChild(tagLi);
//center
for(;i <= current  + 2 && i <= pages;i++){
    tagLi = document.createElement("li");
    link = document.createElement("a");
    if(i == current ){
        tagLi.classList.add('active')
        link = document.createElement("span");
        link.textContent = i;
    }
    else{
        link.href = "/customer/" + i;
        link.textContent = i;
    }
    tagLi.appendChild(link);
    uList.appendChild(tagLi); 
}

// >
tagLi = document.createElement("li");
link = document.createElement("a");
if (current == pages) {
    link.href  = "#";
    link.textContent = "Next";
}
else{
    var s = current + 1
    link.href  = "/customer/" + s;
    link.textContent = "Next";
}
tagLi.appendChild(link);
uList.appendChild(tagLi); 