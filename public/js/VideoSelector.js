class VideoSelector {

  constructor(options) {
    // Collect options
    // (values on right are defaults)
    this.timeoutSecs = options.timeoutSecs || 60;
    this.screensaver = options.screensaver || 'videos/screensaver.mp4';
    this.background = options.background || 'images/background.png';
    this.animation = options.animation; // Defaults to false
    this.hideCursor = options.hideCursor; // Defaults to false
    this.vidWidth = options.vidWidth || 1920;
    this.vidHeight = options.vidHeight || 1080;

    this.readyVideoPlayer();

    // Disable screensaver when
    // empties are passed.
    if (this.timeoutSecs === 0 || this.screensaver === '') {
      this.timeoutSecs = 0;
      this.screensaver = '';
    } else {
      this.saver = this.readyScreensaver();
    }

    // Add video or image background
    this.addBackground();

    // Add button listeners...
    this.readyVideoButtons();

    // Hide or show cursor
    if (this.hideCursor) {
      $('body').css('cursor', 'none');
    } else {
      $('body').css('cursor', 'auto');
    }
  }

  readyVideoButtons() {
    // Attach click listeners
    const _this = this;
    $('.video-button').on('click', function () {
      // Launch fullscreen video player
      const src = $(this).attr('video-path');
      VideoSelector.showSelectedVideo(src);
    });

    // Home button
    $('.home-btn').on('click', function () {
      _this.hideSelectedVideo();
    });
  }

  readyVideoPlayer() {
    console.log('readyVideoPlayer');

    let fullscreenPlayer = "<div id='player_screen' class='screen' style='display:none;'>";
    fullscreenPlayer += this.getVidDiv('fullscreen_video', '');
    fullscreenPlayer += "<div class='home-btn' data-role='button'></div>";
    fullscreenPlayer += '</div>';

    // Add to DOM
    $('body').append(fullscreenPlayer);

    $('#fullscreen_video').on('ended', () => {
      console.log('Video has ended!');
      this.hideSelectedVideo();
    });
  }

  readyScreensaver() {
    console.log('readyScreensaver', this.screensaver);

    // 3 minute screensaver timeout (one minute more than longest video)
    return new Screensaver(this.timeoutSecs, this.screensaver,

      function () {
        // Going to screensaver
        // TODO - Stop background video (if needed)
      },

      function () {
        // Awaking from screensaver
        // TODO - Start the background video (if needed)
      });
  }

  addBackground() {
    let bg = '';

    if (this.background.indexOf('.mp4') === -1) {
      // Assume image background'
      bg = `<img id="background" class="background" src="${this.background}"/>`;
    } else {
      // Setup video background
      // TODO - Add div tag
    }// jscs:ignore

    // Add to DOM
    $('body').prepend(bg);
  }

  static showSelectedVideo(src) {
    const $player = $('#fullscreen_video');
    const source = $player.children('source');
    $player[0].pause();
    console.log('src', src);
    source.attr('src', src);

    $('#player_screen').show();
    $player.load();
  }

  hideSelectedVideo() {
    // Hide the video
    $('#player_screen').fadeOut('fast', function () {
      const $player = $('#fullscreen_video');
      $player[0].pause();
      $('#player_screen').hide();
    });

    if (this.saver) this.saver.anyAction();
  }

  getVidDiv(id, src) {
    return '<video id="' + id + '" ' +
      'width="' + this.vidWidth + '" ' +
      'height="' + this.vidHeight + '" ' +
      'autoPlay="autoplay">' +
      '<source src="' + src + '" type="video/mp4"/>' +
      '</video>';
  }

}
