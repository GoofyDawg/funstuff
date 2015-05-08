//Here, the anonymous function closes over count
//but count is in scope of all buttons, as the .btn
//selector applies the click to each .btn element
function setClosureOnButtons() {
    $(".btn").click((function() {
        var count = 0;
        return function(e) {
            count++;
            console.log(count);
            console.log($(e.currentTarget).text());
        }
    })());
}

//This closes over count, but here count is only within
//the scope of each button as the click is applied to
//each button individually, not as a whole as above.
function setClosureOnButton() {
    $(".btn").each(function() {
        $(this).click((function() {
            var count = 0;
            return function(e) {
                count++;
                console.log($(e.currentTarget).text() + ": " + count);
            };
        })());
    });
}
