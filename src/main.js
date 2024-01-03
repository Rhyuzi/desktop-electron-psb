import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/kejaksaan.scss'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/js/all.js';
import mixins from './mixins'

createApp(App).use(store).use(router).mixin(mixins).mount('#app')