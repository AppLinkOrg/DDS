// pages/driverlist/driverlist.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { ExampleApi } from "../../apis/example.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    
    this.Base.setMyData({
      id:this.Base.options.id,type:this.Base.options.type
    })
    // console.log("sssssssssssssssssssss" + this.Base.options.type);
    // return;
    
    if (this.Base.options.type == "Y"){
      this.Base.setMyData({ waitcpd: 2 })
    }
    else{
      this.Base.setMyData({ctt:1})
    }
    console.log(11111);
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: '司机列表',
    });

    // var id=this.Base.getMyData().id;
    var orderapi=new OrderApi();
    orderapi.applylist({ transport: "Y", orderid: this.Base.options.id}, (applylist) => {
      this.Base.setMyData({ applylist });
    });
    orderapi.applylist({ transport: "N", orderid: this.Base.options.id}, (tobecpdlist) => {
      this.Base.setMyData({ tobecpdlist });
    });
    orderapi.applylist({ transport: "L", orderid: this.Base.options.id}, (completedlist) => {
      this.Base.setMyData({ completedlist });
    }); 
    // var exampleapi = new ExampleApi();
    // exampleapi.updatestatus({}, (updatestatus) => {
    //   this.Base.setMyData({ updatestatus });
    // });
  }
  bindcompleted(e){
    this.Base.setMyData({ cpd: 3,  waitcpd: 3,ctt:3})
  }
  bindwaitcompleted(e) {
    this.Base.setMyData({ cpd: 2,  waitcpd: 2 ,ctt:2})
  }
  bindcontact(e) {
    this.Base.setMyData({ cpd: 1, waitcpd: 1 ,ctt:1})
  }
  
  bindqueren(e){
    wx.showModal({
      content: '您确认 晋A·12345 完成了任务吗？',
      icon: "none",
      duration: 2000,
      confirmColor: "#2699EC"
    });
  }
  Determineduse(e){
    var orderapi = new OrderApi();
    orderapi.updatedrivernewstatus({}, (updatedrivernewstatus) => {
      this.Base.setMyData({ updatedrivernewstatus })
    })
    
    console.log(e);
    var that = this;
    wx.showModal({
      title: '',
      content: '您是否确定使用此车？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var exampleapi = new ExampleApi();
          var applylist = that.Base.getMyData().applylist;
          exampleapi.updatestatus({ id: applylist[0].id }, (updatestatus) => {
            that.Base.setMyData({ updatestatus });
            that.onMyShow();
          });
        }
      }
    })
    
  }
  Refuse(e){
    var that=this;
    wx.showModal({
      title: '',
      content: '您是否拒绝使用此车？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var orderapi = new OrderApi();
          var applylist = that.Base.getMyData().applylist;
          
          orderapi.deleteapply({ idlist:applylist[0].id}, (deleteapply) => {
            that.Base.setMyData({
              deleteapply
            });
            that.onMyShow();
          });
        }
      }
    })
  }

  addcompleted(e){
    var that = this;
    wx.showModal({
      title: '',
      content: '您是否确认该司机已完成？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var orderapi = new OrderApi();
          var tobecpdlist = that.Base.getMyData().tobecpdlist;
          orderapi.addcompleted({ id: tobecpdlist[0].id }, (addcompleted) => {
            that.Base.setMyData({
              addcompleted
            });
            that.onMyShow();
          });
        }
      }
    })
  }

  weightsheet(e) {
    var tobecpdlist = this.Base.getMyData().tobecpdlist;
    var photo = e.currentTarget.dataset.index;
    var p1 = e.currentTarget.dataset.p1;
    console.log("sssssssssss" + photo);

    var id = e.currentTarget.id;
    if (photo==""&&p1=="") {
      wx.showModal({
        title: '',
        content: '该司机暂未添加过磅单',
        showCancel: false,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#EE2222',
      })
    }

    else{
      wx.navigateTo({
        url: '/pages/weighingsheet/weighingsheet?id=' + id
      })
    }

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted; 
body.bindcontact = content.bindcontact;
body.bindqueren = content.bindqueren;
body.Determineduse = content.Determineduse;
body.Refuse = content.Refuse;
body.addcompleted = content.addcompleted;
body.weightsheet = content.weightsheet;
Page(body)