<!--详情页-->
<template>
  <div id="main">
    <div class="store-content item">
      <div class="item-box">
        <div class="gallery-wrapper">
          <div class="gallery">
            <div class="thumbnail">
              <!-- tab小图切换 -->
              <ul>
                <li @click="tabImg(index)" :class="{'on':index==itemIndex}" v-for="(img,index) in itemData.ali_images" :key="index">
                  <img :src="img + '?x-oss-process=image/resize,w_54/quality,Q_80/format,webp'">
                </li>
              </ul>
            </div>
            <!-- 展示大图 -->
            <div class="thumb">
              <ul>
                <li :class="{'on':index==itemIndex}" v-for="(img,index) in itemData.ali_images" :key="index">
                  <img :src="img + '?x-oss-process=image/resize,w_440/quality,Q_80/format,webp'">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="banner">
          <div class="sku-custom-title">
            <div class="params-price">
              <span><em>¥</em><i>{{itemData.price}}</i></span>
            </div>
            <div class="params-info">
              <h4>{{itemData.title}}</h4>
              <h6>{{itemData.sub_title}}</h6>
            </div>
          </div>
          <div class="sku-dynamic-params-panel">
            <div class="sku-dynamic-params clear">
              <span class="params-name">颜色</span>
              <ul class="params-colors">
                <li :class="{'cur': color.id == itemId}" v-for="(color,index) in itemData.sku_list" :key="index">
                  <router-link :title="color.color" :to="{path:'detail',query:{itemId:color.id}}">
                    <img :src="'http://img01.smartisanos.cn/'+color.image+'20X20.jpg'">
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="sku-dynamic-params clear">
              <div class="params-name">数量</div>
              <div class="params-detail clear">
                <div class="item-num js-select-quantity">
                  <span class="down" :class="{'down-disabled':count <= 1}" @click="subCount">-</span>
                  <span class="num">{{count}}</span>
                  <span class="up" :class="{'up-disabled':count >= itemData.limit_num}"  @click="addCount">+</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sku-status">
            <div class="cart-operation-wrapper clearfix">
              <span class="blue-title-btn js-add-cart"><a @click="goshop()">加入购物车</a></span>
              <span class="gray-title-btn"><a>现在购买</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsData from '../lib/newItemsData'
export default {
  data () {
    return {
      itemsData,
      itemId: this.$route.query.itemId, // 获取当前url下拼接的itemId值
      itemIndex: 0,
      count: 1 // 数量为1 加入或减去做计算
    }
  },
  watch: { // 监听数据的变化，每次变化重新给itemId赋值
    '$route.query.itemId' () {
      this.itemId = this.$route.query.itemId
      this.itemIndex = 0
    }
  },
  computed: {
    itemData () {
      // 过滤itemsData数据中的id值,接收到的id和数据过滤后的id相等就返回当前数据
      let itemdata = this.itemsData.filter((item) => {
        return Number(item.sku_id) === Number(this.itemId)
      })[0]
      return itemdata
    }
  },
  methods: {
    tabImg (index) {
      this.itemIndex = index
    },
    // 加入购物车
    goshop () {
      // 定义一个itemData对象，给info和count参数，通过commit调用并把itemData传给addcarpaneldata
      let itemInfo = {info: this.itemData, count: this.count}
      this.$store.commit('addCarPanelData', itemInfo)
    },
    // 加的数量
    addCount () {
      this.count++
      // 如果当前数量大于总数量就让当前数量等于总数量
      if (this.count > this.itemData.limit_num) {
        this.count = this.itemData.limit_num
      }
    },
    // 减的数量
    subCount () {
      this.count--
      // 如果当前数量小于1就让当前数量等于1
      if (this.count < 1) {
        this.count = 1
      }
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
@import '../assets/css/item.css'
</style>
