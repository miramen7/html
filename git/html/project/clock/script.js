// query the data from html
const jarumDetik = document.querySelector('[data-detik]')
const jarumMenit = document.querySelector('[data-menit]')
const jarumJam = document.querySelector('[data-jam]')

// setInterval: fungsi ga perlu ada parentheses
setInterval(setJamDinding, 1000);

// jangan lupa declare fungsi
function setJamDinding() {
  const currentDate = new Date();
  const detikRatio = currentDate.getSeconds() / 60;
  const menitRatio = (detikRatio + currentDate.getUTCMinutes()) /60;
  const jamRatio = (menitRatio + currentDate.getHours()) / 12;

  setRatio(jarumDetik, detikRatio);
  setRatio(jarumMenit, menitRatio);
  setRatio(jarumJam, jamRatio);
}

function setRatio (element, ratio) {
  element.style.setProperty('--rotation', ratio * 360);
}

setJamDinding();