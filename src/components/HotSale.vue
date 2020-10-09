<template>
  <div class="roott">
    <h2>限时闪购</h2>
    <div class="container">
      <div class="huodong">
        <span>14:00 场</span>
        <img src="../assets/imgs/lunbo/shandian.png" alt />
        <span class="endtime">距离结束还有:</span>
        <div class="time">
          <div>01</div>
          :
          <div>52</div>
          :
          <div>30</div>
        </div>
      </div>
      <div ref="scr" class="hdgoods">
        <div
          v-for="(item, index) in allgoos"
          @click="Detail(item.goodid)"
          :key="index"
          class="good"
          :style="randerColor"
        >
          <div class="imgs">
            <img :src="item.goodimg" width="100%" height="100%" alt />
          </div>
          <div class="msg">
            <span>{{ item.goodname }}</span>
            <span class="miaoshu">item.gooddesc</span>
            <div>
              <span>{{ item.nowPrice }}元</span>
              <span>{{ item.price }}元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      allscroll: 0,
      itemcount: 0,
      allgoos: null,
      colors: ['#2ecc71', '#3498db', '#e67e22', '#f1c40f', '#1abc9c'],
    }
  },
  computed: {
    showcolor() {
      return 'e'
    },
    randerColor() {
      // console.log(123456)
      let randnum = Math.floor(Math.random() * this.colors.length)
      console.log(randnum)
      return `border-top:1px solid ${this.colors[randnum]}`
    },
  },
  mounted() {
    setTimeout(() => {
      this.allgoos = this.$store.state.good.allGoods.filter(item => {
        if (item.tag === 'discount') {
          this.itemcount++
          return item.tag === 'discount'
        }
      })

      // console.log(this.allgoos)
    }, 500)
    setTimeout(() => {
      this.star()
    }, 3000)
  },
  watch: {
    count(newval) {
      if (newval === 275) {
        setTimeout(() => {
          this.count = 0
          this.star()
        }, 3000)
      }
    },
  },
  methods: {
    star() {
      let inter = setInterval(() => {
        // console.log('comming')
        if (this.allgoos.length !== 0) {
          this.$refs.scr.scrollLeft += 1
          this.allscroll++
          // console.log(this.allscroll, (this.itemcount - 4) * 275)
          if (this.allscroll >= 600) {
            this.$refs.scr.scrollLeft = 0
            this.count = 0
            this.allscroll = 0

            return
          }
          this.count++
          if (this.count === 275) {
            clearInterval(inter)
          }
        }
      }, 0)
    },
    Detail(id) {
      this.$router.push(`/good?id=${id}`)
    },
  },
}
</script>

<style lang="less" scoped>
h2 {
  font-weight: normal;
  margin-bottom: 20px;
}
.container {
  width: 100%;
  // height: 80px;
  // border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  .huodong {
    border-top: 1px solid #e53935;
    width: 260px;
    height: 360px;
    // background-color: #2ecc71;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(241, 237, 237);
    &:nth-child(1) {
      font-size: 21px;
      color: rgb(255, 103, 0);
      padding-top: 20px;
    }
    img {
      width: 70px;
      height: 90px;
      margin: 20px 0;
    }
    .endtime {
      font-size: 15px;
      color: rgb(111, 109, 109);
      margin-bottom: 20px;
    }
    .time {
      width: 100%;
      height: 60px;
      // background-color: #16a085;
      display: flex;
      font-size: 2rem;
      justify-content: center;
      align-items: center;
      div {
        width: 50px;
        height: 50px;
        // background-color: rgb(96, 87, 81);
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        color: #fff;
        background-color: rgb(96, 87, 81);
      }
    }
  }
  .hdgoods {
    width: 100%;
    // height: 360px;
    // background-color: #9b59b6;
    display: -webkit-box;
    // flex-wrap: wrap;
    overflow-x: auto;
    // justify-content: space-between;
    &::-webkit-scrollbar {
      display: none;
    }
    div {
      width: 260px;
      height: 360px;
      background-color: rgb(250, 250, 250);
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      .imgs {
        width: 100%;
        height: 200px;
        img {
          width: 180px;
          height: 180px;
        }
      }
      .msg {
        width: 100%;
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .miaoshu {
          font-size: 12px;
          color: #b0b0b0;
        }
        div {
          width: 100%;
          height: 50px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          span {
            margin: 0 5px;
            &:nth-child(1) {
              color: #ff6709;
            }
            &:nth-child(2) {
              text-decoration: line-through;
              color: #b0b0b0;
            }
          }
        }
      }
    }
    .good {
      // transition: all 0.3s ease-in-out;
      border-top: 1px solid #e53935;
      box-shadow: 0 0 5px #ddd;
    }
    .good:hover {
      border: 1px solid #ddd;
      border-top: 1px solid #e53935;
      box-shadow: 0 0 10px #ddd;
      transition: 0.5s all ease-in-out;
    }
  }
}
</style>
