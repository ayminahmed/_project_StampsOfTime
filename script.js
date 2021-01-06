

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
/* Runs automatically when API code downloads */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('testframe', {
    events: {}
    });
}

// now use functions like player.playVideo(); , etc. from the console