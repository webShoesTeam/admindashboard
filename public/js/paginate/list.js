
const current = document.getElementById("current").value;
const pages = document.getElementById("pages").value;
const sizes = document.getElementById("sizes").value;
const colors = document.getElementById("colors").value;
const category = document.getElementById("category").value;
const sort = document.getElementById("sort").value;


if(pages != 0){
    var strBegin = ""
    if( window.location.href.search("page") != -1){
        strBegin = window.location.href.substring(window.location.href.search("/product"), window.location.href.search("page")).replace("?","")
    }
    else{
        strBegin =window.location.href.substring(window.location.href.search("/product"))
    }
    strBegin += "?page="
    var strEnd = ""
    if(sizes != 0){
        strEnd += `&size=${sizes}`
    }
    if(colors != 0){
        strEnd += `&color=${colors}`
    }
    if(category != 0){
        strEnd += `&category=${category}`
    }
    if(sort != 0){
        strEnd += `&sort=${sort}`
    }
    if(strEnd == "&sort=-1") {
        strEnd = ""
    }



    var uList = document.getElementById("listpage");
    var numPage = 3;
    var i = 1;  
    var tagLi = document.createElement("li");
    var link = document.createElement("a");
    link.className = "listpaginate";

    if(current == null){
        current == 1
    }
    //
    if(current >= 3){
        i = Number(current) - 2;
    }
    // <
    if(current == 1){
        link.href  = "#";
        link.textContent = "<";
    }
    else{
        var s = Number(current)- 1
        link.href  = strBegin+ s + strEnd;
        link.textContent = "<";
    }
    tagLi.appendChild(link);
    uList.appendChild(tagLi);

    //center

    for(;i <= Number(current) + 2 && i <= pages;i++){
    tagLi = document.createElement("li");
    link = document.createElement("a");
    link.className = "listpaginate";
    if(i == current){
        tagLi.classList.add('active')
        link = document.createElement("span");
        link.textContent = i;
    }
    else{
        link.href = strBegin + i + strEnd;
        link.textContent = i;
    }
    tagLi.appendChild(link);
    uList.appendChild(tagLi); 
    }


    // >
    tagLi = document.createElement("li");
    link = document.createElement("a");
    link.className = "listpaginate";
    if (current == pages) {
        link.href  = "#";
        link.textContent = ">";
    }
    else{
        var s = Number(current) + 1
        link.href = strBegin + s + strEnd;
        link.textContent = ">";
    }
    tagLi.appendChild(link);
    uList.appendChild(tagLi); 
}


var options = document.getElementById("select-size").options;
for (var i = 0; i < options.length; i++) {
    if (options[i].text == sizes) {
        options[i].selected = true;
        break;
    }
}
var options = document.getElementById("select-color").options;
for (var i = 0; i < options.length; i++) {
    if (options[i].text == colors) {
        options[i].selected = true;
        break;
    }
}
var options = document.getElementById("select-category").options;
for (var i = 0; i < options.length; i++) {
    if (options[i].text == category) {
        options[i].selected = true;
        break;
    }
}
var options = document.getElementById("select-sort").options;
for (var i = 0; i < options.length; i++) {
    if (options[i].value == sort) {
        options[i].selected = true;
        break;
    }
}
