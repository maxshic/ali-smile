const app = getApp();

import sha512 from 'js-sha512'

Page({
	data: {},

	onLoad() {
		console.log(new Date().getTime())
	},
  btnTap(){
    app.getUserInfo().then(res => {
      console.log(res)
    }).catch(err => {})
  },
  error(e){
    console.log(e)
  }
});
