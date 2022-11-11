const imageContainerEl = document.querySelector(".image-container") ;
const prevButtonEl = document.getElementById("prev");
const nextButtonEl = document.getElementById("next");
const rotateButtonEl = document.getElementById("rotate") ;
const reloadEl = document.querySelector('#reload') ;
var timerInc = 100 ;
var contTimer = true ;
var imageArr=[] ;
let x = 0 ;

const imageDir = 'images/' ;

addEventListener('DOMContentLoaded',(event)=>{
    $ajaxUtils.sendGetRequest(imageDir+'filelist.txt', function(responseText){
        var lines = responseText.split('\n');
        lines.forEach(function(l){
            imageArr.push(l) ;
        }
        );
    },false);
}) ;

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
    imageContainerEl.innerHTML="" ;
    let newHtml ="" ;
    for (let ival=1; ival<9; ival++) {
        let index = Math.floor(Math.random() * (imageArr.length-1)) ;
        let imfile = imageDir+imageArr[index];
        newHtml += `<span style="--i: ${ival}">
                    <img src="${imfile}" alt="">
                    </span>`   
        

    }
    console.log(newHtml) ;
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
