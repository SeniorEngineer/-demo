<template>
  <div>
<div id="main">
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li><a href="javascript:;" class="active">综合排序</a></li>
          <li><a href="javascript:;" class="">销量排序</a></li>
          <li><a href="javascript:;" class="">价格低到高</a></li>
          <li><a href="javascript:;" class="">价格高到低</a></li>
        </ul>
      </div>
      <div class="gray-box">
        <div class="item-box">
          <itemList v-for="(item,index) in datajson" :key="index"  :item="item"></itemList>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import datajson from '../lib/newGoodsData.js'
import itemList from '../components/itemList'
export default {
  data () {
    return {
      datajson
    }
  },
  components: {
    itemList
  }
}
</script>

<style>
 @import '../assets/css/goodsList.css'
</style>
