var alarmSound;
var alarmTriggered = false;

function addTask() {
    var input = document.getElementById("taskInput").value;
    var alarmTime = document.getElementById("alarmInput").value;

    if (input === "") {
        alert("Please enter a task!");
        return;
    }

    var ul = document.getElementById("taskList");
    var li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = input + ' (Alarm: ' + formatDate(alarmTime) + ')';
    ul.appendChild(li);
    document.getElementById("taskInput").value = "";
    document.getElementById("alarmInput").value = "";

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
        ul.removeChild(li);
    };
    li.appendChild(deleteButton);

    var alarmDateTime = new Date(alarmTime).getTime();
    var now = new Date().getTime();
    var timeUntilAlarm = alarmDateTime - now;

    if (timeUntilAlarm > 0) {
        setTimeout(function () {
            alarmTriggered = true;
            var alarmSoundObj = playAlarmSound();
            ul.removeChild(li);
            var cancelButton = document.createElement("button");
            cancelButton.innerHTML = "Cancel Alarm";
            cancelButton.onclick = function () {
                stopAlarmSound(alarmSoundObj);
            };
            li.appendChild(cancelButton);
        }, timeUntilAlarm);
    } else {
        alert("Invalid alarm time. Please select a future time.");
    }
}

function playAlarmSound() {
    alarmSound = new Audio('alarm_sound.mp3');
    alarmSound.loop = true;
    alarmSound.play();
    return alarmSound;
}

function stopAlarmSound(alarmSoundObj) {
    if (alarmSoundObj) {
        alert("Alarm: Alarm cancelled.");
        alarmSoundObj.pause();
        alarmSoundObj.currentTime = 0;
        alarmTriggered = false;
    }
}

function formatDate(dateString) {
    var date = new Date(dateString);
    var formattedDate = date.toLocaleString();
    return formattedDate;
}

window.addEventListener("beforeunload", function (event) {
    if (alarmTriggered) {
        stopAlarmSound(alarmSound);
    }
});