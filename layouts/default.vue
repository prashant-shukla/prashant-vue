<template>
  <div>
    <nuxt id="body-content"/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'OrderSpark Ecommerce'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
  }
}
</script>
