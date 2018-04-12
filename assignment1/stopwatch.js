
var started = false;
var interval;
var time = 0;
document.addEventListener("keydown", keyPress, false);
function startStop(){
    startStop(false);
}
function startStop(forceStop) {
    if (forceStop || started) {
        clearInterval(interval);
        started = false;
        return;
    }
    interval = setInterval(function () {
        time += 0.01;
        document.getElementById("timer").innerHTML = time.toFixed(2);
    }, 100)
    started = true;
}
function reset() {
    time = 0;
    startStop(true);
    document.getElementById("timer").innerHTML = "0";
    document.getElementById("timesTable").innerHTML = "";
}
function record() {
    var table = document.getElementById("timesTable");
    var row = table.insertRow(-1);
    row.innerHTML = time.toFixed(2);
}
function keyPress(e) {
    var k = e.which || e.keyCode;
    if (k == 82 || k == 114) { // r
        reset();
    } else if (k == 83 || k == 115) { // s
        startStop();
    } else if (k == 84 || k == 116) { // t
        record();
    }
}