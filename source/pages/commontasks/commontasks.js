// pages/commontasks/commontasks.js
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
    var orderapi=new OrderApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.list({ cmptask: "E", member_id_name: UserInfo.nickName }, (list) => {
      this.Base.setMyData({ list });
    });
    
    orderapi.enterpriselist({ member_id: UserInfo.nickName }, (errlist) => {
      this.Base.setMyData({ errlist })
    })
  }
  setPageTitle(instinfo) {
    var title = "常用任务";
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