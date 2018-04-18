$(document).ready(function() {

    // TODO init: initialize all counters
    var elementCounter = new Counter($("span.devices-counter"));
    var arrowCounter = new Counter($("span.arrows-counter"));
    // TODO init: initialize controls
    var controls = new Controls($("#controls"));

    // TODO init: initialize diagram and transfer counters and controls
    var diagram = new Diagram("#arrow-sidebar-add", "#diagram", elementCounter, arrowCounter, controls);

    // TODO init: add drag functionality to devices in sidebar
    $("div.device-image").draggable({helper: "clone", containment:"window"});
    $(".device").draggable({ revert: "invalid", helper: "clone" });

    //$("diagram").droppable();
    $("#diagram").droppable({
        drop: function(event, ui) {
            $(this).append($(ui.helper).clone());
        }
    });
});
