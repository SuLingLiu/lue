
/* 
 * 循环元素，找到文本内容，如果有插值把插值的内容替换成对应的数据，放入文档碎片中，最后插入到this.$el
*/
exports._compile = function () {
    this.fragment = document.createDocumentFragment();
    this._compileNode(this.$template);
    
    this.$el.innerHTML = "";
    this.fragment.childNodes.forEach((child) => {
        this.$el.appendChild(child.cloneNode(true));
    });
};

exports._compileElement = function (node) {
    this.currentNode = document.createElement(node.tagName);
    this.fragment.appendChild(this.currentNode);

    if (node.hasChildNodes()) {//childNodes只包含一级子节点集合，包括文本、元素、注释等
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

/* 
 * 对插值进行数据替换
*/
exports._compileText = function (node) {
    let nodeValue = node.nodeValue;

    if (nodeValue === '') return;


    let patt = /{{[\w.]+}}/g;
    let ret = nodeValue.match(patt);

    if (!ret) return;

    ret.forEach((value) => {
        let property = value.replace(/[{}]/g, '');
        nodeValue = nodeValue.replace(value, this.$data[property]);
    }, this);

    //createTextNode() 可创建文本节点
    this.currentNode.appendChild(document.createTextNode(nodeValue));
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
        // 元素节点
        case 1:
            this._compileElement(node);
            break;
        // 文本
        case 3 :
            this._compileText(node);
            break;
        default:
            return;
    }
};
