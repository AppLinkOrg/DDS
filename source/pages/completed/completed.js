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
      title: '历史任务',
    });
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.applylist({ transport: "L",  },(applylist)=>{
       this.Base.setMyData({ applylist})
      })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)