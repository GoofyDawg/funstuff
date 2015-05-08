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
    setBoxColor : function(colorObj) {
        this.$el.css('background-color', colorObj.background);
    }
});

$(function() {
    var list = new ListView();
    var box = new BoxView();
    box.listenTo(list,'colorChanged',box.setBoxColor);
});
