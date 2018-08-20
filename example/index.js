
import Lue from '../src/index';

const app = new Lue({
    el: '#app',
    data: {
        name: 'youngwind',
        age: 24,
        address: {
            info: {
                city: "beijing"
            }
        },
        message: ['a', 'b', 'c']
    }
});


app.$watch('name', function (val) {
    console.log('我watch住了name');
    console.log(`新的name为${val}`)
});
app.$data.name = 'lsl';
app.$watch('address.info.city', function (val) {
    console.log('我watch住了city');
    console.log(`新的city为${val}`)
});
app.$data.address.info.city = 'lsl';
window.app = app;

