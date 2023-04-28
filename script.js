const musicContainer = document.getElementById('music-container');

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const play = document.querySelector('#play');

const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

const title = document.querySelector('#music-title');
const cover = document.querySelector('#image');

const songs = ['Где нас нет', 'Город под подошвой', 'Красота и уродство', 'Кто убил Марка', 'Мы все умрём', 'Ойда', 'Организация'];

let index = 0;

loadSong(songs[index]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  play.querySelector('i.fas').classList.remove('fa-play');
  play.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  play.querySelector('i.fas').classList.add('fa-play');
  play.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  index--;
  if (index < 0) {
    index = songs.length - 1;
  }

  loadSong(songs[index]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function nextSong() {
  index++;

  if (index > songs.length - 1) {
    index = 0;
  }

  loadSong(songs[index]);
  playSong();
}

play.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);


