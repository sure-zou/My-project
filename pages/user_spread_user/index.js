// pages/my-promotion/index.js

import { getUserInfo, getModifytext } from '../../api/user.js';
import { openExtrctSubscribe } from '../../utils/SubscribeMessage.js';


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '我的推广',
      'color': true,
      'class': '0'
    },
    userInfo:[],
    yesterdayPrice:0.00,
    isClone:false,
    getlist:{},
    withdrawal_notice:''
  },
  onLoadFun:function(){
    this.getUserInfo();
    this.getxiu()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getxiu: function () {
    var that = this
    getModifytext().then(res => {
      that.setData({ getlist: res.data });
      console.log(res.data)
    });
  },
  openSubscribe: function (e) {
    let page = e.currentTarget.dataset.url;
    wx.showLoading({
      title: '正在加载',
    })
    openExtrctSubscribe().then(res => {
      wx.hideLoading();
      wx.navigateTo({
        url: page,
      });
    }).catch(() => {
      wx.hideLoading();
    });
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
    if (app.globalData.isLog && this.data.isClone){
      this.getUserInfo();
    }
  },
  /**
   * 获取个人用户信息
   */
  getUserInfo: function () {
    var that = this;
    getUserInfo().then(res=>{
      that.setData({ userInfo: res.data, withdrawal_notice: res.data.withdrawal_notice  });
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({isClone:true});
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