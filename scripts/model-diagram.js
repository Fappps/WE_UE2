/**
 * Class for the complete diagram
 * @param {string} areaSelector
 * @param {string} arrowButtonSelector
 * @param {Counter} devicesCounter
 * @param {Counter} arrowsCounter
 * @param {Controls} controls
 * @class
 */
function Diagram(areaSelector, arrowButtonSelector, devicesCounter, arrowsCounter, controls) {
    "use strict";
    const _this = this;

    /**
     * The jQuery object containing the diagram wrapper
     * @const
     */
    this.area = $(areaSelector);

    /**
     * The jQuery object containing the arrow button in the sidebar
     */
    const arrowButton = $(arrowButtonSelector);

    /**
     * The jQuery object containing the arrows svg area
     * @const
     */
    this.arrows = this.area.find(".arrows svg");

    /**
     * The jQuery object containing the device list
     * @const
     */
    this.devices = this.area.find(".devices");

    /**
     * The jQuery object containing the context menu
     */
    const context = $(".contextMenu");


    // TODO diagram: add variables for drawing mode and to store selected devices and arrows
    let drawingMode = false;
    let selectedDevice = null;

    // Initialize events
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO diagram: prevent standard context menu inside of diagram
        _this.area.attr("onContextMenu", "return false;");

        // TODO diagram: attach mouse move event and draw arrow if arrow active mode is on

        // TODO diagram: add device drop functionality by jquery ui droppable and prevent dropping outside the diagram
        _this.area.droppable({
            accept: '.device',
            drop: function (event, ui) {
                addDevice(event, ui);
            }
        });

        // TODO diagram: attach mousedown event to body element and remove all active modes like arrow drawing active mode or selected device mode
        $(document.body)[0].addEventListener("mousedown",function (event) {
            deactivateArrowDrawing();
            if (selectedDevice) {
                selectedDevice.setActive(false);
                selectedDevice = null;
            }
        });

        // TODO diagram: attach keyup event to html element for 'ENTF' ('DEL') (delete device or arrow) and 'a'/'A' (toggle arrow active mode)
        arrowButton.click(function () {
            toggleArrowActive();
        });
        // TODO diagram: attach events for context menu items ('Detailseite', 'Löschen')
        /*
        $(areaSelector).on('contextmenu', function(event) {
            event.preventDefault();
            $(context).css({
                'top': event.pageY,
                'left': event.pageX
            });
        });*/


    }



/**
 * Toggle whether drawing arrows is active or not
 */
function toggleArrowActive() {
    // TODO diagram: toggle arrow active mode (call deactivateArrowDrawing() or activateArrowDrawing()
    if (drawingMode) {
        deactivateArrowDrawing();
    } else {
        activateArrowDrawing();
    }
}

/**
 * Append the currently drawn arrow to the diagram
 */
function addArrow() {
    // TODO diagram: if drawing arrow mode is on, create Arrow object

}

/**
 * Set arrow drawing to active
 */
function activateArrowDrawing() {
    // TODO diagram: reset selected arrows and selected devices, enable arrow active mode and add active class to arrow button in sidebar
    arrowButton.addClass('active');
    drawingMode = true;
    //unselect arrows and devices

}

/**
 * Set arrow drawing to inactive and delete the temporary arrow
 */
function deactivateArrowDrawing() {
    arrowButton.removeClass('active');
    drawingMode = false;
}

/**
 * TODO diagram: use this function to get relative coordinates of devices inside diagram
 * Determine the coordinates relative to the diagram area's top left corner
 * @param {number} x The absolute x coordinate
 * @param {number} y The absolute y coordinate
 * @returns {number[]} An array with two elements containing the relative x and y coordinates
 */
function getRelativeCoordinates(x, y) {
    return [
        x - _this.area.offset().left - _this.area[0].clientLeft,
        y - _this.area.offset().top + _this.area[0].clientTop
    ];
}

/**
 * Add a new device on dropping it onto the diagram area
 * @param event The jQuery event instance
 * @param ui The jQuery UI instance
 */
function addDevice(event, ui) {
    // TODO diagram: check if dragged device is inside diagram, if not => do nothing

    var svg = $(images[ui.draggable.context.getAttribute("data-device-type")]);
    var relX = getRelativeCoordinates(event.pageX, event.pageY)[0];
    var relY = getRelativeCoordinates(event.pageX, event.pageY)[1];

    if (relX - 50 < 0 || relY - 50 < 0 || relX + 95 > 768 || relY + 48 > 548) {
        return;
    }

    var device = new Device(
        _this,
        parseInt($(".devices-counter").text()), [relX, relY],
        ui.draggable.context.getAttribute("data-device-type"),
        ui.draggable.context.getAttribute("title"),
        0,
        10,
        svg,
        update[ui.draggable.context.getAttribute("data-device-type")]);

    devicesCounter.alterCount(1);
    controls.addDevice(device);

    /**
     * TODO diagram: if dragged device is inside diagram, add dragged device to diagram
     *                 + get data added to html object in overview
     *                 + add image of device-resources.js
     *                 + add update function of device-updating-states.js
     *                 + create object of Device and transmit parameters
     *                 + add device to Controls
     *                 + adapt device counter of controls
     */
}

/**
 * Callback for clicking on an arrow
 * @param {Arrow} arrow the arrow instance
 */
function arrowClick(arrow) {
    // TODO diagram: call selectArrow() with arrow, if arrow!=selectedArrow, otherwise with null
    if (arrow != selectedArrow) {
        selectArrow(arrow);
    } else {
        selectArrow(null);
    }
}

/**
 * Callback for opening the context menu for the given device
 * @param {Device} device the device instance
 * @param event The jQuery Event instance
 */
function showContextMenu(device, event) {
    // TODO diagram: show context menu + select device + deactivate arrow drawing
    device.bind("contextmenu", function () {
        $(context).css({
            top: event.pageY + 'px',
            left: event.pageX + 'px'
        }).show();
        if (selectedDevice != device) {
            selectedDevice.setActive(false);
        }
    });

    selectedDevice = device;
    device.setActive(true);

}

/**
 * Callback for mouse down on a device
 * @param {Device} device the device instance
 */
function deviceMouseDown(device) {
    /**
     * TODO diagram: this method should be called in model-device.js if device a device is clicked
     *              + if arrow drawing mode is enabled and no device is selected before, create new object of Arrow for drawingArrow
     *              + if arrow drawing mode is enabled and a device was already selected before, add the drawn arrow between two devices
     *              + if selected device before is equal to new selected device, disable arrow drawing mode and delete drawn arrow from device to mouse position
     */
    //
}

/**
 * Callback for releasing the mouse over a device (end of mouse movement)
 * @param {Device} device the device instance
 */
function deviceMouseUp(device) {
    // TODO diagram: if drawing arrow mode is enabled and start device != end device, set end device of drawing arrow and add drawing arrow with addArrow()
}

/**
 * Select the given arrow
 * @param {?Arrow} arrow The arrow to select, or null to unselect
 */
function selectArrow(arrow) {
    // TODO diagram: select arrow
    if (arrow != null) {
        selectedDevice = arrow;
        arrow.setActive(true);
        if (selectedDevice != null) {
            selectedDevice.setActive(false);
        }
        //set arrow selected (css)
    } else {
        selectedDevice.setActive(false);
        selectedDevice == null;
    }
}

/**
 * Select the given device
 * @param {?Device} device The device to select, or null to unselect
 */
function selectDevice(device) {
    if (device) {
        console.log("active not null");
        if (selectedDevice != device) {
            if (selectedDevice)
                selectedDevice.setActive(false);

            console.log("active2");
            device.setActive(true);
            selectedDevice = device;
        }
    } else {

        console.log("active null");
        if (selectedDevice) {

            console.log("active2null");
            selectedDevice.setActive(false);
            selectedDevice = null;
        }
    }
    // TODO diagram: select device
}

/**
 * Remove the selected arrow
 */
function deleteSelectedArrow() {
    // TODO diagram: delete selected arrow
    if (selectArrow != null) {
        //set selectedArrow unselected (css)
        selectArrow == null;
    }
}

/**
 * Completely remove the selected device
 */
function deleteSelectedDevice() {
    // TODO diagram: delete selected device
}

// Export some methods
this.activateArrowDrawing = activateArrowDrawing;
this.arrowClick = arrowClick;
this.showContextMenu = showContextMenu;
this.deviceMouseDown = deviceMouseDown;
this.deviceMouseUp = deviceMouseUp;
this.selectDevice = selectDevice;
}