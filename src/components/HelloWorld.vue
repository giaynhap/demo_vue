<template>
  <div class="home">
     <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="(data,index) in slides" :key="index"
        :caption="data.title"
        :text="data.detail"
        :img-src="data.image"
      ></b-carousel-slide>

       

 
    </b-carousel>
     <b-jumbotron :header="pageFullName" :lead="pageDetail">
      <p></p>
      <b-button variant="primary" href="#">Đặt câu hỏi tư vấn</b-button>
    </b-jumbotron>

  </div>
</template>

<script> 

import ApiService from "../service/ApiService"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      slides:[],
      pageTitle: "DefaultName",
      pageFullName:"Default Name",
      pageDetail:"Page Description"
    }
  },
  created(){
  this.slideSub = ApiService.getSlide().subscribe(m=>{
        this.slides = m.data
    })
  this.pageOptSub = ApiService.getPageOption().subscribe(m=>{
        this.pageTitle = m.data.filter(m=>m.code=="pagename").shift().value
        this.pageFullName = m.data.filter(m=>m.code=="fullname").shift().value
        this.pageDetail = m.data.filter(m=>m.code=="pagedetail").shift().value
    })
  },
  beforeDestroy(){
      this.pageOptSub.unsubscribe();
      this.slideSub.unsubscribe();
  }
}
</script>
 
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
a {
  color: #42b983;
}
</style>
