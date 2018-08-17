
 //1.实例化
function Lue(options) {
    this._init(options);
}


Lue.prototype = {
    constructor: Lue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./api/lifecycle'),
    ...require('./api/data'),
    observer: {...require('./observer/observer')}
};
console.log(Lue.prototype)
module.exports = Lue;
