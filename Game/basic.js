
window.addEventListener('keydown',function (event){
    if(event.keyCode==32&&GAMING)
    {
        // cancelAnimationFrame(stop);
        clearInterval(stop);
    GAMING=false;
    }
    else if(event.keyCode==32){
        // this.requestAnimationFrame(repeat);
    stop=this.setInterval(repeat,10);
        GAMING=true;}
});

window.addEventListener('keydown',function (event){
    if((event.keyCode==37||event.keyCode==65)){
        move=-5;
    }

     if(event.keyCode==39||event.keyCode==68){
    move=5;  
    }
    
});

window.addEventListener('keyup',function (event){
    if(event.keyCode==37||event.keyCode==65&&move<0){
        move=0;
    }

     if(event.keyCode==39||event.keyCode==68&&move>0){
    move=0;  
    }
});

window.addEventListener('keydown',function (event){
    if(event.keyCode==38)
    fire();
});

function Dist(A,B)
{
    return(Math.sqrt(Math.pow(A.x-B.x,2)+Math.pow(A.y-B.y,2)));
} 

function collisionC(c1,c2)
{
    return(Dist(c1,c2)<=c1.radius+c2.radius);
}
function collisionR(c1,r1)
{
    if(c1.x-c1.radius<=r1.x+r1.w&&c1.x+c1.radius>=r1.x&&c1.y-c1.radius<=r1.y+r1.h&&c1.y+c1.radius>=r1.y)
    return(true);
    else return(false);
}
function collisionRR(rect1,rect2)
{
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) return(true);
        else return(false);
     
}

function fire(){ var date=new Date();
    if(!GAMING)return;
    
        fireRate=0;
        oldTime=date.getTime;
            for(var j=0;j<X.length;j++){
        if( X[j].onScreen==true){break;}
    }
   X.splice(0,j);

   var A=new IMAGE('BULLET.jpg',shoot.x+shoot.w*0.5-30*(Math.random()-0.5),shoot.y+6*(Math.random()-0.5)-15,8,30,8);
var slow=50;
for(var i=0;i<X.length;i++){
    if(slow==0)break;
if(collisionRR(A,X[i]))
{
 A=new IMAGE('BULLET.jpg',shoot.x+shoot.w*0.5-30*(Math.random()-0.5),shoot.y+6*(Math.random()-0.5)-15,8,30,8);
 slow--;
 i=-1;
}

}
X.push(A);

// X.push(new Circle(shoot.x+shoot.w*0.5,shoot.y,0,9,5));
// console.log(X);

}

function IMAGE(img,x,y,w,h,dy)
{   this.src=img;
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    if(!dy)this.dy=0;
    else this.dy=-dy;
    this.pic=new Image();
    this.onScreen=true;
    this.update=function(){

if(X.length){
        for(var i=0;i<object.length;i++){   
            for(var j=0;j<X.length;j++){
            if(collisionR(object[i],X[j]))
            {   
    // alert('came');

                 if(object[i].score>0)
               { 
                   X.splice(j,1);  
                   
                    object[i].score--;
                object[i].on=true;
object[i].color='rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
                
                }

                else
                {
                    object[i].src='';
                object.splice(i,1);
                // i=-1;
            } }
                // else{object[i].on=false;}
            }}}

            if(!X.length)
                   {for(var i=0;i<object.length;i++)
                {object[i].on=false;}}
            this.draw();  
    }

    this.draw=function(){
this.y+=this.dy;
        if(this.y+this.h<0)
    this.onScreen=false;

        this.pic.src=this.src;
        ctx.drawImage(this.pic,this.x,this.y,this.w,this.h);}
}
  

function Circle(x,y,dx,dy,r)
{this.x=x;
    this.dx=dx;
    this.y=y;
    this.dy=-dy;
this.radius=r;
this.beating=false;
this.counter=0;
this.on=false;
this.score=Math.round(Math.random())*100+100;
this.color='rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
this.onScreen=true;//helps to delete the bullets which are not in the screen and hence maintain the speed of gameplay

this.update=function(){
    if(this.x-this.radius+ this.dx<=0||this.x+this.radius+ this.dx>=canvas.width)
    this.dx=-this.dx;
    if(this.y-this.radius+ this.dy<=0||this.y+this.radius+this.dy>=500)
    this.dy=-this.dy;
   
    this.draw();}

this.draw=function(){

if(this.y+this.radius<0)
this.onScreen=false;

this.x+=this.dx;
    this.y+=this.dy;

// if(this.beating)
// {this.counter--;
// if(this.counter==0)
// {
// this.radius=this.radius+10;
// }
// else this.radius=50;
// }
ctx.font='bold 18px Arial'

if(this.on){
    // alert('came1');
if(this.counter == 25) {
    if(!this.beating) {
       this.radius-=5;
        this.beating = true;
        this.counter = 0;
        ctx.font='bold 18px Arial'

    }
    else{
        this.radius+=5;
        this.beating = false;
        this.counter = 0;
        ctx.font='bold 22px Arial'

    }
}
this.counter++;
}

        ctx.fillStyle=this.color;
ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.fill();
ctx.stroke();
ctx.closePath();
ctx.save();
ctx.textAlign='center';

ctx.fillStyle='white';
ctx.fillText(this.score,this.x,this.y+5);}
ctx.restore();
    // console.log('comes');}
}


function Shooter(x,y,w,h)
{
    this.x=x;
    this.y=y;
    this.dx=move;
this.w=w;
this.h=h;
this.color='blue';

this.update=function(){
    this.dx=move;
    if(this.x+this.dx<0||this.x+this.w+this.dx>canvas.width)
    { 
    this.dx=0;
    move=0;
    }
    this.x+=this.dx;
  
    this.draw();
}

this.draw=function(){
    ctx.fillStyle=this.color;
ctx.beginPath();
    ctx.fillRect(this.x,this.y,this.w,this.h);
ctx.stroke();
ctx.closePath();
    // console.log('comes');}
}}


var canvas=document.getElementById('canvas');
canvas.width=window.innerWidth-500;
canvas.height=window.innerHeight/1.13;
var ctx=canvas.getContext('2d');
var GAMING=true;
var stop;
var move=0;
var X=[];
var fireRate=0;
var oldTime=0;
bg=new IMAGE('background.jpg',0,0,window.innerWidth,500);
    brick=new IMAGE('brick.jpg',0,490,window.innerWidth,window.innerHeight);
    rock=new IMAGE('rocknew2.jpg',100,100,60,60);


// var bullet=new Circle(450,450,-2,2,35);
var object=[];
object.push(new Circle(100,100,0,0,30));
object.push(new Circle(300,100,0,0,30));
object.push(new Circle(500,100,0,0,30));
object.push(new Circle(100,300,0,0,30));
object.push(new Circle(300,200,0,0,30));
object.push(new Circle(400,400,0,0,30));
object.push(new Circle(100,600,0,0,30));

var shoot=new Shooter(canvas.width*0.5-40,470,80,20);

function repeat(){
// {stop=requestAnimationFrame(repeat);
      ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.beginPath();  

bg.draw();
brick.draw();

shoot.update();
// ctx.globalAlpha = 0.87;

fireRate++;

for(var j=0;j<X.length;j++)
{
X[j].update();}

// if(!collisionC(bullet,object))
for(var j=0;j<object.length;j++)
{
object[j].update();}

}

stop=setInterval(repeat,20); 