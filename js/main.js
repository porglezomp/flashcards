$(function() {
    if(typeof(Storage) !== "undefined") {
        $("form").submit(submitForm);
    } else {
        $("#content").html("Your browser doesn't support the necessary features " 
            + "(you're probably using Internet Explorer). "
            + "Please upgrade to a modern browser.");
    }

    $("#reset").click(function() {
        if (confirm("Reset all the local storage?")) {
            localStorage.clear();
        }
    });

    function submitForm() {
        var name = $("form").children(".name").val();
        if (name === "undefined" || !name) {
            // Fail!
            console.log("That name is invalid!");
            return;
        }

        var card_template = {
            name: name,
            attrs: []
        }
        $("form").children('.item').each(function() {
            var attribute = {
                name: $(this).children('[type=text]').val(),
                identifies: $(this).children('[type=checkbox]:checked').length > 0
            };
            card_template.attrs.push(attribute);
        });

        if (localStorage[name]) {
            console.log("That already exists!");
        } else {
            addDeck(newDeck(card_template));
        }
    }

    function newDeck(template) {
        var deck = {
            name: template.name,
            card_template: template,
            cards: [],
            progress: []
        }
        return deck;
    }

    function getDecks() {
        var decks = localStorage["decks"]
        if (decks === "undefined" || !decks) {
            decks = []
        } else {
            decks = JSON.parse(localStorage["decks"]);
        }
        return decks;
    }

    function addDeck(deck) {
        localStorage[deck.name] = JSON.stringify(deck);
        var decks = getDecks();
        decks.push(deck.name);
        localStorage["decks"] = JSON.stringify(decks);
        updateDecks();
    }

    function updateDecks() {
        var decks = getDecks();
        for (var i = 0, l = decks.length; i < l; i++) {
            decks[i];
        }
    }
});