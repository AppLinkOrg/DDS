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
    this.Base.setMyData({
      
    })

    this.setData({
      array: ['所有', '离我最近', '费用最高' ],
      objectArray: [
        {
          id: 0,
          name: '所有'
        },
        {
          id: 1,
          name: '离我最近'
        },
        {
          id: 2,
          name: '费用最高'
        }
     
      ],
      index:0,
      tab:0,
     
      
    })
   
    super.onLoad(options);
    
  }
  
  
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '司机首页',
      
    });
  }

  
  onMyShow() {
    
    var that = this;
    
    var orderapi=new OrderApi();
    orderapi.list({}, (list) => {
      this.Base.setMyData({ list });
      var num=0;
             for(var i=1;i<list.length;i++){
               if (list[0].release_status_name="报名中")
               {
                 num++;
               }       
             }

      this.Base.setMyData({ num: num });
    });
  }
  qwe(e) {
    this.setData({
      index: e.detail.value
    })
  }
  changetab(e) {
    this.Base.setMyData({ tab: e.currentTarget.id });
  }
  
}
var tab =null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe=content.qwe;
body.changetab = content.changetab;
Page(body)