$(function() {
    if(typeof(Storage) !== "undefined") {
        $("form").submit(submitForm);
    } else {
        $("#content").html("Your browser doesn't support the necessary features " 
            + "(you're probably using Internet Explorer). "
            + "Please upgrade to a modern browser.");
    }
    cardsets = []
    cardset = {
        card_template: null,
        cards: null
    }

    function submitForm() {
        name = $("form").children(".name").val();
        if (name === "undefined" || !name) {
            // Fail!
            console.log("That name is invalid!");
            return;
        }
        card = {
            name: name,
            attrs: []
        }
        $("form").children('.item').each(function() {
            attribute = {
                name: $(this).children('[type=text]').val(),
                identifies: $(this).children('[type=checkbox]:checked').length > 0
            };
            card.attrs.push(attribute);
        });
        console.log(JSON.stringify(card));
    }
});