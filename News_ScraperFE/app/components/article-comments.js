import Ember from 'ember';

export default Ember.Component.extend({
    isShowingComments: false,
    isPostingComment: false,
    actions: {
        toggleComments() {
            this.toggleProperty('isShowingComments');
        },
        toggleCommentForm() {
            this.toggleProperty('isPostingComment');
        },
        reloadModel() {
            this.sendAction('reloadModel');
        }
    }
});
