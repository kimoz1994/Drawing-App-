$(function(){
    
    
    
    
//    //definning a variable to get canvas element
//    var canvas = document.getElementById("paint");
//    //getting the 2d context from our canvas using the getcontext method
//    var context = canvas.getContext("2d");
//   
//{                  quick lesson on how to use canvas.
//    
//    //draw a line
//    //declare a new path
//    
//    context.beginPath();
//    
//    //set line width
//    context.lineWidth = 40;
//    //set color of the line
//    
//    context.strokeStyle = '#5ed920';
//    
//    //set cap to the line (round,butt,square)
//    context.lineCap = "round"; 
//    //set line join style (bevel,round,miter)
//    context.lineJoin = "round";
//    //position the context poin(start point)
//    context.moveTo(50,50);
//    
//    //draw a straight line from the starting position to a new position
//    context.lineTo(200,200);
//    // drawing another line
//    context.lineTo(400,100);
//    //make line visible
//    
//    context.stroke();
//    
// 
// 
//}
//    
    
    //some noted for the user
    
    
    window.alert("one:when you are drawing or erasing keep the mouse movment inside the drawing area. two: to go to erasing mode click the erase button, to go back to drawing mode click on erase button again. three:to save you drawing in browser click the save button. ENJOY!!!!");
    
     
                   // starting from here is the logic of our app
    
    
//    defining important variables
    
    
    //at the start we are not painting nor erasing 
 var paint = false;
 
    //we are going to start painting first, and then this next variable can be changed to erasing
 var paint_erase = "paint";
 
 //get our canvas element
 
    var canvas = document.getElementById("paint");
 
//get the 2d context from our canvas element    
 
    var ctx = canvas.getContext("2d");
 
//get the canvas conteainer    
 
    var container = $("#container");
  
    //get mouse position
 
 var mouse = { x: 0 , y:0};   
    
    //variable to use after loading the page to load the saved work(or canvas)
    
    if( localStorage.getItem("imagecanvas") != null){
        
       var img = new Image();
        
        img.onload = function(){
            
            ctx.drawImage(img,0,0);
            
            
        };
        
        img.src = localStorage.getItem("imagecanvas");
        
        
        
    }    
    
    //setting drawing parameters(linewidth,linejoin,lnecap) for the context
    
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
 
    //click inside container
    
    container.mousedown(function(e){
        
        paint = true;
        //start a path
        ctx.beginPath();
        //get the position of the mouse
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
        
    });
    
    //move the mouse inside the container
    
    container.mousemove(function(e){
        
        
        
        //get the position of the mouse
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        
        if(paint == true){
            
            if(paint_erase == "paint"){
                //get color inopur
                
                ctx.strokeStyle = $("#paintcolor").val();
                
                
            }
            
            else{
                //white color
                
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
            
        }
        
        
        
        
    });
    
    //mouse up inside the canvas, we are not drawing anymore
    
    
    container.mouseup(function(){
        
        paint = false;
        
        
        
        
    });
    
    //if we leave the container we are not drawing anymore
    
    container.mouseleave(function(){
        
        paint = false;
        
        
        
        
    });
    
    
    
//   clicking the erase button 
    
    $("#erase").click(function(){
        
        if(paint_erase == "paint"){
            
            paint_erase = "erase";
            
            
        }
        
        else{
            
            paint_erase = "paint";
            
        }
        
        $(this).toggleClass("erasemode");
        
        
        
    });
    
    //clicking on the reset button
    
    $("#reset").click(function(){
        
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        
        paint_erase = "paint";
        
        $("#erase").removeClass("erasemode");
        
        
    });
    
    //clicking on the save button
    
    $("#save").click(function(){
        
        
        if(typeof(localStorage) != null){
        
        localStorage.setItem("imagecanvas" , canvas.toDataURL());
            
            //to the image saved url
//        window.alert(localStorage.getItem("imagecanvas"));
        
        
    }
    else{
        
        window.alert("your browser does not support local storage!");
        
        
    }
           
        
        
    });
    
    //change the color inout
    
    $("#paintcolor").change(function(){
        
        $("#circle").css("background-color"  , $(this).val());
        
        
        
    });
    
    //change the width of the brush
    
    
    $("#slider").slider({
        
//        setting the max and min of the slider first
        min : 3,
        max : 30, 
        
//        then we connect the min and max of the slider to the width and height of the circle 
        
        slide:function(event,ui){
            
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
            
        },
        
    });
    
    
    
    
    
    
    
    
    
    
 
});