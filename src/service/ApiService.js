import axios from "axios";
import { Subject } from 'rxjs';
const serviceSubject = new Subject();
const sliderSubject = new Subject();
const pageOptionSubject = new Subject();
const questionSubject = new Subject();
const questionDetailSubject  = new Subject();
const API_HOST = "http://localhost:4000/api/"
export default {
  getService: function () {
    axios
      .get(API_HOST + 'services')
      .then(response => (
        serviceSubject.next(response.data)
      ))
    return serviceSubject.asObservable();
  },
  getSlide: function () {
    axios
      .get(API_HOST + 'slides')
      .then(response => (
        sliderSubject.next(response.data)
      ))
    return sliderSubject.asObservable();
  },
  getPageOption: function () {
    axios
      .get(API_HOST + 'options')
      .then(response => (
        pageOptionSubject.next(response.data)
      ))
    return pageOptionSubject.asObservable();
  },
  getQuestions(type,page = 0,limit=10){

    this. getQuestionCall(type,page,limit);
    return questionSubject.asObservable();
  },
  getQuestionCall(type,page=0,limit=10){
    
    axios
    .get(API_HOST + 'questions?filter='+encodeURI(type)+"&page="+page+"&limit="+limit)
    .then(response => (
      questionSubject.next(response.data)
    ))
  },
  getQuestionDetail(id){
    
    this.getQuestionDetailCall(id);
    return questionDetailSubject;
  },
  getQuestionDetailCall(id){
    axios
    .get(API_HOST + 'question/detail/'+id)
    .then(response => (
      questionDetailSubject.next(response.data)
    ))
  }

}