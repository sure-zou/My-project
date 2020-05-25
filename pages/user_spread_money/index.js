// pages/commission-details/index.js

import { spreadCommission, spreadCount} from '../../api/user.js';
import { getUserInfo, getModifytext } from '../../api/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '收益记录',
      'color': true,
      'class': '0'
    },
    name:'',
    type:'',
    page:0,
    limit:8,
    recordList:[],
    recordType:0,
    recordCount:0,
    status:false,
    order_det:'',
    getlist:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ type: options.type });
    this.getxiu()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getxiu: function () {
    var that = this
    getModifytext().then(res => {
      that.setData({ getlist: res.data });
      console.log(res.data)
    });
  },
  /**
* 切换导航
*/
  changeType: function (e) {
    var  that=this
    this.setData({ type: e.currentTarget.dataset.type, status: false, recordType: e.currentTarget.dataset.type, loadend: false, page: 1, recordList: []});
    that.getRecordList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var type = this.data.type;
    if (type == 1 || type == 4 || type == 7 || type == 8  ) {
      this.setData({ 'parameter.title': '提现记录', name: '提现总额', recordType: 4 });
    } else if (type == 2 || type == 5 || type == 6 || type == 3) {
      this.setData({ 'parameter.title': '收益记录', name: '佣金总额', recordType: 3 });
    }
     else {
      wx.showToast({
        title: '参数错误',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function (res) { setTimeout(function () { wx.navigateBack({ delta: 1, }) }, 1200) },
      });
    }
    this.getRecordList();
    this.getRecordListCount();
  },
  /**
   * 获取余额使用记录
   */
  getRecordList: function () {
    var that = this;
    var page = that.data.page;
    var type = that.data.type;
    console.log(type)
    var limit = that.data.limit;
    var status = that.data.status;
    var recordType = that.data.recordType;
    // console.log(recordType)
    var recordList = that.data.recordList;
    console.log(recordList)
    var recordListNew = [];
    if (status == true) return ;
    spreadCommission(recordType, { page: page, limit: limit}).then(res=>{
      var len = res.data.length;
      var recordListData = res.data;
      recordListNew = recordList.concat(recordListData);
      that.data.order_det = recordListData.order_detail
      // console.log(that.data.order_det )
      that.setData({ status: limit > len, page: limit + page, recordList: recordListNew });
      console.log(that.data.recordList)
    });
  },
  getRecordListCount:function(){
    var that = this;
    spreadCount(that.data.recordType).then(res=>{
      that.setData({ recordCount: res.data.count });
    });
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
    this.getRecordList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})