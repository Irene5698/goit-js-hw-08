import Player from '@vimeo/player';
console.log(Player);
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

const storageKey = 'videoplayer-current-time';

function onTimeUpdate(e) {
  localStorage.setItem(storageKey, JSON.stringify(e.seconds));
  console.log(e.seconds);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

const currentTime = localStorage.getItem(storageKey);

if (currentTime) {
  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {
      console.log(seconds);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    }),
    console.log(storageKey);
}
