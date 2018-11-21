// pages/historydetail/historydetail.js
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
    this.Base.setMyData({
      allshow: this.Base.options.allshow,
      mineshow: this.Base.options.mineshow
    })
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.info({ id: that.Base.options.id }, (orderinfo) => {
      this.Base.setMyData({ orderinfo });
    });
  }
  setPageTitle(instinfo) {
    var title = "任务详情";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.Deleteorder = content.Deleteorder;
Page(body)