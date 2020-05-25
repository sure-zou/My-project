const app = getApp();

import { getIndexData, getCoupons,getTemlIds, getLiveList, getStartover} from '../../api/api.js';
import { getUserInfo} from '../../api/user.js';
import { CACHE_SUBSCRIBE_MESSAGE } from '../../config.js';
import Util from '../../utils/util.js';
import wxh from '../../utils/wxh.js';
import { switchH5Login } from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
import util from '../../utils/util.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeIdx: 3,
    imgUrls: [],
    itemNew:[],
    activityList:[],
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
    benefit:[],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 700,
    parameter: {
      'navbar': '0',
      'return': '0',
      'color': true,
      'class': '0'
    },
    window: false,
    iShidden:false,
    navH: "",
    newGoodsBananr:'',
    selfLongitude: '',
    selfLatitude: '',
    liveList: [],
    liveInfo:{},
    startover:'',
    userInfo:{},
    iShidden2: true,
    isAuto: false,
    peers_num:'',
    user_upgrade:'',
    active: false,
    user_sy:'',
    switchActive: false,
    loginType: app.globalData.loginType,
    marginBM:'',
    link:''
  },
  closeTip:function(){
    wx.setStorageSync('msg_key',true);
    this.setData({   
      iShidden:true
    })
  },
  /**
  * 页面跳转
 */
  goPages: function (e) {
    if (app.globalData.isLog === false)
      this.setData({ isAuto: true, iShidden2: false, });
     else {
      return
      this.setData({ iShidden2: false });
    }
  },
  /**
 * 关闭签到提示
*/
  close: function () {
    this.setData({ active: false });
  },
  bt2:function(){
    var  that=this
    wx.navigateTo({
      url: '/pages/user_spread_code/index',
      success: function(res) {
      },
    })
    // if (e.currentTarget.dataset.url == '/pages/user_spread_code/index') {
    //   this.setData({ active: false });
    // }
    this.setData({ active: false });
  },
  /**
 * 获取个人用户信息
*/
  tanchuang:function(e){
    if (this.data.userInfo.level==0){
      this.setData({
        active: true, 
      })
    }else{
      var url=e.currentTarget.dataset.url
      wx:wx.navigateTo({
        url: url,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  getUserInfo: function () {
    var that = this;
    getUserInfo().then(res => {
      that.data.peers_num = res.data.peers_num
      that.data.user_upgrade = res.data.user_upgrade
      that.data.user_sy = that.data.peers_num - that.data.user_upgrade
      console.log(that.data.user_sy)
      that.setData({ userInfo: res.data, loginType: res.data.login_type,
        peers_num: res.data.peers_num, user_upgrade: res.data.user_upgrade, user_sy: that.data.user_sy
      });
      setTimeout(function () {
        var query = wx.createSelectorQuery();
        query.select('.flash-sale .progress').boundingClientRect();
        query.exec(function (rect) {
          if (rect[0] === null) return;
          var num2 = rect[0].width/that.data.peers_num 
          console.log(num2)
          // var str = Number(num2 * 100).toFixed(1);
          // console.log(that.data.user_upgrade)
          // str += "%";
         var  user_upgrade2=Number(that.data.user_upgrade)
          console.log(user_upgrade2)
          var str2 = Number(num2)
          var marginBM2 = Number(user_upgrade2 * str2)
          console.log(marginBM2)
          that.setData({
            marginBM: marginBM2
          })
          console.log(marginBM2)
        });
      }, 500)
    });
    console.log(that.data.userInfo)
  },
  /**
  * 授权回调
 */
  onLoadFun: function (e) {
    this.getUserInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxh.selfLocation(1);
    this.getUserInfo();
    this.setData({
      navH: app.globalData.navHeight
    });
    if (options.spid) app.globalData.spid = options.spid;
    if (options.scene) app.globalData.code = decodeURIComponent(options.scene);
    if (wx.getStorageSync('msg_key')) this.setData({ iShidden:true});
    this.getTemlIds();
    this.getLiveList();

  },
  getLiveList:function(){
    getLiveList(1,20).then(res=>{
      if(res.data.length == 1){
        this.setData({liveInfo:res.data[0]});
      }else{
        this.setData({liveList:res.data});
      }
    }).catch(res=>{

    })
  },
  /**
   * 商品详情跳转
   */
  goDetail: function (e) {
    let item = e.currentTarget.dataset.items
    if (item.activity && item.activity.type === "1") {
      wx.navigateTo({
        url: `/pages/activity/goods_seckill_details/index?id=${item.activity.id}&time=${item.activity.time}&status=1`
      });
    } else if (item.activity && item.activity.type === "2") {
      wx.navigateTo({ url: `/pages/activity/goods_bargain_details/index?id=${item.activity.id}` });
    } else if (item.activity && item.activity.type === "3") {
      wx.navigateTo({
        url: `/pages/activity/goods_combination_details/index?id=${item.activity.id}`
      });
    } else {
      wx.navigateTo({ url: `/pages/goods_details/index?id=${item.id}` });
    }
  },
  getTemlIds(){
    let messageTmplIds = wx.getStorageSync(CACHE_SUBSCRIBE_MESSAGE);
    if (!messageTmplIds){
      getTemlIds().then(res=>{
        if (res.data) 
          wx.setStorageSync(CACHE_SUBSCRIBE_MESSAGE, JSON.stringify(res.data));
      })
    }
  },
  catchTouchMove: function (res) {
    return false
  },
  onColse:function(){
    this.setData({ window: false});
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
    this.getIndexConfig();
    if (app.globalData.isLog) {
      this.getUserInfo();
    }
    if(app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
  },

  get_issue_coupon_list:function(){
    var that = this;
    getCoupons({page:1,limit:3}).then(res=>{
      that.setData({ couponList: res.data });
      if (!res.data.length) that.setData({ window: false });
    });
  },
  getIndexConfig:function(){
    var that = this;
    getIndexData().then(res=>{

      that.setData({
        imgUrls: res.data.banner,
        menus: res.data.menus,
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
            that.setData({ window: false, iShidden: true});
          }
        }
      });
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ window:false});
  
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
    this.getIndexConfig();
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