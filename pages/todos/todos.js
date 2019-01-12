const app = getApp();

import sha512 from 'js-sha512'

Page({
	data: {
    userid: '',
    totalamount: 0,
    a20: 'actived',
    a50: '',
    a100: '',
    amy: ''
  },

	onLoad() {
		//console.log(new Date().getTime())
    app.getUserInfo().then(resp => {
      console.log(resp)
      my.httpRequest({
        url: 'https://alipay.futuresmile.org.cn/getAliUserId', // 目标服务器url
        data: {
          auth_code:resp.authCode
        },
        success: (res) => {
          console.log(res)
          if(res.data.message == 'success'){
            this.setData({
              userid: res.data.user_id
            })
          }
        },
        fail: (err) => {
          console.log(err)
        }
      });
    }).catch(err => {})
	},
  swiperchange(e){
    console.log(e)
  },
  tap20(){
    this.setData({
      a20: 'actived',
      a50: '',
      a100: '',
      amy: ''
    })
  },
  tap50(){
    this.setData({
      a20: '',
      a50: 'actived',
      a100: '',
      amy: ''
    })
  },
  tap100(){
    this.setData({
      a20: '',
      a50: '',
      a100: 'actived',
      amy: ''
    })
  },
  tapmy(){
    this.setData({
      a20: '',
      a50: '',
      a100: '',
      amy: 'actived'
    })
  },
  btnTap(){
    my.showLoading({
      content: '加载中'
    });
    let tradeno = new Date().getTime()
    let totalamount = 0.01
    let subject = '为兔唇宝宝的爱心捐赠'
    let buyerid = this.data.userid
    let sign = sha512(tradeno+'|'+totalamount+'|'+subject+'|'+buyerid)
    my.httpRequest({
      url: 'https://alipay.futuresmile.org.cn/getAliTradeNo', // 目标服务器url
      method: 'POST',
      data: {
        out_trade_no: tradeno,
        total_amount: totalamount,
        subject: subject,
        buyer_id: buyerid,
        sign: sign
      },
      success: (res) => {
        console.log(res)
        if(res.data.code == '0000' && res.data.message == 'success'){
          my.tradePay({
            tradeNO: res.data.trade_no,
            success: (resp) => {
              my.alert({
                title: '温馨提示',
                content: '感谢您的爱心',
                success: () =>{
                  my.hideLoading();
                }
              });
            },
            fail: err => {
              my.alert({
                title: '温馨提示',
                content: '支付失败',
                success: () =>{
                  my.hideLoading();
                }
              });
            }
          });
        }else{
          my.alert({
            title: '温馨提示',
            content: '支付失败',
            success: () =>{
              my.hideLoading();
            }
          });
        }
      },
      fail: err => {
        console.log(err)
        my.alert({
          title: '温馨提示',
          content: '支付失败',
          success: () =>{
            my.hideLoading();
          }
        });
      }
    });
  },
  error(e){
    console.log(e)
  }
});
