/// TODO: clean this up
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function make_set() {
    console.log("################");

    var dimensions = [
        shuffle(["1", "2", "3"]),
        shuffle(["A", "B", "C"]),
        shuffle(["$", "%", "&"]),
        shuffle(["x", "y", "z"]),
    ]

    var dimensions = [
        shuffle(["1", "2", "3", "5", "8"]),
        shuffle(["D", "H", "C", "S"]),
		];
    var stable_dimensions = [false, false];
    var dimension_length = 3;
    var dimension_count = 2;
    
    var cards = [];
    for(var iteration=0; iteration < dimension_length; iteration++) {
        var card = "";
        for(var dimension_number=0; dimension_number < dimension_count; dimension_number++) {
            if(stable_dimensions[dimension_number]) {
                card += dimensions[dimension_number][0];
            } else {
                card += dimensions[dimension_number][iteration];

            }
        }
        cards.push(card);
    }
    
    var iter_count = 0;
    // assumes we will never have only one stable dimension
    nonset_card = cards[0];
    while(cards.indexOf(nonset_card) > -1) {
        nonset_card = "";
        for(var dimension_number=0; dimension_number < dimension_count; dimension_number++) {
            if(stable_dimensions[dimension_number]) {
                nonset_card += dimensions[dimension_number][0];
            } else {
                nonset_card += dimensions[dimension_number][Math.floor(Math.random()*dimension_length)];
            }
        }
        console.log("nonset card:", nonset_card);
        iter_count++;
        if(iter_count > 10) {
            return;
        }
    }


    // cards = [
    //     "1A$x",
    //     "1A%y",
    //     "1A&z",
    // ]
    console.log("cards:", cards);
    console.log("nonset:", nonset_card);
}
make_set()
