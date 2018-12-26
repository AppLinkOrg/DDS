// pages/driver/driver.js
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
  //界面标题
  setPageTitle() {
    
    wx.setNavigationBarTitle({
      title: '车辆列表',
    });

  }
  onMyShow() {
    var that = this;
    var UserInfo = this.Base.getMyData().UserInfo;
    var orderapi = new OrderApi();
    orderapi.vehiclelist({status:"A,I"}, (vehiclelist) => {
      this.Base.setMyData({ vehiclelist });
  })}
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)