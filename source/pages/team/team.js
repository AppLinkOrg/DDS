// pages/team/team.js
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
    var orderapi = new OrderApi();
    orderapi.goodslist({}, (goodslist) => {
      this.Base.setMyData({ goodslist });
    });
    
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var UserInfo=this.Base.getMyData().UserInfo;
    orderapi.memberlist({ }, (memberlist) => {
      this.Base.setMyData({ memberlist });
    });
  }
  setPageTitle(instinfo) {
    var title = "团队成员";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)