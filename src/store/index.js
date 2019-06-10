// 创建vuex仓库

// 引入Vue Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建store仓库
const store = new Vuex.Store({
  state: {
    carPanelData: [], // 创建一个数组接收加入购物车的数据
    diaLog: false, // 提示框
    showHide: false, // 是否显示
    timer: null, // timer为空
    // 收货人模拟数据
    receiveInfo: [{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': true
    }, {
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': false
    }],
    // 小球的数据，是否显示，点击的是哪个购物车按钮，图片地址
    ball: {
      show: false,
      el: null,
      img: ''
    },
    orderData: [] // 提交订单的数据
  },
  getters: {
    // 悬浮购物车商品数量
    goodsNum (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    // 悬浮购物车商品总价
    goodsPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.price * goods.count
      })
      return price
    },
    // 购物车页面商品是否选中，关联全选状态
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if (!goods.checked) {
          allChecked = false
        }
      })
      return allChecked
    },
    // 购物车页面以选择商品的数量
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          count += goods.count
        }
      })
      return count
    },
    // 购物车页面的总价格
    checkedPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          price += goods.count * goods.price
        }
      })
      return price
    },
    // 筛选选中的商品在确认订单页面使用
    checkedGoods (state) {
      let checkedGoods = []
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          checkedGoods.push(goods)
        }
      })
      return checkedGoods
    }
  },
  mutations: {
    // 商品加入购物车
    addCarPanelData (state, data) {
      let off = true
      if (!state.ball.show) {
        state.carPanelData.forEach((goods) => {
          // 判断是否是相同的商品，如果是数量增加
          if (goods.sku_id === data.info.sku_id) {
            goods.count += data.count
            off = false
            // 判断商品超出提示
            if (goods.count > goods.limit_num) {
              goods.count -= data.count
              state.diaLog = true
              return
            }
            // 加入购物车成功显示
            state.showHide = true
            state.ball.show = true
            state.ball.img = data.info.ali_image
            state.ball.el = event.path[0]
          }
        })
        if (off) {
          // 给对象新增count属性
          let goodsData = data.info
          Vue.set(goodsData, 'count', data.count)
          // 给对象新增checked 控制单选全选
          Vue.set(goodsData, 'checked', true)
          state.carPanelData.push(goodsData)
          state.showHide = true
          // 小球显示，当前加入的图片，当前点击的位置
          state.ball.show = true
          state.ball.img = data.info.ali_image
          state.ball.el = event.path[0]
        }
      }
    },
    // 删除单个商品
    delCarPanel (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
        }
      })
    },
    // 购物车增加商品数量
    addCarPanel (state, id) {
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === id) {
          // 判断商品数量是否大于总数
          if (goods.count >= goods.limit_num) return
          goods.count++
        }
      })
    },
    // 购物车减去商品数量
    subCarPanel (state, id) {
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === id) {
          // 判断商品数量是否小于1
          if (goods.count <= 1) return
          goods.count--
        }
      })
    },
    // 点击当前商品是否选中
    checkedCarPanel (state, id) {
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === id) {
          goods.checked = !goods.checked
        }
      })
    },
    // 点击全选，全选或不全选状态
    checkedAllCar (state, allChecked) {
      state.carPanelData.forEach((goods) => {
        goods.checked = !allChecked
      })
    },
    // 删除选中的商品
    deleteCarPanel (state) {
      // state.carPanelData.forEach((goods, index) => {
      //   if (goods.checked) {
      //     state.carPanelData.splice(index, index + 1)
      //   }
      // })
      let i = state.carPanelData.length
      // 利用while循环，while会一直循环代码块，直到小于i的长度，从后往前删当前选中的商品
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i, 1)
        }
      }
    },
    // 关闭提示框
    btnClose (state) {
      state.diaLog = false
    },
    // 移入显示
    showCar (state) {
      clearTimeout(state.timer)
      state.showHide = true
    },
    // 移除隐藏
    hideCar (state) {
      state.timer = setTimeout(() => {
        state.showHide = false
      }, 500)
    },
    // 保存的信息
    submit (state, data) {
      // 如果是默认状态，其余全部取消默认状态
      if (data.default) {
        state.receiveInfo.forEach((goods) => {
          goods.default = false
        })
      }
      // 将数据追加到receiveInfo
      state.receiveInfo.push(data)
    },
    submitOrder (state, data) {
      state.orderData.unshift(data) // 将数据追加到订单数据存放的数组上
      // 将购物车的数据从购物车中删除掉
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) { // 删除购物车选中的商品
          state.carPanelData.splice(i, 1)
        }
      }
    },
    subOrder (state, id) {
      state.orderData.forEach((order) => {
        if (id === order.orderId) {
          order.isPay = true
        }
      })
    }
  }
})

// 导出
export default store
