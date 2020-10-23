import Vue from 'vue';
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

Vue.prototype.$layer = layer(Vue);
export default {
    install(Vue) {
        Vue.prototype.$layer = layer(Vue);
    },
};

