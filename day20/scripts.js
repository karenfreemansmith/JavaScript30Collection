const recognition = new webkitSpeechRecognition();
//(SpeechRecognition || webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = true;
//recognition.maxAlternatives = 5;
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e=> {
  //console.log(e.results);
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  //console.log(transcript);
  p.textContent = transcript;
  if(e.results[0].isFinal) {
    p=document.createElement('p');
    words.appendChild(p);
  }
});

recognition.addEventListener('end', recognition.start);
recognition.start();
