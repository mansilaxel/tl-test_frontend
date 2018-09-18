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
            <br>
            <tfoot>
            <tr><strong>Discount: {{totalDiscount}}</strong></tr>
            <tr><strong>Total: {{order.total}}</strong></tr>
            </tfoot>
        </table>
        <br>
        <br>
        <br>
        <table>
            <thead>
            <tr>
                <th colspan="4">Options</th>
            </tr>
            <td><button @click='fetchData("")'>NONE</button></td>
            <td><button @click='fetchData("all")'>ALL</button></td>
            <td><button @click='fetchData("low")'>LOW</button></td>
            <td><button @click='fetchData("high")'>HIGH</button></td>
            </thead>
            <tbody>
            <tr>
                <th colspan="1">Amount</th>
                <th colspan="3">Description</th>
            </tr>
            <tr v-for="discount in order.discounts.data" :key="discount.amount">
                <td colspan="1">{{discount.amount}}</td>
                <td colspan="3">{{discount.description}}</td>
            </tr>
            </tbody>
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
      errors: '',
      totalDiscount: 0
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
    buildURL (param) {
      return `order/${this.$route.params.id}?` + param
    },
    fetchData (param) {
      var url = this.buildURL(param)
      get(url)
        .then(response => {
          this.order = response.data.data
          this.calculateDiscountTotal(this.order)
        })
        .catch(e => {
          this.errors = e
        })
    },
    calculateDiscountTotal (data) {
      this.totalDiscount = 0
      data.discounts.data.forEach(
        discount => {
          this.totalDiscount += discount.amount
        }
      )
    }
  }
}
</script>
<style scoped>
    .error {
        color: red;
    }
</style>
