const update = {
    "item-generator": updateItemGenerator,
    "machine": updateMachine,
    "conveyor": updateConveyor,
    "intelligent-conveyor": updateIntelligentConveyor,
    "interim-storage": updateInterimStorage,
    "end-storage": updateStorage,
    "trash-storage": updateStorage
};

/**
 * Update the image of an item generator ("3D-Drucker")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateItemGenerator(container, min, max, value) {
    if (value=="Teilweise fertig"){
        container.find(".thirdPlane").hide();
        container.find(".secondPlane").show();
    }else if (value=="Unfertig"){
        container.find(".secondPlane").hide();
        container.find(".thirdPlane").hide();
    }else {
        container.find(".secondPlane").show();
        container.find(".thirdPlane").show();
    }
    //container.find("#rect839").show();
    //container.find("");
    // TODO update svg: see assignment document

}

/**
 * Update the image of a machine ("Maschine")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateMachine(container, min, max, value) {
    // TODO update svg: see assignment document
    container.find("#text3819").text(min);
    container.find("#text3819-3").text(max);
    //container.find("#text3819-3").text(100);
    //mit fill die farbe
    //container.find("#path3680").attr('transform','translate(20,100) scale(10)');
    //container.append("<line x1 =\"0\" \"0\" x2 =\"100\" \"100\" y1 =\"60\" y2 =\"30\" \"30\" \"")
    if (value<=33){
        container.find("#line2").remove();
        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('id','line2');
        newLine.setAttribute('x1','290');
        newLine.setAttribute('y1','300');
        newLine.setAttribute('x2','290');
        newLine.setAttribute('y2','330');
        newLine.setAttribute("stroke", "rgb(0, 136, 0)");
        newLine.setAttribute("stroke-width", "70");
        container.find("#path3680").css({fill:"rgb(0, 136, 0)"});
        container.find("#g3696").append(newLine);
    }else if (value<=66) {
        container.find("#line2").remove();
        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('id','line2');
        newLine.setAttribute('x1','290');
        newLine.setAttribute('y1','180');
        newLine.setAttribute('x2','290');
        newLine.setAttribute('y2','330');
        newLine.setAttribute("stroke", "rgb(255, 102, 0)");
        newLine.setAttribute("stroke-width", "70");
        container.find("#path3680").css({fill:"rgb(255,102,0)"});
        container.find("#g3696").append(newLine);
    }else {
        container.find("#line2").remove();
        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('id','line2');
        newLine.setAttribute('x1','290');
        newLine.setAttribute('y1','50');
        newLine.setAttribute('x2','290');
        newLine.setAttribute('y2','330');
        newLine.setAttribute("stroke", "rgb(255, 0, 0)");
        newLine.setAttribute("stroke-width", "70");
        container.find("#path3680").css({fill:"rgb(255, 0, 0)"});
        container.find("#g3696").append(newLine);
    }


}

/**
 * Update the image of a conveyor ("Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateConveyor(container, min, max, value) {
    // TODO update svg: see assignment document
    if (value==false){
        container.find(".package").hide();
    }else {
        container.find(".package").show();
    }
}

/**
 * Update the image of an intelligent conveyor ("Intelligentes Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateIntelligentConveyor(container, min, max, value) {
    // TODO update svg: see assignment document
    if (value==false){
        container.find(".packageLeft").hide();
        container.find(".packageRight").hide();
    }else {
        container.find(".packageLeft").show();
        container.find(".packageRight").show();
    }

}

/**
 * Update the image of an interim storage ("Temporäres Lager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateInterimStorage(container, min, max, value) {
    // TODO update svg: see assignment document
    if (value==0){
        container.find(".packageTop").hide();
        container.find(".packageBottom").hide();
    }else if (value<=4){
        container.find(".packageTop").hide();
        container.find(".packageBottom").show();
    }else {
        container.find(".packageTop").show();
        container.find(".packageBottom").show();
    }

}

/**
 * Update the image of an end storage ("Endlager") or a trash storage ("Mülllager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateStorage(container, min, max, value) {
    // TODO update svg: see assignment document
    container.find("#tspan866").text(value);
    container.find("#tspan837").text(value);
}
