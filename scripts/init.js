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
        revert: "invalid",
        cursor: "move",
        cursorAt: { top: 50, left: 45 },
        helper: function (event) {
            return $('<img width="100" src= "'+$(this).find("img").attr("src")+'" alt= "3D- Drucker" > ')
        }
    });

    //$("diagram").droppable();
    $("#diagram").droppable({
        accept: '.device',
        drop: function (event, ui) {
          //  var clone = $(ui.helper).clone();
            var clone = $(ui.draggable).clone();
            var parentOffset = $(this).parent().offset(); 
            var relX = event.pageX - parentOffset.left - 50;
            var relY = event.pageY - parentOffset.top - 120;
            clone.attr("style", "position: absolute; left: " + relX + "px; top: " + relY+"px;");
            clone.attr("id", "bla2");
            clone.removeClass();
            $(clone).draggable({
                containment: '#diagram'
            });

            $(this).find(".devices").append(clone);

        }
    });
    

});
