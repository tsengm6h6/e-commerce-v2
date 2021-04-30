<template>
  <el-row type="flex" justify="center" class="question-section">
    <el-col :xs="24" :md="20" :lg="16">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a href="/">首頁</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>常見問答</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="question" v-for="(qa, index) in questionList" :key="index">
        <h3>{{ qa.question }}</h3>
        <p v-html="qa.answer"></p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      questionList: [
        {
          question: "浮潛、自由潛水、水肺潛水的差異",
          answer:
            "浮潛：使用蛙鞋、呼吸管、面鏡等裝備，大多在水面上漂浮，可自由呼吸，為最初級的潛水運動<br /><br />自由潛水：不透過氣瓶供應氧氣，僅靠著一口氣，潛入水中與海洋短暫相會的運動。可以體會到無拘無束，沒有沈重的裝備、沒有重力限制，像超人一樣飛進外太空的世界<br /><br />水肺潛水：穿著輕、重裝備背負氣瓶下潛，在水中可自在呼吸，初學下潛時間約20~30分鐘",
        },
        {
          question: "初次接觸潛水，該如何選擇課程",
          answer:
            "如果你完全沒有概念，或不熟水性，你可以從潛水體驗課程入門。對潛水有基本了解之後，就可以參加OW課程，取得國際潛水員證照，即可跟著團隊一起到各地進行岸潛或船潛。若想要繼續提升這項專業技能，就可以考慮進接或專長課程。",
        },
        {
          question: "不會游泳可以學潛水嗎",
          answer:
            "會游泳對於接觸潛水有一定的幫助，但完全不會游泳也不影響學習潛水。但強烈的建議，至少要長時間待在踩不到底的水裏時不會緊張，不然會花很多的時間在學習適應水性，而不是潛水。",
        },
        {
          question: "女性生理期來可以下水嗎",
          answer:
            "可以使用棉條照常進行課程，但若本身生理期身體狀況欠佳，建議先自我評估之後再確認報名日期",
        },
        {
          question: "一個班級會有幾個人呢",
          answer:
            "潛水為風險性高的運動，無論在學習或者進行潛水中都應需相當細心，因此我們採小班制上課，無論任何課階，一個教練基本帶四個學員。",
        },
        {
          question: "有額外需要負擔的費用嗎",
          answer:
            "所有的證照課程（不包含體驗系列）費用都包含完整的裝備與教材，包含：<br /><br />輕裝：膠鞋、蛙鞋、防寒衣、防磨手套、面鏡、呼吸管<br />重裝：BCD浮力背心、調節器、潛水儀表、空氣瓶、配重、潛水電腦錶 ( 視課程需要 )<br /><br />只需要準備個人換洗衣物、泳裝、飲食及水即可，絕不會有進行到一半又衍生需要另外加收的雜費",
        },
        {
          question: "我有XX疾病能學潛水嗎",
          answer:
            "潛水本身有一定的風險，尤其自由潛水為極限運動，教練的專業在於教授學員如何安全地學會下潛技巧，並不能代替醫生為您評估身體狀況評估。如果對於自身狀況有所疑慮，請可參考以下步驟：<br /><br />1. 下載PADI健康聲明書（水肺潛水） / AIDA健康聲明書（自由潛水）。<br /><br />2. 若您的身體狀況有符合聲明書中所列，請務必與醫生討論並請醫生簽名後方可參加。<br /><br />3. 若您的身體狀況沒有在聲明書中所列，也請與醫生確認過後再參加課程。<br /><br />您可以這樣與醫生描述： <br /><br /> 水肺潛水：醫生，我將參加水肺潛水課程，課程中會下潛約12米的深度並維持約20~30分鐘，我的身體可能會承受血氧與氣壓變化<br /><br /> 自由潛水：醫生，我將參加自由潛水課程，課程中會進行2分鐘的閉氣訓練；並下潛到水中5~16米的深度，我的身體可能會承受血氧與氣壓變化。",
        },
      ],
    };
  },
};
</script>

<style scoped>
.question-section {
  padding: 30px;
}

.el-breadcrumb {
  margin-bottom: 20px;
}

h3 {
  font-size: 24px;
  line-height: 46px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #ffc66c;
}

p {
  letter-spacing: 1px;
  line-height: 30px;
}

.question {
  margin-bottom: 30px;
}

/* sm */
@media only screen and (min-width: 768px) {
  .question-section {
    padding: 30px 80px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .question-section {
    padding: 30px 120px;
  }
}
</style>