// pages/taskhistory/taskhistory.js
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
    wx.setNavigationBarTitle({
      title: '历史任务',
    });
    var orderapi=new OrderApi();
    orderapi.list({status:"4"}, (list) => {
      this.Base.setMyData({ list });
    });
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.enterpriselist({ member_id: UserInfo.nickName }, (errlist) => {
      this.Base.setMyData({ errlist })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)