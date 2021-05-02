<template>
  <section class="course-section">
    <div class="part">
      <div class="left">
        <!-- <img class="image" src="https://i.imgur.com/xPuN8BH.jpg" alt="" /> -->

        <img class="image" src="https://i.imgur.com/WQfD7tT.jpg" alt="" />
      </div>
      <div class="right">
        <h2>本月主打：龍洞秘境浮潛體驗</h2>
        <p>
          每位教練帶 5~7
          位學員的小團制安排，確保活動品質不打折，不會游泳、沒有經驗也可以！隱藏在龍洞灣內的浮潛秘境，讓你和大海的第一次接觸零負擔
        </p>
        <div class="info">
          <div class="detail">
            <div class="icon">
              <i class="el-icon-sunrise-1"></i>
            </div>
            <p>暑假親子出遊首選，大人小孩都開心</p>
          </div>
          <div class="detail">
            <div class="icon">
              <i class="el-icon-camera"></i>
            </div>
            <p>免費贈送活動側拍</p>
          </div>
          <div class="detail">
            <div class="icon">
              <i class="el-icon-date"></i>
            </div>
            <p>每日出團，可彈性安排包團</p>
          </div>
        </div>
        <p>
          現在報名即可享{{ currCoupon.percent / 10 }}折優惠，輸入{{
            currCoupon.code
          }}取得折扣價！
        </p>
        <div class="button">
          <el-button type="success" plain @click="doCopy">
            <h4>點我領取優惠</h4>
          </el-button>
          <router-link to="/product/-MYiT0lf4ZlryXj6uGLM">
            <el-button type="success">
              <h4>立即報名</h4>
            </el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="part reverse">
      <div class="left">
        <img class="image" src="https://i.imgur.com/mIUfJva.jpg" alt="" />
      </div>
      <div class="right">
        <h2>全新推出：獨木舟日出早餐饗宴</h2>
        <p>
          龍洞灣岸弧形如蛟龍盤據，巨石臨海矗立，氣勢如虹。清澈的龍洞灣海域內更有最古老的岩石及海崖峭壁，晨光熹微之時划行獨木舟緩緩出發，日出海景與四周奇岩相映成趣，來一份早餐，忘卻生活煩憂與時間流轉
        </p>
        <div class="info">
          <div class="detail">
            <div class="icon">
              <i class="el-icon-sunrise-1"></i>
            </div>
            <p>東北角絕美的日出</p>
          </div>
          <div class="detail">
            <div class="icon">
              <i class="el-icon-camera"></i>
            </div>
            <p>早起鳥兒有早餐，免費贈送自選野餐籃</p>
          </div>
          <div class="detail">
            <div class="icon">
              <i class="el-icon-date"></i>
            </div>
            <p>限定出團，欲報從速！</p>
          </div>
        </div>
        <p>
          現在報名即可享{{ currCoupon.percent / 10 }}折優惠，輸入{{
            currCoupon.code
          }}取得折扣價！
        </p>
        <div class="button">
          <el-button type="success" plain @click="doCopy">
            <h4>點我領取優惠</h4>
          </el-button>
          <router-link to="/product/-MZhd0J1hOoo3gshsehc">
            <el-button type="success">
              <h4>立即報名</h4>
            </el-button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CourseSection",
  computed: {
    ...mapState(["currCoupon"]),
  },
  methods: {
    async doCopy() {
      try {
        await this.$copyText(this.currCoupon.code);
        this.$message.success("成功複製優惠碼！");
      } catch (err) {
        this.$message.danger("無法複製優惠碼，請稍後再試");
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
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
}
.left .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.left::after {
  content: "";
  width: 100%;
  height: 100%;
  border: 3px solid #00c9c8;
  position: absolute;
  top: 6%;
  left: 5%;
}

.right {
  width: 95%;
  padding: 70px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.right h2 {
  margin-bottom: 22px;
}
.right > p {
  margin-bottom: 35px;
  line-height: 30px;
}

.detail {
  display: flex;
  align-items: center;
  margin-bottom: 23px;
  letter-spacing: 1px;
}
.detail .icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail .icon i {
  width: 100%;
  color: #00c9c8;
  font-size: 24px;
}

.detail:not(:last-child) {
  margin-bottom: 10px;
}

.button {
  margin-top: 20px;
}

.el-button {
  margin-right: 10px;
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
  }
  .part.reverse .left::after {
    top: -6%;
    left: -5%;
  }
  .part.reverse .right {
    padding: 0 50px 0 120px;
  }
}
</style>