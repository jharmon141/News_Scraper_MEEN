import DS from 'ember-data';

export default DS.Model.extend({
    _id: DS.attr(),
	title: DS.attr('string'),
	link: DS.attr('string'),
    comments: DS.attr()
});
