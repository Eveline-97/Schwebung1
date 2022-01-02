let aList = document.getElementsByClassName('a');
let current = 0;
let repeat = 1;

//init synth
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

const loop = () => {
    for (let i = 0; i < aList.length; i++) {
        let a = aList[i];

        if (i ==  current) {
            //schwebung in positioning
            let left = Math.random()*10.;
            let top = Math.random()*10.;
            a.style.marginLeft = `${left}px`;
            a.style.marginTop = `${top}px`;

            //make current 'note' bigger
            a.style.width = "32px";
            a.style.heigth = "32px";

            //synth
            let now = Tone.now();

            //colour changes + sound
            if (a.classList.contains('b')) {
                a.classList.remove('b');
                a.classList.add('g');
                synth.triggerAttackRelease(400-top*repeat, .1*repeat, now);
            }
            else if (a.classList.contains('g')) {
                a.classList.remove('g');
                a.classList.add('r');
                synth.triggerAttackRelease(500+top*repeat, .01*repeat, now);
            }
            else if (a.classList.contains('r')) {
                a.classList.remove('r');
                a.classList.add('y');
                synth.triggerAttackRelease(600+top*repeat, .01*repeat, now);
            }
            else if (a.classList.contains('y')) {
                a.classList.remove('y');
                a.classList.add('b');
                synth.triggerAttackRelease(300-top*repeat, .01*repeat, now);
            }
        }
        else {
            //(re-)adjust size to basic values
            a.style.width = "25px";
            a.style.heigth = "25px";
        }
    }

    //next note
    if (current == aList.length-1) {
        current = 0;
        repeat++;
    } else {
        current++;
    }

    //logs
    let currentNote = document.getElementById("current-note");
    let repeatP = document.getElementById("repeats");
    currentNote.innerHTML = `Current note: ${current}`;
    repeatP.innerHTML = `Repeats: ${repeat - 1}`;
}

let speedSlider = document.getElementById('speed');
let speedP = document.getElementById('speed-amount');
let speed = speedSlider.value;

const play = () => {
    if (start.innerHTML == 'start') {
        this.interval = setInterval(loop, speed);
        speedSlider.onchange = () => {
            speed = speedSlider.value;
            speedP.innerHTML = `${speedSlider.value}ms between notes`;
        
            if(this.interval) {
                clearInterval(this.interval);
                this.interval = setInterval(loop, speed);
            }
        }
        start.innerHTML = 'pause';
    } else {
        start.innerHTML = 'start';
        clearInterval(this.interval);
    }
}

//start
Tone.start();
start.addEventListener('click', play);