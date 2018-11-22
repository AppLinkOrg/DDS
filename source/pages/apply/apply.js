// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { date } from "../../apis/order.api.js";

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
      array: ['所有', '离我最近', '费用最高'],
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
      index: 0,
      tab: 0,


    })

    super.onLoad(options);

  }


  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '报名详情',

    });
  }


  onMyShow() {
    var orderapi = new OrderApi();
    orderapi.applylist({}, (list1) => {
      this.Base.setMyData({ list1: list1[this.Base.options.id] });

  

    })

    
    
  }
  qwe(e) {
    this.setData({
      index: e.detail.value
    })
  }
  changetab(e) {
    this.Base.setMyData({ tab: e.currentTarget.id });
  }
  Deleteorder(e) {
    console.log(e);
    var that = this;

    wx.showModal({
      title: '',
      content: '您是否需要取消本次任务？',
      showCancel: true,
      cancelText: '否',
      cancelColor: '',
      confirmText: '是',
      confirmColor: '',
      success: function (res) {
        if (res.confirm) {
          var orderapi = new OrderApi();
          orderapi.deleteapply({ idlist: that.Base.options.idlist }, (updataorder) => {
            that.Base.setMyData({
              updataorder
            });
            wx.reLaunch({
              url: '/pages/driver/driver',
            })
          });
        }
      }
    })

  }
}
var tab = null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe = content.qwe;
body.changetab = content.changetab;
body.Deleteorder = content.Deleteorder;
Page(body)