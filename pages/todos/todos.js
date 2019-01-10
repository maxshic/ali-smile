const app = getApp();

import sha512 from 'js-sha512'

Page({
	data: {},

	onLoad() {
		console.log(new Date().getTime())
    app.getUserInfo().then(res => {
      console.log(res)
    }).catch(err => {})
	},
  btnTap(){
    
  },
  error(e){
    console.log(e)
  }
});
