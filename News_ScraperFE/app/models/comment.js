import DS from 'ember-data';

export default DS.Model.extend({
    _id: DS.attr(),
    author: DS.attr('string'),
    text: DS.attr('string')
});
