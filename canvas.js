var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

var gravidade = 0.2;
var atrito = 0.87;

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

addEventListener("click", function(event){
    init();
})


var cor = [
    '#ffaa33',
    '#99ffaaa',
    '#00ff00', 
    '#4411aa',
    '#ff1100',
]



function Bola(x, y, velox, veloy,radius){
    this.x = x;
    this.y = y;
    this.velox = velox;
    this.veloy = veloy;
    this.radius= radius;
    this.color = cor[Math.floor(Math.random()* cor.length)];
    
    this.update = function() {
       
        if (this.y + this.radius + this.veloy > canvas.height){
            this.veloy =-this.veloy;
            this.veloy= this.veloy * atrito;
            this.velox = -this.velox * atrito;
        }else {
            this.veloy+=gravidade;
        } 
        if (this.x + this.radius > canvas.width || this.x - this.radius <= 0 ){
            this.velox = -this.velox * atrito;
        }
        this.x+=this.velox;
        this.y+=this.veloy;
        this.draw();
    }
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); 
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
};



bolaArray=[];
function init(){
    bolaArray =[];
    for(var i =0; i < 400; i++){
    var x = Math.random()*(innerWidth - radius *2) + radius;
    var y = Math.random()*(innerHeight - radius *2) + radius;
    var velox = (Math.random() - 0.5)*8;
    var veloy = (Math.random() - 0.5)*8;
    var radius = 15;
    bolaArray.push(new Bola(x,y,velox,veloy,radius));
}
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    for(var i =0; i < bolaArray.length; i++){
        bolaArray[i].update();
    }   
}
init();
animate();





