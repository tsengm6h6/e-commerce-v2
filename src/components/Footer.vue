<template>
  <footer class="footer">
    <section class="company-info">
      <router-link to="/"
        ><img class="brand-name" src="@/assets/image/logo.svg" alt=""
      /></router-link>
      <div class="info-wrapper">
        <div class="left">
          <div class="info">電話：0123 - 45678</div>
          <div class="info">地址：新北市某區某路某巷某號</div>
          <div class="info">信箱：letsdivein@gmail.com</div>
        </div>
        <div class="right">
          <div class="links">
            <router-link to="/products" v-scroll-to="'#navbar'"
              ><el-button type="text" class="link"
                >所有活動</el-button
              ></router-link
            >
            <router-link to="/question" v-scroll-to="'#navbar'">
              <el-button type="text" class="link">常見問答</el-button>
            </router-link>
            <router-link to="/policies" v-scroll-to="'#navbar'">
              <el-button type="text" class="link"> 政策與條款 </el-button>
            </router-link>
          </div>
          <div class="action">
            <div class="icons">
              <img src="@/assets/image/icons/facebook.webp" alt="" />
              <img src="@/assets/image/icons/youtube.webp" alt="" />
              <img src="@/assets/image/icons/line.webp" alt="" />
              <img src="@/assets/image/icons/instagram.webp" alt="" />
            </div>
            <router-link to="/products" v-scroll-to="'#navbar'">
              <el-button type="danger">立即報名</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <div class="copyright">
      <span>&#169;</span
      >本網站為作業練習，非商業用途｜部分圖片版權所有，轉載必究
    </div>
    <img :src="require('@/assets/image/footer.webp')" alt="" class="coral-bg" />
    <a class="back" v-scroll-to="'#navbar'">Top</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.5)
  );
  position: relative;
  z-index: 1;
}

.coral-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -2;
  opacity: 0.5;
  object-fit: cover;
  object-position: right bottom;
}

.company-info {
  padding: 30px;
}

.brand-name {
  width: 186px;
  margin-bottom: 10px;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

/****** Left *******/
.info {
  display: flex;
  align-items: center;
  line-height: 30px;
  padding-left: 20px;
}

/****** Right *******/
.links {
  display: none;
}

.right {
  padding-left: 20px;
}

.icons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 15px 0;
}

.icons img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
}

.icons img:not(:last-child) {
  margin-right: 10px;
}

.el-button {
  width: 100%;
  font-size: 16px;
  padding: 10px 30px;
}

.copyright {
  text-align: start;
  font-size: 12px;
  padding: 5px 75px 5px 30px;
}

.back {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  padding: 0;
  color: #242323;
  font-weight: 500;
  background-image: url("~@/assets/image/icons/star.webp");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  opacity: 0.8;
}

.back:hover {
  opacity: 1;
}

/* sm */
@media only screen and (min-width: 768px) {
  .company-info {
    padding: 30px 80px;
  }

  .info-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .links {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .el-button--text {
    color: #242323;
    font-family: "Work Sans", "Noto Sans TC", sans-serif;
    font-weight: 400;
    padding: 6px 30px;
  }

  .el-button--text:hover {
    color: #44607a;
  }

  .icons {
    margin: 0 0 20px;
  }

  .copyright {
    text-align: center;
    padding: 5px;
  }

  .coral-bg {
    width: 80%;
    height: auto;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .company-info {
    padding: 30px 120px;
  }

  .coral-bg {
    width: 60%;
  }
}
</style>
