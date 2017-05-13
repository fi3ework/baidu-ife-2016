function Waterfall(config) {
    try {
        if (typeof config.colNum !== "number") {
            throw new Error("error! wrong colnum");
        }
        this.colNum = config.colNum;
        let rootDom = document.getElementById(config.rootContainer);
        if (rootDom.nodeType !== 1) {
            throw new Error("error! wrong root id");
        }
        this.rootDom = rootDom;
    } catch (ex) {
        console.error(ex.message);
    }

    this.columns = [];
    this.initColumn(this.colNum);
    
    this.boxSelector = config.boxSelector;
    let existedBoxes = this.rootDom.querySelectorAll(this.boxSelector);
    this.boxes = existedBoxes ? Array.prototype.slice.call(existedBoxes) : [];
    this.render();
}

/**
 * init the columns 
 */
Waterfall.prototype.render = function () {
    for (let i = 0; i < this.boxes.length; i++){
        this.appendBox(this.boxes[i]);
    }
}

/**
 * init the columns 
 */
Waterfall.prototype.initColumn = function (colNum) {
    for (let i = 0; i < colNum; i++) {
        let currCol = document.createElement("div");
        currCol.className = "waterfallColumn";
        currCol.style.width = (100 / colNum) + "%";
        this.rootDom.appendChild(currCol);
        this.columns.push(currCol);
    }
}

/**
 * append box to column
 */
Waterfall.prototype.appendBox = function (box) {
    console.log(box)
    let currMinHeightColIndex = this.getMinHeightCol();
    this.columns[currMinHeightColIndex].appendChild(box);
    return box;
}

/**
 * get min height column index
 */
Waterfall.prototype.getMinHeightCol = function () {
    let minIndex = 0;
    let minHeight = Infinity;
    for (let i = 0; i < this.columns.length; i++){
        const currHeight = this.columns[i].scrollHeight;
        // console.log(currHeight);
        if (currHeight < minHeight) {
            minHeight = currHeight;
            minIndex = i;
        }
    }
    return minIndex;
}