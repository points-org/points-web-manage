import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './style/common.scss' 
import '@/assets/icons'
import SvgIcon from '@/components/svgIcon'

const app = createApp(App);

app.component('svg-icon', SvgIcon)

app.config.productionTip = false
app.use(Antd)
app.use(router)
app.use(store)
app.use(VueAxios, axios)
const icons = Icons
for (const i in icons) {
	app.component(i, icons[i])
}

app.mount('#app')
