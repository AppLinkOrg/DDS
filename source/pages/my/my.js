// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CertificateApi } from "../../apis/certificate.api.js";
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
    var api = new CertificateApi();
    console.log(8888888);
    api.riverlist({ openid: this.Base.options.openid}, (list) => {
     
      this.Base.setMyData({ list });

     
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)