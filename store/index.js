import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'
import layout from './modules/layout'
Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    modules: {
      products,
      cart,
      layout
    }
  })
}
export default createStore
