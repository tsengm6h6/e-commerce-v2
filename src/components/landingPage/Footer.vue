<template>
  <footer class="footer">
    <section class="company-info">
      <div class="brand-name">DIVE IN</div>
      <div class="info-wrapper">
        <div class="left">
          <div class="info">
            <img src="https://i.imgur.com/OfcGXdW.png" alt="" />
            電話：0123 - 45678
          </div>
          <div class="info">
            <img src="https://i.imgur.com/1feqMlf.png" alt="" />
            地址：0123 - 45678
          </div>
          <div class="info">
            <img src="https://i.imgur.com/wmPfs6q.png" alt="" />
            信箱：0123 - 45678
          </div>
        </div>
        <div class="right">
          <div class="links">
            <a href="" class="link">所有活動</a>
            <a href="" class="link">常見問答</a>
            <a href="" class="link">聯絡我們</a>
          </div>
          <div class="action">
            <div class="icons">
              <img src="https://i.imgur.com/OQCCFnv.png" alt="" />
              <img src="https://i.imgur.com/lo6U4xv.png" alt="" />
              <img src="https://i.imgur.com/sou7Yi8.png" alt="" />
            </div>
            <el-button type="danger">立即報名</el-button>
          </div>
        </div>
      </div>
    </section>
    <div class="copyright">
      <span>&#169;</span
      >本網站為作業練習，非商業用途｜部分圖片版權所有，轉載必究
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.company-info {
  background-color: #00c9c8;
  padding: 30px;
}

.brand-name {
  font-size: 26px;
  font-weight: 600;
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
}

.info img {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}

/****** Right *******/
.links {
  display: none;
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
  padding: 5px;
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
    align-items: flex-start;
  }

  .link {
    margin: 0 50px 10px;
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