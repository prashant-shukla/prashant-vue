<template>
  <div>
    <b-modal
      id="modal-cart"
      size="lg"
      centered
      title="Add-to-cart"
      :hide-footer="true"
      :hide-header="true"
      v-if="openCart"
    >
      <div class="row cart-modal">
        <div class="col-lg-12">
          <button class="close" type="button" @click="closeCart(openCart)">
            <span>×</span>
          </button>
          <div class="media">
            <div class="media-body align-self-center text-center">
              <h5>
                <i class="fa fa-check"></i>Item
                <span>{{productData.title}}</span>
                <span>successfully added to your Cart.</span>
              </h5>
            </div>
          </div>
          <div class="product-section">

        <div class="row">
          <div class="col-sm-12">
            <table class="table cart-table table-responsive-xs" v-if="cart.length">
              <thead>
                <tr class="table-head">
                  <th scope="col">image</th>
                  <th scope="col">product name</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">action</th>
                  <th scope="col">total</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in cart" :key="index">
                <tr>
                  <td>
                    <img :src="item.images[0].src" alt style="width: 100px;" />
                  </td>
                  <td>
                    {{item.title}}
                  </td>
                  <td>
                    <h4>{{ item.price * curr.curr | currency(curr.symbol) }}</h4>
                  </td>
                  <td>
                    <div class="qty-box">
                      <div class="input-group">
                        <span class="input-group-prepend">
                          <button
                            type="button"
                            class="btn quantity-left-minus"
                            data-type="minus"
                            data-field
                            @click="decrement(item)"
                          >
                            <i class="fa fa-angle-left"></i>
                          </button>
                        </span>
                        <input
                          type="text"
                          name="quantity"
                          class="form-control input-number"
                          :disabled="item.quantity > item.stock"
                          v-model="item.quantity"
                        />
                        <span class="input-group-prepend">
                          <button
                            type="button"
                            class="btn quantity-right-plus"
                            data-type="plus"
                            data-field
                            @click="increment(item)"
                          >
                            <i class="fa fa-angle-right"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a class="icon" @click="removeCartItem(item)">
                      <i class="fa fa-close"></i>
                    </a>
                  </td>
                  <td>
                    <h4
                      class="td-color"
                    >{{ (item.price * curr.curr) * item.quantity | currency(curr.symbol) }}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table cart-table table-responsive-md" v-if="cart.length">
              <tfoot>
                <tr>
                  <td>total price :</td>
                  <td>
                    <h4>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h4>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="col-sm-12 empty-cart-cls text-center" v-if="!cart.length">
              <img :src='"@/assets/images/icon-empty-cart.png"' class="img-fluid" alt="empty cart" />
              <h3 class="mt-3">
                <strong>Your Cart is Empty</strong>
              </h3>
              <h4 class="mb-3">Add something to make me happy :)</h4>
              <div class="col-12">
                <nuxt-link :to="{ path: '/'}" class="btn btn-solid">continue shopping</nuxt-link>
              </div>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      counter: 1
    }
  },
  props: ['openCart', 'productData', 'products', 'category'],
  computed: {
    ...mapState({
      currency: state => state.products.currency
    }),
    ...mapGetters({
      cart: 'cart/cartItems',
      cartTotal: 'cart/cartTotalAmount',
      curr: 'products/changeCurrency'
    })
  },
  methods: {
    // Get Image Url
    getImgUrl(path) {
      return require('@/assets/images/' + path)
    },
    closeCart(val) {
      val = false
      this.$emit('closeCart', val)
    },
    cartRelatedProducts(collection, id) {
      return this.products.filter((item) => {
        if (item.collection.find(i => i === collection)) {
          if (item.id !== id) {
            return item
          }
        }
      })
    },
    discountedPrice(product) {
      return product.price - (product.price * product.discount / 100)
    }, 
        removeCartItem: function (product) {
      this.$store.dispatch('cart/removeCartItem', product)
    },
    increment(product, qty = 1) {
      this.$store.dispatch('cart/updateCartQuantity', {
        product: product,
        qty: qty
      })
    },
    decrement(product, qty = -1) {
      this.$store.dispatch('cart/updateCartQuantity', {
        product: product,
        qty: qty
      })
    }
  }
}
</script>
