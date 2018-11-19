// pages/driver/driver.js
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

  }
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '任务详情',

    });
  }
  onMyShow() {
     
    var that = this;
    var month ;
    var month1;
    var month2;
    var month3;
    var day;
    var day1;
    var day2;
    var day3;
    var hh;
    var hh1;
    var hh2;
    var hh3;
    var mm;
    var mm1;
    var mm2;
    var mm3;

    console.log(this.Base.options.id);
    var api = new OrderApi();
    api.info({ id: this.Base.options.id }, (info) => {
      var data1 = new Date(info.enroll_start);
      var data2 = new Date(info.enroll_deadline);
      var data3 = new Date(info.start_time);
      var data4 = new Date(info.end_time);
        month=data1.getMonth()+1;
      month1 = data2.getMonth() + 1;
      month2 = data3.getMonth() + 1;
      month3 = data4.getMonth() + 1;
      day = data1.getDate();
      day1 = data2.getDate();
      day2 = data3.getDate();
      day3 = data4.getDate();
      hh = data1.getHours();
      hh1 = data2.getHours();
      hh2 = data3.getHours();
      hh3 = data4.getHours();
      mm = data1.getMinutes();
      mm1 = data2.getMinutes();
      mm2 = data3.getMinutes();
      mm3 = data4.getMinutes();
         if(month<10)
         {
           month="0"+month;
         }
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      if (month3 < 10) {
        month3 = "0" + month3;
      }
      
      if (day < 10) {
        day = "0" + day;
      }
      if (day1 < 10) {
        day1 = "0" + day1;
      }
      if (day2 < 10) {
        day2 = "0" + day2;
      }
      if (day3 < 10) {
        day3 = "0" + day3;
      }
       
      if (hh < 10) {
        hh ="0" + hh;
      }
      if (hh1 < 10) {
        hh1 = "0" + hh1;
      }
      if (hh2 < 10) {
        hh2 = "0" + hh2;
      }
      if (hh3 < 10) {
        hh3 = "0" + hh3;
      }
        
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (mm1 < 10) {
        mm1 = "0" + mm1;
      }
      if (mm2 < 10) {
        mm2 = "0" + mm2;
      }
      if (mm3 < 10) {
        mm3 = "0" + mm3;
      }
      console.log(data1);
      console.log(month,day,hh,mm);
      this.Base.setMyData({month:month,day:day,hh:hh,mm:mm});
      this.Base.setMyData(info);

    });
  }
  tonnage(e) {
    var tonnage = e.detail.value;

    this.Base.setMyData({
      tonnage: e.detail.value
    })
  }
  confirm(e) {
    
    var data = e.detail.value;
    
    if (data.tonnage == "") {
      this.Base.info("请输入客运吨数");
      return;
    }
   
    var tonnage = this.Base.getMyData().tonnage;
    var openid = this.Base.options.openid;
    var orderid = this.Base.options.id;
    var vehicle="晋A·123456";
    var that = this;
    var orderapi = new OrderApi();
    orderapi.addapply({
      status: "I",
      orderid:orderid,
      tonnage: tonnage,
      vehicle: vehicle,
      openid:openid
    }, (addvehicle) => {

    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tonnage = content.tonnage;
body.confirm = content.confirm;
Page(body)