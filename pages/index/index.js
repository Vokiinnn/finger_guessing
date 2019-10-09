//index.js
//获取应用实例
const app = getApp()
//定时器
let timer;
//计数器
let countNum=0;
Page({
  data: {
    onoff:true,
    winNum:0,
    sumNum:10,
    result:'VS',
    roboturl:'',
    userurl:'/pages/images/weizhi.jpg',
    num: ['/pages/images/bu.jpg', '/pages/images/jiandao.jpg','/pages/images/shitou.jpg']
  },
  onLoad: function () {
    this.robotRandomUrl()
  },
  //用户点击
  clickImage:function(e){
    if(!this.data.onoff){
      return
    }
    this.setData({onoff:false})
    this.setData({userurl:this.data.num[e.currentTarget.id]})    
    clearInterval(timer)
    let user = this.data.userurl;
    let robot = this.data.roboturl;
    let count = this.data.winNum;
    let sum = this.data.sumNum;
    let str = '你输了'
    let text = ''
    if(!sum){
      return 
    }
    sum--;
    if (user == '/pages/images/bu.jpg' && robot == '/pages/images/shitou.jpg'){
      count++
      str = '你赢了'
      wx.setStorageSync( 'winNum',count)
    }
    if (user == '/pages/images/jiandao.jpg' && robot == '/pages/images/bu.jpg') {
      count++
      str = '你赢了'
      wx.setStorageSync( 'winNum', count )
    }
    if (user == '/pages/images/shitou.jpg' && robot == '/pages/images/jiandao.jpg') {
      count++
      str = '你赢了'
      wx.setStorageSync( 'winNum', count )
    }
    if(user == robot){
      str = "平局"
    }
    this.setData({
      result:str,
      winNum:count,
      sumNum:sum
    })
  },
  //随机图片
  robotRandomUrl:function(){
    timer = setInterval(this.move,50)
  },
  move(){
    if(countNum >= 3){
      countNum = 0;
    }
    let robotrandom = Math.floor(Math.random() * 10) % 3;
    this.setData({ roboturl: this.data.num[robotrandom] })
    countNum ++;
  },
  //开始
  begin(){
    clearInterval(timer)
    if (!this.data.sumNum){
      return
    }
    this.setData({onoff:true})
    this.robotRandomUrl()
    this.setData({ 
      userurl: '/pages/images/weizhi.jpg',
      result:'VS'
    })
  },
  //重新开始
  again(){
    clearInterval(timer)
    this.setData({
    onoff: true,
    winNum: 0,
    sumNum: 10,
    result: 'VS',
    userurl: '/pages/images/weizhi.jpg'
    })
    this.robotRandomUrl()
  }
})
