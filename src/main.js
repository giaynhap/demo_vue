import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

    
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { LayoutPlugin } from 'bootstrap-vue'
import { BreadcrumbPlugin } from 'bootstrap-vue'
import moment from 'moment'
import './custom.scss'
import VueRx from 'vue-rx'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.config.productionTip = false
Vue.use(BreadcrumbPlugin)

Vue.use(LayoutPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRx)
 

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
  }
});

Vue.filter('vnStringDate', function(value) {
  if (value) {
    const thus=["Chủ nhật","hai","ba","tư","năm","sáu","bảy"];
    let day = value.getDay();
    let strVal = "Thứ "+thus[day]+" ,";
    if (day == 0){
      strVal = thus[day]+" ,";
    }

    return strVal+moment(String(value)).format('\\n\\g\\à\\y DD \\t\\h\\á\\n\\g MM \\n\\ă\\m YYYY | hh:mm')
  }
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
