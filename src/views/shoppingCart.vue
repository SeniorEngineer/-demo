<!-- 购物车页面 -->
<template>
  <div id="main" class="hander-car">
    <div class="store-content">
      <div class="cart-box">
        <div class="title">
          <h2>购物清单</h2>
        </div>
        <div class="cart-inner">
          <div class="empty-label" v-if="goodsNum<=0">
            <h3>您的购物车中还没有商品</h3>
            <router-link to="/" class="link">现在选购</router-link>
          </div>
          <div v-else>
            <div class="cart-table-title">
              <span class="name">商品信息</span>
              <span class="operation">操作</span>
              <span class="subtotal">小计</span>
              <span class="num">数量</span>
              <span class="price">单价</span>
            </div>
            <div class="cart-table">
              <div class="cart-group">
                <!--购物列表-->
                <div class="cart-top-items" v-for="(shop,index) in carPanelData" :key="index">
                  <div class="cart-items">
                    <div class="items-choose">
                      <span class="blue-checkbox-new" :class="{'checkbox-on':shop.checked}" @click="checkedCar(shop.sku_id)">
                        <a></a>
                      </span>
                    </div>
                    <div class="items-thumb">
                      <img :src="shop.ali_image + '?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'">
                      <a href="javascript:;" target="_blank"></a>
                    </div>
                    <div class="name hide-row">
                      <div class="name-table">
                        <a href="javascript:;" target="_blank">{{shop.title}}</a>
                        <ul class="attribute">
                          <li>{{shop.spec_json.show_name}}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="operation">
                      <a class="items-delete-btn" @click="del(shop.sku_id)"></a>
                    </div>
                    <div class="subtotal">¥ {{shop.price*shop.count}}.00</div>
                    <div class="item-cols-num">
                      <div class="select js-select-quantity">
                        <span class="down" :class="{'down-disabled':shop.count <= 1}"  @click="subCar(shop.sku_id)">-</span>
                        <span class="num">
                          <!-- <input type="text" style="display: inline-block;">
                          <ul>
                            <li>1</li>
                            <li>2</li>
                          </ul> -->
                          {{shop.count}}
                        </span>
                        <span class="up" :class="{'up-disabled':shop.count >= shop.limit_num}"  @click="addCar(shop.sku_id)">+</span>
                      </div>
                    </div>
                    <div class="price">¥ {{shop.price}}.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-bottom-bg fix-bottom" v-if="goodsNum>0 ">
          <div class="cart-bar-operation">
            <div>
              <div class="choose-all js-choose-all">
                <span class="blue-checkbox-new " :class="{'checkbox-on':allChecked}" @click="checkedAllCar(allChecked)">
                  <a></a>
                </span>
                全选
              </div>
              <div class="delete-choose-goods" @click="deleteCarPanel">删除选中的商品</div>
            </div>
          </div>
          <div class="shipping">
            <div class="shipping-box">
              <div class="shipping-total shipping-num">
                <h4 class>
                  已选择
                  <i>{{checkedCount}}</i> 件商品
                </h4>
                <h5>
                  共计
                  <i>{{goodsNum}}</i> 件商品
                </h5>
              </div>
              <div class="shipping-total shipping-price">
                <h4 class>
                  应付总额：
                  <span>￥</span>
                  <i>{{checkedPrice}}</i>
                </h4>
                <h5 class="shipping-tips">应付总额不含运费</h5>
              </div>
            </div>
            <router-link to="/checkout" tag="span" class="jianguo-blue-main-btn big-main-btn js-checkout " :class="{'disabled-btn':checkedCount<=0}"> <a>现在结算</a></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    carPanelData () {
      return this.$store.state.carPanelData
    },
    goodsNum () {
      return this.$store.getters.goodsNum
    },
    allChecked () {
      return this.$store.getters.allChecked
    },
    checkedCount () {
      return this.$store.getters.checkedCount
    },
    checkedPrice () {
      return this.$store.getters.checkedPrice
    }
  },
  methods: {
    // 借助elementUI删除弹出框，删除当前商品
    del (id) {
      this.$delNum(id)
    },
    // 增加数量
    addCar (id) {
      this.$store.commit('addCarPanel', id)
    },
    // 减去数量
    subCar (id) {
      this.$store.commit('subCarPanel', id)
    },
    // 是否选中
    checkedCar (checked) {
      this.$store.commit('checkedCarPanel', checked)
    },
    // 全选
    checkedAllCar (allChecked) {
      this.$store.commit('checkedAllCar', allChecked)
    },
    // 删除选中商品
    deleteCarPanel () {
      this.$store.commit('deleteCarPanel')
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
@import "../assets/css/cart.css";
</style>
