# video-selector-base
Starter project for SMM touch-based video selectors.

This project is meant to be as unassuming and bare bones as possible, providing an easy to understand starting point for future video selectors.


# How To Todos
* Start new video selector project using this as base.
* Add/remove videos
* Change video paths
* Enable/disable screensaver video
* Change screensaver video path
* Change timeout for screensaver
* Enable/disable background video
* Change background video path
* Change image used for home (back) button



# Assumptions
* Videos are in web friendly MP4 format
* Videos always play fullscreen
* All elements will use absolute positioning



## Options

| Option            | Type                | Default | Description                                                           |
|-------------------|---------------------|---------|-----------------------------------------------------------------------|
| **timeoutSecs**   | `Number`            | `60`    | Seconds of inactivity before triggering screensaver mode. Set to 0 to disable.             |
| **hideCursor**    | `Boolean`           | `true`  | Hides cursor (for touch screens)                                      |
| **background** (coming soon)    | `String`            | `'images/background.png'`  | Path to either an image or video (mp4) asset. Providing a video asset will generate a looping background video                  |
| **screensaver**   | `String`            | `'videos/screensaver.mp4'` | Path to video asset which displays on loop during screensaver mode.                                              |
| **animation** (coming soon)     | `Boolean`           | `true`                     | Enables default animations for all buttons on press                       |
