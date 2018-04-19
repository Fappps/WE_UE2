$(document).ready(function () {

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
            return $('<img width="100" src= "' + $(this).find("img").attr("src") + '" alt= "3D- Drucker" > ')
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
            
            var counter = 0;
            var img = ui.draggable.context.getElementsByClassName("device-image")[0].getElementsByTagName("img")[0].getAttribute("src");
            var device = new Device(
                diagram,
                counter++, [relX, relY],
                ui.draggable.context.getAttribute("data-device-type"),
                ui.draggable.context.getAttribute("title"),
                0,
                10,
                ui.draggable.context.getAttribute("data-device-type"),
                img,
                function () { });

            clone.attr("style", "position: absolute; left: " + relX + "px; top: " + relY + "px;");
            clone.attr("id", "bla2");
            clone.removeClass();
            $(clone).draggable({
                containment: '#diagram'
            });

            $(this).find(".devices").append(clone);

        }
    });


});

/*
 * @param { Diagram } diagram The diagram on which this device is shown
    * @param { number } index The index of this device
        * @param { number[] } position The x and y coordinates of this device, relative to the diagram
            * @param { string } type The type of this device
                * @param { string } title The title of this device
                    * @param {?number } min The minimum value for this device
                        * @param {?number } max The maximum value for this device
                            * @param { string } image The image definition for this device
                                * @param { updateFunction } updateFunction
*/