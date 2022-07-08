import React, { useEffect, MouseEvent, UIEventHandler, WheelEvent, useState } from "react"

const imageSrc = 'https://storage.labelbox.com/ck21nv3iepjbp0748ahiqfqew%2Fd45d790a-1785-704d-2746-e624e9b04ab7-2021-09-24_15-36-03_raw.png?Expires=1656410873216&KeyName=labelbox-assets-key-3&Signature=rBO7S30cMr_8P3X2ny5Er7siOd0';
const imageSrcTemp = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
var CvHelper: CanvasHelper 


export default function AnnotationCanvas() {
   


  
    
    useEffect(() => {
        var canvas = document.getElementsByTagName('canvas')[0]
        if(canvas) {
            var ctx = canvas.getContext('2d');
            if(ctx) {
                
                
                console.log(ctx)
               

                CvHelper = new CanvasHelper(canvas, ctx, imageSrcTemp)
               
                console.log("CVHELPER----------")
                console.log(CvHelper)
                console.log(CvHelper.canvas)
                console.log(CvHelper.ctx)
   
                CvHelper.redraw()
            }
            
        }
        
    }, [])

    

    // var canvas: HTMLCanvasElement | null  =  null;
    // var gkhead = new Image;
    // var scaleFactor = 1.1;
    // var zoomSize = 1;
    // var points: Coordinate[] = []
    // const brightnessValue = "150"
    // gkhead.src = 'https://storage.labelbox.com/ck21nv3iepjbp0748ahiqfqew%2Fd45d790a-1785-704d-2746-e624e9b04ab7-2021-09-24_15-36-03_raw.png?Expires=1656410873216&KeyName=labelbox-assets-key-3&Signature=rBO7S30cMr_8P3X2ny5Er7siOd0';
    // var ctx: CanvasRenderingContext2D | null = null
    // //keeps track of the position before the drag
    // var dragStart: DOMPoint | null
    // //keeps track if the canvas is being dragged
    // var dragged: Boolean;
    // var ctxTrans: ContextTransform | null = null
    // var lastX = 500;
    // var lastY = 400;

    // function initialise() {
    //     canvas = document.getElementsByTagName('canvas')[0]
    //     if(!canvas) return

    //     ctx = canvas.getContext('2d');
    //     if(!ctx) return
    //     console.log(ctx)
                
    //     canvas.width = 1000; 
    //     canvas.height = 800;

    //     ctxTrans = new ContextTransform(ctx)
  
    //     //keeps track of the x, y position of the canvas
    //     lastX=canvas.width/2, lastY=canvas.height/2;
        

    //     //mouse down event
    //     canvas.addEventListener('mousedown',function(evt){
    //         if(!ctx|| !ctxTrans || !canvas) return
    //         document.body.style.userSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
    //         lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    //         lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    //         dragStart = ctxTrans.transformedPoint(lastX,lastY);
    //         dragged = false;
    //     },false);

    //     //mouse move event 
    //     canvas.addEventListener('mousemove',function(evt){
    //         if(!ctx || !ctxTrans || !canvas) return
    //         lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    //         lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    //         dragged = true;
    //         if (dragStart){
    //             var pt: DOMPoint = ctxTrans.transformedPoint(lastX,lastY);
    //             ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
    //             redraw();
    //         }
    //     },false);

    //     //mouse up calls the addpoint function
    //     canvas.addEventListener('mouseup',function(evt){
    //         dragStart = null;
    //         if (!dragged) addPoint()
    //         redraw()
    //     },false);
     
    //     canvas.addEventListener('DOMMouseScroll',handleScroll,false);
    //     canvas.addEventListener('mousewheel',handleScroll,false);

        
    //     //mouse scroll event(s)
    //     redraw();
    //     console.log("end initialise")
    
    // }
   
    // //function which redraws the context
    // function redraw(){
    //     if(!ctx|| !ctxTrans || !canvas) return
        
    //     // Clear the entire canvas
    //     var p1 = ctxTrans.transformedPoint(0,0);
    //     var p2 = ctxTrans.transformedPoint(canvas.width,canvas.height);
    //     ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

    //     //draw image with declared brightness
    //     ctx.filter = 'brightness('  + brightnessValue + '%)'
    //     ctx.drawImage(gkhead,200,50);
    //     ctx.filter = 'brightness(100%)'

    //     //draw all the point
    //     for(var i = 0; i < points.length; i++){		
    //         //draw outer point
    //         ctx.beginPath();
    //         ctx.arc(points[i].x, points[i].y, 4/(zoomSize), 0, 2 * Math.PI, true);
    //         ctx.stroke();

    //         //draw inner point
    //         ctx.beginPath();
    //         ctx.arc(points[i].x, points[i].y, 2/(zoomSize*2), 0, 2 * Math.PI, true);
    //         ctx.stroke();
    //     }
    //     console.log("redraw passed")
    // }
    
    // //adds a point to the pointsArray
    // var addPoint = function(){
    //     if(!ctx || !ctxTrans) return
    //     var pt = ctxTrans.transformedPoint(lastX, lastY);
    //     points.push({x: pt.x, y: pt.y})
    //     redraw()
    // }

    // //zooms the canvas in or out
    // function zoom (clicks: number){
    //     if(!ctx|| !ctxTrans) return
    //     var pt = ctxTrans.transformedPoint(lastX,lastY);
    //     ctx.translate(pt.x,pt.y);
    //     var factor = Math.pow(scaleFactor,clicks);
    //     zoomSize *= factor
    //     ctx.scale(factor,factor);
    //     ctx.translate(-pt.x,-pt.y);
    //     redraw();
    // }

    // const handleScroll: EventListener = (e:  Event) => {
    //     var evt = e as WheelEvent
    //     var delta = evt.deltaY ? evt.deltaY/40 : evt.detail ? -evt.detail : 0;
    //     if (delta) zoom(delta);
    //     evt.preventDefault()
    // };


    

   

   
    

    



        return (
            <>
                <div className="annotationCanvas">
                    <h3>canvas</h3>
                    <canvas 
                        onWheel={(evt) => CvHelper.handleScroll(evt as WheelEvent<HTMLCanvasElement>) } 
                        onMouseMove={(evt) => CvHelper.handleMouseMove(evt as MouseEvent<HTMLCanvasElement>)}
                        onMouseUp={(evt) => CvHelper.handleMouseUp(evt as MouseEvent<HTMLCanvasElement>)}
                    ></canvas>
                </div>
            
            </>
        )
            
        
            
        
    }
    
        
        
    
    


import Coordinate from "../socket/utils/coordinate"
import CanvasHelper from "../utils/CanvasHelper"
import { initialise } from "../features/socket/socketSlicer"
import { render } from "@testing-library/react";

