import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const ExhibitComponents = new Mongo.Collection('ExhibitComponents');
export default ExhibitComponents;

ExhibitComponents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ExhibitComponents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ExhibitComponents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the Exhibit Component.',
  },
  componentNumber: {
    type: String,
    label: 'Exhibit component number. A four digit string. ex. 0200',
  },
  loopingBackground: {
    type: Boolean,
    label: 'Replace default background image with looping video.',
    defaultValue: false,
  },
  loopingBackgroundPath: {
    type: String,
    label: 'The path to the optional looping background mp4.',
    defaultValue: 'media/background.mp4',
  },
});

ExhibitComponents.attachSchema(ExhibitComponents.schema);

Factory.define('document', ExhibitComponents, {
  title: () => 'Factory Title',
  componentNumber: () => 'Factory Component Number',
  loopingBackground: () => 'Factory Looping Background',
  loopingBackgroundPath: () => 'Factory Looping Background Path',
});
