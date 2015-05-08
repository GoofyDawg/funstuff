(function() {
    "use strict";
    //Seed data
    var seed = [
        {note:'test note 1'},
        {note:'test note 2'},
        {note:'test note 3'},
        {note:'test note 4'},
        {note:'test note 5'},
        {note:'test note 6'},
        {note:'test note 7'},
        {note:'test note 8'},
        {note:'test note 9'},
        {note:'test note 10'}
    ];
    //Just use a generic collection
    var Notes = Backbone.Collection;

    var NoteView = Backbone.View.extend({
        el : '#noteContainer',
        initialize : function() {
            this.collection.on('reset', this.render, this);
            this.collection.on('add', this.handleAdd, this);
            this.collection.on('remove', this.handleRemove, this);
            this.list = this.$('#notes');
            this.input = this.$('#iput');
            this.collection.reset(seed);
            this.render();
        },
        events : {
            'click #btn' : 'addNote',
            'click li' : 'removeNote',
            'keypress #iput' : 'addNoteOnEnter'
        },
        /**
         * Render just empties the list on the DOM, then reparses
         * the collection.
         */
        render : function() {
            this.list.empty();
            this.collection.each(_.bind(function(model) {
                this.handleAdd(model);
            }, this));
        },
        /**
         * Simply a wrapper around addNote if the user presses [Enter]
         */
        addNoteOnEnter : function(e) {
            if (e.keyCode == 13) this.addNote();
        },
        /**
         * Adds a note to the collection. The collection will then trigger an "add" event
         */
        addNote : function(event) {
            var noteVal = this.input.val();
            if (noteVal) {
                this.collection.add({note:noteVal});
            }
        },
        /**
         * Handles the "add" event from the collection
         */
        handleAdd : function(model) {
            this.list.append('<li>' + model.get('note') + '</li>');
            this.input.val(null);
        },
        /**
         * Removes the note from the collection associated with the clicked item
         */
        removeNote : function(event) {
            var model = this.collection.at($(event.currentTarget).index());
            this.collection.remove(model);
        },
        /**
         * Removes an li element from the list based upon removal from collection
         */
        handleRemove : function(model, collection, options) {
            this.$('li').eq(options.index).remove();
        }
    });

    $(function() {
        var coll = new Notes(seed);
        new NoteView({collection: coll});
    });

}());
