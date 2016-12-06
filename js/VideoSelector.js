class VideoSelector {

  constructor(options) {

    console.log('VideoSelector()');
    console.dir(options);

    this.timeoutSecs = options.timeoutSecs || 60;
    this.screensaver = options.screensaver || 'videos/screensaver.mp4';
    this.background = options.background || 'images/background.png';
    this.animation = options.animation || true;
    this.hideCursor = options.hideCursor || true;

    this.width = 1920;
    this.height = 1080;

    this.readyVideoPlayer();

    // Disable screensaver when
    // empties are passed.
    if (this.timeoutSecs == 0 || this.screensaver == '') {
      this.timeoutSecs = 0;
      this.screensaver = '';
    } else {
      // this.readyScreensaver();
    }

    this.addBackground();

    this.readyVideoButtons();

  }

  readyVideoButtons() {

    // Attach click listeners
    const _this = this;
    $('.video-button').on('click', function(event) {

      // Launch fullscreen video player
      var src = $(this).attr('video-path');

      // Wait one second. Start video.
      // setTimeout(function() {
      _this.showSelectedVideo(src);

    });

    // Home button
    $('.home-btn').on('click', function() {

      _this.hideSelectedVideo();

    });

  }

  readyVideoPlayer() {

    console.log('readyVideoPlayer');

    let fullscreenPlayer = "<div id='player_screen' class='screen' style='display:none;'>";

    fullscreenPlayer += this.getVidDiv('fullscreen_video', '');

    fullscreenPlayer += "<div class='home-btn' data-role='button'></div>";

    fullscreenPlayer += "</div>";

    // Add to DOM
    let myy = $('body').append(fullscreenPlayer);

    $('#fullscreen_video').on('ended', () => {
      console.log('Video has ended!');
      this.hideSelectedVideo();
    });

  }

  readyScreensaver() {

    console.log('readyScreensaver', this.screensaver);

  }

  addBackground() {

    console.log('addBackground', this.background);

    let bg = "<img id='background' class='background' src='"+this.background+"'/>";

    if(this.background.indexOf('.mp4') == -1) {
      // Assume image background'
    } else {
      // Setup video backgroound
      // TODO Add div tag
    }

    // Add to DOM
    $('body').prepend(bg);

  }

  showSelectedVideo(src) {

    const player = $('#fullscreen_video');
    const source = player.children('source');
    player[0].pause();
    console.log('src', src);
    source.attr('src', src);

    $('#player_screen').show();
    player.load();

  }

  hideSelectedVideo() {

    // Hide the video
    $('#player_screen').fadeOut('fast', function() {
      const player = $('#fullscreen_video');
      player[0].pause();
      $('#player_screen').hide();
    });

  }

  getVidDiv(id, src) {
    const vidDiv = "<video id='"+id+"' width='"+this.width+"' height='"+this.height+"' autoPlay='autoplay'><source src='"+src+"' type='video/mp4'/></video>";
    return vidDiv;
  }


}
