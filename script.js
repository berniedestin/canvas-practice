const canvas = document.getElementById('render');
const orbsGrowBtn = document.getElementById('orbsGrow');
const modalTest = document.getElementById('modalTest');
// const mainDisplay = document.getElementById('mainDisplay');

// mainDisplay.width = '100vh';
// mainDisplay.height = '100vh';
let showOrbsGrow = false;



let instances = 50; //used by old functions down below


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');

// // rectangles
// context.fillStyle = 'rgba(40,40,200,0.1)'
// context.fillRect(100,100,100,100);
// context.fillRect(300,100,200,200);

// // lines/paths
// context.beginPath();
// context.moveTo(100,300);
// context.strokeStyle = 'blue';
// context.lineTo(500,50);
// context.stroke(); 

// // arcs/circles
// context.beginPath();
// context.arc(300,300, 30, 0, Math.PI *2,true);
// context.fillStyle = 'pink';
// context.fill();
// context.strokeStyle = 'red';
// context.stroke();

let colorPallet = [
    '#A08ED1',
    '#D1AF8E',
    '#6AB871',
    '#553F91',
    '#0F5215'
];
let maxRadius = 50;

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gravRender.width = window.innerWidth;
    gravRender.height = window.innerHeight;
    sinRender.width = window.innerWidth;
    sinRender.height = window.innerHeight;
    init();
    initBounce();
});

orbsGrowBtn.addEventListener('click',()=>{
    if(showOrbsGrow){
        canvas.style.display = 'none';
        orbsGrowBtn.innerText = 'Show Orbs Grow on Hover';
    }else{
        canvas.style.display = 'block';
        orbsGrowBtn.innerText = 'Hide Orbs Grow on Hover';
    }
    showOrbsGrow = !showOrbsGrow;
    modalTest.close();
});

class Circle{
    constructor(x,y,dx,dy,rad){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.rad = rad;
        this.minRadius = rad;
        
        // pre-set properties
        this.isDirectionChanged = false;
        this.fillColor = colorPallet[Math.floor(Math.random()*colorPallet.length)];
        
    }
    draw(){
        context.beginPath();
        context.arc(this.x,this.y, this.rad, 0, Math.PI *2,true);
        if(this.isDirectionChanged){
            // some code here when direction changes
            this.isDirectionChanged = false;
        }
        context.fillStyle = this.fillColor;
        context.fill();
    
    }
    update(){
        if(this.x >= window.innerWidth - this.rad || this.x <= this.rad){
            this.dx = this.dx * -1;
            this.isDirectionChanged = true;
        }
        if(this.y >= window.innerHeight - this.rad || this.y <= this.rad ){
            this.dy = this.dy * -1;
            this.isDirectionChanged = true;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50 &&
            this.rad < maxRadius){
            this.rad += 1;
        }else if(this.rad > this.minRadius){
            this.rad -= 1;
        }
    }

}




let circleArray = [];
function init(){
    circleArray = [];
    for(let i = 0; i <1000;i++){
        let rad = (Math.random()*4) +1;
        let x = (Math.random() * (window.innerWidth - (2 * rad))) + rad;
        let y = (Math.random() * (window.innerHeight - (2 * rad))) + rad;
        let dx = Math.random() > 0.5 ? -1 - (Math.random() * 1): 1 + (Math.random() * 1);
        let dy = Math.random() > 0.5 ? -1 - (Math.random() * 1): 1 + (Math.random() * 1);
        circleArray.push(new Circle(x,y,dx,dy,rad))
    }
}
init();

function animateOrbsGrow(){
    requestAnimationFrame(animateOrbsGrow);
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    //testCircle.update(); //this works

    circleArray.forEach((circle)=>{
        circle.update();
    })

    

}

//animateOrbsGrow();

// function main(){
//     if(showOrbsGrow){
//         animateOrbsGrow();
//     }
// }

// main();
// **********************************************************************************
// gravity

const gravRender = document.getElementById('gravRender');
gravRender.width = window.innerWidth;
gravRender.height = window.innerHeight;
const gravContext = gravRender.getContext('2d');
const gravBtn = document.getElementById('grav');
let showBoucyBalls = false;
const gravity = .9;
gravBtn.addEventListener('click', ()=>{
    if(showBoucyBalls){
        gravRender.style.display = 'none';
        gravBtn.innerText = 'Show Bouncy Balls';
    }else{
        gravRender.style.display = 'block';
        gravBtn.innerText = 'Hide Bouncy Balls';
    }
    showBoucyBalls = !showBoucyBalls;
    modalTest.close();

});
class Ball{
    constructor(x,y,dx,dy,rad){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.rad = rad;
        
        // pre-set properties
        this.isDirectionChanged = false;
        this.fillColor = colorPallet[Math.floor(Math.random()*colorPallet.length)];

    }
    draw(){
        gravContext.beginPath();
        gravContext.arc(this.x,this.y, this.rad, 0, Math.PI *2,true);
        if(this.isDirectionChanged){
            // some code here when direction changes
            this.isDirectionChanged = false;
        }
        gravContext.fillStyle = this.fillColor;
        gravContext.fill();
    
    }
    update(){
        if(this.x >= window.innerWidth - this.rad || this.x <= this.rad){
            this.dx = this.dx * -1;
            this.isDirectionChanged = true;
        }
        if(this.y >= window.innerHeight - this.rad - this.dy || this.y <= this.rad ){
            this.dy = this.dy * -1 * .9;
            this.isDirectionChanged = true;
        }else {
            this.dy += gravity;
        }
        if(this.dy > .01 || this.dy < -.01){
            this.x += this.dx;
        }
        this.y += this.dy;
        this.draw();

    }

}
let clickLocation = {
    x: window.innerWidth * .5,
    y: window.innerHeight * .2
}
let ballArray = [];
function initBounce(){
    ballArray = [];
    for(let i = 0; i < 50; i++){
        let rad = (Math.random()*20) +10;
        let x = clickLocation.x;
        let y = clickLocation.y;     
        let dx = Math.random() > 0.5 ? -1 - (Math.random() * 3): 1 + (Math.random() * 3);
        let dy = Math.random() > 0.5 ? -1 - (Math.random() * 3): 1 + (Math.random() * 3);
        ballArray.push(new Ball(x,y,dx,dy,rad));
        
    }

}
initBounce();

window.addEventListener('click',(event)=>{
    clickLocation.x = event.x;
    clickLocation.y = event.y;
    initBounce();

})
function animateBounce(){
    requestAnimationFrame(animateBounce);
    gravContext.clearRect(0,0,window.innerWidth,window.innerHeight);

    ballArray.forEach((ball)=>{
        ball.update();
    })

}
//animateBounce();
// **********************************************************************************
// sin waves

const sinRender = document.getElementById('sinRender');
sinRender.width = window.innerWidth;
sinRender.height = window.innerHeight;
const sinContext = sinRender.getContext('2d');
const sinBtn = document.getElementById('sin');
let showSinWave = false;
sinBtn.addEventListener('click',()=>{
    if(showSinWave){
        sinRender.style.display = 'none';
        sinBtn.innerText = 'Show Sin Wave';
    }else{
        sinRender.style.display = 'block';
        sinBtn.innerText = 'Hide Sin Wave';
    }
    showSinWave = !showSinWave;
    modalTest.close();

});


class SinWave{
    constructor(x,y, length, amplitude, frequency){
        this.x = x;
        this.y = y;
        this.length = length;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.increment = frequency;
        // color = rgb(244, 231, 219)
        // colorWopacity = rgba(244, 231, 219, 0.1)

    }
    draw(){
        sinContext.beginPath();
        sinContext.moveTo(0,x);
        for(let i = 0; i <= sinRender.width; i++ ){
            sinContext.lineTo(i, Math.sin(i * this.length + this.increment) * this.amplitude);
        }
        sinContext.stroke();

    }
    update(){
        this.increment += this.frequency;
        this.draw();
    }
}
let sinWave = new SinWave();



// **********************************************************************************
function animate(){
    requestAnimationFrame(animate);
    if(showOrbsGrow){
        context.clearRect(0,0,window.innerWidth,window.innerHeight);
        //testCircle.update(); //this works

        circleArray.forEach((circle)=>{
            circle.update();
        });
    }
    if(showBoucyBalls){
        gravContext.clearRect(0,0,window.innerWidth,window.innerHeight);

        ballArray.forEach((ball)=>{
            ball.update();
        });
        // for(let i = 0; i < number; i++){
        //     context.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()})`;
        //     context.fillRect(Math.random() * window.innerWidth,Math.random() * window.innerHeight,Math.random() * size,Math.random() * size);
        // }
    
    }
    if(showSinWave){
        sinContext.fillStyle = rgba(244, 231, 219, 0.1);
        sinContext.fillRect(0,0,sinRender.width, sinRender.height);
        sinWave.update();
    }
    

}

animate();




// **********************************************************************************
// General animate??


// **********************************************************************************
function drawCircles(number, size){

    for(let i = 0; i < number; i++){
        context.beginPath();
        context.arc(Math.random() * window.innerWidth,Math.random() * window.innerHeight, Math.random() * size, 0, Math.PI *2,true);
        context.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()})`;
        context.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()})`;
        context.fill();
        context.stroke();
    }
    
}



function drawRectangles(number, size){
    for(let i = 0; i < number; i++){
        context.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()})`;
        context.fillRect(Math.random() * window.innerWidth,Math.random() * window.innerHeight,Math.random() * size,Math.random() * size);
    }
}

function drawPaths(number, isConnected){
    if(isConnected){
        context.beginPath();
        context.moveTo(Math.random() * window.innerWidth,Math.random() * window.innerHeight);
    }
    
    for(let i = 0; i < number; i++){
        if(!isConnected){
            context.beginPath();
            context.moveTo(Math.random() * window.innerWidth,Math.random() * window.innerHeight);
        }
        context.lineTo(Math.random() * window.innerWidth,Math.random() * window.innerHeight);
        context.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()})`;
        context.stroke(); 
    }
}


// drawCircles(instances, 100)
// drawRectangles(instances,100)
// drawPaths(instances, false)