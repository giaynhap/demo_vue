<template>
    <div >
          <b-navbar toggleable="lg" type="light" variant="light">
                <b-navbar-brand href="#">
                    <img class = "imgLogo" src="@/assets/logo.png">
                     {{pageTitle}}
                    </b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <router-link to="/" tag="b-nav-item">Trang chủ </router-link>
                    <b-nav-item-dropdown text="Tư vấn " right> 
                        <router-link :to="service.url" tag="b-dropdown-item" v-for="(service,id ) in services" :key="id"  href="#">{{service.name}}</router-link>
                    </b-nav-item-dropdown>
                    <b-nav-item href="#">Liên hệ</b-nav-item>
                </b-navbar-nav>
                 <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Tìm kiếm "></b-form-input>
                    </b-nav-form>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Đặt câu hỏi?</b-button>
                 </b-navbar-nav>
                </b-collapse>
                
        </b-navbar>
    </div>
</template>

<script>

import ApiService from "../service/ApiService"
 
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data () {
      return {
          services: [],
          pageTitle: "DefaultName",
          pageFullName:"Default Name",
          pageDetail:"Page Description" 
      };
  },
  created () {

 
  },
  mounted(){
    
    this.serviceSub =  ApiService.getService().subscribe(m=>{
        this.services = m.data
    });

    this.pageOptSub = ApiService.getPageOption().subscribe(m=>{

        this.pageTitle = m.data.filter(m=>m.code == "pagename").shift().value
        this.pageFullName = m.data.filter(m=>m.code == "fullname").shift().value
        this.pageDetail = m.data.filter(m=>m.code == "pagedetail").shift().value
        document.title = this.pageTitle + " - "+ this.pageDetail;
         
    });

  },
  beforeDestroy () {

      this.serviceSub.unsubscribe();
      this.pageOptSub.unsubscribe();

  }
}
</script>

<style scoped>
 .imgLogo{
     width: 60px;
     height: 60px;
 }
</style>
