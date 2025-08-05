let rightSideUp = true;

// Sand timer elements
const sandTimerContainer = {
    element: document.querySelector('.sand-timer-container'),
    angle: 0
};
const sandTimerSandTop = {
    element: document.querySelector('.sand-timer-sand-top'),
    topR1P1: '-82%',
    topR1P2: '102%',
    topR2P1: '23%',
    topR2P2: '0%'
};
const sandTimerSandMiddle = {
    element: document.querySelector('.sand-timer-sand-middle'),
    topR1P1: '101%',
    topR1P2: '50%',
    topR2P1: '-1%',
    bottomR1P1: '-1%',
    bottomR2P1: '101%',
    bottomR2P2: '50%'
};
const sandTimerSandFalling = {
    element: document.querySelector('.sand-timer-sand-falling'),
    topR1P1: '5%',
    topR1P2: '65%',
    topR2P1: '30%',
    topR2P2: '47%',
    bottomR1P1: '30%',
    bottomR1P2: '47%',
    bottomR2P1: '5%',
    bottomR2P2: '65%'
};
const sandTimerSandBottom = {
    element: document.querySelector('.sand-timer-sand-bottom'),
    bottomR1P1: '23%',
    bottomR1P2: '0%',
    bottomR2P1: '-82%',
    bottomR2P2: '102%'
};
const sandTimerTimeTop = document.querySelector('.sand-timer-time-top');
const sandTimerTimeBottom = document.querySelector('.sand-timer-time-bottom');


let timePassed = 0;
let timeRemaining = 0;
let chosenTime = 10 * 1000; // 10 seconds in milliseconds

// Set the initial time remaining and passed
const sandTimerTimeRemaining = document.querySelector('.sand-timer-time-remaining');
// const sandTimerTimePassed = document.querySelector('.sand-timer-time-passed');
sandTimerTimeRemaining.textContent = '0:10';
// sandTimerTimePassed.textContent = '0:00';

// When .sand-timer-container is clicked, start the sand timer
sandTimerContainer.element.addEventListener('click', function() {
    if (timeRemaining <= 0) {
        const sandTimerTimeRemaining = document.querySelector('.sand-timer-time-remaining');
        const sandTimerTimePassed = document.querySelector('.sand-timer-time-passed');

        const timeSet = chosenTime;
        const totalTime = timeSet + 500; // 500ms for the initial 180 degree rotation
        let totalTimePassed = 0;
        let totalTimeRemaining = totalTime;
        timePassed = 0;
        timeRemaining = timeSet;
        let flowStartEndDuration = 500;
        let topSandDuration = timeSet - flowStartEndDuration;
        let bottomSandDuration = timeSet - flowStartEndDuration;
        let hasFlipped = false;

        const fps = 60; // frames per second
        const speed = 1000 / fps;
        const timerInterval = setInterval(function() {

            totalTimePassed += speed;
            totalTimeRemaining -= speed;

            if (totalTimePassed >= 500) {
                timePassed += speed;
                timeRemaining -= speed;
            }

            let secondsPassed = Math.floor(timePassed / 1000);
            let displayMinutesPassed = Math.floor(secondsPassed / 60);
            let displaySecondsPassed = secondsPassed % 60;

            let secondsRemaining = Math.ceil(timeRemaining / 1000);
            let displayMinutesRemaining = Math.floor(secondsRemaining / 60);
            let displaySecondsRemaining = secondsRemaining % 60;
            sandTimerTimeRemaining.textContent = displayMinutesRemaining + ':' + displaySecondsRemaining.toString().padStart(2, '0');
            sandTimerTimePassed.textContent = displayMinutesPassed + ':' + displaySecondsPassed.toString().padStart(2, '0');

            if (timeRemaining <= 0) {
                if (rightSideUp) {
                    sandTimerTimeTop.classList.add('sand-timer-time-passed');
                    sandTimerTimeTop.classList.remove('sand-timer-time-remaining');
                    sandTimerTimeBottom.classList.add('sand-timer-time-remaining');
                    sandTimerTimeBottom.classList.remove('sand-timer-time-passed');
                } else {
                    sandTimerTimeTop.classList.add('sand-timer-time-remaining');
                    sandTimerTimeTop.classList.remove('sand-timer-time-passed');
                    sandTimerTimeBottom.classList.add('sand-timer-time-passed');
                    sandTimerTimeBottom.classList.remove('sand-timer-time-remaining');
                }
                clearInterval(timerInterval);
            }

            updateSandTimer();
        }, speed);

        function flipSandTimer() {
            sandTimerContainer.angle = sandTimerContainer.angle + 180;
            sandTimerContainer.element.style.transition = 'transform 500ms ease-in-out';
            sandTimerContainer.element.style.transform = `rotate(${sandTimerContainer.angle}deg)`;
            sandTimerTimeRemaining.style.transition = 'transform 500ms ease-in-out';
            sandTimerTimeRemaining.style.transform = `rotate(-${sandTimerContainer.angle}deg)`;
            sandTimerTimePassed.style.transition = 'transform 500ms ease-in-out';
            sandTimerTimePassed.style.transform = `rotate(-${sandTimerContainer.angle}deg)`;
            if (rightSideUp) {
                sandTimerSandTop.element.style.transition = 'none';
                sandTimerSandTop.element.style.top = sandTimerSandTop.topR1P1;

                sandTimerSandFalling.element.style.bottom = sandTimerSandFalling.bottomR1P1;

                sandTimerSandBottom.element.style.transition = 'bottom 500ms ease';
                sandTimerSandBottom.element.style.bottom = sandTimerSandBottom.bottomR1P1;

                sandTimerSandMiddle.element.style.top = sandTimerSandMiddle.topR1P1;
                sandTimerSandMiddle.element.style.bottom = sandTimerSandMiddle.bottomR1P1;
                setTimeout(() => {
                    sandTimerSandMiddle.element.style.transition = 'top 250ms linear';
                    sandTimerSandMiddle.element.style.top = sandTimerSandMiddle.topR1P2;
                    sandTimerSandFalling.element.style.transition = 'top 400ms ease-in-out, bottom 250ms linear';
                    sandTimerSandFalling.element.style.top = sandTimerSandFalling.topR1P1;
                    sandTimerSandFalling.element.style.bottom = sandTimerSandFalling.bottomR1P2;
                }, 250);
                rightSideUp = false;
            } else {
                sandTimerSandBottom.element.style.transition = 'none';
                sandTimerSandBottom.element.style.bottom = sandTimerSandBottom.bottomR2P1;

                sandTimerSandFalling.element.style.top = sandTimerSandFalling.topR2P1;

                sandTimerSandTop.element.style.transition = 'top 500ms ease';
                sandTimerSandTop.element.style.top = sandTimerSandTop.topR2P1;

                sandTimerSandMiddle.element.style.top = sandTimerSandMiddle.topR2P1;
                sandTimerSandMiddle.element.style.bottom = sandTimerSandMiddle.bottomR2P1;
                setTimeout(() => {
                    sandTimerSandMiddle.element.style.transition = 'bottom 250ms linear';
                    sandTimerSandMiddle.element.style.bottom = sandTimerSandMiddle.bottomR2P2;
                    sandTimerSandFalling.element.style.transition = 'top 400ms ease-in-out, bottom 250ms linear';
                    sandTimerSandFalling.element.style.bottom = sandTimerSandFalling.bottomR2P1;
                    sandTimerSandFalling.element.style.top = sandTimerSandFalling.topR2P2;
                }, 250);
                rightSideUp = true;
            }
        }

        function sandFall() {
            if (rightSideUp) {
                // step 1
                if (timePassed > 0) {
                    sandTimerSandTop.element.style.transition = `top ${bottomSandDuration}ms linear`;
                    sandTimerSandTop.element.style.top = sandTimerSandTop.topR1P2;

                    sandTimerSandBottom.element.style.transition = `bottom ${bottomSandDuration}ms linear`;
                    sandTimerSandBottom.element.style.bottom = sandTimerSandBottom.bottomR1P2;
                }

                // step 2
                if (timeRemaining < flowStartEndDuration + 60) {
                    sandTimerSandMiddle.element.style.transition = `top ${flowStartEndDuration / 2}ms linear`;
                    sandTimerSandMiddle.element.style.top = sandTimerSandMiddle.topR1P1;
                }

                // step 3
                if (timeRemaining < flowStartEndDuration) {
                    sandTimerSandFalling.element.style.transition = `top ${flowStartEndDuration}ms ease`;
                    sandTimerSandFalling.element.style.top = sandTimerSandFalling.topR1P2;
                }
            } else {
                // step 1
                if (timePassed > 0) {
                    sandTimerSandBottom.element.style.transition = `bottom ${topSandDuration}ms linear`;
                    sandTimerSandBottom.element.style.bottom = sandTimerSandBottom.bottomR2P2;

                    sandTimerSandTop.element.style.transition = `top ${topSandDuration}ms linear`;
                    sandTimerSandTop.element.style.top = sandTimerSandTop.topR2P2;
                }

                // step 2
                if (timeRemaining < flowStartEndDuration + 60) {
                    sandTimerSandMiddle.element.style.transition = `bottom ${flowStartEndDuration / 2}ms linear`;
                    sandTimerSandMiddle.element.style.bottom = sandTimerSandMiddle.bottomR2P1;
                }
                
                // step 3
                if (timeRemaining < flowStartEndDuration) {
                    sandTimerSandFalling.element.style.transition = `bottom ${flowStartEndDuration}ms ease`;
                    sandTimerSandFalling.element.style.bottom = sandTimerSandFalling.bottomR2P2;
                }
            }
        }

        function updateSandTimer() {
            if (timePassed <= 0 && !hasFlipped) {
                flipSandTimer();
                hasFlipped = true;
            }
            sandFall();
        }

        updateSandTimer();
    }
});