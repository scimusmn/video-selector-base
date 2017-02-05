import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import VideoCard from './VideosCard';
import VideoPlayer from './VideoPlayer';
import VideoPlayerScreenSaver from './VideoPlayerScreenSaver';
import logger from '../../modules/logger';

class KioskVideoList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      videos: props.videos,
      playing: props.playing,
      transitioning: false,
      componentNumber: props.componentNumber,
      selectedVideo: '0',
      selectedIndex: -1,
      showVideo: false,
      idleTime: 0,
      screenSaver: 'inactive',
    };

    this.videoCards = {};

  }

  componentDidMount() {
    setInterval(() => {
      this.timerIncrement();
    }, 1000);
  }

  timerIncrement() {
    const idleTime = this.state.idleTime + 1;
    this.setState({ idleTime });
    const screenSaverTimeout = Meteor.settings.public.screenSaverTimeout;
    if (this.state.idleTime >= screenSaverTimeout) {

      if (this.state.screenSaver == 'inactive') {
        // Log for analytics
        logger.info({message:'inactivity-timeout', inactiveTime:screenSaverTimeout * 1000,});
      }

      this.setState({
        playing: false,
        screenSaver: 'active',
      });

    }
  }

  resetScreenSaverTimer() {
    console.log('Resetting the screensaver timer');
    this.setState({
      idleTime: 0,
      screenSaver: 'inactive',
    });
  }

  clearScreenSaver() {
    console.log('Clearing the screensaver');
    this.setState({
      idleTime: 0,
      screenSaver: 'inactive',
      playing: false,
    });
  }

  isActiveCard(index) {

    if (index == this.state.selectedIndex) {
      return true;
    } else {
      return false;
    }
  }

  launchVideoPlayer(e) {

    const posIndex = e.currentTarget.getAttribute('data-pos-index');

    this.setState({
      playing: true,
      selectedVideo: e.currentTarget.id,
      selectedIndex: posIndex,
      showVideo: true,
    });

    // Log for analytics
    logger.info({ message:'video-selected',
                  kiosk: this.props.location.pathname,
                  selectedVideo:e.currentTarget.id,
                  positionIndex:posIndex,
                  });

  }

  closeModal(vidData) {

    if (this.state.transitioning == false) {

      this.setState({ transitioning: true, playing: false });

      // Log for analytics
      logger.info({message:'video-exit', vidData});

      setTimeout(()=> {

        this.setState({ transitioning: false, selectedIndex:-1 });

      }, 150);

    }

  }

  render() {

    /**
     * Loop through the videos and render a card for each question
     */
    this.videoCards = this.props.videos.map((video, index) =>
      <VideoCard
        launchVideoPlayer={this.launchVideoPlayer.bind(this)}
        playing={this.state.playing}
        key={video._id}
        positionIndex={index}
        video={video}
        isActive={this.isActiveCard(index)}
      />
    );

    return (
      <div onClick={this.resetScreenSaverTimer.bind(this)} key='unique' id='selection-screen' className={'vid-count-' + this.props.videos.length}>

        {/* Coaches Corner headline title *//* Coaches Corner headline title */}
        <h1>
          <div className='en'>Select a question to learn more.</div>
          <div className='es'>Elige una pregunta para aprender más.</div>
        </h1>

        {/* Question buttons *//* Question buttons */}
        {this.videoCards}

        {/* Modal video player *//* Modal video player */}
        <ReactCSSTransitionGroup
              transitionName='player-fade'
              transitionAppear={false}
              transitionEnter={this.props.buttonAnimations}
              transitionLeave={this.props.buttonAnimations}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={400}>

          {(this.state.playing)
            ?

              <VideoPlayer
                videoPlaying={this.state.playing}
                handleHomeAction={this.closeModal.bind(this)}
                componentNumber={this.state.componentNumber}
                selectedVideo={this.state.selectedVideo}
              />

            : null
          }
          </ReactCSSTransitionGroup>

        {/* Modal screen saver *//* Modal screen saver */}
        {
          this.state.screenSaver === 'active'
            ?
            <div
              onClick={this.clearScreenSaver.bind(this)}
              className='screensaver'
            >
              <VideoPlayerScreenSaver
                componentNumber={this.state.componentNumber}
              />
            </div>
            : null
        }

      </div>
    );
  }

}

KioskVideoList.propTypes = {
  videos: React.PropTypes.array,
  playing: React.PropTypes.bool,
  componentNumber: React.PropTypes.string,
  playingVideo: React.PropTypes.string,
  loopingBackground: React.PropTypes.bool,
  buttonAnimations: React.PropTypes.bool,
};

export default KioskVideoList;
