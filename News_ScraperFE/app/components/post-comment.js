import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        postComment() {
            let thisId = this.get('articleID');
            let author= this.get('author');
            let text = this.get('text');
            $.ajax({
                method: "POST",
                url: "api/articles/" + thisId,
                data: {
                    author: author,
                    text:text 
                }
            })
                .done(()=> {this.sendAction('postComment'); });
            //figure out the "ember" way later
                    this.set('author', '');
                    this.set('text', '');
        }
    }
});
