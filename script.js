const canvas = document.getElementById("jogoCanvas")
const ctx = canvas.getContext('2d')

let gameEnded = false;
document.getElementById("highscore").innerHTML = localStorage.getItem("highscore")
function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
let pontuacao = 0;
const pontuacaodiv = document.getElementById("pontuacao")
const personagem1 = {
    x: 100,
    y: 300,
    width: 50,
    height: 50,
    color: "red",
    velocidadeY: 0,
    velocidadeX: 0,
    moveX: 0,
    canJump: false,
    colide:true,
    loop: (personagem)=>{}
}


/*
const cactus1 = {
    x: canvas.width+600,
    width: 50,
    height: 100,
    y: canvas.height - 100,
    color: "green",
    velocidadeY: 0,
    velocidadeX: 0,
    moveX: -0.2,
    canJump: false,
    colide:false,
    intimeout: false,
    loop: (personagem)=>{
        personagem.moveX-=0.0001
        console.log(personagem.moveX)
        if (personagem.x<=-personagem.width && personagem.intimeout==false){
            personagem.intimeout = true
                let randomTimeout= Math.floor(Math.random()*2000)
                let randomMargin = Math.floor(Math.random()*1000)
                console.log(randomTimeout)
                setTimeout(function (){
                    personagem.intimeout = false
                    personagem.x=canvas.width+randomMargin
                }, randomTimeout)
        }
    }
}


const cactus2 = {
    x: canvas.width,
    width: 50,
    height: 100,
    y: canvas.height - 100,
    color: "green",
    velocidadeY: 0,
    velocidadeX: 0,
    moveX: -0.2,
    canJump: false,
    colide:false,
    intimeout: false,
    loop: (personagem)=>{
        personagem.moveX-=0.0001
        console.log(personagem.moveX)
        if (personagem.x<=-personagem.width && personagem.intimeout==false){
            personagem.intimeout = true
                let randomTimeout= Math.floor(Math.random()*1500)
                let randomMargin = Math.floor(Math.random()*2000)
                console.log(randomTimeout)
                setTimeout(function (){
                    personagem.intimeout = false
                    personagem.x=canvas.width+randomMargin
                }, randomTimeout)
        }
    }
}


const cactus = {
    x: canvas.width,
    width: 50,
    height: 50,
    y: canvas.height - 50,
    color: "green",
    velocidadeY: 0,
    velocidadeX: 0,
    moveX: -0.2,
    canJump: false,
    colide:false,
    intimeout: false,
    loop: (personagem)=>{
        personagem.moveX-=0.0001
        console.log(personagem.moveX)
        if (personagem.x<=-personagem.width && personagem.intimeout==false){
            personagem.intimeout = true
                let randomTimeout= Math.floor(Math.random()*1000)
                let randomMargin = Math.floor(Math.random()*3000)
                console.log(randomTimeout)
                setTimeout(function (){
                    personagem.intimeout = false
                    personagem.x=canvas.width+randomMargin
                }, randomTimeout)
        }
    }
}
*/
const gravidade = -0.5;
const velocidadeGeral = 15;

document.addEventListener('keypress', (e) => {
    personagem1.moveX = 0;
    if (e.key === " " && personagem1.canJump) {
        personagem1.velocidadeY = -15;
        personagem1.canJump = false;
    }
    if (e.key === "a") {
        personagem1.moveX = -1;
    } else if (e.key === "d") {
        personagem1.moveX = 1;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === "a" && personagem1.moveX === -1) {
        console.log("a");
        personagem1.moveX = 0;
    } else if (e.key === "d" && personagem1.moveX === 1) {
        console.log("d");
        personagem1.moveX = 0;
    }
});

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharPersonagem(personagem) {
    ctx.fillStyle = personagem.color;
    ctx.fillRect(personagem.x, personagem.y, personagem.width, personagem.height);
}


let cactusArr = []
let howManyCactus = 4;

for (let i = 0;i<howManyCactus;i++){
    const randomHeight = 50+Math.floor(Math.random()*50)
    const fixMargin = Math.floor(Math.random(200))
    const cactus = {
        x: canvas.width+Math.floor(Math.random()*20)+i*2000,
        width: 50,
        height: randomHeight,
        y: canvas.height - randomHeight,
        color: "green",
        velocidadeY: 0,
        velocidadeX: 0,
        moveX: -0.2,
        canJump: false,
        colide:false,
        intimeout: false,
        marginFix: fixMargin,
        loop: (personagem)=>{
            personagem.moveX-=0.0001
            console.log(personagem.moveX)
            if (personagem.x<=-personagem.width && personagem.intimeout==false){
                personagem.intimeout = true
                    let randomTimeout= Math.floor(Math.random()*100)
                    let randomMargin = Math.floor(Math.random()*100)+500
                    console.log(randomTimeout)
                    setTimeout(function (){
                        personagem.intimeout = false
                        personagem.x=canvas.width+randomMargin
                    }, randomTimeout)
            }
        }
    }
    cactusArr.push(cactus)
}

function updateCactus(){
    for (let i=0;i<cactusArr.length;i++){
        updateCharacter(cactusArr[i])

    }
}

function updateCharacter(personagem) {
    personagem.velocidadeX = personagem.moveX * velocidadeGeral;
    personagem.x += personagem.velocidadeX;
    
    personagem.loop(personagem)
    if (personagem.colide){
    
        personagem.velocidadeY -= gravidade;
        personagem.y += personagem.velocidadeY;
    
        if (personagem.x < 0) {
            personagem.x = 0;
        }
        if (personagem.x + personagem.width > canvas.width) {
            personagem.x = canvas.width - personagem.width;
        }

        if (personagem.y + personagem.height > canvas.height) {
            personagem.y = canvas.height - personagem.height;
            personagem.velocidadeY = 0;
            personagem.canJump = true;
        }
    }

    desenharPersonagem(personagem);
}


function loop() {
    clear();
    pontuacao+=1
    pontuacaodiv.innerHTML = pontuacao

    updateCharacter(personagem1);
    updateCactus();

    if (!gameEnded){
        requestAnimationFrame(loop);
    } else {
        alert("GAME OVER")
        window.location.reload()
    }
    for (let i = 0; i<cactusArr.length;i++){
        if (isCollide(cactusArr[i], personagem1)){
            console.log("tru")
            gameEnded = true
            if (localStorage.getItem("highscore")==null){
                localStorage.setItem("highscore", pontuacao)
            } else if (localStorage.getItem("highscore")<pontuacao){
                localStorage.setItem("highscore", pontuacao)
            }
            console.log(localStorage.getItem("highscore"))

        }
    }
}

loop();





