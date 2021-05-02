<template>
  <footer class="footer">
    <section class="company-info">
      <router-link to="/"
        ><img class="brand-name" src="https://i.imgur.com/XZFFSvE.png" alt=""
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
              <img src="https://i.imgur.com/b2bpXra.png" alt="" />
              <img src="https://i.imgur.com/0wSCxhy.png" alt="" />
              <img src="https://i.imgur.com/Fbg65MS.png" alt="" />
              <img src="https://i.imgur.com/YIy9TrF.png" alt="" />
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
    <img src="https://i.imgur.com/6DYXwRJ.png" alt="" class="coral-bg" />
    <el-button class="back" v-scroll-to="'#navbar'">Top</el-button>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.5)
  );
  position: relative;
}

.coral-bg {
  width: 70%;
  position: absolute;
  bottom: 0;
  right: -15px;
  z-index: -2;
  opacity: 0.5;
  object-fit: cover;
}

.company-info {
  padding: 30px;
}

.brand-name {
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
  padding: 5px 0 5px 30px;
}

.back {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
  color: #44607a;
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
}

/* md */
@media only screen and (min-width: 992px) {
  .company-info {
    padding: 30px 120px;
  }
}
</style>