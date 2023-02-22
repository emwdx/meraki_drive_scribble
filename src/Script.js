export class Script extends MerakiScript {

    CANVAS_SIZE = 2000;
    PROJECT_NAME = "PROJECT_NAME"
    SELECTED_PALETTE;
    TRACK_WIDTH = 50;



    PALETTE_COLLECTION = [
        { name: "mogoito_beach", is_emwdx: true, not_background: [[255, 193, 0, 255]], palette: [[59, 72, 85, 255], [88, 133, 164, 255], [129, 188, 243, 255], [178, 230, 255, 255], [139, 161, 143, 255], [202, 189, 177, 255], [255, 193, 0, 255]] },
        { name: "regaleira_spiral", is_emwdx: true, not_background: [[170, 182, 121, 255], [255, 53, 75, 255]], palette: [[40, 28, 16, 255], [111, 83, 78, 255], [135, 138, 135, 255], [255, 53, 75, 255], [170, 182, 121, 255]] },
        { name: "sintra_square", is_emwdx: true, not_background: [], palette: [[209, 227, 221, 255], [195, 212, 207, 255], [243, 203, 191, 255], [199, 159, 144, 255], [63, 80, 101, 255], [108, 173, 251, 255], [74, 81, 94, 255]] },
        { name: "lunch_date", is_emwdx: true, not_background: [[241, 216, 189, 255], [234, 23, 20, 255]], palette: [[234, 23, 20, 255], [140, 0, 0, 255], [241, 216, 189, 255], [231, 161, 111, 255], [49, 58, 40, 255], [184, 186, 162, 255], [179, 220, 224, 255]] },
        { name: "gray_land", is_emwdx: true, not_background: [], palette: ["#000", "#222", "#444", "#666", "#888", "#CCC", "#FFF"] },
        { name: "sand_sky_sun", is_emwdx: true, not_background: [], palette: [[221, 196, 169, 255], [133, 188, 229, 255], [129, 188, 229, 255], [47, 118, 199, 255], [45, 118, 207, 255], [255, 86, 53, 255], [45, 116, 197, 255], [251, 24, 0, 255]] },
        { name: "seaside_town", is_emwdx: true, not_background: [], palette: [[248, 244, 235, 255], [217, 208, 188, 255], [93, 165, 230, 255], [228, 192, 95, 255], [12, 95, 182, 255], [0, 66, 143, 255], [0, 64, 141, 255], [19, 18, 12, 255]] },
        { name: "castle_wall_sky", is_emwdx: true, not_background: [], palette: [[39, 67, 99, 255], [84, 130, 202, 255], [125, 154, 215, 255], [143, 211, 253, 255], [195, 240, 255, 255], [0, 5, 0, 255]] },

        { name: "maximalism", is_emwdx: true, not_background: [], palette: [[248, 244, 235, 255], [245, 244, 233, 255], [244, 244, 233, 255], [243, 242, 231, 255], [231, 234, 231, 255], [211, 211, 202, 255], [210, 210, 201, 255], [217, 208, 188, 255], [93, 165, 230, 255], [220, 184, 87, 255], [228, 192, 95, 255], [206, 167, 70, 255], [12, 95, 182, 255], [113, 105, 94, 255], [0, 66, 143, 255], [0, 64, 141, 255], [90, 73, 67, 255], [205, 205, 196, 255], [19, 18, 12, 255], [221, 196, 169, 255], [216, 191, 164, 255], [133, 188, 229, 255], [129, 188, 229, 255], [129, 182, 219, 255], [47, 118, 199, 255], [45, 118, 207, 255], [255, 86, 53, 255], [255, 56, 28, 255], [45, 116, 197, 255], [212, 0, 0, 255], [251, 24, 0, 255], [101, 0, 0, 255], [84, 0, 0, 255], [49, 24, 20, 255], [36, 10, 6, 255]] },
        { name: "penguin_paddock", is_emwdx: true, not_background: [], palette: [[177, 176, 174, 255], [79, 93, 89, 255], [58, 139, 137, 255], [255, 72, 53, 255], [175, 0, 0, 255], [14, 38, 46, 255], [0, 154, 158, 255], [47, 58, 78, 255]] },
    ]

    palette_probs = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
    isColorPage = 0;



    SELECTED_PALETTE = this.PALETTE_COLLECTION[0];


    cars = []
    NUM_CARS = 25;
    NUM_CIRCLES = 8;
    trackCanvas;


    execute() {

        createCanvas(this.CANVAS_SIZE, this.CANVAS_SIZE);
        let palette = this.SELECTED_PALETTE.palette.slice(0, this.SELECTED_PALETTE.palette.length - 1)
        palette = shuffle(palette)
        background(palette[0])
        palette.shift()
        let randomSeedValue = int(random() * 100000000); // generate a random seed for fx_hash
        randomSeed(randomSeedValue)
        this.trackCanvas = createGraphics(this.CANVAS_SIZE, this.CANVAS_SIZE);
        this.trackCanvas.background(255);

        fill(palette[1])

        this.trackCanvas.stroke(0);
        this.trackCanvas.strokeWeight(this.TRACK_WIDTH);
        this.trackCanvas.fill(255);

        for (let i = 0; i < this.NUM_CIRCLES; i++) {
            let trackCircle = [random(0.2 * this.CANVAS_SIZE, 0.6 * this.CANVAS_SIZE), random(0.2 * this.CANVAS_SIZE, 0.6 * this.CANVAS_SIZE), random(this.CANVAS_SIZE / 5, this.CANVAS_SIZE / 2)]
            let trackWidth = random(60, 260);
            if (random() > 0.5) {
                this.trackCanvas.circle(trackCircle[0], trackCircle[1], trackCircle[2])
            }
            else {
                this.trackCanvas.rect(trackCircle[0], trackCircle[1], trackCircle[2], trackCircle[2])
            }



            let carStart = [trackCircle[0] + trackCircle[2] + (random(0, trackWidth)), trackCircle[1]/*+(random(-trackWidth,trackWidth))*/]
            noStroke()

            for (let i = 0; i < this.NUM_CARS; i++) {
                palette = shuffle(palette)
                let carStart = [trackCircle[0] + 0.5 * trackCircle[2] + (random(-0.5 * trackWidth, 0.5 * trackWidth)), trackCircle[1] + (random(-0.5 * trackWidth, 0.5 * trackWidth))]
                let car = new Car(carStart[0], carStart[1], random([-10, -5, 5, 2, 10, -180, -190, -170]), palette[0])
                circle(carStart[0], carStart[1], 3)
                this.cars.push(car)
            }
        }
        }// end execute

        draw() {
            super.draw();
            // p5 draw() code here

            noStroke()
            if (frameCount > 10) {
                for (let i = 0; i < this.NUM_CARS * this.NUM_CIRCLES; i++) {
                    if (this.cars[i].isDriving) {
                        fill(this.cars[i].palette)


                        this.cars[i].draw(this.trackCanvas)
                        this.cars[i].steer()

                        circle(this.cars[i].x, this.cars[i].y, random(1, 3))


                        //line(cars[i].x,cars[i].y,cars[cars[i].points.length - 1].x,cars[cars[i].points.length - 1].y)




                        noStroke()
                    }


                }
            }



            if (frameCount > 300) {
                noLoop()
                //clear()
                //strokeWeight(1);
                //background(255)
                //fill(0)

                for (let i = 0; i < this.NUM_CARS * this.NUM_CIRCLES; i++) {
                    //console.log(cars[i].points)
                    noFill()
                    beginShape()
                    for (let j = 1; j < this.cars[i].points.length; j++) {
                        //circle(cars[i].points[j][0],cars[i].points[j][1],random(1,3))
                        strokeWeight(1)
                        stroke(this.cars[i].palette)
                        //line(cars[i].points[j][0],cars[i].points[j][1],cars[i].points[j-1][0],cars[i].points[j-1][1])
                        curveVertex(this.cars[i].points[j][0], this.cars[i].points[j][1])
                    }
                    endShape()

                }
            }

        }

        initialize() {
            super.initialize();
            // p5 preload() code here
        }

        version() {
            return '0.0.1';
        }

        configure() {
            return {
                sdkVersion: '1.x',
                renderTimeMs: 500,
                library: {
                    name: 'p5',
                    version: '1.4.0',
                }
            }
        }

        traits() {
            //ScriptTraits is automatically imported
            const traits = new ScriptTraits();

            return { color: Meraki.random.element(traits.color()) };
        }
    }


    //const canvasSize = 600.0;
//const trackRadius = 0.7*canvasSize;
//const trackWidth = 50.0;
//const driveConstant = 4;
//const driveSpeed = 150.0;
//const sensorMaxValue = 100;
//const sideSensorAngle = 45;
//let x = 0.5*canvasSize+0.5*trackRadius;
//let y = 0.5*canvasSize;
//let angle = 0;

//var state = 'waiting'
//let controllers = [];
//let pathPoints = [[0.5*canvasSize+0.5*trackRadius,0.5*canvasSize],[0.5*canvasSize+0.5*trackRadius,0.5*canvasSize-100]];
//let pathPointsString = "[[0.5*canvasSize+0.5*trackRadius,0.5*canvasSize],[0.5*canvasSize+0.5*trackRadius,0.5*canvasSize-100]]";



class Car{

    constructor(x,y,angle,palette){

        this.x = x;
  this.y = y;
  this.angle = angle;
  this.steerAngle = angle;
  this.carHeight = 10;
  this.carWidth = 20;
  this.leftEdgeDistance = 0.0;
  this.rightEdgeDistance = 0.0;
  this.leftFrontEdgeDistance = 0.0;
  this.rightFrontEdgeDistance = 0.0;
  this.frontEdgeDistance = 0.0;
  this.sensorValues = []
  this.driftDistance = 0.0;
  this.maxSteerAngle = 361.0;
  this.sensorMaxValue = 100;
  this.sideSensorAngle = 45;
  this.roadBrightness = 50;
  this.points = [];
  this.isDriving = 1;
  this.palette = palette;
  
  this.driveSpeed = random(100,250.0);
  this.driveConstant = this.driveSpeed*0.027;
  
    }
  
  
  draw(context){

    
  if(this.y < 10 || this.y > height-10){
    this.isDriving = 0;
  }
  if(this.x < 10 || this.x > width-10){
    this.isDriving = 0;
  }
    
  push() 
  noFill()
  noStroke();
 
  
  translate(this.x, this.y);
  rotate(this.angle);
  this.y -= 0.05*this.driveSpeed*cos(this.angle);
  this.x += 0.05*this.driveSpeed*sin(this.angle);
  this.points.push([this.x,this.y])
  pop();
    
  push()
  strokeWeight(1);
  stroke(255)
  angleMode(DEGREES)
  //this.drawCarImage();
  this.checkEdgeSensors(context);
  //this.drawEdgeSensors();
  ///fill(10,10,10);
  
  ///rect(canvasSize/2 - 50,canvasSize/2,10,0.5*this.leftEdgeDistance);
  //rect(canvasSize/2,canvasSize/2,10,0.5*this.frontEdgeDistance);
  //rect(canvasSize/2+50,canvasSize/2,10,0.5*this.rightEdgeDistance);
  
  pop();
  }
  
  steer(){
    let error = (this.rightEdgeDistance - this.leftEdgeDistance)
    
    let signal = error*this.driveConstant

    let driveAngle = this.angle + signal
    
    if(driveAngle>this.maxSteerAngle){
      driveAngle = this.maxSteerAngle;
    }
    else if(driveAngle < -this.maxSteerAngle){
      driveAngle =this.maxSteerAngle;
    }
    else{
    this.angle = driveAngle;
    if (abs(this.angle)> 360.0){
      this.angle = 0;
    }
    }
    
//     this.angle = driveAngle;
//     if (abs(this.angle)> 360.0){
//       this.angle = 0;
//     }
    
  }
  
  drawCarImage(){
    noFill()
    rectMode(CENTER)
    //stroke(255)
        strokeWeight(0.5);
        push()
        translate(this.x,this.y)
        rotate(this.angle)
    //rect(0,0,this.carHeight,this.carWidth);
    //fill(color(0,180,0));
    //rect(x,y-0.55*this.carHeight,0.5*this.carWidth,0.55*this.carHeight);
    rectMode(CORNER)
    pop()
  }
  
  checkEdgeSensors(context){
  
    for(var i = 0;i<this.sensorMaxValue;i+= 2){
      
      let edgeSensorValue = context.get(round(this.x+i*cos(this.angle)),round(this.y+i*sin(this.angle)));

      if(edgeSensorValue[1]>this.roadBrightness){
        this.rightEdgeDistance = i;
        break;
      }
      else{
        this.rightEdgeDistance = this.sensorMaxValue;
      }
    }
    for(var i = 0;i>-this.sensorMaxValue;i-= 2){
      let edgeSensorValue = context.get(round(this.x+i*cos(this.angle)),round(this.y+i*sin(this.angle)));
      
      if(edgeSensorValue[1]>this.roadBrightness){
        this.leftEdgeDistance = -i;
        break;
      }
      else{
        this.leftEdgeDistance = this.sensorMaxValue;
      }
    }
    for(var i = 0;i< this.sensorMaxValue;i+= 2){
        
       let edgeSensorValue = context.get(round(this.x+i*sin(this.angle)),round(this.y-i*cos(this.angle)));
      if(edgeSensorValue[1]>this.roadBrightness ){
        this.frontEdgeDistance = i;
        break;
      }
      else{
        this.frontEdgeDistance = this.sensorMaxValue;
      }
    }
    for(var i = 0;i<this.sensorMaxValue;i+= 2){
       let edgeSensorValue = context.get(round(this.x-i*sin(-this.angle+this.sideSensorAngle)),round(this.y-i*cos(-this.angle+this.sideSensorAngle)));
      if(edgeSensorValue[1]>this.roadBrightness){
        this.leftFrontEdgeDistance = i;
        break;
      }
      else{
        this.leftFrontEdgeDistance = this.sensorMaxValue;
      }
    }
  
     for(var i = 0;i< this.sensorMaxValue;i+= 2){
       let edgeSensorValue = context.get(round(this.x+i*sin(this.angle+this.sideSensorAngle)),round(this.y-i*cos(this.angle+this.sideSensorAngle)));
      if(edgeSensorValue[1]>this.roadBrightness){
        this.rightFrontEdgeDistance = i;
        break;
      }
      else{
        this.rightFrontEdgeDistance = this.sensorMaxValue;
      }
    }
    //console.log(this.sensorValues)
    this.sensorValues = [this.leftEdgeDistance,this.leftFrontEdgeDistance,this.frontEdgeDistance,this.rightFrontEdgeDistance,this.rightEdgeDistance]
  }
  
drawEdgeSensors (){
    
  push() 
  stroke(color(200,0,0));
  strokeWeight(3);
  
  translate(this.x, this.y);
  rotate(this.angle);
  let x = 0-this.leftEdgeDistance;

  line(0, 0, x, 0)
  x = 0+this.rightEdgeDistance;

  line(0, 0, x, 0)

  y = 0-this.frontEdgeDistance;
  line(0, 0, 0, y)

  x = 0 - this.leftFrontEdgeDistance*sin(sideSensorAngle);  
  y = 0 - this.leftFrontEdgeDistance*cos(sideSensorAngle);

  line(0, 0, x, y)

  x = 0 + this.rightFrontEdgeDistance*sin(sideSensorAngle);  
  y = 0 - this.rightFrontEdgeDistance*cos(sideSensorAngle);
  line(0, 0, x, y)
  
  pop();
       
  }
  
  resetPosition(){
    this.y = 0.5*canvasSize;
    this.x = 0.5*canvasSize+0.5*trackRadius;
    this.angle = 0;
    
  }
  
}
