<template>
  <div>
    <Fashion />
  </div>
</template>

<script>
const Fashion = () => import('./shop/jewellery')
export default {
  components: {
    Fashion
  }
}
</script>
