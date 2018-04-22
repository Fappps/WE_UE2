/**
 * A class used for updating the values of the devices
 * @param form The jQuery container for the form
 * @class
 */
function Controls(form) {

    /**
     * The current values loaded from the form
     * @type {object}
     */
    let values = [];

    /**
     * A list of devices that should be updated with new values
     * @type {Device[]}
     */
    const devices = [];


    // TODO controls: add variables if necessary


    // Listen for updates
    form.submit(event => {
        event.preventDefault();
        updateDevices();
    });

    // Load initial values
    updateDevices();

    /**
     * Read the current values and update all registered devices
     */
    function updateDevices() {
        fillValues();
        devices.forEach(function(entry) {
            entry.updateDevice(values[entry.type]);
		});
        /*
        for (Device dev : devices){
            if (dev.type == 'asdlkfjkalsdf')
                dev.updateDevices($('#control-interim-storage').text());
        }
        */
        // TODO controls: get values of all controls of the form and call updateDevice on each device
    }

    function fillValues(){
        var tempVal = {};
        values["item-generator"]= form.find("#control-item-generator option:selected").text();
        values["machine"]= form.find("#control-machine").val();
        values["interim-storage"]= form.find("#control-interim-storage").val();
        values["end-storage"]= form.find("#control-end-storage").val();
        values["trash-storage"]= form.find("#control-trash-storage").val();
        values["intelligent-conveyor"]= form.find("#control-intelligent-conveyor").is(":checked");
        values["conveyor"]= form.find("#control-conveyor").is(":checked");


        //values[1]={name:"item-generator", value: form.find("#control-item-generator option:selected").text()};
        //return tempVal;
    }

    /**
     * Add a device to the list and set to the current value
     * @param {Device} device The device object to add
     */
    function addDevice(device) {
        device.updateDevice(values[device.type]);
        devices[devices.length] = device;
    }

    /**
     * Remove a device from the list
     * @param {Device} device
     */
    function removeDevice(device) {
        // TODO controls: remove deleted device from list
    }

    // Export public methods
    this.addDevice = addDevice;
    this.removeDevice = removeDevice;
}
