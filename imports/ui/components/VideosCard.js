import React from 'react';
import _ from 'lodash';
import Modal from '/node_modules/react-overlays/lib/Modal';

let VelocityComponent = require('/node_modules/velocity-react/velocity-component');

class VideoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: props.video,
      playing: false,
    };
  }

  handleVideoSelect(e) {

    // Send parent component the video launch event
    this.props.launchVideoPlayer(e);

  }

  getClassy() {

    return 'video-button ' + ((this.props.isActive == true) ? 'active' : '');

  }

  render() {

    const { video } = this.props;
    const paddedVideoNumber = _.padStart(video.videoNumber, 2, '0');
    const buttonImagePath = `/media/${video.componentNumber}/${paddedVideoNumber}.png`;

    return (
      <div
        onClick={this.handleVideoSelect.bind(this)}
        className={this.getClassy()}
        data-pos-index={this.props.positionIndex}
        data-vid-num={video.videoNumber}
        id={`video-${paddedVideoNumber}`}
      >
        <img src={buttonImagePath}/>
        <h2>
          <div className='en'>{video.labelEn}</div>
          <div className='es'>{video.labelEs}</div>
        </h2>
      </div>
    );
  }

}

VideoCard.propTypes = {
  playing: React.PropTypes.bool,
  video: React.PropTypes.object,
  launchVideoPlayer: React.PropTypes.func,
  positionIndex: React.PropTypes.number,
  isActive: React.PropTypes.bool,
};

export default VideoCard;
