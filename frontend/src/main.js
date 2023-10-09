import { createApp } from 'vue'				// Импорт метода для создания приложения
import App from '@/App.vue'					// Импорт главного компонента
import router from '@/router'				// Маршрутизация
import store from '@/store';				// Импорт store
import 'bootstrap/dist/css/bootstrap.css'	// Подключение Bootstrap

const app = createApp(App);					// Создание экземпляра приложения
app.use(router);							// Подключение маршрутизации
app.use(store);								// Подключение store

app.mount('#app');							// Привязка экземпляра приложения к странице HTML