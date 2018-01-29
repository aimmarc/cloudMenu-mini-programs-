// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoPlay: false,
    dots: false,
    current: 0,
    menuClass: "active",
    commentClass: "",
    foodClass: ['热门', '活动', '特色', '蒸菜', '炒菜', '凉菜', '炖菜', '米饭', '汤类', '荤菜', '素菜'],
    foods: {
      '蒸菜': [{ name: '粉蒸肥肠', num: 0, price: 18, disc: '天下第一美食' }, { name: '粉蒸排骨', num: 0, price: 18, disc: '天下第一美食' }, { name: '汽水羊肉', num: 0, price: 25, disc: '天下第一美食' }, { name: '粉蒸肉', num: 0, price: 20, disc: '天下第一美食' }, { name: '梅菜扣肉（烧白）', num: 0, price: 20, disc: '天下第一美食'}],
      '炒菜': [{ name: '青椒肉丝', num: 0, price: 18, disc: '青椒肉丝' }, { name: '鱼香肉丝', num: 0, price: 18, disc: '鱼香肉丝' }, { name: '酸辣血旺', num: 0, price: 25, disc: '酸辣血旺' }, { name: '炝炒莲白', num: 0, price: 20, disc: '炝炒莲白' }, { name: '酱爆猪肝', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝1', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝2', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝3', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝4', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝5', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝6', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝7', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝8', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝9', num: 0, price: 20, disc: '酱爆猪肝' }, { name: '酱爆猪肝10', num: 0, price: 20, disc: '酱爆猪肝' }]
    },
    activeItem: '蒸菜',
    paddingTop: 165 + 'px',
    addFoods: [],
    foodsNum: 0,
    shopBadgeFlag: true,
    shopFoodsBarFlag: true,
    shopCarSrc: '../../res/img/shopCar1.png',
    prices:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.setNavigationBarTitle({
      title: '经典招牌川菜馆（XX市总店）'//that.data.mername//页面标题为路由参数
    });
    var query = wx.createSelectorQuery();
    query.select('#topBar').boundingClientRect()
    query.exec(function (res) {
      _this.setData({
        paddingTop: res[0].height + 'px'
      })
      console.log(res[0].height);
    })
  },
  // 显示、隐藏购物车
  showShopCar: function (e) {
    if (this.data.shopFoodsBarFlag){
      this.setData({
        shopFoodsBarFlag: false
      })
    }else{
      this.setData({
        shopFoodsBarFlag: true
      })
    }
    
  },
  
  bindchange: function (e) {
    // tabs页面切换时改变current
    this.setData({
      current: e.detail.current
    });
  },
  // 跳转类别
  goTabs: function (e) {
    var index = e.currentTarget.id;
    this.setData({
      current: index
    });
  },
  // 切换类别
  changeTabs: function (e) {
    var flag = e.currentTarget.id;
    this.setData({
      activeItem: flag
    })
  },
  // 添加菜品
  addFood: function (e) {
    var foodName = e.currentTarget.id;
    var oldFoods = this.data.addFoods;
    var foods = this.data.foods;
    var addFlag = true;
    var foodsNum = this.data.foodsNum;
    var activeItem = this.data.activeItem;
    for (var j in oldFoods) {
      if (oldFoods[j].name == foodName) {
        addFlag = false;
      }
    }
    for (var i in foods[activeItem]){
      if (foods[activeItem][i].name == foodName){
        if(addFlag){
          oldFoods.push(foods[activeItem][i]);
        }
        foods[activeItem][i].num = foods[activeItem][i].num + 1;
      }
      for (var j in oldFoods) {
        if (oldFoods[j].name == foods[activeItem][i].name) {
          oldFoods[j].num = foods[activeItem][i].num
        }
      }
    }
    var price = 0;
    for (var i in oldFoods){
      price = price + oldFoods[i].price * oldFoods[i].num;
    }
    
    this.setData({
      foods: foods,
      addFoods: oldFoods,
      foodsNum: foodsNum + 1,
      shopBadgeFlag: false,
      shopCarSrc:'../../res/img/shopCar2.png',
      prices: price
    })
    // var flag = true;
    // for (var i in oldFoods) {
    //   if (foodName == oldFoods[i]) {
    //     flag = false;
    //   }
    // }
    // if (flag) {
    //   oldFoods.push(foodName);
    //   this.setData({
    //     addFoods: oldFoods,
    //     shopBadgeFlag: false,
    //     foodsNum: oldFoods.length
    //   });
    // }
    // console.log(this.data.addFoods);
    
  },
  // 减少菜品
  minusFood: function (e) {
    var foodName = e.currentTarget.id;
    var oldFoods = this.data.addFoods;
    var foods = this.data.foods;
    var foodsNum = this.data.foodsNum-1;
    var activeItem = this.data.activeItem;
    for (var i in foods[activeItem]) {
      if (foods[activeItem][i].name == foodName) {
        // if (addFlag) {
        //   oldFoods.push(foods['蒸菜'][i]);
        // }
        foods[activeItem][i].num = foods[activeItem][i].num - 1;
      }
      for (var j in oldFoods) {
        if (oldFoods[j].name == foods[activeItem][i].name) {
          if (foods[activeItem][i].num==0){
            oldFoods.splice(j,1);
          }else{
            oldFoods[j].num = foods[activeItem][i].num
          }
        }
      }
    }
    var price = 0;
    for (var i in oldFoods) {
      price = price + oldFoods[i].price * oldFoods[i].num;
    }
    if (oldFoods.length == 0) {
      this.setData({
        foods: foods,
        addFoods: oldFoods,
        foodsNum: foodsNum,
        shopBadgeFlag: true,
        shopCarSrc: '../../res/img/shopCar1.png',
        prices:0
      })
    }else{
      this.setData({
        foods: foods,
        addFoods: oldFoods,
        foodsNum: foodsNum,
        shopBadgeFlag: false,
        prices: price
      })
    }

    
    
    // var newFoods = [];
    // for (var i in foods) {
    //   if (foodName != foods[i]) {
    //     newFoods.push(foods[i])
    //   }
    // }
    // if (newFoods.length == 0) {
    //   this.setData({
    //     addFoods: newFoods,
    //     shopBadgeFlag: true
    //   })
    // } else {
    //   this.setData({
    //     addFoods: newFoods,
    //     foodsNum: newFoods.length
    //   })
    // }
  },
  // 清空购物车
  clearShopCar: function (e) {  
    var foods = this.data.foods;
    for(var i in foods){
      for(var j in foods[i]){
        foods[i][j].num = 0;
      }
    }
    this.setData({
      addFoods: [],
      foods: foods,
      foodsNum: 0,
      prices: 0,
      shopBadgeFlag: true,
      shopCarSrc: '../../res/img/shopCar1.png',
    });
  },

  order: function(e){
    if(this.data.prices>15){
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})