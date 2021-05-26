console.log("Welcome");
showNotes();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener('click', function(e) {
    let titleTxt=document.getElementById("titleTxt");
    let addTxt = document.getElementById("text");
    let titles=localStorage.getItem("titles");
    let notes=localStorage.getItem("notes");
    if (notes == null) {
        notesObj=[];
        titleObj=[];
    }
    else {
        notesObj=JSON.parse(notes);
        titleObj=JSON.parse(titles);
    }
    notesObj.push(addTxt.value);
    titleObj.push(titleTxt.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("titles",JSON.stringify(titleObj));
    addTxt.value="";
    titleTxt.value="";
    //console.log(notesObj);
    showNotes();
})

function showNotes(){
    let notes=localStorage.getItem("notes");
    let titles=localStorage.getItem("titles");
    if(notes==null){
        notesObj=[];
        titleObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
        titleObj=JSON.parse(titles);
    }
    let html="";
    let len=notesObj.length;
    for(let i=0;i<len;i++){
        html+=`
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${titleObj[i]} </h5>
            <p class="card-text">${notesObj[i]}</p>
            <a id="${i}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</a>
        </div>
    </div>
        `
    }
    /*
    notesObj.forEach(function(element,index){
        html+=`
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${index+1} </h5>
            <p class="card-text">${element}</p>
            <a id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</a>
        </div>
    </div>
        `
    });
    */
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
    let titles=localStorage.getItem("titles");
    if(notes==null){
        notesObj=[];
        titleObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
        titleObj=JSON.parse(titles);
    }
    notesObj.splice(index,1);
    titleObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("titles",JSON.stringify(titleObj));
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


    //console.log(search.value);
})