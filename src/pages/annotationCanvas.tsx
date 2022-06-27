import React, { useEffect } from "react"

export function AnnotationCanvas() {
    useEffect(() => {
        createCanvas()
    }, [])

    
    

    function createCanvas (){
        var canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement
        console.log(canvas)
        if(!canvas) return

        canvas.width = 800
        canvas.height = 500    
        var ctx = canvas.getContext('2d')

        function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
        }

        canvas.addEventListener('mousedown', function(e){
            if(!ctx) return
            point(getMousePos(canvas, e).x, getMousePos(canvas, e).y, ctx)
        })

        function point(x: number, y: number, context: CanvasRenderingContext2D){
            context.beginPath();
            context.arc(x, y, 1, 0, 2 * Math.PI, true);
            context.stroke();
          }

        function draw(evt: MouseEvent) {
            console.log("draw")
            if(!ctx) return
            var pos = getMousePos(canvas, evt);
            console.log("draw")
            ctx.fillStyle = "#55555";
            ctx.fillRect (pos.x, pos.y, 4, 4);
          }

        
        if(!ctx) return
        console.log("DRAW")
        ctx.fillStyle = "#D3D3D3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        draw(new MouseEvent('click'))
        

        var image: CanvasImageSource = new Image()
        image.src = "https://electricrevs.files.wordpress.com/2018/11/tesla-model-3-ccs1-e1542191696558.jpg"
        image.width = 100
        image.height = 200
        image.onload = function(){
            if(!ctx) return
            ctx.drawImage(image, 0, 0)
        }
        
        

    }
    



    return(
        
        <div className="annotationCanvas">
            <script src=""></script>
            <h3>canvas</h3>
            <canvas></canvas>
        </div>
    )
    
}

export default AnnotationCanvas