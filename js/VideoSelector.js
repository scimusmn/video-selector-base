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

  }

  readyVideoPlayer() {

    console.log('readyVideoPlayer');

    let fullscreenPlayer = "<div id='player_screen' class='screen' style='display:none;'>";

    fullscreenPlayer += this.getVidDiv('fullscreen_video', '');

    fullscreenPlayer += "<div class='home-btn' data-role='button'></div>";

    fullscreenPlayer += "</div>";

    // Add to DOM
    $('body').append(fullscreenPlayer);

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

  getVidDiv(id, src) {
        const vidDiv = "<video id='"+id+"' width='"+this.width+"' height='"+this.height+"' autoPlay='autoplay' loop><source src='"+src+"' type='video/mp4'/></video>";
        return vidDiv;
  }

}
