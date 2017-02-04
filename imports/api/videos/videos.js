import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Videos = new Mongo.Collection('Videos');
export default Videos;

Videos.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Videos.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Videos.schema = new SimpleSchema({
  componentNumber: {
    type: String,
    label: 'Exhibit component number.',
  },
  questionEn: {
    type: String,
    label: 'Question title for the video. In English.',
  },
  questionEs: {
    type: String,
    label: 'Question title for the video. In Spanish.',
  },
  videoNumber: {
    type: Number,
    label: 'Video number. Used to connect the video with associated media.',
  },
});

Videos.attachSchema(Videos.schema);

Factory.define('document', Videos, {
  componentNumber: () => 'Factory Component Number',
  questionEn: () => 'Factory English Question',
  questionEs: () => 'Factory Spanish Question',
  videoNumber: () => 'Factory Video Number',
});
