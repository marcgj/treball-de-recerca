var planetes = [{
        "nom": "Personalitzat",
        "massa": 1,
        "radi": 1
    },
    {
        "nom": "Terra",
        "massa": 5.972e24,
        "radi": 6371000
    },
    {
        "nom": "Lluna",
        "massa": 7349e22,
        "radi": 1737100
    },
    {
        "nom": "Mart",
        "massa": 20,
        "radi": 20
    }

];

var presets = [{
        "nom": "Personalitzat",
        "sX": 0,
        "sY": 0,
        "vX": 0,
        "vY": 0
    },
    {
        "nom": "EEI",
        "sX": 0,
        "sY": 6771000,
        "vX": 7660,
        "vY": 0
    },
    {
        "nom": "Lluna",
        "sX": 0,
        "sY": 385000000,
        "vX": 1023.05556,
        "vY": 0
    },
];


window.onload = fetchJson();



function fetchJson() {

    var selector = document.getElementById("select-planeta");

    var n;
    for (n = 0; n < planetes.length; n++) {
        selector.options[selector.options.length] = new Option(planetes[n].nom, n);
    }
    var selector = document.getElementById("select-predef");
    for (n = 0; n < presets.length; n++) {
        selector.options[selector.options.length] = new Option(presets[n].nom, n);
    }
}

document.getElementById("select-planeta").addEventListener("input", function () {
    setValues("planeta");
});
document.getElementById("select-predef").addEventListener("input", function () {
    setValues("predef");
});


function setValues(type) {

    var rplaneta = document.getElementById("rplaneta");
    var mplaneta = document.getElementById("mplaneta");

    var vXi = document.getElementById("vXi");
    var vYi = document.getElementById("vYi");

    var sXi = document.getElementById("sXi");
    var sYi = document.getElementById("sYi");



    if (type == "planeta") {
        var selectorValue = document.getElementById("select-planeta").value;

        mplaneta.value = planetes[selectorValue].massa;
        rplaneta.value = planetes[selectorValue].radi;
    } else if (type == "predef") {
        var selectorValue = document.getElementById("select-predef").value;

        sXi.value = presets[selectorValue].sX;
        sYi.value = presets[selectorValue].sY;

        vXi.value = presets[selectorValue].vX;
        vYi.value = presets[selectorValue].vY;
    }



}