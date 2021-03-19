'use strict';

window.onload = function () {
  //select canvas
  let canvas = document.getElementById('paint-canvas');
  let context = canvas.getContext('2d');//research
  let boundings = canvas.getBoundingClientRect();//research
  let range = document.getElementById('brush').value;


  //mouse position research
  let mouseX = 0;
  let mouseY = 0;
  let isDrawing = false;
  context.strokeStyle = 'black';//canvas 2d API

  //brush size
  let brush = document.getElementById('brush');

  brush.addEventListener('input', function (brush) {
    context.lineWidth = brush.target.value;
  });

  //colors handle
  let colors = document.getElementsByClassName('colors')[0];

  colors.addEventListener('click', function(event){
    context.strokeStyle = event.target.value || 'black';
  });

  // mouse down event
  canvas.addEventListener('mousedown', function(event){
    setMouseCoordinates(event)
    isDrawing = true

  //start drawing
    context.beginPath();
    context.moveTo(mouseX, mouseY)
  });

  //mouse move event
  canvas.addEventListener('mousemove', function(event){
    setMouseCoordinates(event)

    if(isDrawing){
      context.lineTo(mouseX, mouseY)
      context.stroke()
    }
  });

  //mouse up event
  canvas.addEventListener('mouseup', function(event){
    setMouseCoordinates(event)
    isDrawing = false
  });

  //mouse coordinates handle
  function setMouseCoordinates(event){
    mouseX = event.clientX - boundings.left
    mouseY = event.clientY - boundings.top
  };

  //clear button
  let clearButton = document.getElementById('clear')

  clearButton.addEventListener('click', function(){
    context.clearRect(0, 0, canvas.width, canvas.height)
  });

  //save button
  let saveButton = document.getElementById('save')

  saveButton.addEventListener('click', function(){
    let imageName = prompt('Enter image name')
    let url = canvas.toDataURL()
    let link = document.createElement('a')
    link.href = url
    link.download = imageName.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  });
}


//navigation button - social media
document.getElementById('gitHub').onclick = function () {
  window.open ('https://github.com/')
};
document.getElementById('xing').onclick = function () {
  window.open ('https://www.xing.com/profile/Milijan_Popovic2/cv')
};
document.getElementById('linkedIn').onclick = function () {
  window.open ('https://www.linkedin.com/in/milijan-popovic/')
};
//start button
document.getElementById('start').onclick = function () {
  window.open ('index.html', '_self')
};

//time
let time = moment();
document.getElementById('clock').textContent = time.format ('LT');

let date = document.getElementById('clock')
date.addEventListener('click', ()=>{
  date.textContent = moment().format('LLLL')
  setTimeout(() => {
    let time = moment();
  document.getElementById('clock').textContent = time.format ('LT');
  }, 5000);
})