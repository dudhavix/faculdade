import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//   clientId: '987882199766-gmlinen7da4cjurg54p15pqa5ghbsh5h.apps.googleusercontent.com',
//   scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
//   prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
