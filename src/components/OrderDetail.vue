<template>
    <div>
        <h1>Order {{order.id}}</h1>
        <table>
            <tr>
                <th>Product ID</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            <tr v-for="orderLine in order.items.data" :key="orderLine['product-id']">
                <td>{{orderLine['product-id']}}</td>
                <td>{{orderLine['unit-price']}}</td>
                <td>{{orderLine.quantity}}</td>
                <td>{{orderLine.total}}</td>
            </tr>
            <tfoot>
            <br>
            <tr v-if="order.discounts > 0">TODO:method</tr>
            <tr v-else><strong>Discount: 0</strong></tr>
            <tr><strong>Total: {{order.total}}</strong></tr>
            </tfoot>
        </table>
        <p class="error" v-if="errors">{{ errors }}</p>
    </div>
</template>

<script type="text/javascript">
import { get } from '../helpers/api'
export default {
  data () {
    return {
      order: {},
      errors: ''
    }
  },
  created () {
    get(`order/${this.$route.params.id}`)
      .then(response => {
        this.order = response.data.data
      })
      .catch(e => {
        this.errors = e
      })
  },
  methods: {
  }
}
</script>
<style scoped>
    .error {
        color: red;
    }
</style>
