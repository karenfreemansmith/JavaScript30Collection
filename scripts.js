const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error("Oh, no...this doesn't work without your webcam!", err);
  });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0,0,width,height);
    pixels = colorEffects(pixels);
    pixels = rgbSplit(pixels);
    if(document.querySelector('h3 input').checked==true) {
      pixels = greenScreen(pixels);
    }
    ctx.putImageData(pixels, 0,0);
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'photo');
  link.innerHTML = `<img src="${data}" alt="Your Photo" />`;
  strip.insertBefore(link, strip.firstChild);
}

function colorEffects(pixels) {
  const filters = {};
  document.querySelectorAll('.filters input').forEach((input) => {
    filters[input.name] = input.value;
  });

  for(let i=0; i<pixels.data.length; i+=4) {
    pixels.data[i+0] = pixels.data[i+0] + parseInt(filters.redfilter); //RED
    pixels.data[i+1] = pixels.data[i+1] + parseInt(filters.greenfilter);  //GREEN
    pixels.data[i+2] = pixels.data[i+2] + parseInt(filters.bluefilter); //BLUE
  }
  return pixels;
}

function rgbSplit(pixels) {
  const offsets = {};
  document.querySelectorAll('.offset input').forEach((input) => {
    offsets[input.name] = input.value;
  });

  for(let i=0; i<pixels.data.length; i+=4) {
    pixels.data[i-parseInt(offsets.split)/2] = pixels.data[i+0]; //RED
    pixels.data[i+parseInt(offsets.split)] = pixels.data[i+1]; //GREEN
    pixels.data[i-parseInt(offsets.split)] = pixels.data[i+2]; //BLUE
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for(let i=0; i<pixels.data.length; i+=4) {
    red = pixels.data[i+0];
    green = pixels.data[i+1];
    blue= pixels.data[i+2];
    alpha = pixels.data[i+3];

    if(red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        pixels.data[i+3]=0;
      }
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
