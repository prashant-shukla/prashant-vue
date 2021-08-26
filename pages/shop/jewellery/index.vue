<template>
  <div>
    <ProductSlider :products="products" @openCart="showCart" />

    <cartModel :openCart="showcartmodal" :productData="cartproduct" @closeCart="closeCartModal" :products="products" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import cartModel from '../../../components/cart-model/cart-modal-popup'
import ProductSlider from './components/product-slider'
export default {
  components: {
    ProductSlider,
    cartModel
  },
  data() {
    return {
      products: [],
      showcartmodal: false,
      cartproduct: {}
    }
  },
  computed: {
    ...mapState({
      productslist: state => state.products.productslist
    })
  },
  mounted() {
    this.productsArray()
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === 'jewellery') {
          this.products.push(item)
        }
      })
    },
    showCart(item, productData) {
      this.showcartmodal = item
      this.cartproduct = productData
    },
    closeCartModal(item) {
      this.showcartmodal = item
    }
  }
}
</script>
