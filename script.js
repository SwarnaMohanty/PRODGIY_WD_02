let startTime;
let updatedTime;
let difference;
let interval;
let timerRunning = false;
let lapCounter = 1;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startTimer() {
    if (!timerRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
        timerRunning = true;
    } else {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
        timerRunning = false;
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds + '.' + 
        (milliseconds < 10 ? '0' : '') + milliseconds;
}

function resetTimer() {
    clearInterval(interval);
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    timerRunning = false;
    difference = 0;
    lapCounter = 1;
    laps.innerHTML = '';
}

function recordLap() {
    if (timerRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = 'Lap ' + lapCounter + ': ' + lapTime;
        laps.appendChild(lapItem);
        lapCounter++;
    }
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
