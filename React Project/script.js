let naatIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let audioElement = new Audio('naats/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
// let prePlay = document.getElementById('prePlay');
let timer = document.getElementById('timer');
let naatHeads = document.getElementById('naatHeads');
let naatItem = Array.from(document.getElementsByClassName('naatItem'));
let prePlay = Array.from(document.getElementsByClassName('prePlay'));

let naats = [
    { naatName: "Ilahi Teri Chokhat By Junaid Jamshaid", filePath: "naats/1.mp3", coverPath: "covers/1.jpg" },
    { naatName: "Badal Dy Dill Mera By Junaid Jamshaid", filePath: "naats/2.mp3", coverPath: "covers/2.jpg" },
    { naatName: "Qasida Burda Shareef By Junaid Jamshaid", filePath: "naats/3.mp3", coverPath: "covers/3.jpg" },
    { naatName: "Surah Teen in the voice of Mishary Rashid", filePath: "naats/4.mp3", coverPath: "covers/4.jpg" },
    { naatName: "Surah Ghashiyah in the voice of Mishary Rashid", filePath: "naats/5.mp3", coverPath: "covers/5.jpg" },
    { naatName: "Surah Al-A'la in the voice of Mishary Rashid", filePath: "naats/6.mp3", coverPath: "covers/6.jpg" },
]

masterPlay.addEventListener('click', () => {
    makeAllPlays();
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }
});

naatItem.forEach((element, i) => {
    // element.getElementsByTagName("img")[0].src = naats[i].coverPath;
    element.getElementsByClassName("naatName")[0].innerText = naats[i].naatName;

});

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    console.log(progress);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('naatItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
    if (audioElement) {
        window.addEventListener('keydown', function (event) {
            var key = event.which || event.keyCode
            if (key === 32) {
                event.preventDefault();
                //Ternery Operator
                //   audioElement.paused || audioElement.currentTime<=0 ? 
                //   (audioElement.play(),gif.style.opacity = 1 ,masterPlay.classList.remove('fa-circle-play'),
                //   masterPlay.classList.add('fa-circle-pause')):(audioElement.pause(),
                //   gif.style.opacity = 0,masterPlay.classList.add('fa-circle-play'),masterPlay.classList.remove('fa-circle-pause'))
                if (audioElement.paused || audioElement.currentTime <= 0) {
                    audioElement.play();
                    gif.style.opacity = 1;
                    masterPlay.classList.remove('fa-circle-play');
                    masterPlay.classList.add('fa-circle-pause');
                } else {
                    audioElement.pause();
                    masterPlay.classList.add('fa-circle-play');
                    masterPlay.classList.remove('fa-circle-pause');
                    gif.style.opacity = 0;
                }
            } else if (key == 37) {
                event.preventDefault();
                audioElement.currentTime = audioElement.currentTime - 5;
            } else if (key == 39) {
                event.preventDefault();
                audioElement.currentTime = audioElement.currentTime + 5;
            }
        })
    };
}

Array.from(document.getElementsByClassName('naatItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        naatIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `naats/${naatIndex}.mp3`;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('forPlay').addEventListener('click', () => {
    if (naatIndex >= 9) {
        naatIndex = 1
    }
    else {
        naatIndex += 1;
    }
    audioElement.src = `naats/${naatIndex + 1}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('prePlay').addEventListener('click', () => {
    if (naatIndex <= 0) {
        naatIndex = 1
    }
    else {
        naatIndex -= 1;
    }
    audioElement.src = `naats/${naatIndex + 1}.mp3`;
    // audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})