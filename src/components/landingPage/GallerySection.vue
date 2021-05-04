<template>
  <section class="gallery">
    <h3>追蹤我們 @ DIVEINLIFE</h3>
    <div class="gallery-container">
      <template v-if="srcList.length">
        <img
          class="gallery-item"
          v-for="(img, index) in srcList"
          :key="index"
          :src="img"
          alt=""
        />
      </template>

      <el-image v-else>
        <img
          slot="error"
          class="image-slot"
          src="https://i.imgur.com/F5dYi4q.png"
        />
      </el-image>
    </div>
  </section>
</template>

<script>
export default {
  name: "GallerySection",
  data() {
    return {
      srcList: [
        "https://i.imgur.com/cn6cJqhl.jpg",
        "https://i.imgur.com/XrQFxaql.jpg",
        "https://i.imgur.com/PoflmZ8l.jpg",
        "https://i.imgur.com/tlal1BYl.jpg",
        "https://i.imgur.com/mIUfJval.jpg",
        "https://i.imgur.com/fFAIWcOl.jpg",
        "https://i.imgur.com/xFxjgFql.jpg",
        "https://i.imgur.com/EWpN4PQl.jpg",
        "https://i.imgur.com/3bHVwZgl.jpg",
        "https://i.imgur.com/oHycFwol.jpg",
      ],
    };
  },
};
</script>

<style scoped>
.gallery {
  padding: 30px;
  background-color: #242323;
  text-align: center;
}

h3 {
  margin-bottom: 30px;
  color: #fcfcfc;
}

.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-auto-rows: 180px;
  grid-gap: 10px;
}
.gallery-item {
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: center;
  border-radius: 2px;
}

.image-slot {
  width: 25%;
  transform: scale(0.4);
  position: relative;
  bottom: 30%;
}

/* sm */
@media only screen and (min-width: 768px) {
  .gallery {
    padding: 80px;
  }

  h3 {
    margin-bottom: 50px;
  }
}

/* md */
@media only screen and (min-width: 992px) {
  .gallery {
    padding: 120px;
  }
}
</style>