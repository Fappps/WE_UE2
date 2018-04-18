$(document).ready(function() {

    // TODO init: initialize all counters
    var elementCounter = new Counter($("span.devices-counter"));
    var arrowCounter = new Counter($("span.arrows-counter"));
    // TODO init: initialize controls
    var controls = new Controls($("#controls"));

    // TODO init: initialize diagram and transfer counters and controls
    var diagram = new Diagram("#arrow-sidebar-add", "#diagram", elementCounter, arrowCounter, controls);

    // TODO init: add drag functionality to devices in sidebar
    $(".device").draggable({
        revert: "invalid", helper: function (event) {
            var clone = $(this).find(".device-image").clone();
            return clone;
        }
    });

    //$("diagram").droppable();
    $("#diagram").droppable({
        drop: function (event, ui) {
            var clone = $(ui.helper).clone();
            var parentOffset = $(this).parent().offset(); 
            var relX = event.pageX - parentOffset.left - 50;
            var relY = event.pageY - parentOffset.top - 100;
            clone.attr("style", "position: absolute; left: " + relX + "px; top: " + relY+"px;");
            clone.attr("id", "bla2");

            $(this).find(".devices").append(clone);
        }
    });
});
