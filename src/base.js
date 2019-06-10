import MessageBox from './method/messageBox'
export default {
  // 通过vm.prototype将函数挂载到Vue实例上面，通过this.函数名，来运行函数。
  // install是往vue中传递的必要方法
  install (vm) {
    // MessageBox弹出框
    vm.prototype.$delNum = MessageBox
  }

}
