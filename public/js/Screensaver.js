/**
 * Screensaver
 */
function Screensaver(timeoutSeconds, videoSrc, onSleepCallback, onAwakeCallback) {
  // Timeout length in seconds
  this.timeoutSeconds = timeoutSeconds || 60;

  // Callback functions to reset external
  this.onSleepCallback = onSleepCallback || function emptySleepCallback() {};

  this.onAwakeCallback = onAwakeCallback || function emptyAwakeCallback() {};

  // Start the screensaver clock
  this.idleTime = 0;
  this.active = false;
  this.$videoPlayer = {};

  // Increment the idle time counter every minute.
  this.idleInterval = setInterval(() => {
    this.timerIncrement();
  }, 1000);// 1 second

  // Zero the idle timer on any movement.
  $('body').on('touchstart keypress mousemove mousedown', () => {
    this.anyAction();
  });

  // Setup video screensaver
  this.createVideo(videoSrc);

  // Default to hidden screensaver
  this.awake();
}

/**
 * Setup full-screen looping video to be shown during sleep.
 */
Screensaver.prototype.createVideo = function createVideoTag(videoSrc) {
  // Create video tag
  const videoTag = `<video id="screensaver_video" \
    style="position:fixed; top:0; left:0; z-index:999;" \
    loop >\
    <source src="${videoSrc}" type="video/mp4" />\
    </video>`;

  // TODO: Implement or remove
  // This is currently unused
  const videoOptions = {
    controls: false,
    autoplay: false,
    loop: 'true',
    preload: 'auto',
  };

  // Append to html
  $('body').append(videoTag);

  this.$videoPlayer = $('#screensaver_video');
};

/**
 * Start the screensaver after X seconds of inactivity.
 */
Screensaver.prototype.timerIncrement = function timerIncrementCounter() {
  // Increment counter
  this.idleTime = this.idleTime + 1;

  // If it's been X seconds of inactivity, save the screen
  if (this.idleTime > this.timeoutSeconds && this.active === false) {
    this.sleep();
  }
};

/**
 * Zero the idle timer on any movement.
 */
Screensaver.prototype.anyAction = function zeroScreensaverTimer() {
  this.idleTime = 0;
  if (this.active === true) {
    this.awake();
  }
};

/**
* Display the screensaver
*/
Screensaver.prototype.sleep = function sleepScreensaver() {
  this.active = true;
  this.onSleepCallback();

  // Show the video
  $('#screensaver_video').fadeIn('slow');
  this.$videoPlayer[0].play();
};

/**
 * Remove the screensaver
 */
Screensaver.prototype.awake = function wakeScreensaver() {
  this.active = false;
  this.onAwakeCallback();

  // Hide the video
  $('#screensaver_video').fadeOut('slow', () => {
    this.$videoPlayer[0].pause();
  });
};

