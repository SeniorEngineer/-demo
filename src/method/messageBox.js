// 借助elementUI删除弹出框，删除当前商品
const MessageBox = function (id) {
  this.$confirm('删除当前商品, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // console.log(id)
      // 调用删除当前商品
      this.$store.commit('delCarPanel', id)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    })
    .catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
}
export default MessageBox
