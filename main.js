var canvas =document.getElementById('myCanvas');
//自动调节尺寸
autoSizeAdapt()
var context = canvas.getContext('2d');  
var eraser = document.getElementById('eraser');
//用户操作
Use(eraser.context);
//函数
function Use(){
  var painting=false; 
  var eraserOn=false;
  eraser.onclick=function(){
  eraserOn=true;
  switch1.className='off';
  }
  brush.onclick=function(){
  eraserOn=false;
  switch1.className ='on';
  }
  if(document.body.ontouchstart!==undefined){
    canvas.ontouchstart=function(start){
     
      var x=start.touches[0].clientX;
      var y=start.touches[0].clientY;
      console.log(x,y)
      painting=true;
      if(painting){
        if(eraserOn){
        context.clearRect(x-3,y-3,6,6)
        }
        else{
        lastPosition={"x":x,"y":y};
        drawCircle(x,y,1); 
        console.log('1')
        }
      }
    }
    canvas.ontouchmove=function(move){
      var x=move.touches[0].clientX;
      var y=move.touches[0].clientY;
      if(painting){
        if(eraserOn){
        context.clearRect(x-3,y-3,6,6)
        }
        else{
        var newPosition={"x":x,"y":y} 
        drawLine(lastPosition.x,lastPosition.y,newPosition.x,newPosition.y)
        lastPosition = newPosition;
        }
      }
    }
    canvas.ontouchend=function(end){
      painting=false;
    }
  }else{
    canvas.onmousedown=function(down){ 
      var x=down.clientX;
      var y=down.clientY;
      painting=true;
      if(painting){
        if(eraserOn){
        context.clearRect(x-3,y-3,6,6)
        }
        else{
        lastPosition={"x":x,"y":y};
        drawCircle(x,y,1); 
        }
      }
    }
    canvas.onmousemove=function(move){
      var x=move.clientX;
      var y=move.clientY;
      if(painting){
        if(eraserOn){
        context.clearRect(x-3,y-3,6,6)
        }
        else{
        var newPosition={"x":x,"y":y} 
        drawLine(lastPosition.x,lastPosition.y,newPosition.x,newPosition.y)
        lastPosition = newPosition;
        }
      }
    }
    canvas.onmouseup=function(up){
      painting=false;
    }
  }
}

function drawCircle(x,y,radius){
  context.beginPath();
  context.fillStyle='black';
  context.arc(x,y,radius,0,Math.PI*2);
  context.stroke();
}
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.lineWidth=4;
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.stroke();
}
function sizeAdapt(){
  var pageWidth=document.documentElement.clientWidth
  var pageHeight=document.documentElement.clientHeight
  canvas.width=pageWidth
  canvas.height=pageHeight
}
function autoSizeAdapt(){
  sizeAdapt()
  window.onresize=function(){sizeAdapt();}
}
