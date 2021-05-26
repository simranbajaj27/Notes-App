console.log("Welcome");
showNotes();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener('click', function(e) {
    let titleTxt=document.getElementById("titleTxt");
    let addTxt = document.getElementById("text");
    let notes=localStorage.getItem("notes");
    if (notes == null) {
        notesObj=[];
    }
    else {
        notesObj=JSON.parse(notes);
    }
    myObj={
        title:titleTxt.value,
        note:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value="";
    titleTxt.value="";
    showNotes();
})

function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";

    notesObj.forEach(function(element,index){
        html+=`
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title} </h5>
            <p class="card-text">${element.note}</p>
            <a id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</a>
        </div>
    </div>
        `
    });
    
    let notesElem=document.getElementById('notes');
    if(notesObj.length!=0){
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML=`Nothing to show. Use "Add a Note" to add a note`;
    }
    
}

function deleteNotes(index){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let noteVal=element.getElementsByTagName("p")[0].innerText;
        //console.log(noteVal);
        if(noteVal.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })


})