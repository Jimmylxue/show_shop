<template>
  <div class="root">
    <div class="header">
      <div class="title">
        <!-- <img src="../assets/logo (1).png" alt=""> -->
      </div>
      <div class="form">
        <div class="nowcity">
          <span v-if="spancontrol" @mouseenter="troggle" @mouseleave="troggle">
            <i class="el-icon-location-outline"></i>
            当前城市:{{ nowCity }}
          </span>
          <transition name="fade">
            <div class="detailMsg" v-if="show">
              <div class="deatilheader">
                <span class="time">{{ today }}</span>
              </div>
              <div class="detailContainer">
                <div
                  class="indexMsg"
                  v-for="(item, index) in future"
                  :key="index"
                >
                  <div class="itemDetail">
                    <span>
                      <i class="el-icon-date"></i>
                      {{ item.date }}
                    </span>
                    <span>
                      <i class="el-icon-loading"></i>
                      {{ item.temperature }}
                    </span>
                    <span>
                      <i class="el-icon-key"></i>
                      {{ item.weather }}
                    </span>
                    <span>
                      <i class="el-icon-wind-power"></i>
                      {{ item.direct }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <form>
          <input
            autocomplete="off"
            type="text"
            name="city"
            v-model="City"
            placeholder="请输入城市名称"
          />
          <input type="button" @click="postCity" value="查询" />
          <i class="el-icon-location-information"></i>
          <div class="msgInfo">
            <div class="temperature">{{ realtime.temperature }}</div>
            <div class="infoimg">
              <img src="@/assets/imgs/weather/Cloudy.png" alt />
            </div>
          </div>
        </form>
        <div class="QRcode">
          <img
            @mouseleave="Qr = !Qr"
            @mouseenter="Qr = !Qr"
            src="@/assets/imgs/weather/top1.png"
            alt
          />
          <transition name="qr">
            <div v-if="Qr" class="qrimg">
              <img src="@/assets/imgs/weather/QR.jpg" alt />
              <span>扫码联系作者</span>
            </div>
          </transition>
        </div>
        <div class="more">
          <span
            @mouseleave="suthormsg = !suthormsg"
            @mouseenter="suthormsg = !suthormsg"
          >
            <i class="el-icon-s-operation"></i>更多
          </span>
        </div>
      </div>
      <transition name="author">
        <asside v-if="suthormsg" class="asside"></asside>
      </transition>
    </div>
    <div class="contain">
      <div class="imgconatiner">
        <img src="@/assets/imgs/weather/index.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import asside from '@/components/weather/side/asside'
export default {
  components: {
    asside,
  },
  data() {
    return {
      City: '福州',
      realtime: [],
      nowCity: '',
      future: [],
      today: '',
      show: false,
      spancontrol: false,
      Qr: false,
      suthormsg: false,
    }
  },
  mounted() {
    if (this.$store.state.weather.weatherMsg == '') {
      this.getCityWeather()
    } else {
      console.log('有数据不用请求')
      this.formatdata()
    }
  },
  methods: {
    async getCityWeather() {
      let params = {}
      params.city = this.City
      let res = await this.$api.weather.getWeather(params)
      if (res.data.code == 200) {
        this.$store.commit('saveWeather', res.data.result)
      }
    },
    formatdata() {
      let weatherMsg = JSON.parse(this.$store.state.weather.weatherMsg)
      console.log(weatherMsg)
      this.spancontrol = true
      this.future = weatherMsg.result.future
      this.nowCity = weatherMsg.result.city
      this.realtime = weatherMsg.result.realtime
      this.today = weatherMsg.result.future[0].date
    },
    postCity() {
      this.$http.post('/api/postCity', this.City).then(res => {
        if (res.data.reason === '查询成功!') {
          console.log(res)
          this.spancontrol = true
          this.future = res.data.result.future
          this.nowCity = res.data.result.city
          this.realtime = res.data.result.realtime
          this.today = res.data.result.future[0].date
          console.log(this.future)
          this.$message({
            message: '查询成功',
            type: 'success',
          })
        } else {
          this.$message.error('请输入正确的城市名哦~')
        }
      })
      console.log(this.City)
      // this.$http.get('/api/all').then((res)=>{
      //   console.log(res)
      // })
    },
    troggle() {
      this.show = !this.show
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 80px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
  justify-content: space-between;
}
.title {
  width: 150px;
  height: 35px;
  margin-left: 20px;
}
.title > img {
  height: 100%;
}
.form {
  margin-right: 20px;
  display: flex;
  position: relative;
}
form > input:nth-child(1) {
  width: 250px;
  height: 38px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  font-size: 16px;
  padding-left: 40px;
  border: none;
  color: #ecf0f1;
  /* position: relative; */
}
::placeholder {
  font-family: '微软雅黑';
}
form {
  position: relative;
}
form > i {
  position: absolute;
  left: 15px;
  top: 5px;
  font-size: 1.5em;
}
.msgInfo {
  width: 85px;
  height: 32px;
  /* background-color: #3498db; */
  border-left: 1px solid #ccc;
  position: absolute;
  right: 85px;
  top: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.infoimg {
  width: 35px;
  height: 35px;
}
.infoimg > img {
  width: 100%;
  height: 100%;
}
.temperature {
  color: white;
  font-size: 18px;
  font-family: '微软雅黑';
}
form > input:nth-child(2) {
  width: 70px;
  height: 35px;
  border: none;
  outline: none;
  font-size: 15px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  color: #ecf0f1;
  cursor: pointer;
}
form > input:nth-child(2):hover {
  box-shadow: 0 0 10px #e67e22;
  color: #2c3e50;
}
.imgconatiner {
  width: 540px;
  height: 135px;
}
.contain {
  height: 82vh;
  width: 100vw;
  /* background: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgconatiner > img {
  width: 100%;
  height: 100%;
}
.nowcity {
  /* width: 150px; */
  height: 38px;
  /* background-color: #3498db; */
  margin-right: 15px;
  font-size: 16px;
  line-height: 38px;
  /* position: relative; */
}
.nowcity > span > i {
  font-size: 1.5em;
}
.detailMsg {
  width: 620px;
  /* height: 390px; */
  /* background-color: #2ecc71; */
  position: absolute;
  right: 0;
  top: 50px;
}
.deatilheader {
  height: 50px;
  width: 100%;
  background-color: black;
}
.time {
  color: white;
  padding-left: 15px;
  line-height: 50px;
}
.detailContainer {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.itemDetail {
  width: 100%;
  height: 50px;
  /* background-color: skyblue; */
  line-height: 50px;
  border-top: 1px solid #ccc;
  color: #ecf0f1;
  display: flex;
  justify-content: space-around;
}
.itemDetail > span {
  width: 120px;
}
/* 
    Vue动画
   */
.fade-enter,
.fade-leave-to {
  /* opacity: 0; */
  transform: translatex(500px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
  /* opacity: 1; */
}
.QRcode {
  width: 38px;
  height: 38px;
  margin-left: 30px;
  position: relative;
}
.QRcode > img {
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.QRcode > img:hover {
  opacity: 1;
  cursor: pointer;
}
.more {
  margin-left: 30px;
  width: 100px;
  height: 35px;
  /* background-color: skyblue; */
  font-size: 20px;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  border: 1px solid white;
  border-radius: 8px;
  opacity: 0.5;
  /* position: relative; */
}
.more:hover {
  opacity: 1;
  cursor: pointer;
}
.QRcode > .qrimg {
  width: 240px;
  height: 240px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50px;
  left: -95px;
  border-radius: 10px;
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.qrimg > span {
  font-size: 1.5em;
  z-index: 55;
}
.qrimg > img {
  width: 145px;
  height: 145px;
  margin-bottom: 25px;
  margin-top: 10px;
}
/* 二维码动画 */
.qr-enter,
.qr-leave-to {
  opacity: 0;
}
.qr-enter-active,
.qr-leave-active {
  transition: 0.3s all linear;
}
.asside {
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 0;
}
.author-enter,
.author-leave-to {
  opacity: 0;
}
.author-enter-active,
.author-leave-active {
  transition: 0.5s all linear;
}
</style>
