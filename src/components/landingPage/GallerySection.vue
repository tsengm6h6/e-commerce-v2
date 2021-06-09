<template>
  <section class="gallery">
    <h3>追蹤我們 @ DIVEINLIFE</h3>
    <div class="gallery-container">
      <picture v-for="index in 8" :key="index">
        <img
          class="gallery-item"
          :src="require(`@/assets/image/gallery/gallery-${index}.jpg`)"
          alt="gallery-item"
        />
      </picture>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GallerySection'
}
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
