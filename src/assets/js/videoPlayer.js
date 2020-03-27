const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playerControl = document.getElementById("jsPlayerControls");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const currentTime = document.getElementById("currentTime");
const fullScreenBtn = document.getElementById("jsFullScreen");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const progressBar = document.getElementById("progressBar");

const registerView = () => {
  const videoID = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoID}/view`, {
    method: "POST"
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeRange.value = 0;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

let stoptime;
function showCursor() {
  if (stoptime) clearTimeout(stoptime);
  document.body.style.cursor = "default";
  playerControl.style.opacity = 1;
  stoptime = setTimeout(() => {
    document.body.style.cursor = "none";
    playerControl.style.opacity = 0;
  }, 2000);
}

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.removeEventListener("mousemove", showCursor);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozExitFullscreen) {
    document.mozExitFullscreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen();
  }
  videoPlayer.addEventListener("mousemove", showCursor);
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

let progressTime = null;
function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
  progressTime = Math.floor(
    (videoPlayer.currentTime / videoPlayer.duration) * 100
  );
  progressBar.value = `${progressTime}`;
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function spaceEvent() {
  document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
      handlePlayClick();
    }
  };
}

function init() {
  videoPlayer.volume = 0.5;
  volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  spaceEvent();
}

if (videoContainer) {
  init();
}
