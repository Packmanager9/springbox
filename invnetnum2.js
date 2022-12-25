

// let clicks = -1

const squaretable = {} // this section of code is an optimization for use of the hypotenuse function on Line and LineOP objects
for (let t = 0; t < 10000000; t++) {
    squaretable[`${t}`] = Math.sqrt(t)
    if (t > 999) {
        t += 9
    }
}
let esum = 0
let keysPressed = {}
let FLEX_engine
let TIP_engine = {}
let XS_engine
let YS_engine

let img0 = []
// for (let i = 1; i < 4132; i++) {
//     img0.push(Object.assign(new Image(), { 'src': `0/zero${i}.jpg` }));
// }
let img1 = []
// for (let i = 1; i < 4684; i++) {
//     img1.push(Object.assign(new Image(), { 'src': `1/onez${i}.jpg` }));
// }
let img2 = []
// for (let i = 0; i < 4177; i++) {
//     img2.push(Object.assign(new Image(), { 'src': `2/2-${i}.jpg` }));
// }
let img3 = []
// for (let i = 0; i < 4351; i++) {
//     img3.push(Object.assign(new Image(), { 'src': `3/3-${i}.jpg` }));
// }
let img4 = []
// for (let i = 0; i < 34372; i++) {
//     img4.push(Object.assign(new Image(), { 'src': `4/4-${i}.jpg` }));
// }
let img5 = []
// for (let i = 0; i < 3795; i++) {
//     img5.push(Object.assign(new Image(), { 'src': `5/5-${i}.jpg` }));
// }
let img6 = []
// for (let i = 0; i < 4137; i++) {
//     img6.push(Object.assign(new Image(), { 'src': `6/6-${i}.jpg` }));
// }
let img7 = []
// for (let i = 0; i < 43431; i++) {
//     img7.push(Object.assign(new Image(), { 'src': `7/7-${i}.jpg` }));
// }
let img8 = []
// for (let i = 0; i < 34363; i++) {
//     img8.push(Object.assign(new Image(), { 'src': `8/8-${i}.jpg` }));
// }
let img9 = []
// for (let i = 0; i < 4188; i++) {
//     img9.push(Object.assign(new Image(), { 'src': `9/9-${i}.jpg` }));
// }

let biggo = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9]

let modmax = 999999
for (let t = 0; t < biggo.length; t++) {
    if (biggo[t].length < modmax) {
        modmax = biggo[t].length
    }
}

// let canvas
let canvas = document.getElementById('canvas') //getting canvas from document
let canvas_context

// const undobtn = document.getElementById("undo");
// const redobtn = document.getElementById("redo");
// const randomcolor = document.getElementById("randomcolor");
// const rotator = document.getElementById("rot");
// const color = document.getElementById("color");
// const size = document.getElementById("size");

let clicks = -1
let flex = canvas.getBoundingClientRect();
let tip = {}
let xs
let ys

let undos = []

let reandomcolormaker = -1


// undobtn.onclick = undofunc
// redobtn.onclick = redofunc
// randomcolor.onclick = randomcolorfunc

let bigcolor = "white"
// rotator.addEventListener('input', function () {
//     middle.cuts = rotator.value
//     middle.cutter = (Math.PI*2)/middle.cuts
//   }, false);

//   size.addEventListener('input', function () {
//     bigradius = size.value/1
//   }, false);

//   color.addEventListener('input', function () {
//     bigcolor = color.value
//   }, false);


let oldcirc = { x: 350, y: 350 }
let circ = { x: 350, y: 350 }


class Center {
    constructor() {
        this.body = new Bosscircle(canvas.width * .5, canvas.height * .5, 0, "transparent")
        this.cuts = 1
        this.angle = 0
        this.nodes = []
        this.cutnodes = []
        this.angleRadians = 0
        this.cutter = 0
        this.cutter = (Math.PI * 2) / this.cuts
    }
    getCut(point) {
        this.angleRadians = Math.atan2(this.body.y - point.y, this.body.x - point.x);
        let cutter = (Math.PI * 2) / this.cuts
        this.cutter = (Math.PI * 2) / this.cuts
        // //console.log(cutter, this.angleRadians)
        for (let t = 0; t < this.cuts; t++) {
            if (this.angleRadians > 0) {
                if (t * cutter < this.angleRadians && this.angleRadians < ((t + 1) * cutter)) {
                    return t
                }
            } else {
                if (t * -cutter > this.angleRadians && this.angleRadians > ((t - 1) * -cutter)) {
                    return t
                }
            }
        }

    }
}


class Bosscircle {
    constructor(x, y, radius, color, xmom = 0, ymom = 0) {
        this.height = 0
        this.width = 0
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.xmom = xmom
        this.ymom = ymom
    }
    draw() {
        canvas_context.fillStyle = this.color
        canvas_context.lineWidth = 0
        canvas_context.strokeStyle = this.color
        canvas_context.beginPath();
        canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
        canvas_context.fill()
        canvas_context.stroke();

    }
    spindraw(point) {

        this.angleRadians = Math.atan2(this.y - middle.body.y, this.x - middle.body.x);
        let xhold = this.x
        let yhold = this.y

        this.angleRadiansp = Math.atan2(point.y - middle.body.y, point.x - middle.body.x);
        let xholdp = point.x
        let yholdp = point.y
        xhold = Math.abs(this.x - middle.body.x)
        yhold = Math.abs(this.y - middle.body.y)
        xholdp = Math.abs(point.x - middle.body.x)
        yholdp = Math.abs(point.y - middle.body.y)
        let link = new Line(xhold, 0, 0, yhold, "red", 1)
        let linkp = new Line(xholdp, 0, 0, yholdp, "red", 1)
        // link.draw()
        link = link.hypotenuse()
        linkp = linkp.hypotenuse()
        // (new Line(xhold, 0, 0, yhold, "red", 1)).draw()
        for (let t = 0; t < middle.cuts; t++) {
            canvas_context.fillStyle = this.color
            canvas_context.lineWidth = 0
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            canvas_context.arc(middle.body.x + (Math.cos((middle.cutter * t) + this.angleRadians) * link), middle.body.y + (Math.sin((middle.cutter * t) + this.angleRadians) * link), this.radius, 0, (Math.PI * 2), true)
            canvas_context.fill()
            canvas_context.stroke();
            let line = new Line(middle.body.x + (Math.cos((middle.cutter * t) + this.angleRadiansp) * linkp), middle.body.y + (Math.sin((middle.cutter * t) + this.angleRadiansp) * linkp), middle.body.x + (Math.cos((middle.cutter * t) + this.angleRadians) * link), middle.body.y + (Math.sin((middle.cutter * t) + this.angleRadians) * link), this.color, bigradius * 2)
            line.draw()


        }

    }
    move() {
        this.x += this.xmom
        this.y += this.ymom
        if (this.x > canvas.width) {
            this.x = canvas.width
            if (this.xmom > 0) {
                this.xmom *= -1
            }
        }
        if (this.y > canvas.height) {
            this.y = canvas.height
            if (this.ymom > 0) {
                this.ymom *= -1
            }
        }
        if (this.x < 0) {
            this.x = 0
            if (this.xmom < 0) {
                this.xmom *= -1
            }
        }
        if (this.y < 0) {
            this.y = 0
            if (this.ymom < 0) {
                this.ymom *= -1
            }
        }
    }
}


let middle = new Center()


class Line {
    constructor(x, y, x2, y2, color, width) {
        this.x1 = x
        this.y1 = y
        this.x2 = x2
        this.y2 = y2
        this.color = color
        this.width = width
    }
    hypotenuse() {
        const xdif = this.x1 - this.x2
        const ydif = this.y1 - this.y2
        const hypotenuse = (xdif * xdif) + (ydif * ydif)
        return Math.sqrt(hypotenuse)
    }
    draw() {
        canvas_context.strokeStyle = this.color
        canvas_context.lineWidth = this.width
        canvas_context.beginPath()
        canvas_context.moveTo(this.x1, this.y1)
        canvas_context.lineTo(this.x2, this.y2)
        canvas_context.stroke()
        canvas_context.lineWidth = 1
    }
}
function undofunc() {

    canvas_context.clearRect(0, 0, canvas.width, canvas.height)
    canvas_context.drawImage(undos[clicks], 0, 0)
    clicks--
    if (clicks < 0) {
        clicks = 0
    }

}
// function randomcolorfunc(){
//     reandomcolormaker*=-1
//     if(reandomcolormaker == 1){
//         randomcolor.innerText = "Random Color is on"
//     }else{
//         randomcolor.innerText = "Random Color is off"
//     }
// }

function redofunc() {

    canvas_context.clearRect(0, 0, canvas.width, canvas.height)
    canvas_context.drawImage(undos[clicks], 0, 0)
    clicks++
    if (clicks > undos.length - 1) {
        clicks = undos.length - 1
    }

}

window.addEventListener('keydown', e => {
    if (e.key == "x") {
        canvas_context.clearRect(0, 0, canvas.width, canvas.height)
    }


});
window.addEventListener('DOMContentLoaded', (event) => {

    let keysPressed = {}
    function setUp(canvas_pass, style = "#000000") {
        canvas = canvas_pass
        canvas_context = canvas.getContext('2d');
        // sees_context = sees.getContext('2d');
        // sees.style.background = style
        canvas.style.background = style
        window.setInterval(function () {
            main()
        }, 1)
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;


            if (keysPressed['f']) {
                filterselected++
                filtershow.innerText = "Filter: " + filterselected
                if (filterselected == 10) {
                    filterselected = -1
                    filtershow.innerText = "Filter: " + "auto"
                }

            }

        });
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });

        window.addEventListener('pointerdown', e => {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine

            for (let t = 0; t < compare.balls.length; t++) {
                if (compare.balls[t].isPointInside(TIP_engine)) {
                    compare.balls[t].anchored = 1
                    compare.balls[t].anchor = TIP_engine
                }
            }
            // example usage: if(object.isPointInside(TIP_engine)){ take action }
            window.addEventListener('pointermove', continued_stimuli);
        });

        window.addEventListener('pointerup', e => {
            for (let t = 0; t < compare.balls.length; t++) {
                compare.balls[t].anchored = 0
                // compare.balls[t].anchor = TIP_engine
            }
            window.removeEventListener("pointermove", continued_stimuli);
        })
        function continued_stimuli(e) {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine

            let circ = new Circle(TIP_engine.x, TIP_engine.y, 30, "white")
            circ.draw()
            example_context.clearRect(0, 0, 28, 28)
            example_context.drawImage(canvas, 0, 0, 700, 700, 0, 0, 28, 28)
        }
    }
    function getRandomColor() { // random color
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16) + 0)];
        }
        return color;
    }
    let setup_canvas = document.getElementById('canvas') //getting canvas from document
    let oitsay = document.getElementById('oitsay') //getting canvas from document
    // let sees = document.getElementById('sees') //getting canvas from document
    let filtershow = document.getElementById('filter') //getting canvas from document
    let numberprint = document.getElementById('number') //getting canvas from document
    let example_canvas = document.getElementById('example') //getting canvas from document
    let example_canvas2 = document.getElementById('example2') //getting canvas from document
    setUp(setup_canvas) // setting up canvas refrences, starting timer. 
    //console.log("asjkd")


    example_context = example_canvas.getContext('2d');
    example_context2 = example_canvas2.getContext('2d');

    example_canvas.style.background = "black"
    example_canvas2.style.background = "black"

    example_context.fillStyle = "white"
    // example_context.fillRect(6,6,16,16)
    // example_context.arc(14,14,8,0,Math.PI*2, true)
    // example_context.fill()

    let variableshape = -1

    let imgindex = 0
    let variablenumber = -1
    function draw0() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img0[imgindex + 0], 0, 0)
        variablenumber = 0
        imgindex %= modmax
    }
    function draw1() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img1[imgindex + 0], 0, 0)
        variablenumber = 1
        imgindex %= modmax
    }
    function draw2() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img2[imgindex + 0], 0, 0)
        variablenumber = 2
        imgindex %= modmax
    }
    function draw3() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img3[imgindex + 0], 0, 0)
        variablenumber = 3
        imgindex %= modmax
    }
    function draw4() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img4[imgindex + 0], 0, 0)
        variablenumber = 4
        imgindex %= modmax
    }
    function draw5() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img5[imgindex + 0], 0, 0)
        variablenumber = 5
        imgindex %= modmax
    }
    function draw6() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img6[imgindex + 0], 0, 0)
        variablenumber = 6
        imgindex %= modmax
    }
    function draw7() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img7[imgindex + 0], 0, 0)
        variablenumber = 7
        imgindex %= modmax
    }
    function draw8() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img8[imgindex + 0], 0, 0)
        variablenumber = 8
        imgindex %= modmax
    }
    function draw9() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.drawImage(img9[imgindex + 0], 0, 0)
        variablenumber = 9
        imgindex++
        imgindex %= modmax
    }
    function xdraw0() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img0[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 0
        //imgindex %= modmax
    }
    function xdraw1() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img1[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 1
        //imgindex %= modmax
    }
    function xdraw2() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img2[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 2
        //imgindex %= modmax
    }
    function xdraw3() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img3[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 3
        //imgindex %= modmax
    }
    function xdraw4() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img4[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 4
        //imgindex %= modmax
    }
    function xdraw5() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img5[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 5
        //imgindex %= modmax
    }
    function xdraw6() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img6[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 6
        //imgindex %= modmax
    }
    function xdraw7() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img7[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 7
        //imgindex %= modmax
    }
    function xdraw8() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img8[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 8
        //imgindex %= modmax
    }
    function xdraw9() {
        //canvas_context.clearRect(0, 0, 28, 28)
        canvas_context.drawImage(img9[imgindex + 0], 0, 0, 28, 28, 343, 1500, 100, 100)
        //variablenumber = 9
        imgindex++
        //imgindex %= modmax
    }
    function drawRectangle() {
        example_context.clearRect(0, 0, 28, 28)
        let scalar = Math.random() + .2
        example_context.fillRect(6, 6, 16 * scalar, 16 * scalar)
        variableshape = 0
    }
    function drawCircle() {
        example_context.clearRect(0, 0, 28, 28)
        example_context.beginPath()
        let scalar = Math.random() + .2
        example_context.arc(14, 14, 8 * scalar, 0, Math.PI * 2, true)
        example_context.fill()
        example_context.closePath()
        variableshape = 1
    }
    function drawTriangle() {
        example_context.clearRect(0, 0, 28, 28)
        let scalar = Math.random() + .2
        let triangle = new Polygon(14, 14, scalar * 11, 3)
        triangle.angle = Math.random() * Math.PI * 2
        triangle.draw()
        variableshape = 2
    }

    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = strokeWidth
            this.strokeColor = strokeColor
        }
        draw() {
            canvas_context.lineWidth = this.strokeWidth
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                canvas_context.fillStyle = this.color
                canvas_context.fill()
                canvas_context.stroke();
            } else {
                //console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.anchored == 1) {
                this.x = this.anchor.x
                this.y = this.anchor.y
            }
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                        this.x = canvas.width-this.radius
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                        this.y = canvas.height-this.radius
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                        this.x = 0+this.radius
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                        this.y = 0+this.radius
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    }
    class Polygon {
        constructor(x, y, size, color, sides = 3, xmom = 0, ymom = 0, angle = 0, reflect = 0) {
            if (sides < 2) {
                sides = 2
            }
            this.reflect = reflect
            this.xmom = xmom
            this.ymom = ymom
            this.body = new Circle(x, y, size - (size * .293), "transparent")
            this.nodes = []
            this.angle = angle
            this.size = size
            this.color = color
            this.angleIncrement = (Math.PI * 2) / sides
            this.sides = sides
            for (let t = 0; t < sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
        }
        isPointInside(point) { // rough approximation
            this.body.radius = this.size - (this.size * .293)
            if (this.sides <= 2) {
                return false
            }
            this.areaY = point.y - this.body.y
            this.areaX = point.x - this.body.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.body.radius * this.body.radius)) {
                return true
            }
            return false
        }
        move() {
            if (this.reflect == 1) {
                if (this.body.x > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.body.x < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.body.x += this.xmom
            this.body.y += this.ymom
        }
        draw() {
            this.nodes = []
            this.angleIncrement = (Math.PI * 2) / this.sides
            this.body.radius = this.size - (this.size * .293)
            for (let t = 0; t < this.sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
            example_context.strokeStyle = this.color
            example_context.fillStyle = this.color
            example_context.lineWidth = 0
            example_context.beginPath()
            example_context.moveTo(this.nodes[0].x, this.nodes[0].y)
            for (let t = 1; t < this.nodes.length; t++) {
                example_context.lineTo(this.nodes[t].x, this.nodes[t].y)
            }
            example_context.lineTo(this.nodes[0].x, this.nodes[0].y)
            example_context.fill()
            example_context.stroke()
            example_context.closePath()
        }
    }
    let redval = Math.random() + 0
    let greenval = Math.random() + 0
    let blueval = Math.random() + 0
    let meshes = []
    let inputArray = []
    let filterselected = -1

    for (let t = 0; t < 784; t++) {
        inputArray.push(Math.random())
    }
    let numcounter = 0

    // let notfalse = []
    // let errors = []

    class Weight {
        constructor(from, to, whack) {
            this.whack = whack
            this.value = this.weight()
            this.from = from
            this.to = to
            this.change = .001
            this.delta = 1
        }
        valueOf() {
            return this.value
        }
        weight() {
            // console.log(this.whack)
            return ((Math.random() - .5) * 2) / (Math.sqrt(this.whack))
        }
        setChange(num) {
            this.change = num
        }
        setWeight(num) {
            this.value = num
        }
    }
    class Perceptron {
        constructor(inputs) {
            this.inputs = inputs
            this.bias = (Math.random() - .5) / 100//this.inputs.length
            this.value = this.bias
            this.weights = []
            this.outputConnections = []
            this.error = 0
            this.delta = 1
            for (let t = 0; t < this.inputs.length; t++) {
                this.weights.push(this.weight(this.inputs[t], this.inputs.length))
            }
            this.z = -1
            this.change = .001
        }
        setError(error) {
            this.error = error
        }
        setDelta(delta) {
            this.delta = delta
            for (let t = 0; t < this.outputConnections.length; t++) {
                this.outputConnections[t].delta = this.delta
            }
        }
        setBias(bias) {
            this.bias = bias
        }
        setChange(num) {
            this.change = change
            for (let t = 0; t < this.outputConnections.length; t++) {
                this.outputConnections[t].change = this.change
            }
        }
        weight(link, whack) {
            // console.log(whack)
            let weight = new Weight(link, this, whack)
            if (typeof link != "number") {
                link.outputConnections.push(weight)
            }
            return weight
        }
        valueOf() {
            return this.value
        }
        compute(inputs = this.inputs) {
            this.inputs = inputs
            this.value = this.bias
            for (let t = 0; t < inputs.length; t++) {
                if (t > this.weights.length - 1) {
                    this.weights.push(this.weight(inputs[t], inputs.length))
                    this.value += (inputs[t].valueOf() * this.weights[t].valueOf())
                } else {
                    this.value += (inputs[t].valueOf() * this.weights[t].valueOf())
                }
            }
            this.relu()
            return this.value
        }
        relu() {
            this.value = Math.min(Math.max(this.value, 0.01), 1)
        }
    }
    class Network {
        constructor(inputs, layerSetupArray) {
            this.momentum = .01
            this.learningRate = .01
            this.count = 0
            this.trainedSec = 0
            this.starttime = Date.now()
            console.log(this.starttime)
            this.setup = layerSetupArray
            this.inputs = inputs
            this.structure = []
            this.outputs = []
            for (let t = 0; t < layerSetupArray.length; t++) {
                let scaffold = []
                for (let k = 0; k < layerSetupArray[t]; k++) {
                    let cept
                    if (t == 0) {
                        cept = new Perceptron(this.inputs)
                    } else {
                        cept = new Perceptron(this.structure[t - 1])
                    }
                    scaffold.push(cept)
                }
                this.structure.push(scaffold)
            }
            this.lastinputs = [...this.inputs]
            this.lastgoals = [...this.lastinputs]
            this.swap = []
        }

        becomeNetworkFrom(network) { //using a js file with one variable can be good for this
            // //console.log(this.structure[0][0].bias)
            for (let t = 0; t < this.structure.length; t++) {
                // //console.log("h1")
                for (let k = 0; k < this.structure[t].length; k++) {
                    // //console.log("h2")
                    this.structure[t][k].bias = network.structure[t][k].bias
                    for (let w = 0; w < this.structure[t][k].weights.length; w++) {
                        // //console.log("h3")
                        this.structure[t][k].weights[w].setWeight(network.structure[t][k][w].valueOf())
                    }
                }
            }
            // //console.log(this.structure[0][0].bias)
        }
        calculateDeltasSigmoid(goals) {
            this.trainedSec = Math.floor(((Date.now()) - this.starttime) / 1000)
            this.count++
            for (let t = this.structure.length - 1; t >= 0; t--) {
                const layer = this.structure[t]
                for (let k = 0; k < layer.length; k++) {
                    const perceptron = layer[k]
                    let output = perceptron.valueOf()
                    let error = 0
                    if (t === this.structure.length - 1) {
                        error = (goals[k].valueOf() - output);
                    } else {
                        for (let k = 0; k < perceptron.outputConnections.length; k++) {
                            const currentConnection = perceptron.outputConnections[k]
                            ////console.log(currentConnection)
                            error += currentConnection.to.delta * currentConnection.valueOf()
                        }
                    }
                    esum += (Math.abs(error))
                    perceptron.setError(error)
                    perceptron.setDelta((error) * output * (1 - output))
                }
            }

            if (this.count % 343 == 0) {
                this.momentum *= .99975
                this.learningRate *= .99975
                console.log(esum)
                esum = 0
            }
            if (keysPressed['r']) {
                console.log(esum)
            }
        }
        adjustWeights() {
            for (let t = 0; t < this.structure.length; t++) {
                const layer = this.structure[t]
                for (let k = 0; k < layer.length; k++) {
                    const perceptron = layer[k]
                    let delta = perceptron.delta
                    for (let i = 0; i < perceptron.weights.length; i++) {
                        const connection = perceptron.weights[i]
                        let change = connection.change
                        change = (this.learningRate * delta * perceptron.inputs[i].valueOf()) + (this.momentum * change);
                        connection.setChange(change)
                        connection.setWeight(connection.valueOf() + change)
                    }
                    perceptron.setBias(perceptron.bias + (this.learningRate * delta))
                }
            }
        }
        clone(nw) {
            let input = nw.inputs
            let perc = new Network(input, nw.setup)
            for (let t = 0; t < nw.structure.length; t++) {
                for (let k = 0; k < nw.structure[t].length; k++) {
                    perc.structure[t][k] = new Perceptron([0, 0, 0, 0, 0, 0, 0])
                    for (let f = 0; f < nw.structure[t][k].weights.length; f++) {
                        perc.structure[t][k].weights[f] = nw.structure[t][k].weights[f]
                        perc.structure[t][k].bias = nw.structure[t][k].bias
                    }
                }
            }
            return perc
        }
        compute(inputs = this.inputs) {
            this.inputs = [...inputs]
            for (let t = 0; t < this.structure.length; t++) {
                for (let k = 0; k < this.structure[t].length; k++) {
                    if (t == 0) {
                        this.structure[t][k].compute(this.inputs)
                    } else {
                        this.structure[t][k].compute(this.structure[t - 1])
                    }
                }
            }
            this.outputs = []
            this.dataoutputs = []
            for (let t = 0; t < this.structure[this.structure.length - 1].length; t++) {
                this.outputs.push(this.structure[this.structure.length - 1][t].valueOf())
                this.dataoutputs.push(new Data(this.structure[this.structure.length - 1][t].valueOf()))
            }
        }
    }
    class Data {
        constructor(input = -100) {
            this.delta = 0
            this.outputConnections = []
            if (input == -100) {
                this.value = this.weight()
            } else {
                this.value = input
            }
        }
        valueOf() {
            return this.value
        }
        weight() {
            return Math.random() - .5
        }
    }

    class LineOP {
        constructor(object, target, color, width) {
            this.object = object
            this.target = target
            this.color = color
            this.width = width
        }
        squareDistance() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if (hypotenuse < 10000000 - 1) {
                if (hypotenuse > 1000) {
                    return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
                } else {
                    return squaretable[`${Math.round(hypotenuse)}`]
                }
            } else {
                return Math.sqrt(hypotenuse)
            }
        }
        angle() {
            return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.object.x, this.object.y)
            canvas_context.lineTo(this.target.x, this.target.y)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }

    let ino = []
    for (let t = 0; t > 784 * 4 * 3; t++) {
        ino.push(new Data(Math.random()))
    }
    let truenet = new Network(ino, [64, 64, 3])
    // truenet.becomeNetworkFrom(bigmon)
    let size = 0
    let truer = 0
    let bigout = []
    let bigin = []

    class Viewer {
        constructor(net) {
            this.net = net
        }
        draw() {
            let layers = this.net.structure.length + 1
            this.circles = []
            this.lines = []
            let step = canvas.height / (layers + 2)
            for (let t = -1; t < this.net.structure.length; t++) {
                let circlayer = []
                if (t == -1) {
                    let chunk = canvas.width / (this.net.inputs.length + 1)
                    for (let k = 0; k < this.net.inputs.length; k++) {
                        let circ = new Circle(chunk * (k + 1), step * (t + 2), 10, `rgba(255,255,255,${this.net.inputs[k].valueOf()})`)
                        circlayer.push(circ)
                    }
                } else {
                    let chunk = canvas.width / (this.net.structure[t].length + 1)
                    for (let k = 0; k < this.net.structure[t].length; k++) {
                        let circ = new Circle(chunk * (k + 1), step * (t + 2), 10, `rgba(255,255,255,${this.net.structure[t][k].valueOf()})`)
                        for (let g = 0; g < this.net.structure[t][k].weights.length; g++) {
                            //console.log(this.circles, this.net.structure[t][k].weights, g)
                            let link = new LineOP(circ, this.circles[t][g], "white", 3 * Math.abs(this.net.structure[t][k].weights[g].valueOf()))
                            // link.width = 1*Math.abs(this.net.structure[t][k].weights[g].valueOf())

                            link.width = (2.44 * Math.sqrt(Math.abs(this.net.structure[t][k].weights[g].valueOf())))  //(2.44*Math.sqrt(Math.abs(this.net.structure[t][k].weights[g].valueOf())))*(2.44*Math.sqrt(Math.abs(this.net.structure[t][k].weights[g].valueOf())))* (2.44*Math.sqrt(Math.abs(this.net.structure[t][k].weights[g].valueOf())))*(2.44*Math.sqrt(Math.abs(this.net.structure[t][k].weights[g].valueOf())))
                            if (this.net.structure[t][k].weights[g].valueOf() < 0) {
                                link.color = "#ffff0066"
                            } else {
                                link.color = "#0000ff66"
                            }


                            this.lines.push(link)
                        }
                        circlayer.push(circ)
                    }
                }
                this.circles.push(circlayer)
            }


            for (let t = 0; t < this.lines.length; t++) {
                this.lines[t].draw()
            }
            for (let t = 0; t < this.circles.length; t++) {
                for (let k = 0; k < this.circles[t].length; k++) {
                    this.circles[t][k].draw()
                }
            }
            // if (runner == 0) {
            //     xdraw0()
            // } else if (runner == 1) {
            //     xdraw1()
            // }
            // else if (runner == 2) {
            //     xdraw2()
            // }
            // else if (runner == 3) {
            //     xdraw3()
            // }
            // else if (runner == 4) {
            //     xdraw4()
            // }
            // else if (runner == 5) {
            //     xdraw5()
            // }
            // else if (runner == 6) {
            //     xdraw6()
            // }
            // else if (runner == 7) {
            //     xdraw7()
            // }
            // else if (runner == 8) {
            //     xdraw8()
            // }
            // else if (runner == 9) {
            //     xdraw9()
            // }


            canvas_context.font = "42px arial"
            canvas_context.fillStyle = "white"
            // canvas_context.fillText((index) % 10, 510, 620)
        }
    }
    let runner
    let index = 0
    let cccc = 0

    class SpringOP {
        constructor(body, anchor, length, width = 3, color = body.color) {
            this.body = body
            this.anchor = anchor
            this.beam = new LineOP(body, anchor, color, width)
            this.length = length
        }
        balance() {

            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += ((this.body.x - this.anchor.x) / (this.length * 1))
                this.body.ymom += ((this.body.y - this.anchor.y) / (this.length * 1))
                this.anchor.xmom -= ((this.body.x - this.anchor.x) / (this.length * 1))
                this.anchor.ymom -= ((this.body.y - this.anchor.y) / (this.length * 1))
            } else if (this.beam.hypotenuse() > this.length) {
                this.body.xmom -= (this.body.x - this.anchor.x) / (this.length * 1)
                this.body.ymom -= (this.body.y - this.anchor.y) / (this.length * 1)
                this.anchor.xmom += (this.body.x - this.anchor.x) / (this.length * 1)
                this.anchor.ymom += (this.body.y - this.anchor.y) / (this.length * 1)
            }

            for (let t = 0; t < 2; t++) {

                // let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
                // let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
                // this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
                // this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
                // this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
                // this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
            }
        }
        draw() {
            this.beam.draw()
        }
        move() {
            //movement of SpringOP objects should be handled separate from their linkage, to allow for many connections, balance here with this object, move nodes independently
        }
    }
    class FruitCompare {
        constructor() {
            this.fruits = []
            this.matrix = []
            for (let t = 0; t < 343; t++) {
                this.matrix.push([])
            }
            this.colors = []
            // for(let t = 0;t<343;t++){
                // this.colors.push(getRandomColor())
            // }
            let d = 255/7
            for(let r = 0;r<7;r++){
                for(let g = 0;g<7;g++){
                    for(let b = 0;b<7;b++){
                        let color = `rgb(${r*d},${g*d},${b*d})`
                        this.colors.push(color)
                    }
                }
            }
            this.nodes = []
            this.links = []
            this.balls = []
            this.springs = []
            for (let t = 0; t < 343; t++) {
                let circ = new Circle(Math.random() * canvas.width, Math.random() * canvas.height, 36, "white", 0, 0, .9, 1)
                this.balls.push(circ)
                this.links.push([])
            }
        }
        construct() {

            for (let t = 0; t < 343; t++) {
                // example_context.clearRect(0, 0, 56, 56)
                example_context.fillStyle = this.colors[t]
                example_context.fillRect(0, 0, 56, 56)
                // example_context.drawImage(pomaoimg, (pomaoimg.width / 343) * t, 0, (pomaoimg.width / 343), pomaoimg.height, 0, 0, example_canvas.width, example_canvas.height)
                this.data1 = example_context.getImageData(0, 0, example_canvas.width, example_canvas.height)

                let cut = 1
                let rsum = 0
                let gsum = 0
                let bsum = 0
                for (var i = 0; i < this.data1.data.length; i += 4) {

                    // if (this.data1.data[i] != this.data1.data[i + 1] && this.data1.data[i] != this.data1.data[i + 2]) {
                        cut++
                        rsum += (this.data1.data[i] / 255)
                        gsum += (this.data1.data[i + 1] / 255)
                        bsum += (this.data1.data[i + 2] / 255)
                    // }
                }
                rsum /= cut
                gsum /= cut
                bsum /= cut

                for (let k = 0; k < 343; k++) {
                    // example_context2.clearRect(0, 0, 56, 56)
                    example_context2.fillStyle = this.colors[k]
                    example_context2.fillRect(0,0,56,56)
                    // example_context2.drawImage(pomaoimg, (pomaoimg.width / 343) * k, 0, (pomaoimg.width / 343), pomaoimg.height, 0, 0, example_canvas2.width, example_canvas2.height)
                    this.data2 = example_context2.getImageData(0, 0, example_canvas2.width, example_canvas2.height)
                    let sum = 0



                    let cut2 = 1
                    let gsum2 = 0
                    let bsum2 = 0
                    let rsum2 = 0
                    for (var i = 0; i < this.data2.data.length; i += 4) {

                        // if (this.data2.data[i] != this.data2.data[i + 1] && this.data2.data[i] != this.data2.data[i + 2]) {
                            cut2++
                            rsum2 += (this.data2.data[i] / 255)
                            gsum2 += (this.data2.data[i + 1] / 255)
                            bsum2 += (this.data2.data[i + 2] / 255)
                        // }
                    }

                    rsum2 /= cut2
                    gsum2 /= cut2
                    bsum2 /= cut2

                    let inputArray = []
                    let inputArray2 = []
                    // for (var i = 0; i < this.data1.data.length; i += 4) {
                    //     inputArray.push(new Data((this.data1.data[i]) / 255))   //red
                    //     inputArray.push(new Data((this.data1.data[i + 1]) / 255))   //red
                    //     inputArray.push(new Data((this.data1.data[i + 2]) / 255))   //red
                    // // }

                    // // for (var i = 0; i < this.data2.data.length; i += 4) {
                    //     inputArray2.push(new Data(( this.data2.data[i]) / 255))   //red
                    //     inputArray2.push(new Data(( this.data2.data[i + 1]) / 255))   //red
                    //     inputArray2.push(new Data(( this.data2.data[i + 2]) / 255))   //red
                    // }
                    // truenet.compute(inputArray)
                    let r1 = rsum
                    let g1 = gsum
                    let b1 = bsum



                    // truenet.compute(inputArray2)
                    let r2 = rsum2
                    let g2 = gsum2
                    let b2 = bsum2


                    // for (let r = 0; r < this.data1.data.length; r += 4) {
                    // sum += (((Math.abs(this.data1.data[r] - this.data2.data[r]) + Math.abs(this.data1.data[r + 1] - this.data2.data[r + 1]) + Math.abs(this.data1.data[r + 2] - this.data2.data[r + 2]))) / (255 * 56 * 56 * 3)) * 1000
                    sum = ((((Math.abs(r1 - r2)+.01) * (Math.abs(g1 - g2)+.01) * (Math.abs(b1 - b2)+.01)))) * 10000000000
                    let colosr = `rgb(${((r1+r2)/2)*255}, ${((g1+g2)/2)*255}, ${((b1+b2)/2)*255})`
                    // }
                    this.matrix[t][k] = { k: k, t: t, d: Math.round(sum), color: colosr}
                }
            }
            this.springs = []
            this.links = []
            for (let t = 0; t < 343; t++) {
                this.links.push([])
            }

            for (let t = 0; t < this.matrix.length; t++) {
                this.matrix[t].sort((a, b) => (a.d > b.d) ? 1 : -1)
            }

            for (let t = 0; t < this.matrix.length; t++) {
                // this.nodes.push(t)
                let link = []
                for (let k = 0; k < this.matrix[t].length; k++) {
                    if(t == k){
                        continue
                    }
                    // console.log(this.links)
                    if ((this.matrix[t][k].d) <230000 && link.length < 4 && this.links[this.matrix[t][k].k].length < 4) {
                        // link.push(k)
                        // this.links[this.matrix[t][k].k].push(k)
                        let spring = new SpringOP(this.balls[t], this.balls[this.matrix[t][k].k], ((this.matrix[t][k].d / 1) * .0001)+11, (50 - this.matrix[t][k].d) / 17, "#FFAA00")
                        this.springs.push(spring)
                        // if (this.matrix[t][k].d < 230000) {
                            spring.beam.color = this.matrix[t][k].color // `rgb(${255 - ((28 - this.matrix[t][k].d) * 20)},  ${0 + ((28 - this.matrix[t][k].d) * 10)}, 0 )`
                        // }
                    }
                    this.links[t] = link
                }
                this.links[t] = link

            }

            for (let t = 0; t < this.links.length; t++) {
                // while (this.links[t].length < 1) {
                //     let spring = new SpringOP(this.balls[t], this.balls[this.matrix[t][this.links[t].length + 1].k], ((this.matrix[t][this.links[t].length + 1].d / 1) * 15)+10, (241 - this.matrix[t][this.links[t].length + 1].d) / 100,  this.matrix[t][this.links[t].length + 1].color)
                //     this.springs.push(spring)
                //     this.links[t].push(this.matrix[t][this.links[t].length + 1].k)
                // }
            }

            console.log(this)
        }
        draw() {

            for (let t = 0; t < this.springs.length; t++) {
                this.springs[t].balance()
            }

            for (let t = 0; t < this.balls.length; t++) {
                for (let k = 0; k < this.balls.length; k++) {
                    if (t != k) {
                        let link = new LineOP(this.balls[t], this.balls[k])
                        if (link.hypotenuse() < 220 || keysPressed['r']) {
                            this.balls[t].xmom += Math.cos(link.angle()) * .8
                            this.balls[t].ymom += Math.sin(link.angle()) * .8
                            this.balls[k].xmom -= Math.cos(link.angle()) * .8
                            this.balls[k].ymom -= Math.sin(link.angle()) * .8
                        } else if (link.hypotenuse() < 400) {
                            this.balls[t].xmom += Math.cos(link.angle()) * .3
                            this.balls[t].ymom += Math.sin(link.angle()) * .3
                            this.balls[k].xmom -= Math.cos(link.angle()) * .3
                            this.balls[k].ymom -= Math.sin(link.angle()) * .3
                        } else if (link.hypotenuse() < 500) {
                            this.balls[t].xmom += Math.cos(link.angle()) * .2
                            this.balls[t].ymom += Math.sin(link.angle()) * .2
                            this.balls[k].xmom -= Math.cos(link.angle()) * .2
                            this.balls[k].ymom -= Math.sin(link.angle()) * .2
                        } else {
                            if (link.hypotenuse() >1) {

                                this.balls[t].xmom += (Math.cos(link.angle()) / link.hypotenuse()) * .30
                                this.balls[t].ymom += (Math.sin(link.angle()) / link.hypotenuse()) * .30
                                this.balls[k].xmom -= (Math.cos(link.angle()) / link.hypotenuse()) * .30
                                this.balls[k].ymom -= (Math.sin(link.angle()) / link.hypotenuse()) * .30
                            }
                        }
                    }
                }
            }


            for (let t = 0; t < this.balls.length; t++) {
                if (keysPressed['f']) {
                    this.balls[t].xmom = 0
                    this.balls[t].ymom = 0
                    this.balls[t].friction = 0
                }
                this.balls[t].frictiveMove()
            }

            for (let t = 0; t < this.springs.length; t++) {
                this.springs[t].beam.draw()
            }
            for (let t = 0; t < this.balls.length; t++) {
                // this.balls[t].draw()
                // canvas_context.drawImage(pomaoimg, (pomaoimg.width / 343) * t, 0, (pomaoimg.width / 343), pomaoimg.height, this.balls[t].x - 96, this.balls[t].y - 96, 192, 192)
                canvas_context.fillStyle = this.colors[t]
                canvas_context.fillRect(this.balls[t].x - 20, this.balls[t].y - 20, 40, 40)



            }


        }
    }
    let pomaoimg = new Image()
    pomaoimg.src = 'fruitline2.png'
    let compare = new FruitCompare()

    compare.construct()
    let pcount = 0

    function main() {
        canvas_context.clearRect(0, 0, canvas.width, canvas.height)
        example_context.clearRect(0, 0, canvas.width, canvas.height)
        example_context2.clearRect(0, 0, canvas.width, canvas.height)
        if (keysPressed['o']) {
            compare.construct()
            return
        }

        // if (keysPressed['w']) {

        compare.draw()


        return
        // }

        //     if(cccc < 38000){
        //         cccc++
        // for(let t = 0;t<truenet.structure.length;t++){
        //     for(let k = 0;k<truenet.structure[t].length;k++){
        //         truenet.structure[t][k].bias = nightnet.structure[t][k].bias
        //         for(let w = 0;w<truenet.structure[t][k].weights.length;w++){
        //             truenet.structure[t][k].weights[w].setWeight(nightnet.structure[t][k][w].valueOf())
        //         }
        //     }
        // }
        //     }
        // if (keysPressed['y']) {
        //     //console.log(meshes)
        // }
        // if (keysPressed['x']) {
        //     example_context.clearRect(0,0,28,28)
        //     canvas_context.clearRect(0,0,78f4,784)
        // }
        // if (keysPressed[' ']) {
        //     example_context.clearRect(0,0,28,28)
        //     canvas_context.clearRect(0,0,784,784)
        // }

        if (!keysPressed['h']) {

            numcounter++
            // numcounter = Math.floor(Math.random()*modmax)
            numcounter %= modmax
            runner = numcounter % 10//Math.floor(Math.random()*10)

            canvas_context.clearRect(0, 0, 700, 700)
            // let view = new Viewer(truenet)
            // view.draw()
            if (true) {
                pcount++
                pcount %= 343
                example_context.drawImage(pomaoimg, (pomaoimg.width / 343) * pcount, 0, (pomaoimg.width / 343), pomaoimg.height, 0, 0, example_canvas.width, example_canvas.height)
                // if (runner == 0) {
                //     draw0()
                // } else if (runner == 1) {
                //     draw1()
                // }
                // else if (runner == 2) {
                //     draw2()
                // }
                // else if (runner == 3) {
                //     draw3()
                // }
                // else if (runner == 4) {
                //     draw4()
                // }
                // else if (runner == 5) {
                //     draw5()
                // }
                // else if (runner == 6) {
                //     draw6()
                // }
                // else if (runner == 7) {
                //     draw7()
                // }
                // else if (runner == 8) {
                //     draw8()
                // }
                // else if (runner == 9) {
                //     draw9()
                // }
            }
            // example_context.drawImage(canvas,0,0,canvas.width,canvas.height,3,0,22,28)
            const imageData = example_context.getImageData(0, 0, example_canvas.width, example_canvas.height);
            const data = imageData.data;

            let inputArray = []
            //console.log(truenet)
            inputArray2 = []
            let outs = []
            let gsum = 0
            let bsum = 0
            let rsum = 0
            let cut = 1
            for (var i = 0; i < data.length; i += 4) {
                outs.push(new Data((data[i]) / 255))   //red
                outs.push(new Data((data[i + 1]) / 255))   //red
                outs.push(new Data((data[i + 2]) / 255))   //red
                // outs.push(new Data((data[i+3])/255))   //red
                inputArray2.push(new Data((data[i]) / 255))   //red
                inputArray2.push(new Data((data[i + 1]) / 255))   //red
                inputArray2.push(new Data((data[i + 2]) / 255))   //red




                if (data[i] != data[i + 1] && data[i] != data[i + 2]) {
                    cut++
                    rsum += (data[i] / 255)
                    gsum += (data[i + 1] / 255)
                    bsum += (data[i + 2] / 255)
                }
                // inputArray2.push(new Data((data[i+3])/255))   //red
                // inputArray2.push(new Data((data[i] + data[i + 1] + data[i + 2]) / 765))   //red
            }
            rsum /= cut
            gsum /= cut
            bsum /= cut
            // console.log(rsum, gsum, bsum, cut, pcount)
            // for(let t = 0;t<truenet.outputs.length;t++){
            //     inputArray.push(new Data(truenet.outputs[t].valueOf()))
            // }
            let outs2 = []
            // for (let t = 0; t < 10; t++) {
            //     if (t == pcount) {
            //         if(keysPressed['p']){

            //             inputArray.push(Math.random())
            //             outs.push(Math.random())
            //             outs2.push(Math.random())
            //         }else{

            //         inputArray.push(1)
            //         outs.push(1)
            //         outs2.push(1)
            //         }
            //     } else {
            //         if(keysPressed['p']){

            //             inputArray.push(Math.random())
            //             outs.push(Math.random())
            //             outs2.push(Math.random())
            //         }else{

            //         inputArray.push(0)
            //         outs.push(0)
            //         outs2.push(0)
            //         }
            //     }
            // }

            for (let k = 0; k < 343; k++) {
                // let size = ((241 - compare.matrix[pcount][k].d) / 241) * ((241 - compare.matrix[pcount][k].d) / 241) * ((241 - compare.matrix[pcount][k].d) / 241) * ((241 - compare.matrix[pcount][k].d) / 241)

                inputArray.push(size)
                outs.push(size)
                outs2.push(size)
            }




            // for (let t = 0; t < 6; t++) {

            //     inputArray.push(Math.random())
            // }
            //console.log(inputArray)
            truenet.compute(inputArray2)
            // if(bigin.length<1000){
            //     bigin.unshift(inputArray2)
            // }else{
            //     bigin.unshift(inputArray2)
            //     bigin.splice(1000,10)
            // }
            // if(bigout.length<1000){
            //     bigout.unshift(outs2)
            // }else{
            //     bigout.splice(1000,10)
            //     bigout.unshift(outs2)
            // }
            // let max = 0
            // for (let t = 0; t < truenet.outputs.length; t++) {
            //     if (truenet.outputs[t] > max) {
            //         max = truenet.outputs[t]
            //         index = t
            //     }
            // }
            if (!keysPressed['p']) {

                truenet.calculateDeltasSigmoid([new Data(rsum), new Data(gsum), new Data(bsum)])
                truenet.adjustWeights()
            }
            // canvas_context.clearRect(0, 0, 28, 28)
            canvas_context.font = "22px arial"
            canvas_context.fillStyle = "white"
            canvas_context.clearRect(0, 0, 42, 42)
            // canvas_context.fillText((index  ) % 10, 19, 27)


            // size++
            // if (runner  == index) {
            //     truer++
            // }

            if (keysPressed['y']) {
                canvas_context.clearRect(0, 0, canvas.width, canvas.height)
                let view = new Viewer(truenet)
                view.draw()
            }
            // if (keysPressed['o']) {
            //     // if (Math.random() < .1) {
            //     //     //console.log(truenet.outputs)
            //     // }

            if (imgindex == 0 && runner == 0) {
                console.log(truenet)
                // console.log(truer / size)
                console.log(esum, "check")
                esum = 0
            }
            // }

            // for(let t = 0;t<1;t++){
            //     // truenet.compute(inputArray)
            //     // truenet.calculateDeltasSigmoid(outs)
            //     // truenet.adjustWeights()
            // }

            // for (let t = 0; t < imageData.data.length; t+=4) {
            //     imageData.data[t] = truenet.outputs[t].valueOf() * 255
            //     // imageData.data[t+1] = truenet.outputs[Math.floor(t / 4)].valueOf() * 255
            //     // imageData.data[t+2] = truenet.outputs[Math.floor(t / 4)].valueOf() * 255
            //     imageData.data[t+1] = truenet.outputs[t+1].valueOf() * 255
            //     imageData.data[t+2] = truenet.outputs[t+2].valueOf() * 255
            //     imageData.data[3] = 255// truenet.outputs[Math.floor(t / 4)].valueOf() * 255
            //     // if (t % 4 == 3) {
            //     //     imageData.data[t] = 255
            //     // }
            // }

            // canvas_context.putImageData(imageData, 350, 20);


        } else {

            canvas_context.clearRect(0, 0, canvas.width, canvas.height)
            let view = new Viewer(truenet)
            view.draw()
            if (keysPressed['p']) {
                //console.log(truenet)
                size = 0
                truer = 0
            }
            if (keysPressed['x']) {
                if (Math.random() < .99) {
                    numcounter++
                    let runner = numcounter % 10//Math.floor(Math.random()*10)
                    numcounter %= modmax
                    // if (runner == 0) {
                    //     draw0()
                    // } else if (runner == 1) {
                    //     draw1()
                    // }
                    // else if (runner == 2) {
                    //     draw2()
                    // }
                    // else if (runner == 3) {
                    //     draw3()
                    // }
                    // else if (runner == 4) {
                    //     draw4()
                    // }
                    // else if (runner == 5) {
                    //     draw5()
                    // }
                    // else if (runner == 6) {
                    //     draw6()
                    // }
                    // else if (runner == 7) {
                    //     draw7()
                    // }
                    // else if (runner == 8) {
                    //     draw8()
                    // }
                    // else if (runner == 9) {
                    //     draw9()
                    // }

                    // example_context.drawImage(canvas,0,0,canvas.width,canvas.height,3,0,22,28)
                    // const imageData = example_context.getImageData(0, 0, example_canvas.width, example_canvas.height);
                    // const data = imageData.data;

                    // inputArray = []
                    // inputArray2 = []
                    // for (var i = 0; i < data.length; i += 4) {
                    //     inputArray.push(new Data(((data[i] + data[i + 1] + data[i + 2]) / 765)))   //red
                    //     inputArray2.push(new Data(((data[i] + data[i + 1] + data[i + 2])/ 765) ))   //red
                    // }
                    // truenet.compute(inputArray)
                    // let outs = []
                    // let outs2 = []
                    // for (let t = 0; t < 10; t++) {
                    //     if (t == runner) {
                    //         outs.push(1)
                    //         outs2.push(1)
                    //     } else {
                    //         outs.push(0)
                    //         outs2.push(0)
                    //     }
                    // }
                    //console.log(bigin)
                    //console.log(bigout)
                    // if(bigin.length<1000){
                    //     bigin.unshift(inputArray2)
                    // }else{
                    //     bigin.unshift(inputArray2)
                    //     bigin.splice(1000,10)
                    // }
                    // if(bigout.length<1000){
                    //     bigout.unshift(outs2)
                    // }else{
                    //     bigout.splice(1000,10)
                    //     bigout.unshift(outs2)
                    // }
                    // truenet.calculateDeltasSigmoid(bigout, bigin)
                    // truenet.adjustWeights()

                    // let max = 0
                    // let index = 0
                    // for (let t = 0; t < truenet.outputs.length; t++) {
                    //     if (truenet.outputs[t] > max) {
                    //         max = truenet.outputs[t]
                    //         index = t
                    //     }
                    // }
                    // canvas_context.clearRect(0, 0, 28, 28)
                    // canvas_context.font = "12px arial"
                    // canvas_context.fillStyle = "white"
                    // canvas_context.fillText((index ) % 10, 9, 17)

                    // size++
                    // if (runner  == index) {
                    //     truer++
                    // }else{

                    //     //console.log(truenet)
                    //     // }
                    //     //console.log(index, runner)
                    //     //console.log(truer / size)
                    // }
                    // if (Math.random() < .1) {
                    //     if (Math.random() < .1) {
                    // }
                }
            }
        }


        if (keysPressed['l']) {
            let json = {}
            json.structure = []
            json.setup = [...truenet.setup]
            for (let t = 0; t < truenet.structure.length; t++) {
                json.structure.push({})
                for (let k = 0; k < truenet.structure[t].length; k++) {
                    json.structure[t][k] = {}
                    json.structure[t][k].bias = truenet.structure[t][k].bias.valueOf()
                    for (let w = 0; w < truenet.structure[t][k].weights.length; w++) {
                        json.structure[t][k][w] = (truenet.structure[t][k].weights[w].valueOf())
                    }
                }
            }
            console.log(json)
        }
        // oitsay.innerText = truenet.outputs.join(',')
        // oitsay.innerText += ":" + index + ":"
        if (keysPressed['v']) {
            canvas_context.clearRect(0, 0, 700, 700)
        }
    }



})