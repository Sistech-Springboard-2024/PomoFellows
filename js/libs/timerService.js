let global_intervalId = null;
let global_timerElement = null;
let global_timerMinutes = 25;
let global_timerSeconds = 0;


function timerService_displayErrorMessage(message) {
    console.error(message);
    alert(message);
}

function timerService_checkTimerIsValid() {
    if (global_timerElement) {
        return true;
    }

    timerService_displayErrorMessage("Should create timer elements first - Use createTimerElements");
    return false;
}

function timerService_updateTimerWithValue() {
    global_timerElement.textContent =
        (global_timerMinutes < 10 ? "0" + global_timerMinutes : global_timerMinutes)
        + ":"
        + (global_timerSeconds < 10 ? "0" + global_timerSeconds : global_timerSeconds);
}

function timerService_setTimerValue(minutes, seconds = 0) {
    if (!timerService_checkTimerIsValid()) {
        return;
    }

    if (isNaN(minutes)) {
        timerService_displayErrorMessage("Try to set timer minutes with invalid number : " + minutes);
        return;
    }
    if (isNaN(seconds)) {
        timerService_displayErrorMessage("Try to set timer sconds with invalid number : " + seconds);
        return;
    }

    global_timerMinutes = parseInt(minutes, 10);
    global_timerSeconds = parseInt(seconds, 10);

    timerService_updateTimerWithValue();
}

function timerService_createTimer(
    timerElementId,
    minutes,
    seconds = 0,
) {
    global_timerElement = document.getElementById(timerElementId);
    
    timerService_setTimerValue(minutes, seconds);
}

function timerService_timerFunction() {
    if (global_timerSeconds === 0) {
        global_timerMinutes--;
        global_timerSeconds = 59;
    }
    else {
        global_timerSeconds--;
    }

    timerService_updateTimerWithValue();

    if (global_timerMinutes === 0 && global_timerSeconds === 0) {
        clearInterval(global_intervalId);
        global_intervalId = null;
    }
}

function timerService_startTimer() {
    if (!timerService_checkTimerIsValid()) {
        return;
    }

    global_intervalId = setInterval(timerService_timerFunction, 1000);
}

function timerService_stopTimer() {
    clearInterval(global_intervalId);
    global_intervalId = null;
}

timerService_createTimer("countdown", 25);
timerService_setTimerValue(25);
document.getElementById('button-debut').addEventListener('click', timerService_startTimer);
document.getElementById('button-arreter').addEventListener('click', timerService_stopTimer);