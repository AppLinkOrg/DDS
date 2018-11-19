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
      title: '司机认证',

    });
  }
  onMyShow() {
    var that = this;
  }
  name(e) {
    var name = e.detail.value;

    this.Base.setMyData({
      name: e.detail.value
    })
  }
  idcard(e) {
    var idcard = e.detail.value;

    this.Base.setMyData({
      idcard: e.detail.value
    })
  }
  confirm(e) {
    var data = e.detail.value;
    if (data.name == "") {
      this.Base.info("请输姓名");
      return;
    }
    if (data.idcard == "") {
      this.Base.info("请输入身份证号");
      return;
    }
    var name = this.Base.getMyData().name;
    var idcard = this.Base.getMyData().idcard;
    var openid = this.Base.options.openid;
    var that = this;
    
   
    var certificateapi = new CertificateApi();
    
    certificateapi.updetedriver({
      status: "Q",
      name: name,
      idcard: idcard,
      openid:openid
    }, (updetedriver) => {
      //wx.showToast({
        
       //title: '成功',
        //icon: 'success',
        //duration: 2000
     // })  
       wx.navigateBack({
         
       })
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.confirm = content.confirm;
body.name=content.name;
body.idcard = content.idcard;
Page(body)