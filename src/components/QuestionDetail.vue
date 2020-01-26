<template>
  <div class="question">
    <b-container>
      <div class="time text-right">{{new Date() | vnStringDate}}</div>
      <b-breadcrumb :items="items"></b-breadcrumb>
      <div class="content">
        <b-row>
          <b-col md="8" style="min-height:400px" >
            <loading
              :active.sync="isLoading"
              :can-cancel="true"
              :on-cancel="onCancel"
              :is-full-page="fullPage"
            ></loading>
            <div style="text-align:right">{{ new Date(data.createDate) | vnStringDate}}</div>
            <div class="question-item" v-if="!isLoading">
            <center style="padding:20px" >
              <h2>{{data.title}}</h2>
              <h6>Chủ đề: {{serviceName}}</h6>
            </center>
            <b-jumbotron>
              <p>{{data.description}}</p>
            </b-jumbotron>

            </div>
          </b-col>
          <b-col md="4">
            <b-list-group>
              <b-list-group-item active>Câu hỏi cùng chủ đề:</b-list-group-item>
              <b-list-group-item v-for="(item,index) in moreQuestion" :key="index">
                <router-link :to="getLinkDetail(item)">{{item.title}}</router-link>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import ApiService from "../service/ApiService";
export default {
  name: "QuestionDetail",
  props: {
    msg: String
  },
  data() {
    return {
      items: [],
      data: {},
      moreQuestion: [],
      isLoading: false,
      fullPage: false,
      serviceName: ""
    };
  },
  methods: {
    getLinkDetail(ques) {
      return "/question/detail?id=" + ques.id;
    }
  },
  created() {
    this.isLoading = true;
    this.makeBreadcum = function(service) {
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
    this.detailSub = ApiService.getQuestionDetail(
      this.$route.query.id
    ).subscribe(m => {
      this.isLoading = false;
      this.makeBreadcum(m.service);
      this.moreQuestion = m.data.moreQuestion;

      this.data = m.data.question;
      this.serviceName = m.service.name;
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true;
    ApiService.getQuestionDetailCall(to.query.id);
    next();
  },
  beforeDestroy() {
    this.detailSub.unsubscribe();
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
  animation: fadein 1s;
}
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>

