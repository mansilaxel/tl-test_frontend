<template>
    <div>
        <h1>Order {{order.id}}</h1>
        <button @click="placeOrder">Place order</button>
        <table>
            <tr>
                <th>Product description</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            <tr is="order-line" v-for="(orderLine, index) in order.items.data" :key="orderLine['product-id']"
                :order="orderLine" :index="index" @deleted="remove"/>
            <br>
            <tr>
                <td>
                    <select v-model="selectedProduct">
                        <option v-for="product in products.data" v-bind:key="product.id" v-bind:value="product">
                            {{product.description}}
                        </option>
                    </select>
                </td>
                <td>{{selectedProduct.price}}</td>
                <td><input type="number" min="1" v-model.number="selectedQuantity" v-if="selectedProduct.id"/></td>
                <td v-if="selectedQuantity >= 1">{{selectedProduct.price * selectedQuantity}}</td>
                <td><button @click="add" v-if="selectedQuantity >= 1">Make</button></td>
            </tr>
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
            <tr>
                <td><button @click='fetchData("")'>NONE</button></td>
                <td><button @click='fetchData("all")'>ALL</button></td>
                <td><button @click='fetchData("low")'>LOW</button></td>
                <td><button @click='fetchData("high")'>HIGH</button></td>
            </tr>
            </thead>
            <tbody v-if="totalDiscount !== 0">
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
    </div>
</template>

<script type="text/javascript">
import { get, post } from '../helpers/api'
import OrderLine from './OrderLine'
import Flash from '../helpers/flash'
export default {
  data () {
    return {
      order: {
        items: {
          data: []
        }
      },
      totalDiscount: 0,
      products: [],
      selectedProduct: {},
      selectedQuantity: Number
    }
  },
  created () {
    get(`order/${this.$route.params.id}`)
      .then(response => {
        this.order = response.data.data
      })
      .catch(e => {
        Flash.setError(e)
      })
    get('products')
      .then(response => {
        this.products = response.data
      })
      .catch(e => {
        Flash.setError(e)
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
          this.totalDiscount = this.order['total-discount']
        })
        .catch(e => {
          Flash.setError(e)
        })
    },
    remove (index, isMade) {
      if (!isMade) {
        post('order/delete/' + this.$route.params.id + '?index=' + index)
          .then(response => {
            if (response.status === 200) {
              this.order.items.data.splice(index, 1)
              Flash.setSuccess(response.data)
              if (this.order.items.data < 1) {
                this.$router.push('/orders')
              }
            }
          })
          .catch(e => {
            Flash.setError(e)
          })
      } else {
        this.order.items.data.splice(index, 1)
        Flash.setSuccess('Item that was not actually part of the order deleted')
        if (this.order.items.data < 1) {
          this.$router.push('/orders')
        }
      }
    },
    add () {
      // could check for valid data...etc...
      post('order/add/' + this.$route.params.id, this.makeOrderLineJson())
        .then(response => {
          if (response.status === 200) {
            this.order.items.data.push(
              this.makeOrderLineJson()
            )
            Flash.setSuccess(response.data)
          }
        })
        .catch(e => {
          Flash.setError(e)
        })
    },
    makeOrderLineJson () {
      return {
        'product-id': this.selectedProduct.id,
        'quantity': this.selectedQuantity,
        'unit-price': this.selectedProduct.price,
        'total': this.selectedQuantity * this.selectedProduct.price,
        'made': true
      }
    },
    placeOrder () {
      post('placeOrder')
        .then(response => {
          if (response.status === 200) {
            Flash.setSuccess(response.data)
          }
        })
        .catch(e => {
          Flash.setError(e.response.data)
        })
    }
  },
  components: {
    OrderLine
  }
}
</script>
