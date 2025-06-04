import { Component } from "react";
import { Api, ApiallowFile } from "./Api";

class Listing extends Component {
  async Register(data) {
    return Api.post("/user/register", data);
  }
  async Login(data) {
    return Api.post("/user/login", data);
  }
  async profileVerify(){
    return Api.get("/user/profile")
  }

  async Teacherprofile(){
    return Api.get("/teacher/profile");
  }
async TeacherDashboard(){
    return Api.get("/teacher/dashboard");
  }
  
  async TeacherprofileUpdate(data){
    return Api.post("/teacher/profile",data);
  }
 
  async ForgetPasswordLink(data){
    return Api.post("/user/forget-link" ,data)
  }
  async ForgetPassword(data){
    return Api.post("/user/forget-password" ,data )
  }
  async emailVerify(data){
    return Api.post("/user/verify-email", data);
  }
  async ResetPassword(data) {
    return Api.post("/user/reset-password", data);
  }
  async ProfileUpdate(data) {
    return Api.post("/user/update-profile", data);
  }
  async ReviewUserGet(data) {
    return Api.get("/student/review", data);
  }

  async PaymentUser() {
    return Api.get("/student/payment", );
  }

  async homeTeacher() {
    return Api.get("/home/teacher", );
  }

  async HomeTeacherVideo(){
    return Api.get("/home/teacher/video")
  }

  async TeacherBank(data){
    return Api.post("/teacher/bank" ,data)
  }
  async StudentTeacher(data) {
    return Api.get("/student/teacherGet", data);
  }

  async TeachergetbyId(data) {
    return Api.get(`/student/teacher/${data}`);
  }

  async studentteacherAvaliability(id){
    return Api.get(`/student/teacher/availability/${id}`);
  }

  async StudentDashboard() {
    return Api.get("/student/dashboard");
  }
  async StudentfavouriteTeacher(data) {
    return Api.get("/student/favourite/get_all", data);
  }

  async AddWishlist(data) {
    return Api.post("/favourite/add", data);
  }

  async RemoveWishlist(data) {
    return Api.post("/favourite/delete", data);
  }

  async getCountmessage(){
    return Api.get("/message/getAll");
  }
  async MessageGetAll(id){
    return Api.get(`/message/get/${id}`);
  }
  async SendMessage(data){
    return Api.post(`/message/send` , data);
  }

  async BookingUpdate(id,data){
    return Api.post(`/booking/update/${id}`, data);
  }

  async PaypalCreate(data){
    return Api.post(`/payment/create-order` , data);
  }

  async PaypalApprove(data){
    return Api.post(`/payment/capture-order` , data);
  }

  async PaypalCancel(data){
    return Api.post(`/payment/cancel-order` , data);
  }


  // async Stripe_payment(data) {
  //   return Api.post("/payment/create-checkout-session", data);
  // }

    async Stripe_payment(data) {
    return Api.post("/payment/create-payment-intent", data);
  }
  
    async stripe_webhook(data) {
    return Api.post("/webhook", data);
  }
  async StripeSuccess(data) {
    return Api.get(`/payment/payment-success/${data}`);
  }

  async StripeCancel(data) {
    return Api.get(`/payment/payment-cancel/${data}`);
  }

  async LessonAdd(data){
    return Api.post(`/lesson/add`, data);
  }

  async deleteLesson(id){
    return Api.delete(`/lesson/delete/${id}`);
  }

  async LessonUpdate(id,data){
    return Api.put(`/lesson/update/${id}`, data);
  }

  async TeacherLessonGet(){
    return Api.get(`/teacher/lesson/get`);
  }

  async TeacherLessonGetForStudent(id){
    return Api.get(`/student/lesson/get/${id}`);
  }

  async TeacherAvailabilityGet(){
    return Api.get(`/teacher/availability/get`);
  }
  
  async AddAvailablility(data){
    return Api.post(`/teacher/availability/add`, data);
  }

  async deleteAvailability(id){
    return Api.delete(`/teacher/availability/delete/${id}`);
  }

  async EditAvailability(id,data){
    return Api.put(`/teacher/availability/update/${id}`, data);
  }

  async payoutAdd(data){
    return Api.post(`/teacher/payout`, data);
  }

  async PayoutList(data){
    return Api.get(`/teacher/payout`, data);
  }

  async TeacherEarning(date){
    return Api.get(`/teacher/earning?date=${date}`);
  }

  async TeacherBooking(){
    return Api.get(`/teacher/booking`);
  }
  
  async GetBooking(){
    return Api.get(`/booking/getAll`);
  }

   async teacherbankget(){
    return Api.get(`/teacher/bank`);
  }

  async adminteacherlist(){
    return Api.get(`/admin/teachers`);
  }

  async userBlock(data){
    return Api.post(`/admin/blockuser`, data);
  }

  async approveRejectTeacher(data){
    return Api.post(`/admin/approveteacher`, data);
  }

  async adminStudentList(){
    return Api.get(`/admin/studentlist`);
  }

  async AdminPayoutList(){
    return Api.get(`/admin/payout`);
  }

  async AdminPayoutAction(id, data){
    return Api.post(`/admin/payoutUpdate/${id}`, data);
  }

  async AdminBooking(){
    return Api.get(`/admin/booking`);
  }

 async AdminTeacherData(id){
    return Api.get(`/admin/teacher/${id}`, );
  }

  

  async HomeUpdate(data){
    return ApiallowFile.post(`/home/update` , data);
  }

   async HomeList(){
    return Api.get(`/home/find`);
  }

  async HomeFaqList(){
    return Api.get("/home/faqfind")
  }


async HomeFaqAdd(data){
    return Api.post(`/home/faqAdd` ,data);
  }
   async HomeFaqUpdate(data){
    return Api.post(`/home/faqUpdate` ,data);
  }

  async HomeFaqDelete(data){
    return Api.post(`/home/delete` ,data);
  }
  

  async TeacherFaqAdd(data){
    return Api.post(`/teacher/faqAdd` ,data);
  }

   async TeacherFaqList(){
    return Api.get("/teacher/faqfind")
  }
   async TeacherFaqUpdate(data){
    return Api.post(`/teacher/faqUpdate` ,data);
  }

  async TeacherFaqDelete(data){
    return Api.post(`/teacher/delete` ,data);
  }
  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listing;