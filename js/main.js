$(function() {
    if (!Modernizr.localstorage) {
        $("#content").html("Your browser doesn't support the necessary features " 
            + "(you're probably using Internet Explorer). "
            + 'Please upgrade to a modern browser. <a href="http://whatbrowser.org/">Find one here.</a>');
        return;
    }

    mode = window.location.pathname.split("/").pop()
    switch (mode) {
    case "index.html":
        $("form").submit(submitForm);

        $("#reset").click(function() {
            if (confirm("Reset all the local storage?")) {
                localStorage.clear();
            }
        });
        updateDeckList();
        break;
    case "view.html":
        var deck = currentDeck();
        $("#content").append("<h1>" + deck.name + "</h1>");
        for (var i = 0, l = deck.card_template.attrs.length; i < l; i++) {
            attr = deck.card_template.attrs[i];
            $("#content").append(attr.name + " " + (attr.identifies ? "(Identifies)" : "") +  "<br>");
        }
        break;
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
    updateDeckList();
}

function updateDeckList() {
    var decks = getDecks();
    $deck = $("#deck-list");
    $deck.html("");
    for (var i = 0, l = decks.length; i < l; i++) {
        $deck.append('<div class="deck-info"><a class="view-deck" href="#">'+decks[i]+'</a></div>');
    }
    $(".view-deck").click(function() {
        viewDeck($(this).html());
    });

}

function viewDeck(name) {
    console.log(name);
    var decks = getDecks();
    if (decks.indexOf(name) >= 0) {
        // If the name is an existing deck, handle it
        localStorage["current_deck"] = name;
        window.location.href = "view.html";
    }
}

function currentDeck() {
    var deck = localStorage["current_deck"]
    if (!deck) {
        return undefined;
    }
    deck = localStorage[deck];
    return JSON.parse(deck);
}