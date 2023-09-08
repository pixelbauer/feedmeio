<template>
  <div class="hello">


    <swiper class="mySwiper"
            :slides-per-view="1"
            :space-between="50"
            @swiper="onSwiper"
            @slideChange="onSlideChange">
      <swiper-slide class="pushSlide swiper-slide">JEP</swiper-slide>
      <swiper-slide class="swiper-slide">Slide 2

      {{recipient.name}}{{recipient}}</swiper-slide>
      <swiper-slide class="nopeSlide swiper-slide">NOPE</swiper-slide>
    </swiper>
    {{slideResults}}
    <ul><li v-for="res in slideResults" v-bind:key="res">{{res}}</li></ul>
  </div>
</template>

<script>
import { ref } from "vue";
import  {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper-bundle.css";
import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {

    const slideResults = ref([]); // Verwenden Sie ref, um auf slideResults zuzugreifen
    const recipient = ref({}); // Verwenden Sie ref, um auf slideResults zuzugreifen
    const onSwiper = (swiper) => {
      swiper.slideTo(1);
      recipient.value.name = "Rezept 1"
      console.log(swiper);
    };
    const onSlideChange = (swiper) => {
      let slideResult;
      if(swiper.previousIndex === 1){
        if (swiper.realIndex > swiper.previousIndex) {
          // Nach rechts geswipt
          console.log('Nach rechts geswipt');
          slideResult = 'right';
          //Neues Rezept laden
          axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(function (response) {
              // handle success
              console.log(response);
              recipient.value = response.data;
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
          recipient.value.name = "Rezept xyz"+Math.random()*100;
        } else if (swiper.realIndex < swiper.previousIndex) {
          // Nach links geswipt
          console.log('Nach links geswipt');
          slideResult = 'left';
          // Rezept Hinzufügen
        }
        if(slideResult){
          slideResults.value.push(slideResult);
        }

        console.log('res',slideResults);
        swiper.slideTo(1);
      }
    };
    return {
      recipient,
      slideResults,
      onSwiper,
      onSlideChange,
    };

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.mySwiper .swiper-slide{
  background:#c0c0c0;
  height:200px;
}
.mySwiper .swiper-slide.nopeSlide{
  background:red;
}
.mySwiper .swiper-slide.pushSlide{
  background:green;
}
</style>
