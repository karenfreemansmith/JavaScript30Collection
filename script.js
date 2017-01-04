const canvas = document.querySelector('#draw');
const options = document.querySelector('#options');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;
ctx.globalCompositeOperation = document.querySelector('input[name="blend"]:checked').value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if(!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
  hue++;
  hue>=360? 0:hue;

  if (ctx.lineWidth >= 75 || ctx.lineWidth <=1) {
    direction = !direction;
  }

  direction? ctx.lineWidth++:ctx.lineWidth--;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e)=> {
  isDrawing = true;
  [lastX,lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', ()=>isDrawing = false);
canvas.addEventListener('mouseout', ()=>isDrawing = false);

options.addEventListener('click', ()=> {
  ctx.globalCompositeOperation = document.querySelector('input[name="blend"]:checked').value;
});
