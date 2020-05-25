const app = getApp();

import { getMenuList, getUserInfo, bd_getPhoneNumber,getModifytext } from '../../api/user.js';
import { switchH5Login } from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      
      'navbar': '1',
      'return': '0',
      'title': '个人中心',
      'color': true,
      'class': '0'
    },
    activeIdx:5,
    userInfo: {},
    MyMenus: [],
    userphone: '',
    isGoIndex: false,
    iShidden: true,
    isAuto: false,
    switchActive: false,
    loginType: app.globalData.loginType,
    orderStatusNum: {},
    isshow: 1,
    getlist:{},
    numlist:''
  },

  close: function () {
    this.setData({ switchActive: false });
  },
  /**
   * 授权回调
  */
  onLoadFun: function (e) {
    this.getUserInfo();
    this.getMyMenus();
    this.getxiu()
  },
  Setting: function () {
    wx.openSetting({
      success: function (res) {
        console.log(res.authSetting)
      }
    });
  },
  getcash:function(){
    wx.navigateTo({
      url: '/pages/user_gocash/index',
    })
  },
  goboss:function(){
    this.setData({ isshow: 0 });
  },
  goshow:function(){
    this.setData({ isshow: 1 });
  },
  /**
   * 
   * 获取个人中心图标
  */
  getMyMenus: function () {
    var that = this;
    if (this.data.MyMenus.length) return;
    getMenuList().then(res => {
      that.setData({ MyMenus: res.data.routine_my_menus });
    });
  },
  /**
   * 获取个人用户信息
  */
  getUserInfo: function () {
    var that = this;
    getUserInfo().then(res => {
      console.log(res.data)
      var list= res.data
      var   zonhe_1 = list.brokerage_commission
      var  zonhe_2 = list.brokerage_bonus
      var   zonhe_3 = list.brokerage_abonus
      var zonghe_4 = zonhe_1 + zonhe_2 + zonhe_3
      var zonghe_5 = zonghe_4.toFixed(2)
      console.log(zonghe_5)
      that.setData({ userInfo: res.data, loginType: res.data.login_type, orderStatusNum: res.data.orderStatusNum, numlist: zonghe_5});
    });
    console.log(that.data.userInfo)
  },
  /**
   * 页面跳转
  */
  goPages: function (e) {
    if (app.globalData.isLog) {
      if (e.currentTarget.dataset.url == '/pages/user_spread_user/index' && this.data.userInfo.statu == 1) {
        if (!this.data.userInfo.is_promoter) return app.Tips({ title: '您还没有推广权限！！' });
      }
      if (e.currentTarget.dataset.url == '/pages/logon/index') return this.setData({ switchActive: true });
      if (e.currentTarget.dataset.url =='/pages/inde_2/index'){
        wx.switchTab({
          url: e.currentTarget.dataset.url
        })
        return 
      }
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {
      this.setData({ iShidden: false });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = wx.getStorageSync('userphone')
    this.setData({
      MyMenus: app.globalData.MyMenus,
      userphone: a
    });
    console.log(this.data.userphone)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ switchActive: false });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  getPhoneNumber: function (e) {
    console.log(e)
    if (app.globalData.isLog === false)
      this.setData({ isAuto: true, iShidden: false });
    else if (app.globalData.isLog === true) {
      var iv = e.detail.iv;
      var encryptedData = e.detail.encryptedData;
      var code = this.data.wxCode;
      var cache_key = wx.getStorageSync('cache_key')
      // console.log(cache_key )
      var _this = this;
      bd_getPhoneNumber({ cache_key: cache_key, code: code, iv: iv, encryptedData: encryptedData }).then(res => {
        this.setData({ userphone: res.msg });
        wx.setStorageSync('userphone', res.msg)
        console.log(_this.data.userphone)
        console.log(wx.setStorageSync('userphone', res.msg))
        this.getUserInfo()
      }).catch(error => {
        wx.showToast({
          title: error.msg || '获取失败',
          icon: 'none'
        })
      })
    }
  },
  onShow: function () {
    let that = this;
    if (app.globalData.isLog) {
      this.getUserInfo();
      this.getMyMenus();
    }
  },
  getxiu:function(){
    var that=this
    getModifytext().then(res => {
      that.setData({ getlist:res.data });
    });
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
})