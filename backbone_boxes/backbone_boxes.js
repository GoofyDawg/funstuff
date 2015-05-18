var ListView = Backbone.View.extend({
    el : 'ul',
    events : {
        'click li' : 'handleClick'
    },
    handleClick : function(event) {
        this.trigger('colorChanged', {
            background : $(event.currentTarget).css('background-color')
        });
    }
});

var BoxView = Backbone.View.extend({
    el : 'div',
    initialize : function(options) {
        if (options.hasOwnProperty("list")) {
            this.listenTo(options.list,'colorChanged',this.setBoxColor);
        }
    },
    setBoxColor : function(colorObj) {
        this.$el.css('background-color', colorObj.background);
    }
});

$(function() {
    var box = new BoxView({
        list : new ListView()
    });
});
