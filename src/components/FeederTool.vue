<template>
  <div >


    <swiper class="mySwiper"
            :slides-per-view="1"
            :space-between="50"
            @swiper="onSwiper"
            @slideChange="onSlideChange">
      <swiper-slide class="pushSlide swiper-slide">
        <div class="circle-btn bg-green">
          <i class="bi bi-check-lg"></i>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="card" >
          <img v-bind:src="recipe.recipe_img"  class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.recipe_name }}</h5>
            <p class="card-text">{{recipe.recipe_desc}}</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="nopeSlide swiper-slide">
        <div class="circle-btn bg-red">
          <i class="bi bi-x"></i>
        </div>
      </swiper-slide>
    </swiper>

    <BModal v-model="addWeeklyPlan" title="Hinzufügen" centered hide-footer>
      Zu welchem Tag soll das Rezept hinzugefügt werden?
      <span class="btn btn-success" v-on:click="swipeRefresh(onSwiper)">MONTAG</span>

    </BModal>
  </div>
</template>

<script>
import { ref } from "vue";
import  {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper-bundle.css";
import axios from 'axios';
export default {
  name: 'FeederTool',
  props: {
    msg: String
  },
  data() {
    return {
      icon1: {
        on: 'favorite',
        off: 'favorite_border'
      },
      icon2: {
        on: 'bookmark',
        off: 'bookmark_border'
      }
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    addToDay() {
    },
  },
  setup() {

    const slideResults = ref([]); // Verwenden Sie ref, um auf slideResults zuzugreifen
    const blocklist = ref([]); // Verwenden Sie ref, um auf slideResults zuzugreifen
    const recipe = ref({}); // Verwenden Sie ref, um auf slideResults zuzugreifen
    const addWeeklyPlan = ref(false); // Verwenden Sie ref, um auf slideResults zuzugreifen
    const onSwiper = (swiper) => {
      axios
          .post( "https://api.feed-me.de/recipe/finder", {
            data: { login: "go",  },
          })
          .then((response) => {
            recipe.value = response.data.data;
          });
      swiper.slideTo(1);
    };
    const swipeRefresh = () => {
      axios
          .post( "https://api.feed-me.de/recipe/finder", {
            data: { login: "go",  },
          })
          .then((response) => {
            recipe.value = response.data.data;
          });
      addWeeklyPlan.value = false;
    };
    const onSlideChange = (swiper) => {
      let slideResult;
      if(swiper.previousIndex === 1){
        if (swiper.realIndex > swiper.previousIndex) {
          // Nach rechts geswipt
          console.log('Nach rechts geswipt');
          slideResult = 'right';
          //Neues Rezept laden

          blocklist.value.push(recipe.value.recipe_id);
          console.log(blocklist.value)
            axios
                .post( "https://api.feed-me.de/recipe/finder", {
                  data: { blocklist: blocklist.value  },
                })
                .then((response) => {
                  recipe.value = response.data.data;
                });

        } else if (swiper.realIndex < swiper.previousIndex) {
          // Nach links geswipt
          console.log('Nach links geswipt');
          slideResult = 'left';
          addWeeklyPlan.value  = true;
          // Rezept Hinzufügen
        }
        if(slideResult){
          slideResults.value.push(slideResult);
        }

        swiper.slideTo(1);
      }
    };
    return {
      addWeeklyPlan,
      recipe,
      blocklist,
      slideResults,
      swipeRefresh,
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
.card-img-top{
  max-height:40vh;
  width:auto;
  object-fit: cover;
}
.card{
  background:#202124;
  color:white;
  height:calc(90vh - 65px);
}
.card-text{
  white-space: break-spaces;
}
.pushSlide {
  display: flex;
  justify-content: end;
  align-items: center;
  padding-top:175px;
}
.nopeSlide {
  display: flex;
  justify-content: start;
  align-items: center;
  padding-top:175px;
}
.circle-btn{
  display: flex;
  justify-content: center;
  font-size:2rem;
  align-items: center;
  border-radius: 100%;
  width:50px;
  height:50px;
}
.bg-green{
  background:#0dcd0d;
}
.bg-red{
  background:#d33838;
}
.mySwiper .swiper-slide{
}
</style>
