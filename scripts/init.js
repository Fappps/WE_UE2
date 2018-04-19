$(document).ready(function () {

    // TODO init: initialize all counters
    var elementCounter = new Counter($(".devices-counter"));
    var arrowCounter = new Counter($(".arrows-counter"));
    // TODO init: initialize controls
    var controls = new Controls($("#controls"));

    // TODO init: initialize diagram and transfer counters and controls
    var diagram = new Diagram("#diagram", "#arrow-sidebar-add", elementCounter, arrowCounter, controls);

    // TODO init: add drag functionality to devices in sidebar
    $(".device").draggable({
        revert: "invalid",
        cursor: "move",
        cursorAt: { top: 50, left: 45 },
        helper: function (event) {
            return $('<img width="100" src= "' + $(this).find("img").attr("src") + '" alt= "3D- Drucker" > ')
        }
    });

});