let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let btns=["red","green","yellow","blue"];

let h2=document.querySelector("h2");
let score=document.querySelector("#score");
let highScore=0;



document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game started");
        started=true;

        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function levelUp(){
    level++;
    userSeq=[];
    h2.innerText=`Level ${level}`

    //choose random button
    let randInd=Math.floor(Math.random()*btns.length);
    let randBtn=btns[randInd];
    let btn=document.querySelector(`.${randBtn}`)
    btnFlash(btn);
    gameSeq.push(randBtn);
    console.log(gameSeq);
}


function checkSeq(idx){
    if(gameSeq[idx]===userSeq[idx]){
        // console.log("correct");
        if(gameSeq.length==userSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`Game Over..!! Your score is <b>${level}</b> <br> Press any Key to start again..!!`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="rgb(62, 84, 124)";
        },150);
        if(level>highScore){
            highScore=level;
            score.innerText=`High Score: ${level}`;
        }
        reset();
    }
}

function buttonPressed(){
    // console.log("Button was Pressed");
    let btn=this;

    btnFlash(btn);
    let color=btn.getAttribute("id");
    userSeq.push(color);
    checkSeq(userSeq.length-1); 
}

allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",buttonPressed);
}

function reset(){
    started=false;
    userSeq=[];
    gameSeq=[];
    level=0;
}