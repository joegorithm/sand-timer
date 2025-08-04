let rightSideUp = true;

// Sand timer elements
const sandTimerContainer = {
    element: document.querySelector('.sand-timer-container'),
    angle: 0
};
const sandTimerSandTop = {
    element: document.querySelector('.sand-timer-sand-top'),
    top1: '20%',
    top2: '100%',
    top3: '110%',
};
const sandTimerSandMiddle = {
    element: document.querySelector('.sand-timer-sand-middle'),
    top1: '20%',
    top2: '50%',
};
const sandTimerSandFalling = {
    element: document.querySelector('.sand-timer-sand-falling'),
    top1: '50%',
    top2: '56.4%',
    bottom1: '49%',
    bottom2: '5%',
    borderRadiusTop1: '0',
    borderRadiusTop2: '100rem',
    borderRadiusBottom1: '100rem',
    borderRadiusBottom2: '0'
};
const sandTimerSandBottom = {
    element: document.querySelector('.sand-timer-sand-bottom'),
    top1: '136%',
    top2: '46%',
    top3: '41%'
};
const sandTimerTimeRemaining = document.querySelector('.sand-timer-time-remaining');
const sandTimerTimePassed = document.querySelector('.sand-timer-time-passed');


// document.addEventListener("DOMContentLoaded", function() {
// When .sand-timer-container is clicked, start the sand timer
document.querySelector('.sand-timer-container').addEventListener('click', function() {
    const timeSet = 5 * 1000;
    const totalTime = timeSet + 500; // 500ms for the initial 180 degree rotation
    let totalTimePassed = 0;
    let totalTimeRemaining = totalTime;
    let timePassed = 0;
    let timeRemaining = timeSet;
    let flowStartEndDuration = 500;
    let topSandDuration = timeSet - flowStartEndDuration;
    let topSandPassed = 0;
    let bottomSandDuration = timeSet - flowStartEndDuration;
    let bottomSandPassed = 0;
    let hasFlipped = false;


    // Update the timer every 1ms
    const fps = 60; // frames per second
    const speed = 1000 / fps;
    const timerInterval = setInterval(function() {

        totalTimePassed += speed;
        totalTimeRemaining -= speed;

        if (totalTimePassed >= 500) {
            timePassed += speed;
            timeRemaining -= speed;
        }

        updateSandTimer();
    
        if (timeRemaining <= 0) {
            console.log("Timer stopped!");
            clearInterval(timerInterval);
        }
        
        document.querySelector('.sand-timer-time-remaining').textContent = Math.ceil(timeRemaining / 1000) + 's';
        document.querySelector('.sand-timer-time-passed').textContent = Math.floor(timePassed / 1000) + 's';

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
            sandTimerSandTop.element.style.transition = 'top 0ms linear'; // Find more efficient alternative
            sandTimerSandTop.element.style.top = '-82%';

            sandTimerSandFalling.element.style.bottom = '30%';

            sandTimerSandBottom.element.style.transition = 'bottom 500ms ease';
            sandTimerSandBottom.element.style.bottom = '23%';

            sandTimerSandMiddle.element.style.top = '101%';
            sandTimerSandMiddle.element.style.bottom = '-1%';
            setTimeout(() => {
                sandTimerSandMiddle.element.style.transition = 'top 250ms linear';
                sandTimerSandMiddle.element.style.top = '50%';
                sandTimerSandFalling.element.style.transition = 'top 400ms ease-in-out, bottom 250ms linear, border-radius 250ms linear';
                sandTimerSandFalling.element.style.top = '5%';
                sandTimerSandFalling.element.style.bottom = '47%';
            }, 250);
            rightSideUp = false;
        } else {
            sandTimerSandBottom.element.style.transition = 'bottom 0ms linear'; // Find more efficient alternative
            sandTimerSandBottom.element.style.bottom = '-82%';

            sandTimerSandFalling.element.style.top = '30%';

            sandTimerSandTop.element.style.transition = 'top 500ms ease';
            sandTimerSandTop.element.style.top = '23%';
            
            sandTimerSandMiddle.element.style.top = '-1%';
            sandTimerSandMiddle.element.style.bottom = '101%';
            setTimeout(() => {
                sandTimerSandMiddle.element.style.transition = 'bottom 250ms linear';
                sandTimerSandMiddle.element.style.bottom = '50%';
                sandTimerSandFalling.element.style.transition = 'top 400ms ease-in-out, bottom 250ms linear, border-radius 250ms linear';
                sandTimerSandFalling.element.style.bottom = '5%';
                sandTimerSandFalling.element.style.top = '47%';
            }, 250);
            rightSideUp = true;
        }
        console.log(sandTimerContainer.angle, rightSideUp);
    }

    function sandFall() {
        if (rightSideUp) {
            // step 1
            if (timePassed > 0) {
                sandTimerSandTop.element.style.transition = `top ${bottomSandDuration}ms linear`;
                sandTimerSandTop.element.style.top = '102%';

                sandTimerSandBottom.element.style.transition = `bottom ${bottomSandDuration}ms linear`;
                sandTimerSandBottom.element.style.bottom = '0%';
            }

            // step 2
            if (timeRemaining < flowStartEndDuration + 60) {
                sandTimerSandMiddle.element.style.transition = `top ${flowStartEndDuration / 2}ms linear`;
                sandTimerSandMiddle.element.style.top = '101%';
            }

            // step 3
            if (timeRemaining < flowStartEndDuration) {
                sandTimerSandFalling.element.style.transition = `top ${flowStartEndDuration}ms ease, border-radius ${flowStartEndDuration / 3}ms linear`;
                sandTimerSandFalling.element.style.top = '65%';
                sandTimerSandFalling.element.style.borderRadius = sandTimerSandFalling.borderRadiusTop2;
            }
        } else {
            // step 1
            if (timePassed > 0) {
                sandTimerSandBottom.element.style.transition = `bottom ${topSandDuration}ms linear`;
                sandTimerSandBottom.element.style.bottom = '102%';

                sandTimerSandTop.element.style.transition = `top ${topSandDuration}ms linear`;
                sandTimerSandTop.element.style.top = '0%';
            }

            // step 2
            if (timeRemaining < flowStartEndDuration + 60) {
                sandTimerSandMiddle.element.style.transition = `bottom ${flowStartEndDuration / 2}ms linear`;
                sandTimerSandMiddle.element.style.bottom = '101%';
            }
            
            // step 3
            if (timeRemaining < flowStartEndDuration) {
                sandTimerSandFalling.element.style.transition = `bottom ${flowStartEndDuration}ms ease, border-radius ${flowStartEndDuration / 3}ms linear`;
                sandTimerSandFalling.element.style.bottom = '65%';
                sandTimerSandFalling.element.style.borderRadius = sandTimerSandFalling.borderRadiusTop2;
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
});