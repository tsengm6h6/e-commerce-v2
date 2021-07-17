<template>
  <section class="course-section">
    <div class="part" :class="{'reverse': index % 2 }" v-for="course, index in courseList" :key='index'>
      <div class="left">
        <img class="image" :src="require(`@/assets/image/course-${index + 1}.jpg`)" alt="course" />
      </div>
      <div class="right">
        <h2>{{course.title}}</h2>
        <p>{{course.description}}</p>
        <div class="info">
          <div class="detail" v-for="detail, index in course.details" :key="'d' + index">
            <div class="icon">
              <i :class="detail.icon"></i>
            </div>
            <p>{{detail.hightlight}}</p>
          </div>
        </div>
        <p>現在報名即可享 8 折優惠，輸入 summervibe 取得折扣價！</p>
        <div class="button">
          <el-button type="success" plain @click="doCopy(), sendGTMHandler('get-discount')">
            <h4>領取優惠</h4>
          </el-button>
          <router-link :to="{ name: 'product', params: { id: course.productId}}">
            <el-button type="success" @click="sendGTMHandler('enroll-now')">
              <h4>立即報名</h4>
            </el-button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CourseSection',
  data () {
    return {
      courseList: [
        {
          title: '本月主打：龍洞秘境浮潛體驗',
          description: '每位教練帶 5~7 位學員的小團制安排，確保活動品質不打折，不會游泳、沒有經驗也可以！隱藏在龍洞灣內的浮潛秘境，讓你和大海的第一次接觸零負擔',
          details: [
            {
              icon: 'el-icon-sunrise-1',
              hightlight: '暑假親子出遊首選，大人小孩都開心'
            },
            {
              icon: 'el-icon-camera',
              hightlight: '免費贈送活動側拍'
            },
            {
              icon: 'el-icon-date',
              hightlight: '每日出團，可彈性安排包團'
            }
          ],
          productId: '-MYiT0lf4ZlryXj6uGLM'
        },
        {
          title: '全新推出：獨木舟日出早餐饗宴',
          description: '龍洞灣岸弧形如蛟龍盤據，巨石臨海矗立，氣勢如虹。清澈的龍洞灣海域內更有最古老的岩石及海崖峭壁，晨光熹微之時划行獨木舟緩緩出發，日出海景與四周奇岩相映成趣，來一份早餐，忘卻生活煩憂與時間流轉',
          details: [
            {
              icon: 'el-icon-sunrise-1',
              hightlight: '東北角絕美的日出'
            },
            {
              icon: 'el-icon-camera',
              hightlight: '早起鳥兒有早餐，免費贈送自選野餐籃'
            },
            {
              icon: 'el-icon-date',
              hightlight: '限定出團，欲報從速！'
            }
          ],
          productId: '-MZi5l3OYnpErDOqCnMg'
        }
      ]
    }
  },
  methods: {
    async doCopy () {
      try {
        await this.$copyText('summervibe')
        this.$message.success('成功複製優惠碼！')
      } catch (err) {
        this.$message.danger('無法複製優惠碼，請稍後再試')
      }
    },
    sendGTMHandler (btn) {
      this.$gtm.trackEvent({
        event: 'click-event',
        category: '點擊事件',
        action: 'click',
        label: `${btn} button clicked`,
        value: null
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.course-section {
  padding: 120px 0 0;
}

.part {
  display: flex;
  flex-direction: column;
}

.left {
  width: 90%;
  height: 500px;
  position: relative;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    border: 3px solid #00c9c8;
    position: absolute;
    top: 6%;
    left: 5%;
  }
}

.right {
  width: 95%;
  padding: 70px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    margin-bottom: 22px;
  }

  > p {
    margin-bottom: 35px;
    line-height: 30px;
  }
}

.detail {
  display: flex;
  align-items: center;
  margin-bottom: 23px;
  letter-spacing: 1px;

  .icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      width: 100%;
      color: #00c9c8;
      font-size: 24px;
    }
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.button {
  margin-top: 20px;
}

.el-button {
  margin: 0 10px 10px 0;
  letter-spacing: 1px;
}

/* md */
@media only screen and (min-width: 992px) {
  .course-section {
    padding: 120px 0;
  }
  .part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    width: 45%;
    height: 500px;
    position: relative;
  }

  .right {
    width: 45%;
    padding: 0 120px 0 50px;
  }

  .part.reverse {
    margin-top: 120px;
    flex-direction: row-reverse;

    .left::after {
      top: -6%;
      left: -5%;
    }
    .right {
      padding: 0 50px 0 120px;
    }
  }
}
</style>
