<template>
    <div>
        <table v-if="orders">
            <tr>
                <th>Order ID</th>
                <th>Total</th>
            </tr>
            <tr v-for="order in orders" :key="order.id" @click="$router.push('/orders/' + order.id)">
                <td>{{order.id}}</td>
                <td>{{order.total}}</td>
            </tr>
        </table>
        <p class="error" v-if="errors">{{ errors }}</p>

    </div>
</template>
<script>
import { get } from '../helpers/api'
export default {
  name: 'Order',
  data () {
    return {
      orders: [],
      errors: ''
    }
  },
  created () {
    get('orders')
      .then(response => {
        this.orders = response.data.data
      })
      .catch(error => {
        this.errors = error
      })
  }
}
</script>
<style scoped>
    .error {
        color: red;
    }
</style>
