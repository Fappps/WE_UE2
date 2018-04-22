/**
 * Function called for updating the image of this device
 *
 * @callback updateFunction
 * @param {jQuery} object The jQuery DOM node for this device
 * @param min The minimum value for the device
 * @param max The maximum value for the device
 * @param value The new value for the device
 */

/**
 * A class representing one device
 *
 * @param {Diagram} diagram The diagram on which this device is shown
 * @param {number} index The index of this device
 * @param {number[]} position The x and y coordinates of this device, relative to the diagram
 * @param {string} type The type of this device
 * @param {string} title The title of this device
 * @param {?number} min The minimum value for this device
 * @param {?number} max The maximum value for this device
 * @param {string} image The image definition for this device
 * @param {updateFunction} updateFunction
 * @class
 */
function Device(diagram, index, position, type, title, min, max, image, updateFunction) {
    "use strict";
    const _this = this;

    /**
     * The index of this device
     * @member {number}
     * @const
     */
    this.index = index;

    /**
     * The type of this device
     * @member {string}
     * @const
     */
    this.type = type;

    /**
     * The title of this device
     * @member {string}
     * @const
     */
    this.title = title;

    /**
     * A list of incoming arrows
     * @member {Arrow[]}
     */
    let arrowsIn = [];

    /**
     * A list of outgoing arrows
     * @member {Arrow[]}
     */
    let arrowsOut = [];

    /**
     * The jQuery DOM object representing this device
     */
   /* const object = $(
        '<div class="device dropped" data-vorgaenger data-nachfolger></div>'
    );*/

    const object = $(
        // TODO device: create html container
        '<li class="device dropped">'+
            '<dl class="device-properties">'+
                '<dt class="accessibility">Maschine</dt>'+
                '<dd class="device-type">'+title+' '+index+'</dd>'+
                '<dt>Vorgänger:</dt>'+
                '<dd class="device-predecessors"></dd>'+
                '<dt>Nachfolger:</dt>'+
                '<dd class="device-successors"></dd>'+
            '</dl>'+
            '<div class="device-image"></div>'+
        '</li>'
    );

    // TODO device: add variables if necessary

    object.find(".device-image").append(image);
    diagram.devices.append(object);
    object.css({
        left:position[0]-50,
        top:position[1]-50
      });
      /*
    object.css({
        'position': 'absolute',
        'left': (position[0] - 50),
        'top': (position[1] - 50)
    });*/

    //image.attr("width", '100px');
 //   image.attr("class", 'device-image');
    object.attr("id", type + index);

    // Initialize the event handlers
    attachEventHandlers();
    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        object[0].addEventListener("contextmenu",function (event) {
            event.preventDefault();
                diagram.showContextMenu(_this, event);
            });

        object[0].addEventListener("mousedown", function () {
            diagram.selectDevice(_this);
            console.log("active1");
        });

        object.draggable({
            containment: '#diagram',
            cursor: "move"
        });

        // TODO device optional: attach events for bonus points for 'Tab' and 'Enter'

    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        if (active) {
            object.addClass("active");
        } else {
            object.removeClass("active");
        }
    }

    /**
     * Update the list of predecessors in the DOM
     */
    function updatePredecessors() {
        // TODO device: update predecessors in overview.html of device like in UE1
    }

    /**
     * Update the list of successors in the DOM
     */
    function updateSuccessors() {
        // TODO device: update successors in overview.html of device like in UE1
    }

    /**
     * Update the position of all connected arrows
     */
    function moveDevice() {
        // TODO device: update endpoints of arrows
        // HINT You can use Arrow.updateArrow()
    }

    /**
     * Determines if a direct connection to the given device already exists
     * @param {Device} device The target device
     * @returns {boolean} True iff there exists a direct arrow in either direction
     */
    function isConnectedTo(device) {
        return arrowsOut.some(arrow => arrow.endDevice === device) ||
            arrowsIn.some(arrow => arrow.startDevice === device);
    }

    /**
     * Update the image for the given value
     * @param value The new value
     */
    function updateDevice(value) {
        if (updateFunction) {
            updateFunction(image, min, max, value);
        }
    }

    /**
     * Add an incoming arrow to the device
     * @param {Arrow} arrow The arrow for which this device is the end node
     */
    function addArrowIn(arrow) {
        arrowsIn.push(arrow);
        updatePredecessors();
    }

    /**
     * Add an outgoing arrow to the device
     * @param {Arrow} arrow The arrow for which this device is the start node
     */
    function addArrowOut(arrow) {
        arrowsOut.push(arrow);
        updateSuccessors();
    }

    /**
     * Delete this device and all connected arrows
     * @return {number} The number of deleted arrows
     *                  - use this number for updating counter in diagram
     */
    function deleteDevice() {
        // TODO device: delete device from HTML DOM and delete connected arrows

        let deletedArrows = 0;
        return deletedArrows;
    }

    /**
     * Remove the given arrow from the list of arrows
     * @param {Arrow} arrow The arrow to remove
     */
    function deleteArrow(arrow) {
        // TODO device: delete arrow from arrowsIn/arrowsOut and update predecessors and successors
    }

    /**
     * Get the coordinates of the center of this device
     * @returns {number[]} A two-element array containing the center in the order [left, top]
     */
    function getCenterCoordinates() {
        return [object[0].offsetLeft + object.width() / 2, object[0].offsetTop + object.height() / 2];
    }

    /**
     * Get the coordinates of this device
     * @param {number[]} targetPosition An two-element array containing the target coordinates of a line
     * @returns {number[]} A two-element array containing the point on the border closest to the target
     */
    function getIntersectionCoordinates(targetPosition) {
        // Determine the center of the device
        const width = object.width() * 0.58,
            height = object.height() * 0.58,
            center = getCenterCoordinates(),
            x = center[0],
            y = center[1],
            dx = targetPosition[0] - x,
            dy = targetPosition[1] - y;

        if (dx === 0) {
            // Vertical arrow
            return [x, y + Math.sign(dy) * height];
        }

        const slope = dy / dx;
        if (Math.abs(slope) * width >= height) {
            // Arrow intersects the top or bottom border
            return [x + Math.sign(dy) * height / slope, y + Math.sign(dy) * height]
        } else {
            // Arrow intersects the left or right border
            return [x + Math.sign(dx) * width, y + Math.sign(dx) * width * slope];
        }
    }

    // Export some of the methods
    this.setActive = setActive;
    this.updateDevice = updateDevice;
    this.getIntersectionCoordinates = getIntersectionCoordinates;
    this.isConnectedTo = isConnectedTo;
    this.addArrowIn = addArrowIn;
    this.addArrowOut = addArrowOut;
    this.deleteArrow = deleteArrow;
    this.deleteDevice = deleteDevice;
}