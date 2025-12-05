import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// 1. import da biblioteca e o CSS
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

// 2. definição de opções (recomendado)
const options = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};

// 3. registra o plugin
app.use(Toast, options);

app.mount('#app');