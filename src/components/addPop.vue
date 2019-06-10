<!-- 添加地址弹出框 -->
<template>
  <div id="pop">
    <div class="module-dialog-layer" style="display: block;"></div>
    <div class="module-dialog clear module-dialog-address module-dialog-show">
      <div class="dialog-panel">
        <div class="topbar">
          <div class="dialog-tit clear">
            <h4 class="js-dialog-title">管理收货地址</h4>
          </div>
          <span class="dialog-close" @click="closePop">x</span>
        </div>
        <div class="dialog-con js-dialog-container">
          <div class="animate-layer">
            <div class="dialog-inner js-address-add">
              <div class="save-address-box">
                <div class="address-form">
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input type="text" class="js-verify" placeholder="收货人姓名" v-model="receive.name">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3" :class="{'form-invalid-item':phoneError}">
                      <input type="text" class="js-verify" placeholder="手机号"  v-model="receive.phone" @change="errorPhone" @focus="phoneMethod">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 area-code-w fn-left form-valid-item">
                      <input type="text" placeholder="区号（可选）" class="js-verify js-address-area-code" v-model="receive.areaCode">
                      <div class="verify-error"></div>
                    </div>
                    <div class="form-item-v3 telephone-w fn-right form-valid-item">
                      <input type="text" placeholder="固定电话（可选）" class="js-verify js-address-telephone" v-model="receive.landLine">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item province-wrapper">
                      <select
                        name="province_code"
                        class="province select-province js-form-province js-verify"
                      v-model="receive.provinceId">
                        <option value="0">请选择省份</option>
                        <option :value="province.area_id" v-for="(province,index) in addList" :key="index">{{province.area_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                      <select class="city select-city js-form-city js-verify" v-model="receive.cityId">
                        <option value="0">请选择城市</option>
                        <option :value="city.area_id" v-for="(city,index) in city" :key="index">{{city.area_name}}</option>
                      </select>
                    </div>
                    <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                      <select class="city select-city js-form-city js-verify" v-model="receive.countyId">
                        <option value="0">请选择区县</option>
                        <option :value="county.area_id" v-for="(county,index) in county" :key="index">{{county.area_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input type="text" placeholder="详细地址，如街道名称，楼层，门牌号码等" class="js-verify" v-model="receive.add">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row fn-clear">
                    <input type="checkbox" class="hide">
                    <span class="blue-checkbox" :class="{'blue-checkbox-on':receive.default}" @click="checkboxBtn"></span>设为默认
                  </div>
                  <div class="dialog-blue-btn big-main-btn js-verify-address" :class="{'disabled-btn':!isPreserve}" @click="submitState">
                    <a>保存</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入模拟城市数据
import addList from '../lib/addList'
export default {
  data () {
    return {
      addList,
      receive: {
        'name': '',
        'phone': '',
        'areaCode': '',
        'landLine': '',
        'provinceId': 0,
        'province': '',
        'cityId': 0,
        'city': '',
        'countyId': 0,
        'county': '',
        'add': '',
        'default': false
      },
      phoneError: false,
      isPreserve: false
    }
  },
  computed: {
    // 选择省份计算返回当前城市的数据
    city () {
      let cityList = []
      this.addList.forEach((element, index) => {
        if (element.area_id === this.receive.provinceId) {
          cityList = element.city_list
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.receive.province = element.area_name
        }
      })
      return cityList
    },
    // 选择城市计算放回当前区县的数据
    county () {
      let contyList = []
      this.city.forEach((element, index) => {
        if (element.area_id === this.receive.cityId) {
          contyList = element.county_list
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.receive.city = element.area_name
        }
      })
      return contyList
    }
  },
  watch: {
    // 其实可以直接监听receive字符串，用watch属性deep（深度监听）但是影响性能，直接用字符串形式监听，监听属性值
    // 监听receive.countyId
    'receive.countyId' () {
      let contyList = []
      this.county.forEach((ele, index) => {
        contyList = ele.county_list
        this.receive.county = ele.area_name
      })
      return contyList
    },
    // 监听receive.provinceId
    'receive.provinceId' () {
      if (this.receive.provinceId === '0') {
        this.receive.cityId = 0
        this.receive.countyId = 0
      }
    },
    // 监听receive.cityId
    'receive.cityId' () {
      if (this.receive.cityId === '0') {
        this.receive.countyId = 0
      }
    },
    // 深度监听receive数据的变化，改变保存是否可点击
    receive: {
      handler () {
        this.judgeState()
      },
      deep: true // 深度监听
    }
  },
  methods: {
    closePop () {
      // 子组件传递给父组件自定义方法
      this.$emit('close')
    },
    // 判断手机号是否超出11位
    errorPhone () {
      if (this.receive.phone.length === 11) {
        this.phoneError = false
      } else {
        this.phoneError = true
      }
    },
    // 清空手机号错误提示
    phoneMethod () {
      this.phoneError = false
    },
    // 默认点击状态
    checkboxBtn () {
      this.receive.default = !this.receive.default
    },
    // 判断receive里的值是否存在，显示保存可点击状态
    judgeState () {
      if (this.receive.name && !this.phoneError && this.receive.province && this.receive.city && this.receive.county && this.receive.add) {
        this.isPreserve = true
      } else {
        this.isPreserve = false
      }
    },
    // 保存收获地址
    submitState () {
      if (this.isPreserve) {
        this.$store.commit('submit', this.receive)
        this.$emit('close')
      }
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
@import '../assets/css/address-pop.css'
</style>
