# video-selector-base

This project is a starting place for future SMM video selectors. Replace the example assets and customize for you needs using CSS and Javascript.

To begin, clone this repository and copy all folder contents (except the hidden .git folder) into an empty repo folder.
* TODO - explain cloning into empty repo in more detail.

# Video Buttons
Any div with the class `video-button` can be used to trigger a fullscreen video. Ensure your div also has a `video-path` attribute that points to the video file you'd like to play when this button is clicked. Any other content you place within the opening and closing div tags of the video button will become part of the button.
For example, the following creates a simple text buton that will launch `videos/video_1.mp4` when clicked.
```
<div class='video-button' video-path='videos/video_1.mp4'>
  Click me to play video.
</div>
```

You can position and style video buttons with CSS. You may want to add unique ids or class names for targeting. All other video selector functionality can be changed through passing options into the constructor of the Video Selector.
For example, if you wanted the screensaver to show up after two minutes and your background to be an online image of Stonehenge, use the following.
```
const options = { timeoutSecs:120,
                  background:'http://www.crystalinks.com/stonehengewalkway.jpg', };

new VideoSelector(options);
```


## Options

| Option            | Type                | Default | Description                                                           |
|-------------------|---------------------|---------|-----------------------------------------------------------------------|
| **timeoutSecs**   | `Number`            | `60`    | Seconds of inactivity before triggering screensaver mode. Set to 0 to disable.        |
| **hideCursor**    | `Boolean`           | `false`  | Hides cursor (for touch screens)                                      |
| **background** (mp4s coming soon)    | `String`            | `'images/background.png'`  | Path to either an image or video (mp4) asset. Providing a video asset will generate a looping background video                  |
| **screensaver**   | `String`            | `'videos/screensaver.mp4'` | Path to video asset which displays on loop during screensaver mode.                                              |
| **animation** (coming soon)          | `Boolean`           | `false`                     | Enables default animations for all buttons on press                       |
| **vidWidth**   | `Number`            | `1920`    | Width of video playback (usually matches screen dimension)        |
| **vidHeight**  | `Number`            | `1080`    | Height of video playback (usually matches screen dimension)     |



## .gitignore
I've included example videos because the files are small and useful while getting started. Videos are usually not pushed to git. After replacing these assets, you should remove their filename exceptions from `.gitignore` so you don't push your own larger video files.
