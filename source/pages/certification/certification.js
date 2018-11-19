// pages/certification/certification.js
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
      title: '企业认证',
    }); 
    
  }
  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("Renzheng", (ret) => {
        that.Base.setMyData({
          photo: ret
        });
    }, 1);
  }
  confirm(e){
    var data = e.detail.value;
    if (data.enterprisename == '') {
      this.Base.info("企业名称不可为空");
      return;
    }
    if (data.creditcode == '') {
      this.Base.info("统一社会信用代码不可为空");
      return;
    }
    if (data.photo == "") {
      this.Base.info("请上传营业执照或有效证明");
      return;
    }
    var enterprisename = this.Base.getMyData().enterprisename;
    var creditcode = this.Base.getMyData().creditcode;
    var photo = this.Base.getMyData().photo;
    var that = this;
    var orderapi = new OrderApi();
    orderapi.authenticate({
       status: "I",
       enterprisename: enterprisename,
       creditcode: creditcode,
       authenticateimg:photo
    }, (authenticate) => {
        var pages = getCurrentPages(); 
        var beforePage = pages[pages.length - 2];
        wx.navigateBack({
          success(){
            beforePage.onLoad();
          }
        })
     });
  }
  enterprisename(e) {
    var enterprisename = e.detail.value;
    console.log(enterprisename);
    this.Base.setMyData({
      enterprisename: e.detail.value
    })
  }
  creditcode(e) {
    var creditcode = e.detail.value;
    console.log(creditcode);
    this.Base.setMyData({
      creditcode: e.detail.value
    })
  }
  photo(e) {
    var photo = e.detail.value;
    console.log(photo);
    this.Base.setMyData({
      photo: e.detail.value
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.uploadimg = content.uploadimg;
body.confirm = content.confirm;
body.enterprisename = content.enterprisename;
body.creditcode = content.creditcode; 
body.photo = content.photo;
Page(body)