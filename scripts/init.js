$(document).ready(function () {

    // TODO init: initialize all counters
    var elementCounter = new Counter($("span.devices-counter"));
    var arrowCounter = new Counter($("span.arrows-counter"));
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