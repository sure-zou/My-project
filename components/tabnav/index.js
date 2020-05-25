import { getNavigation } from '../../api/api.js';
var app = getApp();

Component({
  properties: {
    activeIdx: {
      type: Number,
      value: 3
    },
    parameter: {
      type: Object,
      value: {
        class: '0'
      },
    },
    auth: {
      type: Number,
      value: 1,
      observer: 'onAuthChanged'
    }
  },
  data: {
   navList:[],
    tabIndex: 3
  },
  ready: function () {
    this.setNav();
    var pages = getCurrentPages();
    if (pages.length <= 1) this.setData({ 'parameter.return': 0 });
  },
  attached: function () {
  },
  /**
 * 授权回调
*/
  onLoadFun: function (e) {
    this.setNav();
    this.qunju()
  },

  methods: {
    setNav: function (){
      getNavigation().then(res => {
        console.log(res.data)
        this.setData({
          navList: res.data
    });

      })
    },
    
        switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        tabIndex: data.index
      })
        },
        qunju:function(){
          wx.getSystemInfo({
            success: (res) => {
              var model = res.model
              if (model.search('iPhone X') != -1) {
                this.globalData.iphonex = '68rpx';
              } else {
                this.globalData.iphonex = '20rpx';
              }
            }
          })
        },
  }
})