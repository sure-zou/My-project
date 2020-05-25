const app = getApp();
import { getStartover } from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    djs_time: 5,
    countDown: '',
    startover:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getStartover()
    // if (this.data.startover !=''){
      this.djs()
    // }
   
  },
  djs() {
    this.setData({
      countDown: setInterval(() => {
        this.setData({ djs_time: this.data.djs_time - 1 })
        if (this.data.djs_time <= 0) {
          clearInterval(this.data.countDown)
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }, 1000)
    })
  },
  go_index() {
    clearInterval(this.data.countDown)
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  getStartover:function(){
    getStartover().then(res => {
      this.data.startover = res.data.startover
      this.setData({
        startover: res.data.startover
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})