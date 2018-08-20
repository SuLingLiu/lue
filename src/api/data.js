
exports.$watch = function (key, fn) {
    let _fn = function () {
        fn(arguments[2]);
    };
    let pathAry = key.split('.');
    if (pathAry.length === 1) {
        this.$data.$observer.on(`set:${key}`, _fn.bind(this))
    } else {//对象深层次，循环去到要watch的值
        let _temp = this.$data;
        let lastProperty = pathAry.pop();
        pathAry.forEach((property) => {
            _temp = _temp[property]
        });
        _temp.$observer.on(`set:${lastProperty}`, _fn.bind(this));
    }
};
