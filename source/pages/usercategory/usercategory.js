// pages/usercategory/usercategory.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
// import { CheckboxApi } from "../../apis/checkbox.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      we: 1
    });


  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });

  }


  bindtohome(e) {
    // console.log("dd")
    // wx.reLaunch({
    //   url: '/pages/home/home',
    // })
    var weicheck = this.Base.getMyData().we;
    console.log(weicheck);
    if (weicheck == 1) {

      wx.showToast({
        title: '请阅读并同意用户协议',
        icon:"none",
      })


    }
    if (weicheck == 2) {
      wx.reLaunch({
     url: '/pages/home/home',
    })

    }
  }
  bindtodriver(e) {
    // console.log("ee")
    // wx.reLaunch({
    //   url: '/pages/driver/driver',

    // })
    var weicheck = this.Base.getMyData().we;
    console.log(weicheck);
    if (weicheck == 1) {

      wx.showToast({
        title: '请阅读并同意用户协议',
        icon: "none",
      })


    }
    if (weicheck == 2) {
      wx.reLaunch({
        url: '/pages/driver/driver',
      })

    }
  }

  weicheckbox(e) {
    this.Base.setMyData({
      we: 2
    });


  }
  checkboxone(e) {
    this.Base.setMyData({
      we: 1
    });
  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindtohome = content.bindtohome;
body.bindtodriver = content.bindtodriver;
body.weicheckbox = content.weicheckbox;
body.checkboxone = content.checkboxone;
Page(body)