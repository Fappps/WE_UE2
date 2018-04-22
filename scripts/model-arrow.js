/**
 * A class representing one arrow
 *
 * @param {Diagram} diagram The diagram on which this arrow is shown
 * @param {Device} startDevice The start node for this arrow
 * @class
 */
function Arrow(diagram, startDevice) {
    "use strict";
    const _this = this;

    /**
     * The start node for this arrow
     * @member {Device}
     */
    this.startDevice = startDevice;

    /**
     * The (optional) end node for this arrow
     * @member {?Device}
     */
    this.endDevice = null;

    /**
     * The jQuery DOM object representing this arrow
     */
    const object = $(
        '<svg width="100%" height="100%">'+
 //       '<defs>'+
 //           '<marker id="arrow-marker-side" markerWidth="10" markerHeight="10" refY="4" orient="auto">'+
 //               '<path d="M0,0 L0,8 L8,4 z" class="arrow-marker"></path>'+
 //           '</marker>'+
 //       '</defs>'+
        '<path d="M10,10 L70,10" class="arrow-path" marker-end="url(#arrow-marker-side)"></path>'+
        '</svg>'
    );

    let sPos=diagram.devices.find("#"+startDevice.type+startDevice.index).position();
    console.log(sPos);
    // TODO arrow: add variables if necessary
    object.find("path").attr("d","M"+sPos.left+","+sPos.top+" L170,10");
    object.css({"display":"none"});

    // TODO arrow: append the arrow DOM object to the arrows svg

    // Initialize the event handlers
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO arrow: attach events for functionality like in assignment-document described
        // TODO arrow optional: attach events for bonus points for 'TAB' to switch between arrows and to select arrow
    }

    /**
     * Add this arrow to the end nodes, if not yet present
     * @returns {boolean} True if the arrow was added, false if it was already present
     */
    function add() {
        if (!_this.endDevice || _this.endDevice === _this.startDevice || _this.startDevice.isConnectedTo(_this.endDevice)) {
            return false;
        }

        _this.startDevice.addArrowOut(_this);
        _this.endDevice.addArrowIn(_this);
        object.addClass("arrow-path-added");
        return true;
    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        // TODO arrow: set/remove active class of arrow
    }

    /**
     * Update the end position of the arrow path
     * @param {number[]} endPosition New end position of the arrow
     */
    function updateEndPosition(endPosition) {
        var starPos = startDevice.getIntersectionCoordinates(endPosition);
        arrowPath.attr("d", "M" + starPos[0] + "," + starPos[1] + " L" + endPosition[0] + "," + endPosition[1]);
        // TODO arrow: draw an arrow between the start device and the given end position
        // HINT You can use Device.getIntersectionCoordinates to calculate the coordinates for the start device
    }

    /**
     * Update the arrow path according to the device positions, or hide the path if no end device is set
     */
    function updateArrow() {
        let ePos=diagram.devices.find("#"+_this.endDevice.type+_this.endDevice.index).position();
        let pos1=_this.startDevice.getIntersectionCoordinates([ePos.left, ePos.top]);
        let pos2=_this.endDevice.getIntersectionCoordinates([pos1[0], pos1[1]]);
        object.find("path").attr("d","M"+pos1[0]+","+pos1[1]+" L"+pos2[0]+","+pos2[1]);
        object.css({"display":"flex"});
        //arrowPath.attr("d", "M"+starPos[0]+","+starPos[1]+ " L"+endPos[0]+","+endPos[1]);
        // TODO arrow: draw an arrow between the start and end device
        // HINT You can use Device.getCenterCoordinates and Device.getIntersectionCoordinates
    }

    /**
     * Set the end device for this arrow
     * @param {Device} device The device to use as endpoint
     */
    function setEndDevice(device) {
        _this.endDevice = device;
        updateArrow();
        diagram.arrows.append(object);
    }

    /**
     * Remove this arrow from the DOM and its devices
     */
    function deleteArrow() {
        // TODO arrow: delete arrow from HTML DOM and from the devices of the endpoints of the arrow
    }

    // Export some of the methods
    this.add = add;
    this.setActive = setActive;
    this.updateEndPosition = updateEndPosition;
    this.updateArrow = updateArrow;
    this.setEndDevice = setEndDevice;
    this.deleteArrow = deleteArrow;
}