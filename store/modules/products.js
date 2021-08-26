import products from '../../data/products'

const state = {
  productslist: products.data,
  products: products.data,
  wishlist: [],
  compare: [],
  currency: {
    curr: 'usd',
    symbol: '$'
  },
  order: [],
  locale: 'en',
  searchProduct: []
}
// getters
const getters = {
  getcollectionProduct: (state) => {
    return collection => state.products.filter((product) => {
      return collection === product.collection
    })
  },
  getProductById: (state) => {
    return id => state.products.find((product) => {
      return product.id === +id
    })
  },
  compareItems: (state) => {
    return state.compare
  },
  wishlistItems: (state) => {
    return state.wishlist
  },
  changeCurrency: (state) => {
    if (state.currency.curr === 'eur') {
      state.currency.curr = 0.90
      return state.currency
    } else if (state.currency.curr === 'inr') {
      state.currency.curr = 70.93
      return state.currency
    } else if (state.currency.curr === 'gbp') {
      state.currency.curr = 0.78
      return state.currency
    } else if (state.currency.curr === 'usd') {
      state.currency.curr = 1
      return state.currency
    }
  },
  getOrder: (state) => {
    return state.order
  }
}
// mutations
const mutations = {
  changeCurrency: (state, payload) => {
    state.currency = payload
  },
  addToCompare: (state, payload) => {
    const product = state.products.find(item => item.id === payload.id)
    const compareItems = state.compare.find(item => item.id === payload.id)
    if (compareItems) {
    } else {
      state.compare.push({
        ...product
      })
    }
  },
  removeCompareItem: (state, payload) => {
    const index = state.compare.indexOf(payload)
    state.compare.splice(index, 1)
  },
  searchProduct: (state, payload) => {
    payload = payload.toLowerCase()
    state.searchProduct = []
    if (payload.length) {
      state.products.filter((product) => {
        if (product.title.toLowerCase().includes(payload)) {
          state.searchProduct.push(product)
        }
      })
    }
  },
  createOrder: (state, payload) => {
    state.order = payload
  }
}
// actions
const actions = {
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
