const app = getApp();

import { getIndexData, getCoupons, getTemlIds, getLiveList } from '../../api/api.js';
import { getSharecreate, getShareindex,getstore_business} from '../../api/user.js';
import { CACHE_SUBSCRIBE_MESSAGE } from '../../config.js';
import Util from '../../utils/util.js';
import wxh from '../../utils/wxh.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商家入驻',
      'color': true,
      'class': '0'
    },
    activeIdx:2,
    imgUrls: [],
    itemNew: [],
    driver_image:'',
    activityList: [],
    menus: [],
    bastBanner: [],
    bastInfo: '',
    bastList: [],
    fastInfo: '',
    fastList: [],
    firstInfo: '',
    firstList: [],
    salesInfo: '',
    likeInfo: [],
    lovelyBanner: {},
    benefit: [],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    window: false,
    iShidden: false,
    navH: "",
    newGoodsBananr: '',
    selfLongitude: '',
    selfLatitude: '',
    liveList: [],
    liveInfo: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLiveList();
    this.getIndexConfig()
  },
  getLiveList: function () {
    getLiveList(1, 20).then(res => {
      if (res.data.length == 1) {
        this.setData({ liveInfo: res.data[0] });
      } else {
        this.setData({ liveList: res.data });
      }
    }).catch(res => {

    })
  },
  getSharecreate() {
      getSharecreate().then(res => {
          console.log(res.data)
      })
  },
  getShareindex() {
    getShareindex().then(res => {
      console.log(res.data)
    })
  },
  catchTouchMove: function (res) {
    return false
  },
  onColse: function () {
    this.setData({ window: false });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */

  getIndexConfig: function () {
    var that = this;
    getIndexData().then(res => {
      that.setData({
        imgUrls: res.data.banner,
        menus: res.data.menus,
        driver_image: res.data.driver_image,
        itemNew: res.data.roll,
        activityList: res.data.activity,
        bastBanner: res.data.info.bastBanner,
        bastInfo: res.data.info.bastInfo,
        bastList: res.data.info.bastList,
        fastInfo: res.data.info.fastInfo,
        fastList: res.data.info.fastList,
        firstInfo: res.data.info.firstInfo,
        firstList: res.data.info.firstList,
        salesInfo: res.data.info.salesInfo,
        likeInfo: res.data.likeInfo,
        lovelyBanner: res.data.lovely.length ? res.data.lovely[0] : {},
        benefit: res.data.benefit,
        logoUrl: res.data.logoUrl,
        couponList: res.data.couponList,
        newGoodsBananr: res.data.newGoodsBananr
      });
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            that.setData({ window: that.data.couponList.length ? true : false });
          } else {
            that.setData({ window: false, iShidden: true });
          }
        }
      });
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ window: false });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  formSubmit: function (e) {
    console.log(e)
    var formId = e.detail.formId, value = e.detail.value, that = this
    console.log(value)
    if (!value.nickname) return app.Tips({ title: '请填写你的名字！' });
    if (!value.phone) return app.Tips({ title: '请填写您的电话！' });
    getstore_business(value).then(res => {
      app.Tips({ title: res.msg, icon: 'success' });
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 2300);
    }).catch(err => {
      return app.Tips({ title: err });
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
    wx.stopPullDownRefresh();
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