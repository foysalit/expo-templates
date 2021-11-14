import {Meteor} from 'meteor/meteor';

Meteor.methods({
  'users.list' () {
    if (!this.userId) throw new Meteor.Error("Must be logged in");
    return Meteor.users.find({}, {fields: {'profile.name': 1}}).fetch();
  },
});