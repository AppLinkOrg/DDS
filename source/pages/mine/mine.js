// pages/mine/mine.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js"; 

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.enterpriselist({ member_id:UserInfo.nickName }, (errlist) => {
      this.Base.setMyData({ errlist })
    })
    
  }
  Cutstatus(e){
    wx.showModal({
      title: '身份切换',
      content: '您是否需要切换身份',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm){
        wx.reLaunch({
          url: '/pages/usercategory/usercategory',
        })
      }
      }
    });
  }
  tishi(e) {
    var errlist = this.Base.getMyData().errlist;
    var status = this.Base.getMyData().errlist[0].status;
    console.log(status);
    console.log(222222222222222);
    if (status != "A" || errlist=="") {
      wx.showModal({
        title: '未认证',
        content: '您是否需要前往企业认证',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/certification/certification',
            })
          }
        }
      });
    }
    else{
      wx.navigateTo({
        url: '/pages/commontasks/commontasks',
      })
    }
  }
  lishi(e){
    var errlist = this.Base.getMyData().errlist;
    var status = this.Base.getMyData().errlist[0].status;
    console.log(status);
    console.log(222222222222222);
    if (status != "A" || errlist == "") {
      wx.showModal({
        title: '未认证',
        content: '您是否需要前往企业认证',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/certification/certification',
            })
          }
        }
      });
    }
    else {
      wx.navigateTo({
        url: '/pages/taskhistory/taskhistory',
      })
    }
  }
  chenyuan(e) {
    var errlist = this.Base.getMyData().errlist;
    var status = this.Base.getMyData().errlist[0].status;
    console.log(status);
    console.log(222222222222222);
    if (status != "A" || errlist == "") {
      wx.showModal({
        title: '未认证',
        content: '您是否需要前往企业认证',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/certification/certification',
            })
          }
        }
      });
    }
    else {
      wx.navigateTo({
        url: '/pages/team/team',
      })
    }
  } 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.Cutstatus = content.Cutstatus; 
body.tishi = content.tishi;
body.lishi = content.lishi; 
body.chenyuan = content.chenyuan; 
Page(body)