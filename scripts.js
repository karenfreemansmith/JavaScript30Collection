const bandList = document.querySelector("#bands");
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anyathing', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(bandName) {
  return bandName.replace(/^a |the |an /i, '').trim();
}

const sortedBands = bands.sort(function(a, b) {
  if (strip(a) > strip(b)) {
    return 1;
  } else {
    return -1;
  }
});

bandList.innerHTML = sortedBands.map(band => `<li>${band}</li>`).join('');
