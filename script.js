const canvas = document.getElementById('render');

let instances = 50;

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
    init();
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
    for(let i = 0; i <800;i++){
        let rad = (Math.random()*4) +1;
        let x = (Math.random() * (window.innerWidth - (2 * rad))) + rad;
        let y = (Math.random() * (window.innerHeight - (2 * rad))) + rad;
        let dx = Math.random() > 0.5 ? -1 - (Math.random() * 1): 1 + (Math.random() * 1);
        let dy = Math.random() > 0.5 ? -1 - (Math.random() * 1): 1 + (Math.random() * 1);
        circleArray.push(new Circle(x,y,dx,dy,rad))
    }
}
init();

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    //testCircle.update(); //this works

    circleArray.forEach((circle)=>{
        circle.update();
    })

}
animate();

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