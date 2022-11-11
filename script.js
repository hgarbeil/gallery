const imageContainerEl = document.querySelector(".image-container") ;
const prevButtonEl = document.getElementById("prev");
const nextButtonEl = document.getElementById("next");
const rotateButtonEl = document.getElementById("rotate") ;
const reloadEl = document.querySelector('#reload') ;
var timerInc = 100 ;
var contTimer = true ;
let x = 0 ;

const imageDir = 'images/' ;



prevButtonEl.addEventListener("click",()=>{
    x = x + 45 ;
    contTimer = false ;
    updateGallery(x) ;
});

nextButtonEl.addEventListener("click",()=>{
    x = x - 45 ;
    updateGallery(x) ;
    contTimer = false ;
});

reloadEl.addEventListener("click",()=>{
    loadImages () ;
}) ;

function loadImages(){
    console.log(imageDir) ;
    const fs = require(['fs']) ;
    
    fs.readdir(imageDir, (err, files)) ;
    imageContainerEl.innerHTML="" ;
    let newHtml ="" ;
    for (let i=1; i<9; i++) {
        let index = Math.floor(Math.random() * files.length) ;
        let imfile = index+files[index];
        newHtml += `<span style="--i: ${index}">
                    <img src="${imfiles}" alt="">
                    </span>`   
        

    }
    imageContainerEl.innerHTML = newHtml ;

}

let interfuncId ;
function startRotate() {
    interfuncId = setInterval (()=>{
    x = x - 1 ;
    updateGallery (x) ;
    if (!contTimer){
        clearInterval (interfuncId);
    }
    },timerInc); 
}


function updateGallery (x){
    imageContainerEl.style.transform = 
    `perspective(1000px) rotateY(${x}deg)` ;
}

rotateButtonEl.addEventListener("click",()=>{
    var clist = rotateButtonEl.classList ;
    console.log(clist);
    if (clist.contains ("spin")){
        contTimer = false ;
        rotateButtonEl.innerText ='Rotate'  ;
        rotateButtonEl.classList.remove('spin');
    }
    else {
        console.log("in rotate") ;
        contTimer = true ;
        startRotate() ;
        rotateButtonEl.innerText='Stop Rotating' ;
        rotateButtonEl.classList.add('spin');
    }
    
});
