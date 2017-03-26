/*global $ */
import Ember from 'ember';
// import { moment } from 'moment';

export function formatDate(date/*, hash*/) {
    return moment(date).format('MM-DD-YYYY');
}

export default Ember.Helper.helper(formatDate);
