

/*
 * Event listeners here are very simple and won't need to be removed.
 * Hence, for the most part, they won't be treated typically,
 * and functionality would also be handled by the listener itself.
 * /




/* global variables */
var xG_interval = 0;
var xG_anchor = 0;

/* globally used elements */
var labelTimerTime = document.querySelector('.timer-time');
var labelTimerAnchor = document.querySelector('.timer-anchor');
var iconAnchorNow = document.querySelector('.icon-anchor-now');
var iconSeekToAnchor = document.querySelector('.icon-seek-to-anchor');
var iconPreviousSecond = document.querySelector('.icon-previous-second');
var iconNextSecond = document.querySelector('.icon-next-second');
var iconPlay = document.querySelector('.icon-play');
var iconPause = document.querySelector('.icon-pause');




/*****************************************************************************/
/********************** < Video container functionality **********************/

/* This code loads the IFrame Player API code asynchronously. */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
/* Runs automatically when API code downloads */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('testframe', {
        events: {
            'onReady': __onPlayerReady,
            'onStateChange': __onPlayerStateChange
        }
    });
}

function __onPlayerReady() { // triggered by YT API itself once player's ready
    setListeners();
    startIntervals();
}

function __onPlayerStateChange() { // triggered by YT API when player state
                                   // is changed
    var playerState = player.getPlayerState();
    if ( (playerState == 1) || (playerState == 3) ) { // if playing
        iconPlay.classList.add('removed');
        iconPause.classList.remove('removed');
    }
    else {
        iconPause.classList.add('removed');
        iconPlay.classList.remove('removed');
    }
}


/* now use functions like player.playVideo(); , etc. from the console */



function __setAnchorNow() { // triggered by div containing anchor-here icon
    xG_anchor = Math.floor(player.getCurrentTime());
    var currTime = new Date(xG_anchor * 1000).toISOString().substr(11, 8);
                   labelTimerAnchor.innerText = currTime;
}

function __seekToAnchor() { // triggered by div containing seek-to-anchor icon
    player.seekTo(xG_anchor);
}

function __play() { // triggered by custom play button
    player.playVideo();
}

function __pause() { // triggered by custom pause button
    player.pauseVideo();
}

function __previousSecond() { // triggered by previous second icon
    player.seekTo(Math.floor(player.getCurrentTime() - 1));
}

function __nextSecond() { // triggered by next second icon
    player.seekTo(Math.floor(player.getCurrentTime()) + 1);
}

function setListeners() {
    iconAnchorNow.addEventListener('click', __setAnchorNow);
    iconSeekToAnchor.addEventListener('click', __seekToAnchor);
    iconPlay.addEventListener('click', __play);
    iconPause.addEventListener('click', __pause);
    iconPreviousSecond.addEventListener('click', __previousSecond);
    iconNextSecond.addEventListener('click', __nextSecond);
}

function startIntervals() {
    xG_interval = 
        setInterval(function(){
            var currTime = new Date(Math.floor(player.getCurrentTime()) * 1000)
            .toISOString().substr(11, 8);
            labelTimerTime.innerText = currTime;
            },
        50);
}
/********************** Video container functionality /> *********************/
/*****************************************************************************/