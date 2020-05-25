// pages/cash-withdrawal/index.js
import { extractCash, extractBank, getUserInfo, getModifytext} from '../../api/user.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '提现',
      'color':true,
      'class':'0'
    },
    
    navList: [
      // { 'name': '银行卡', 'icon':'icon-yinhangqia'},
      // { 'name': '微信', 'icon': 'icon-weixin2' },
      { 'name': '支付宝', 'icon': 'icon-icon34' }
      ],
    currentTab: 0,
    index: 0,
    array: [],//提现银行
    minPrice:0.00,//最低提现金额
    userInfo:[],
    isClone:false,
    type_money:0,
    getlist:{},
    month_commission_kt:'',
    month_bonus_kt:'',
    month_abonus_kt:'',
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    withdrawal_notice: ''
  },
  onLoadFun:function(){
    this.getUserInfo();
    this.getUserExtractBank();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ type_money: options.type_money });
    this.getxiu()
  },
  /**
 * 切换导航
*/
  changeType: function (e) {
    console.log(e.currentTarget.dataset.type_money)
    this.setData({ type_money: e.currentTarget.dataset.type_money } );
  // array: [], currentTab: 0, index: 0, userInfo: []
    console.log(this.data.type_money)
    // this.subCash()
    this.getUserExtractBank()
  },
  getxiu: function () {
    var that = this
    getModifytext().then(res => {
      that.setData({ getlist: res.data });
      console.log(res.data)
    });
  },
  getUserExtractBank: function () {
    var that = this;
    extractBank().then(res=>{
      var array = res.data.extractBank;
      array.unshift("请选择银行");
      that.setData({ array: array, minPrice: res.data.minPrice });
    });
  },
  /**
   * 获取个人用户信息
  */
  getUserInfo: function () {
    var that = this;
    getUserInfo().then(res=>{
      var list = res.data
      that.data.month_abonus_kt = list.month_abonus_kt
      that.data.month_bonus_kt = list.month_bonus_kt
      that.data.month_commission_kt = list.month_commission_kt 
      console.log(that.data.month_abonus_kt)
      console.log(that.data.month_bonus_kt)
      console.log(that.data.month_commission_kt)
      that.data.userInfo=res.data
      that.setData({
        userInfo: res.data, month_bonus_kt: list.month_bonus_kt, month_abonus_kt: list.month_abonus_kt, month_commission_kt: list.month_commission_kt, withdrawal_notice: res.data.withdrawal_notice 
       });
      console.log(that.data.userInfo)
    });
  },
  swichNav: function (e) {
    this.setData({ currentTab: e.currentTarget.dataset.current });
  },
  bindPickerChange: function (e) {
    this.setData({ index: e.detail.value });
  },
  subCash: function (e) {
    let that = this, value = e.detail.value;
    value.type_money = that.data.type_money
    console.log(that.data.type_money)
    // if (that.data.currentTab == 0){//银行卡
    //   if (value.name.length == 0) return app.Tips({title:'请填写持卡人姓名'});
    //   if (value.cardnum.length == 0) return app.Tips({title:'请填写卡号'});
    //   if (that.data.index == 0) return app.Tips({title:"请选择银行"});
    //   value.extract_type = 'bank';
    //   value.bankname = that.data.array[that.data.index];
    // } else if (that.data.currentTab == 2) {//微信
    //   value.extract_type = 'weixin';
    //   if (value.name.length == 0) return app.Tips({ title: '请填写微信号' });
    //   value.weixin = value.name;
    // } else 
    if (that.data.currentTab == 0) {//支付宝
      value.extract_type = 'alipay';
      if (value.name.length == 0) return app.Tips({title:'请填写账号'});
      value.alipay_code = value.name;
    }
    if (value.money.length == 0) return app.Tips({title:'请填写提现金额'});
    extractCash(value).then(res=>{
      that.getUserInfo();
      return app.Tips({ title: res.msg, icon: 'success' });
    }).catch(err=>{
      return app.Tips({ title: err });
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
    if(app.globalData.isLog && this.data.isClone){
        this.getUserInfo();
        this.getUserExtractBank();
    }
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