import React, { WheelEvent, MouseEvent} from "react";
import Coordinate from "../socket/utils/coordinate";


var scaleFactor = 1.1;
var zoomSize = 1;
const brightnessValue = "150"
var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
var xform: DOMMatrix = svg.createSVGMatrix();


class CanvasHelper {
    private points: Coordinate[]
     canvas: HTMLCanvasElement
     ctx: CanvasRenderingContext2D 
    private lastX: number
    private lastY: number
    private dragStart: DOMPoint | null
    private dragged: Boolean
     image
    private xform: DOMMatrix
    private savedTransforms: DOMMatrix[]

    
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, imageSrc: string){
        this.canvas = canvas
        this.canvas.width = 1000
        this.canvas.height = 800
        this.points = [
            new Coordinate(2, 5),
            new Coordinate(50, 80)
        ]
        this.ctx = ctx
        this.lastX = canvas.width/2
        this.lastY = canvas.height/2
        this.dragStart = null
        this.dragged = false;
        this.image = new Image
        this.image.src = imageSrc
        this.xform = svg.createSVGMatrix()
        this.savedTransforms = [];

        //add functionality to ctx
        this.trackTransforms()
        
    }

    

    redraw(){    
        // Clear the entire canvas
        this.ctx.save();
        this.ctx.setTransform(1,0,0,1,0,0);
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.restore();
        
        
        //draw image with declared brightness
        this.ctx.filter = 'brightness('  + brightnessValue + '%)'
        this.ctx.drawImage(this.image,200,50);
        this.ctx.filter = 'brightness(100%)'

        //draw all the point
        for(var i = 0; i < this.points.length; i++){		
            //draw outer point
            this.ctx.beginPath();
            this.ctx.arc(this.points[i].x, this.points[i].y, 4/(zoomSize), 0, 2 * Math.PI, true);
            this.ctx.stroke();

            //draw inner point
            this.ctx.beginPath();
            this.ctx.arc(this.points[i].x, this.points[i].y, 2/(zoomSize*2), 0, 2 * Math.PI, true);
            this.ctx.stroke();
        }
        console.log("redraw passed")
    }

     //adds a point to the pointsArray
     addPoint(){
        var pt = this.transformedPoint(this.lastX, this.lastY);
        this.points.push({x: pt.x, y: pt.y})
        this.redraw()
    }

    //zooms the canvas in or out
    zoom (clicks: number){
        var pt = this.transformedPoint(this.lastX, this.lastY);
        this.ctx.translate(pt.x,pt.y);
        var factor = Math.pow(scaleFactor,clicks);
        zoomSize *= factor
        this.ctx.scale(factor,factor);
        this.ctx.translate(-pt.x,-pt.y);
        this.redraw();
    }
    
    handleScroll = (e:  WheelEvent<HTMLCanvasElement>) => {
        var evt = e.nativeEvent
        var delta = evt.deltaY ? evt.deltaY/40 : evt.detail ? -evt.detail : 0;
        console.log(delta)
        if (delta) this.zoom(delta);
        return evt.preventDefault() 
    };

    handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault()
        var evt = e.nativeEvent
        this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
		this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
        console.log(this.lastX)
        
    }

    handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        console.log(this.points)
        this.addPoint()
    }


    //temporary
    extendTransforms(){
        var oldSave = this.ctx.save;
        var objectThis = this
        this.ctx.save = function(){
            objectThis.savedTransforms.push(objectThis.xform.translate(0,0));
            return oldSave.call(objectThis.ctx);
        };
    }

    trackTransforms(){
      
        this.ctx.getTransform = function(){ return xform; };
        
        var savedTransforms: DOMMatrix[] = [];
        var oldSave = this.ctx.save;
        var objectThis = this
        this.ctx.save = function(){
            savedTransforms.push(xform.translate(0,0));
            return oldSave.call(objectThis.ctx);
        };

        var oldRestore = this.ctx.restore;
        this.ctx.restore = function(){
            var temp =  savedTransforms.pop();
            if(temp == undefined) return
            xform = temp
            return oldRestore.call(this);
        };
    
        var oldScale = this.ctx.scale;
        this.ctx.scale = function(sx,sy){
            xform = xform.scaleNonUniform(sx,sy);
            return oldScale.call(this,sx,sy);
        };

        var oldRotate = this.ctx.rotate;
        this.ctx.rotate = function(radians){
            xform = xform.rotate(radians*180/Math.PI);
            return oldRotate.call(this,radians);
        };

        var oldTranslate = this.ctx.translate;
        this.ctx.translate = function(dx,dy){
            xform = xform.translate(dx,dy);
            return oldTranslate.call(this,dx,dy);
        };

        var oldTransform = this.ctx.transform;
        this.ctx.transform = function(a,b,c,d,e,f){
            var m2 = svg.createSVGMatrix();
            m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
            xform = xform.multiply(m2);
            return oldTransform.call(this,a,b,c,d,e,f);
        };

        var setTransform = ctx.setTransform;
        ctx.setTransform = function(a,b,c,d,e,f){
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(ctx,a,b,c,d,e,f);
        };
    
        
    }

    transformedPoint(x: number,y: number){
        var pt  = svg.createSVGPoint();
        pt.x=x; pt.y=y;
        console.log(xform)
        return pt.matrixTransform(xform.inverse());
    }

    
    //TODO 
    //- Listeners
}

export default CanvasHelper