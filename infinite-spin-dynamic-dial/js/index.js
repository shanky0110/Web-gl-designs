//learn more about this here http://greensock.com/cube-dial-tutorial


var body, stageWidth, stageHeight, numFaces, myDialDraggable;

function init (){

  //reference to the stage
  body = document.body;

  container = document.createElement('div');
  container.className = 'container';
  body.appendChild(container);

  TweenMax.set(container, {
    width:'100%',
    height:'auto'
  });


  stageWidth = 1024;
  stageHeight = 768;
  numFaces = 10;
  initialFace = 0;
  fullRotation = 360;
  rotationStep = fullRotation/numFaces;
  dialWidth = 300;
  dialHeight = 300;

  createDialGraphics();
  createDial();
  setDialDraggable();
}



function createDialGraphics(){
  dialGraphic = document.createElement('div');
  dialGraphic.className = 'dial-graphic';

  TweenMax.set(dialGraphic, {
    position:'absolute',
    left:'50%',
    xPercent:-50,
    yPercent:-50,
    top:'50%',
    width:dialWidth, 
    height:dialHeight, 
    overflow:'hidden',
    backgroundImage:'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/greenDial.png)'
  });

  body.appendChild(dialGraphic);

}

function createDial(){
  dial = document.createElement('div');
  dial.className = 'dial';
  TweenMax.set(dial, {
    position:'absolute',
    left:'50%',
    xPercent:-50,
    width:dialWidth, 
    height:dialHeight,
    yPercent:-50,
    top:'50%'
  });

  var dialNumContainer, dialNum;

  for(var i = 0; i < numFaces; i++){

    dialNumContainer = document.createElement('div');
    dialNum = document.createElement('div');
    dialNum.className = 'dial-number';
    dialNum.innerHTML = i;
    TweenMax.set(dialNumContainer, {
      position:'absolute',
      x:(dialWidth/2) - (20/2),
      y:30,

      width:20,
      height:20,
      rotation:rotationStep * i,
      textAlign:'center',
      transformOrigin:'50% 120px'
    });

    TweenMax.set(dialNum, {
      position:'absolute',
      width:20,
      height:20,
      fontSize:20,
      textAlign:'center',
      color:'white',
      fontFamily:'Arial, Helvetica, sans-serif',
    });

    dialNum.initRotation = rotationStep * i;
    dialNumContainer.appendChild(dialNum);
    dial.appendChild(dialNumContainer);

  }
  body.appendChild(dial);
  setNumberRotation();
}


function setDialDraggable(){
  myDialDraggable = Draggable.create(dial, {
    type:'rotation',
    dragResistance:0.4,
    maxDuration:1,
    throwResistance:0,
    throwProps:true,
    onDrag:setNumberRotation,
    onThrowUpdate:setNumberRotation,
    ease:Back.easeOut.config(0.3),
    snap:function(endValue){
      return Math.round(endValue/rotationStep) * rotationStep;
    }
  })
}


function setNumberRotation(){
  var i = document.getElementsByClassName('dial-number').length, currNum;
  while(--i > -1){
    currNum = document.getElementsByClassName('dial-number')[i];
    TweenMax.set(currNum, {
      rotation:-dial._gsTransform.rotation - currNum.initRotation
    })
  }
}



init();

/*This demo uses GreenSock's ThrowPropsPlugin to achieve the momentum-based spin animation. 

ThrowPropsPlugin is a bonus plugin for Club GreenSock members.

You can find out more about the benefits of becoming a Club GreenSock member here: http://www.greensock.com/club
*/