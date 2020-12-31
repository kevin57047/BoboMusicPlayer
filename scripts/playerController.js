const image = document.querySelector('#cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const background = document.getElementById("background");

// Music
const songs = [
  {
    path: './assets/musics/Million Years Ago.mp3',
    displayName: 'Million Years Ago',
    artist: 'Adele',
    cover: "./assets/covers/cover_25.jpg",
  },
  {
    path: './assets/musics/Luv(sic) [ft. Shing02].mp3',                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
    displayName: 'Luv(sic) [ft. Shing02]',
    artist: 'Nujabes',
    cover: "./assets/covers/cover_Modal Soul.jpg",
  },
];                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove('active');
  setTimeout(() => {
    image.src = cover;
    image.classList.add('active');
  }, 100)
  background.src = cover;
} 

// Current Song                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);                                                                                                                                    /*position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;filter: blur(15px);-webkit-filter: blur(50px);transform: scale(1.1); }.player-container {  height: 500px;dth: 400px;background: #e7e7e7;border-radius: 20px;box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.3);}*/
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);