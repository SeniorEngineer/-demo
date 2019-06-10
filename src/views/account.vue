<!--  -->
<template>
  <div id="main">
    <div class="content clear">
      <div class="account-wrapper">
        <div class="account-sidebar">
          <div class="avatar gray-box clear">
            <div class="js-account-sidebar-info">
              <img src="http://static.smartisanos.cn/account/asset/img/default-user-avatar.png">
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <li class="current">
                  <a href="javascript:;">我的订单</a>
                </li>
                <li class>
                  <a href="javascript:;">收货地址</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style scoped>
/* @import url(); 引入css类 */
@import '../assets/css/account.css'
</style>
