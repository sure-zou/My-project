
const app = getApp();
import { getSharecreate, getShareindex, getUserInfo, getShareclock_in, userShare } from '../../api/user.js';
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
      'return': '1',
      'title': '活动专区',
      'color': true,
      'class': '0'
    },
    active: false,
    active2:false,
     active3:false,
    iShidden: true,
    isAuto: false,
    switchActive: false,
    loginType: app.globalData.loginType,
    userInfo: {},
    shareCont:{},
    actionSheetHidden: true,
    posterImageStatus: false,
    storeImage: '',//海报产品图
    PromotionCode: '',//二维码图片
    canvasStatus: false,//海报绘图标签
    posterImage: '',//海报路径
    up_clock_num:0,
    moments_start:0,
    clocknum:{},
    clockList:[],
    dakanum:'',
    level:0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  /**
 * 授权回调
*/
  onLoadFun: function (e) {
      var that = this
      this.getUserInfo();
      this.getShareindex()
        if (that.data.up_clock_num == 0) {
          that.setData({
            active3: true
          })
          console.log(1)
          return
        }
        if (that.data.moments_start == 0) {
          that.setData({
            active2: true
          })
          console.log(1)
          return
        }

  },
  onShow: function (e) {
      var that = this
      this.getUserInfo();
      this.getShareindex()
        if (that.data.up_clock_num == 0) {
          that.setData({
            active3: true
          })
          console.log(1)
          return
        }
        if (that.data.moments_start == 0) {
          that.setData({
            active2: true
          })
          console.log(1)
          return
        }
  },
  
  getback:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  
  onLoad: function (options) {
    if (app.globalData.isLog === false)
      this.setData({ isAuto: true, iShidden: false, });
    else {
      // this.getShareindex()
    //  else
        var that = this
        this.getUserInfo();
        if (that.data.up_clock_num == 0) {
          that.setData({
            active3: true
          })
          console.log(1)
          return
        }
        if (that.data.moments_start == 0) {
          that.setData({
            active2: true
          })
          console.log(1)
          return
        }
      // }
     
    }
  },
  getShareindex: function (e) {
    var  that=this
    getShareindex().then(res => {
      that.data.up_clock_num=res.data.up_clock_num 
      that.data.level = res.data.level
      that.data.moments_start = res.data.moments_start
      that.data.clocknum = res.data.clocknum
      if (that.data.moments_start == 1 &&that.data.clocknum != null){
        that.data.clockList = that.data.clocknum.list
        that.data.dakanum = that.data.clocknum.num
      }
      if (this.data.level == 0) {
        wx.showToast({
          title: '会员专享活动,您还不是会员',
          icon: 'none',
        })
      }
      console.log(that.data.clockList)
      this.setData({
        shareCont: res.data, up_clock_num: res.data.up_clock_num, level: res.data.level,
        clockList: that.data.clockList, dakanum:that.data.dakanum});
    })
  },
  tiaozhaun:function(){
    var that=this
      wx:wx.navigateTo({
        url: '/pages/user_spread_code/index',
        success: function(res) {
        
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    this.setData({
      active: false,
      actionSheetHidden: true,
    })
    if (e.currentTarget.dataset.url == '/pages/user_spread_code/index'  ){
      this.getShareindex()
    }
    
  },
  /**
 * 获取个人用户信息
*/
  getUserInfo: function () {
    var that = this;
    getUserInfo().then(res => {
      that.setData({ userInfo: res.data, loginType: res.data.login_type});
    });
  },
  getShareclock_in:function(){
    if (this.data.shareCont.moments_start==0) return app.Tips({ title:'活动已结束，等下场吧' });
    getShareclock_in().then(res => {
      this.setData({ active: true, active3: false,});
    }).catch(err => {
      return app.Tips({ title: err })
      this.setData({ active2: false, active3: false, });
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 分享打开和关闭
   * 
  */
  listenerActionSheet: function () {
    if (app.globalData.isLog === false)
      this.setData({ isAuto: true, iShidden: false });
    else
      this.setData({ actionSheetHidden: !this.data.actionSheetHidden })
  },
  //隐藏海报
  posterImageClose: function () {
    this.setData({ posterImageStatus: false, })
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
   * 关闭签到提示
  */
  close: function () {
    this.setData({ active: false, active2: false, active3: false });
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
    * 页面跳转
   */
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    var that = this;
    that.setData({ actionSheetHidden: !that.data.actionSheetHidden });
    userShare();
    return {
      title: that.data.shareCont.events_text || '',
      imageUrl: that.data.shareCont.moments || '',
      path: '/pages/inde2_index/index',
    }
  }
})