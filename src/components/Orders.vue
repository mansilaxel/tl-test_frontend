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
    </div>
</template>
<script>
import { get } from '../helpers/api'
import Flash from '../helpers/flash'
export default {
  name: 'Order',
  data () {
    return {
      orders: []
    }
  },
  created () {
    get('orders')
      .then(response => {
        this.orders = response.data.data
      })
      .catch(e => {
        Flash.setError(e)
      })
  }
}
</script>
