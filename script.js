

/*
 * Event listeners here are very simple and won't need to be removed.
 * Hence, for the most part, they won't be treated typically,
 * and functionality would also be handled by the listener itself.
 * /



/* global variables */
var xG_interval = 0;
var xG_anchor = 0;
var xG_listSectionVisiblity = 0;

/* globally used elements */
var linkView            = document.querySelector('.link-view');
var appView             = document.querySelector('.app-view');
var inputLink           = document.querySelector('.input-link');
var buttonParseLink     = document.querySelector('.button-parse-link');
var listSection         = document.querySelector('.stamp-list-section');
var testFrame           = document.querySelector('#testframe');
var iframeOverlay       = document.querySelector('.iframe-overlay');
var stampingMenu        = document.querySelector('.stamping-menu')
var labelTimerTime      = document.querySelector('.timer-time');
var labelTimerAnchor    = document.querySelector('.timer-anchor');
var iconAnchorNow       = document.querySelector('.icon-anchor-now');
var iconSeekToAnchor    = document.querySelector('.icon-seek-to-anchor');
var iconPreviousSecond  = document.querySelector('.icon-previous-second');
var iconNextSecond      = document.querySelector('.icon-next-second');
var iconPlay            = document.querySelector('.icon-play');
var iconPause           = document.querySelector('.icon-pause');
var iconAddStamp        = document.querySelector('.icon-add-stamp');
var iconAddStampConfirm = document.querySelector('.add-stamp-confirm');
var iconAddStampCancel  = document.querySelector('.add-stamp-cancel');
var inputAddStampTime   = document.querySelector('.add-stamp-time');
var inputAddStampTitle  = document.querySelector('.add-stamp-title');
var btnVisibilityIcon   = document.querySelector('.visibility-icon');
var listContainer       = document.querySelector('.list-container');
var iconAddEmptyStamp   = document.querySelector('.add-empty-stamp');
var iconDeleteStamps    = document.querySelector('.delete-stamps');
var iconGenerateStamps  = document.querySelector('.generate-stamps');
var optionsBar          = document.querySelector('.options-bar');
var deleteBar           = document.querySelector('.delete-bar');
var iconDeleteCancel    = document.querySelector('.delete-cancel');
var iconDeleteConfirm   = document.querySelector('.delete-confirm');
var iconCopy            = document.querySelector('.icon-copy');
var outputTextSection   = document.querySelector('.output-text-section');
var outputText          = document.querySelector('.output-text');




/*****************************************************************************/
/************************ < Link input functionality *************************/
function __parseLink() {
    var userString = inputLink.value;
    var parsedUrl = new URL(userString);
    var vid = parsedUrl.searchParams.get('v');
    if ( vid == null ) {
        console.log('Unable to parse link.');
    }
    else {
        console.log(vid);
        srcString = 'https://www.youtube.com/embed/';
        srcString += vid;
        srcString += '?enablejsapi=1';
        console.log(srcString);
        testFrame.src = srcString;
        connectYT();

        linkView.classList.add('push-left');
        appView.classList.remove('hidden');
        appView.classList.remove('push-right');

    }
}


buttonParseLink.addEventListener('click', __parseLink);
/*********************** Link input functionality /> *************************/
/*****************************************************************************/




/*****************************************************************************/
/********************** < Video container functionality **********************/
/* This code loads the IFrame Player API code asynchronously. */
function connectYT() {
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
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


/* Event listeners and related functions */
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


function toggleStampView() {
    iframeOverlay.classList.toggle('push-left');
    stampingMenu.classList.toggle('push-left');
}


function __addStamp() { // triggered by add button on video overlay
    toggleStampView();
    var currTime = new Date(Math.floor(player.getCurrentTime()) * 1000)
    .toISOString().substr(11, 8);
    inputAddStampTime.value = currTime;
}


function __addStampCancel() { // triggered by cancel button in stamping menu
    toggleStampView();
}


function __addStampConfirm() { // triggered by confirm button in stamping menu
    addNewStamp();
    toggleStampView();
}

/** 
 *{https://stackoverflow.com/questions/
    6234773/can-i-escape-html-special-chars-in-javascript}
 */
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }


function addNewStamp() {
    if ( listSection.classList.contains('removed') ) {
        listSection.classList.remove('removed');
    }
 
    var newDiv = document.createElement("div");
    newDiv.classList.add("timestamp-bar");
    var newText = '';
    newText += '<input type="checkbox" class="removed">';
    newText += '<input type="text" class="stamp-time time-input"';
    newText += ' value="' + inputAddStampTime.value + '"';
    newText += ' placeholder="00:00:00">';
    newText += '<input type="text" class="stamp-title title-input"';
    newText += ' value="' + escapeHtml(inputAddStampTitle.value) + '"';
    newText += ' placeholder="Stamp Title">';
    newDiv.innerHTML = newText;
    listContainer.appendChild(newDiv);
    
    if ( listContainer.classList.contains('removed') ) {
        listContainer.classList.remove('removed');
    }
    
    inputAddStampTitle.value = "";
}


function __toggleVisibility() {
    iframeOverlay.classList.toggle('transparent');
    stampingMenu.classList.toggle('transparent');
}


function setListeners() {
    iconAnchorNow.addEventListener('click', __setAnchorNow);
    iconSeekToAnchor.addEventListener('click', __seekToAnchor);
    iconPlay.addEventListener('click', __play);
    iconPause.addEventListener('click', __pause);
    iconPreviousSecond.addEventListener('click', __previousSecond);
    iconNextSecond.addEventListener('click', __nextSecond);
    iconAddStamp.addEventListener('click', __addStamp);
    iconAddStampCancel.addEventListener('click', __addStampCancel);
    iconAddStampConfirm.addEventListener('click', __addStampConfirm);
    btnVisibilityIcon.addEventListener('click', __toggleVisibility);
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




/*****************************************************************************/
/********************** < List container functionality ***********************/
/* Event listeners and related functions */
function __addEmptyStamp() { // triggered by add empty stamp button in list section
    var newDiv = document.createElement("div");
    newDiv.classList.add("timestamp-bar");
    var newText = '';
    newText += '<input type="checkbox" class="removed">';
    newText += '<input type="text" class="stamp-time time-input"';
    newText += ' placeholder="00:00:00">';
    newText += '<input type="text" class="stamp-title title-input"';
    newText += ' placeholder="Stamp Title">';
    newDiv.innerHTML = newText;
    listContainer.appendChild(newDiv);
    
    if ( listContainer.classList.contains('removed') ) {
        listContainer.classList.remove('removed');
    }
}


function toggleDeleteView() {
    optionsBar.classList.toggle('hoisted-bar');
    deleteBar.classList.toggle('hoisted-bar');
    document.querySelectorAll('.timestamp-bar input[type="checkbox"]')
        .forEach(checkbox => {
            checkbox.classList.toggle('removed');
            checkbox.checked = false;
        });
}


function __deleteStamps() {
    toggleDeleteView();
}


function __deleteCancel() {
    toggleDeleteView();
}


function __deleteConfirm() {
    document.querySelectorAll('.timestamp-bar').forEach(timestampBar => {
        var checked = timestampBar.querySelector('input[type="checkbox"]')
                      .checked;
        if ( checked === true ) {
            timestampBar.remove();
        }
    });
    if ( document.querySelectorAll('.timestamp-bar').length == 0 ) {
        listContainer.classList.add('removed');
    }
    toggleDeleteView();
}


function __generateStamps() {
    var stamps = '';
    document.querySelectorAll('.timestamp-bar').forEach(timestampBar => {
        stamps += timestampBar.querySelector('.stamp-time').value;
        stamps += ' ';
        stamps += timestampBar.querySelector('.stamp-title').value;
        stamps += '\n';
    });
    stamps = stamps.slice(0, -1);
    outputText.value = stamps;

    if ( outputTextSection.classList.contains('removed') ) {
        outputTextSection.classList.remove('removed');
    }
}


iconAddEmptyStamp.addEventListener('click', __addEmptyStamp);
iconDeleteStamps.addEventListener('click', __deleteStamps);
iconDeleteCancel.addEventListener('click', __deleteCancel);
iconDeleteConfirm.addEventListener('click', __deleteConfirm);
iconGenerateStamps.addEventListener('click', __generateStamps);
/********************** List container functionality /> **********************/
/*****************************************************************************/




/*****************************************************************************/
/*********************** < Output Text functionality *************************/
function __copyOutput() {  
  //outputText.focus();
  outputText.select();
  document.execCommand('copy');
}


iconCopy.addEventListener('click', __copyOutput);
/*********************** Output Text functionality /> ************************/
/*****************************************************************************/