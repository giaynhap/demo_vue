<template>
  <div class="question">
    <b-container>
      <div class="time text-right">{{new Date() | vnStringDate}}</div>
      <b-breadcrumb :items="items"></b-breadcrumb>
      <div class="content">
        <b-row>
          <b-col md="8">
            <b-col v-if="isLoading" sm="12" style="height:200px;position:absolute">
              <loading
                :active.sync="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
                :is-full-page="fullPage"
              ></loading>
            </b-col>
            <b-row v-if="questions.length<1">
              <b-col md="12" sm="12" >
                  <transition
                   @enter="afterEnter"
                    name="fade" >
                    <b-card  v-show="!isLoading" bg-variant="white" text-variant="dark">
                      <b-card-text>Không có câu hỏi nào</b-card-text>
                    </b-card>
                  </transition>
              </b-col>
            </b-row>

            <b-row>
             
                <b-col
                  v-for="(question,index) in questions"
                  :key="index"
                  md="12"
                  sm="12"
                  class="question-item"
                >
                 <transition
                 @enter="afterEnter"
                  name="fade" >
                  <b-card  v-show="index<=posShow" bg-variant="dark" text-variant="white" :title="question.title" size="sm">
                    <b-card-text>{{question.description}}</b-card-text>
                  
                    <router-link class="btn btn-primary btn-sm" variant="primary" tag="b-button" :to="getLinkDetail(question)">Xem thêm</router-link>
                  </b-card>
                   </transition>
                </b-col>
             
            </b-row>
            <b-row v-if="questions.length>=numItemInPage || questPage.page>0">
              <b-pagination-nav
                :link-gen="linkGen"
                :number-of-pages="questPage.totalPage"
                use-router
              ></b-pagination-nav>
            </b-row>
          </b-col>

          <b-col md="4">
            <b-form @submit.stop.prevent>
              <label size="sm" for="text-password">Tìm kiếm</label>
              <b-input
                size="sm"
                type="password"
                id="text-password"
                aria-describedby="password-help-block"
              ></b-input>
              <b-form-text size="sm" id="password-help-block">Lọc các câu hỏi</b-form-text>
              <div style="text-align:right">
                <b-button size="sm" type="submit" variant="primary">Submit</b-button>
              </div>
            </b-form>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import ApiService from "../service/ApiService";
import Loading from "vue-loading-overlay";
const numItemInPage = 5;
export default {
  name: "Question",
  props: {
    msg: String
  },
  data() {
    return {
      items: [],
      questionCode: "default",
      questPage: {},
      questions: [],
      service: {},
      isLoading: false,
      fullPage: false,
      posShow: -1,
      numItemInPage:numItemInPage
    };
  },
  methods: {
    linkGen(pageNum) {
      if (pageNum == 1) {
        return "?filter=" + this.questionCode;
      }
      return "?filter=" + this.questionCode + "&page=" + pageNum;
    },getLinkDetail(ques){

      return "/question/detail?id="+ques.id
    },afterEnter() {
        
       setTimeout(()=>{
         this.posShow++;
       },50)
      
    }
  },
  created() {
    this.isLoading = true;

    this.makeBreadcum = function(service) {
      if ( service == null ){
        return ;
      }
      this.items = [
        {
          text: "",
          to: { name: "home" },
          html:
            ' <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon> Trang chủ'
        },
        {
          text: service.name,
          to: { name: "question" }
        }
      ];
    };
    ApiService.getService();
    this.questionCode = this.$route.query.filter;
    this.items.append;
    this.posShow = -1;
    this.questionSub = ApiService.getQuestions(this.questionCode, (this.$route.query.page||1)-1,numItemInPage).subscribe(
      m => {
        this.questPage = {
          page: m.page.page,
          totalPage: Math.ceil((m.page.totalItem * 1) / numItemInPage),
          currenNumItem: m.page.numItem,
          totalItem: m.page.totalItem
        };
        console.log( this.questPage )
        this.service = m.service;
        if (this.questPage.totalItem <= 0) this.questPage = 0;
        this.questions = m.data;
        this.makeBreadcum( m.service );
        this.isLoading = false;
        setTimeout(()=>{
          this.posShow++;
        },100)
      }
    );
  },
  beforeRouteUpdate(to, from, next) {
    this.questionCode = to.query.filter;
    var page = to.query.page || 1;
    this.isLoading = true;
    this.posShow = -1;
    ApiService.getQuestionCall(this.questionCode, page-1,numItemInPage);
    next();
  },
  beforeDestroy() {
    this.questionSub.unsubscribe();
  },
  components: { Loading }
};
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
.question {
  padding-top: 10px;
}
.time {
  font-size: 12px;
  padding: 10px;
}
.content {
  text-align: left;
  padding: 0px 10px;
}
.question-item {
  margin-bottom: 5px;
}
.fade-enter-active, .fade-leave-active {
   transition: all 0.5s ease-in-out;
  
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
 transform:translateY(-50px);
}
</style>

