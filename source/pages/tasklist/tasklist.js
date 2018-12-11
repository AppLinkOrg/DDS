// pages/tasklist/tasklist.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { date } from "../../apis/order.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    
    super.onLoad(options);
    var orderapi = new OrderApi();
    orderapi.goodslist({}, (goodslist) => {
      this.Base.setMyData({ goodslist });
    });
    var timestamp = Date.parse(new Date());
    orderapi.info({ }, (orderinfo) => {
      this.Base.setMyData({ orderinfo });
    });
    this.Base.setMyData({
      allshow:this.Base.options.allshow,
      mineshow:this.Base.options.mineshow,
      mine: this.Base.options.mine,
      all:this.Base.options.all,
      timestamp: timestamp / 1000
    })
  
    console.log(11111111);
  }
  onMyShow() {
    var that = this;
    var orderapi=new OrderApi();

    var UserInfo = this.Base.getMyData().UserInfo;
    
    orderapi.info({id:that.Base.options.id}, (orderinfo) => {
      
      var data1 = new Date(Date.parse(orderinfo.start_time.replace(/-/g, "/")));
      var month1=data1.getMonth()+1;
      var day1 = data1.getDate();
      var hh1 = data1.getHours();
      var mm1 = data1.getMinutes();
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      if (day1 < 10) {
        day1 = "0" + day1;
      }
      if (hh1 < 10) {
        hh1 = "0" + hh1;
      }
      if (mm1 < 10) {
        mm1 = "0" + mm1;
      }

      var data = new Date(Date.parse(orderinfo.end_time.replace(/-/g, "/")));
      var month = data.getMonth() + 1;
      var day = data.getDate();
      var hh = data.getHours();
      var mm = data.getMinutes();
      if (month < 10) {
        month = "0" + month;
      }
      if (day< 10) {
        day = "0" + day;
      }
      if (hh < 10) {
        hh = "0" + hh;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }

      console.log(666);
      console.log(month1);
      console.log(day1);
      console.log(hh1);
      console.log(mm1);
      orderinfo.start_time;
      console.log(orderinfo.start_time);
      this.Base.setMyData({ orderinfo, month1, day1, hh1, mm1, month, day, hh, mm });

      orderapi.memberinfo({ id: orderinfo.enroll_id}, (enrollinfo) => {
        this.Base.setMyData({ enrollinfo });
      });
      orderapi.memberinfo({ id: orderinfo.start_id }, (startinfo) => {
        this.Base.setMyData({ startinfo });
      });
      orderapi.memberinfo({ id: orderinfo.end_id }, (endinfo) => {
        this.Base.setMyData({ endinfo });
      });
      orderapi.applylist({  orderid: orderinfo.id }, (applylist) => {
        this.Base.setMyData({ applylist });
      });
    });
   
    
    // var orderinfo = that.Base.getMyData().orderinfo;
    
    // orderapi.memberlist({ name: orderinfo.orderinfo.carcount }, (enrolllist) => {
    //   this.Base.setMyData({ enrolllist });
    // });
    
  }
  setPageTitle(instinfo) {
    var title = "任务详情";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
  Deleteorder(e){
    console.log(e);
    var that=this;
     wx.showModal({
       title: '',
       content: '您是否需要取消本次报名？',
       showCancel: true,
       cancelText: '否',
       cancelColor: '',
       confirmText: '是',
       confirmColor: '',
       success: function(res) {
         if(res.confirm){
           var orderapi = new OrderApi();
           orderapi.updataorder({ id: that.Base.options.id }, (updataorder) => {
             that.Base.setMyData({ 
               updataorder
              });

              wx.reLaunch({
                url: '/pages/home/home',
              })
           });
         }
       }
     })
    
  }


  update(e){
    
    console.log(e);
    var that = this;
    wx.showModal({
      title: '',
      content: '您是否选择完成任务',
      showCancel: true,
      cancelText: '否',
      cancelColor: '',
      confirmText: '是',
      confirmColor: '',
      success: function (res) {
        if (res.confirm) {
          var orderapi = new OrderApi();
          orderapi.updatataskstatus({ id: that.Base.options.id }, (updatataskstatus) => {
            that.Base.setMyData({
              updatataskstatus
            });
            wx.reLaunch({
              url: '/pages/home/home',
            })
          });
        }
      }
    })
  }

  openRoute() {
    var orderinfo = this.Base.getMyData().orderinfo;
    var startaddress = this.Base.getMyData().orderinfo.startaddress;
    console.log("NNNNNNNNNN" +orderinfo.startaddress);
    var route=[
      
      { "id": "17241267543370585887", "title": "深圳大学", "address": orderinfo.startaddress ,  "type": 0, "location": { "lat": 22.532323, "lng": 113.93664 }, "adcode": 440305, "province": "广东省", "city": "深圳市", "district": "南山区" }, 
    
    
    { "id": "8845523130348363736", "title": "深圳大学第一附属医院", "address": "广东省深圳市福田区笋岗西路3002号", "category": "医疗保健:综合医院", "type": 0, "location": { "lat": 22.55707, "lng": 114.085735 }, "adcode": 440304, "province": "广东省", "city": "深圳市", "district": "福田区" }];


    if (route != undefined) {
      wx.navigateTo({
        url: '/pages/route/route?callbackid=route&route=' + JSON.stringify(route),
      })

    } else {

      wx.navigateTo({
        url: '/pages/route/route?callbackid=route',
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.Deleteorder = content.Deleteorder; 
body.update = content.update;
body.openRoute = content.openRoute;
Page(body)