import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Videos from '../../api/videos/videos.js';
import ExhibitComponents from '../../api/exhibitComponents/exhibitComponents.js';
import KioskVideosList from '../components/KioskVideosList';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {

  const videosSub = Meteor.subscribe('videos.kioskView', params.componentNumber);
  const componentsSub = Meteor.subscribe('exhibitComponents.view', params.componentNumber);

  if (videosSub.ready() && componentsSub.ready()) {
    const videos = Videos.find().fetch();
    const playing = false;
    const componentNumber = params.componentNumber;
    const component = ExhibitComponents.findOne();
    console.log(component);
    const loopingBackground = component.loopingBackground;
    const buttonAnimations = component.buttonAnimations;

    onData(null, { videos, playing, componentNumber, loopingBackground, buttonAnimations });
  }
};

export default composeWithTracker(composer, Loading)(KioskVideosList);
