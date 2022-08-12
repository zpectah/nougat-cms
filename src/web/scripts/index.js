import { createApp } from 'vue';

import demoComponent from './components/demo-component.vue';

createApp({
    data() {
        return {
            count: 0
        }
    },
    mounted() {
        console.log('web index file is mounted and Vue app is ready to operate');
    },
    components: {
        'demo-component': demoComponent,
    },
}).mount('#root');
