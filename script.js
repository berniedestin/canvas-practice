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
class Circle{
    constructor(x,y,dx,dy,rad){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.rad = rad;
        // pre-set properties
        this.isDirectionChanged = false;
        this.fillColorR = Math.random() * 255;
        this.fillColorG = Math.random() * 255;
        this.fillColorB = Math.random() * 255;
        this.fillColorA = Math.random();
        this.strokeColorR = Math.random() * 255;
        this.strokeColorG = Math.random() * 255;
        this.strokeColorB = Math.random() * 255;
        
    }
    draw(){
        context.beginPath();
        context.arc(this.x,this.y, this.rad, 0, Math.PI *2,true);
        if(this.isDirectionChanged){
            this.fillColorR = Math.random() * 255;
            this.fillColorG = Math.random() * 255;
            this.fillColorB = Math.random() * 255;
            this.strokeColorR = Math.random() * 255;
            this.strokeColorG = Math.random() * 255;
            this.strokeColorB = Math.random() * 255;
            this.isDirectionChanged = false;
        }
        context.fillStyle = `rgba(${this.fillColorR},${this.fillColorG},${this.fillColorB},${this.fillColorA})`;
        context.fill();
        context.strokeStyle = `rgba(${this.strokeColorR},${this.strokeColorG},${this.strokeColorB},1)`;
        context.stroke();
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
    }

}

let testCircle = new Circle(300,900,5,5,30);


// let x = 300;
// let dx = 5;
// let y = 300;
// let dy = 5;
// let rad = 30;
// let isDirectionChanged = false;

// let fillColorR = Math.random() * 255;
// let fillColorG = Math.random() * 255;
// let fillColorB = Math.random() * 255;
// let strokeColorR = Math.random() * 255;
// let strokeColorG = Math.random() * 255;
// let strokeColorB = Math.random() * 255;

let circleArray = [];
for(let i = 0; i <50;i++){
    let rad = (Math.random()*30) +30;
    let x = (Math.random() * (window.innerWidth - (2 * rad))) + rad;
    let y = (Math.random() * (window.innerHeight - (2 * rad))) + rad;
    let dx = Math.random() > 0.5 ? -3 - (Math.random() * 3): 3 + (Math.random() * 3);
    let dy = Math.random() > 0.5 ? -3 - (Math.random() * 3): 3 + (Math.random() * 3);
    circleArray.push(new Circle(x,y,dx,dy,rad))
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    //testCircle.update(); //this works

    circleArray.forEach((circle)=>{
        circle.update();
    })

    // context.beginPath();
    // context.arc(x,y, rad, 0, Math.PI *2,true);
    // if(isDirectionChanged){
    //     fillColorR = Math.random() * 255;
    //     fillColorG = Math.random() * 255;
    //     fillColorB = Math.random() * 255;
    //     strokeColorR = Math.random() * 255;
    //     strokeColorG = Math.random() * 255;
    //     strokeColorB = Math.random() * 255;
    //     isDirectionChanged = false;
    // }
    // context.fillStyle = `rgba(${fillColorR},${fillColorG},${fillColorB},1)`;
    // context.fill();
    // context.strokeStyle = `rgba(${strokeColorR},${strokeColorG},${strokeColorB},1)`;
    // context.stroke();

    // if(x >= window.innerWidth - rad || x <= rad){
    //     dx = dx * -1;
    //     isDirectionChanged = true;
    // }else if(y >= window.innerHeight - rad || y <= rad ){
    //     dy = dy * -1;
    //     isDirectionChanged = true;
    // }
    // x += dx;
    // y += dy;
}
//animate();

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