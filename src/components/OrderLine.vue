<template>
<tr>
    <td>{{product.description}}</td>
    <td>{{product.price}}</td>
    <td>{{order.quantity}}</td>
    <td>{{order.total}}</td>
    <td><button @click="remove(index, order.made)">X</button></td>
</tr>
</template>

<script type="text/javascript">
import { get } from '../helpers/api'
import Flash from '../helpers/flash'
export default {
  props: {
    order: {},
    index: Number
  },
  data () {
    return {
      product: {}
    }
  },
  created () {
    get('product/' + this.order['product-id'])
      .then(response => {
        this.product = response.data.data
      })
      .catch(e => {
        Flash.setError(e)
      })
  },
  methods: {
    remove (index, isMade) {
      this.$emit('deleted', index, isMade)
    }
  }
}
</script>
