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
    this.Base.setMyData({
      allshow:this.Base.options.allshow,
      mineshow:this.Base.options.mineshow,
      num: this.Base.options.num,
      all:this.Base.options.all
    })
  
    
    console.log(11111111)
  }
  onMyShow() {
    var that = this;
    var orderapi=new OrderApi();
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

      var data = new Date(Date.parse(orderinfo.start_time.replace(/-/g, "/")));
      var month = data1.getMonth() + 1;
      var day = data1.getDate();
      var hh = data1.getHours();
      var mm = data1.getMinutes();
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
    }); 
    
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
           orderapi.deleteapply({ idlist: that.Base.options.id }, (updataorder) => {
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
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.Deleteorder = content.Deleteorder;
Page(body)