var canvas =document.getElementById('myCanvas');
//自动调节尺寸
autoSizeAdapt()
var context = canvas.getContext('2d');  
var eraser = document.getElementById('eraser');
//用户操作
red.onclick=function(){
  context.fillStyle='red';
  context.strokeStyle='red';
  red.classList.add('active');
  green.classList.remove('active');
  yellow.classList.remove('active');
}
green.onclick=function(){
  context.fillStyle='green';
  context.strokeStyle='green';
  green.classList.add('active');
  red.classList.remove('active');
  yellow.classList.remove('active');
}
yellow.onclick=function(){
  context.fillStyle='yellow';
  context.strokeStyle='yellow'
  yellow.classList.add('active');
  green.classList.remove('active');
  red.classList.remove('active');
}
clear.onclick=function(){
  context.clearRect(0, 0, canvas.width, canvas.height)
}
download.onclick=function(){
  var url = canvas.toDataURL("img/png");
  console.log(url)
  var a = document.createElement('a');
  a.href = url;
  a.download = '作品';
  a.click();
}
Use(eraser.context);
//函数
function Use(){
  var painting=false; 
  var eraserOn=false;
  eraser.onclick=function(){
  eraserOn=true;
  eraser.classList.add('active');
  brush.classList.remove('active')
  }
  brush.onclick=function(){
  eraserOn=false;
  brush.classList.add('active');
  eraser.classList.remove('active')
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
  context.lineWidth=2;
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
