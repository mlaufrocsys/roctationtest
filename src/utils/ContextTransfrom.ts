var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
var xform = svg.createSVGMatrix();
var savedTransforms: DOMMatrix[] = [];
var pt  = svg.createSVGPoint();

class ContextTransform {


    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
    }

    ctx: CanvasRenderingContext2D
    
    getTransform()  {
        return xform
    }

    save(){
        savedTransforms.push(xform.translate(0,0));
    }

    restore(){
        var temp = savedTransforms.pop();
        if(temp === undefined) return
        xform = temp
    }

    scale(sx: number, sy: number){
        xform = xform.scaleNonUniform(sx,sy);
    }

   
    rotate (radians: number){
        xform = xform.rotate(radians*180/Math.PI);
    }
    
    translate(dx: number, dy: number){
        xform = xform.translate(dx,dy);
    }
    
    transform(a: number, b: number, c: number, d: number, e: number, f: number){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
    }
    
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
    }
    
    transformedPoint(x: number, y: number): DOMPoint{
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
      

}

export default ContextTransform