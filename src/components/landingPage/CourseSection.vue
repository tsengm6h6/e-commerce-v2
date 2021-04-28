<template>
  <section class="course-section">
    <div class="part">
      <div class="left">
        <img class="image" src="https://i.imgur.com/xPuN8BH.jpg" alt="" />
      </div>
      <div class="right">
        <h2>龍洞浮潛體驗</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, eum?
        </p>
        <div class="info">
          <div class="detail">
            <div class="icon"></div>
            <p>Lorem, ipsum.</p>
          </div>
          <div class="detail">
            <div class="icon"></div>
            <p>Lorem, ipsum.</p>
          </div>
          <div class="detail">
            <div class="icon"></div>
            <p>Lorem, ipsum.</p>
          </div>
        </div>
        <div class="button">
          <el-button type="success" plain>
            <h4>更多體驗</h4>
          </el-button>
          <el-button type="success">
            <h4>立即報名</h4>
          </el-button>
        </div>
      </div>
    </div>
    <div class="part reverse">
      <div class="left">
        <img class="image" src="https://i.imgur.com/ROCTxjU.jpg" alt="" />
      </div>
      <div class="right">
        <h2>龍洞浮潛體驗</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, eum?
        </p>
        <div class="info">
          <div class="detail">
            <div class="icon"></div>
            <p>Lorem, ipsum.</p>
          </div>
          <div class="detail">
            <div class="icon"></div>
            <p>Lorem, ipsum.</p>
          </div>
          <div class="detail">
            <div class="icon"></div>
            <p>Lorem, ipsum.</p>
          </div>
        </div>
        <div class="button">
          <el-button type="success" plain>
            <h4>更多體驗</h4>
          </el-button>
          <el-button type="success">
            <h4>立即報名</h4>
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CourseSection",
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
  margin-bottom: 48px;
}

.detail {
  display: flex;
  align-items: center;
  margin-bottom: 23px;
}
.detail .icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 10px;
}
.detail:not(:last-child) {
  margin-bottom: 10px;
}

.button {
  margin-top: 20px;
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