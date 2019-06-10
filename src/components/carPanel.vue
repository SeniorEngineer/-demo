<template>
  <li class="nav-cart" @mouseenter="showCar" @mouseleave="hideCar">
    <a href="javascript:;" class="ball-rect">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{'cart-num':goodsNum>0}">
      <i>{{goodsNum}}</i>
    </span>
    <div class="nav-cart-wrapper" v-if="showHide">
      <div class="nav-cart-list">
        <div class="empty" v-if="goodsNum <= 0">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full" v-else>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="(item,index) in carPanelData" :key="index">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img
                        :src="item.ali_image + '?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'"
                      >
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{item.title}}</a>
                        </h4>
                        <p class="attrs">
                          <span>{{item.spec_json.show_name}}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span>
                          <span class="price-num">{{item.price}}</span>
                          <span class="item-num">x {{item.count}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click="del(item.sku_id)">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>
              共
              <strong class="ng-binding">{{goodsNum}}</strong> 件商品
            </p>
            <h5>
              合计：
              <span class="price-icon">¥</span>
              <span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{goodsPrice}}</span>
            </h5>
            <h6>
              <router-link class="nav-cart-btn" to="/shoppingcart">去购物车</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 加入购物车，小球飞入 -->
    <transition name="ball"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @css="true"
    >
      <div class="addcart-mask" v-show="ball.show">
        <img class="mask-item"/>
      </div>
    </transition>
  </li>
</template>
<script>
export default {
  computed: {
    carPanelData () {
      return this.$store.state.carPanelData
    },
    goodsNum () {
      return this.$store.getters.goodsNum
    },
    goodsPrice () {
      return this.$store.getters.goodsPrice
    },
    showHide () {
      return this.$store.state.showHide
    },
    ball () {
      return this.$store.state.ball
    }
  },
  methods: {
    // 调用全局删除方法
    del (id) {
      this.$delNum(id)
    },
    // 调用mutation里面的方法
    showCar () {
      this.$store.commit('showCar')
    },
    hideCar () {
      this.$store.commit('hideCar')
    },
    beforeEnter (el) {
      // 通过浏览器方法获取所有按钮的位置
      let rect = this.ball.el.getBoundingClientRect()
      // 获取购物车的位置
      let rectEL = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
      // 拿到当前小球
      let ball = document.getElementsByClassName('mask-item')[0]
      // 计算按钮和购物车之间的差值
      let x = (rectEL.left + 16) - (rect.left + rect.width / 2)
      // 距离顶部的差值
      let y = rect.top + rect.height / 2 - rectEL.top + 5 - 16
      el.style.transform = 'translate3d(0,' + y + 'px,0)'
      ball.style.transform = 'translate3d(-' + x + 'px,0,0)'
      ball.src = this.ball.img
    },
    enter (el) {
      let a = el.offsetHeight
      el.a = a
      el.style.transform = 'translate3d(0,0,0)'
      document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)'
    },
    afterEnter () {
      this.ball.show = false
    }
  }
}
</script>
<style scoped>
.ball-enter-active{
  transition: 1s cubic-bezier(.22,.85,.59,1.08)
}
.ball-enter-active .mask-item{
  transition: 1s cubic-bezier(0,0,0,0)
}
</style>
