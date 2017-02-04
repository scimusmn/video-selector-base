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
});

ExhibitComponents.attachSchema(ExhibitComponents.schema);

Factory.define('document', ExhibitComponents, {
  title: () => 'Factory Title',
  componentNumber: () => 'Factory Component Number',
});
