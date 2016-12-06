# video-selector-base
Starter project for SMM touch-based video selectors.

This project is meant as a starting place for future SMM video selectors, providing an easy to understand base for customization.

The simplest way to use this template is to clone and replace the existing assets. However, full customization is possible by diving into the CSS and Javascript.


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



Note about gitignore: Because the files are so small, the gitignore includes exceptions for the example video files. You should either remove the exception, or simply use different file names for your videos.