import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Profile from '../views/profile/ProfileDetail.vue'

import Announcement from '../views/announcement/Announcement.vue'
import AnnouncementForm from '../views/announcement/AnnouncementForm.vue'
import AdminAnnouncement from '../views/announcement/AdminAnnouncement.vue'
import AnnouncementDetail from '@/views/announcement/AnnouncementDetail.vue'

import QualificationsQuestion from '../views/qualifications-question/QualificationsQuestion.vue'
import AdminQualificationsQuestion from '../views/qualifications-question/AdminQualificationsQuestion.vue'
import QualificationsQuestionForm from '../views/qualifications-question/QualificationsQuestionForm.vue'
import QualiticationsQuestionEdit from '@/views/qualifications-question/QualiticationsQuestionEdit.vue'

import StudentLoanRequestRecord from '../views/student-loan-request-record/SLRequestRecord.vue'
import StudentLoanRequestRecordForm from '../views/student-loan-request-record/SLRequestRecordForm.vue'
import StudentLoanRequestRecordDetail from '../views/student-loan-request-record/SLRequestRecordDetail.vue'
import AdminStudentLoanRequestRecord from '../views/student-loan-request-record/AdminSLRequestRecord.vue'
import AdminStudentLoanRequestRecordDetail from '../views/student-loan-request-record/AdminSLRequestRecordDetail.vue'

import VolunteerActivityHoursRecord from '../views/volunteer-activity-hours-record/VolunteerActivityHoursRecord.vue'
import VolunteerActivityHoursRecordForm from '../views/volunteer-activity-hours-record/VolunteerActivityHoursRecordForm.vue'
import VolunteerActivityHoursRecordDetail from '../views/volunteer-activity-hours-record/VolunteerActivityHoursRecordDetail.vue'
import VolunteerActivityHoursRecordDoc from '../views/volunteer-activity-hours-record/VolunteerActivityHoursRecordDoc.vue'
import AdminVolunteerActivityHoursRecord from '../views/volunteer-activity-hours-record/AdminVolunteerActivityHoursRecord.vue'
import AdminVolunteerActivityHoursRecordDetail from '@/views/volunteer-activity-hours-record/AdminVolunteerActivityHoursRecordDetail.vue'

import middleware from './middleware'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: middleware
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    beforeEnter: middleware
  },
  {
    path: '/announcement',
    name: 'announcement',
    component: Announcement,
    beforeEnter: middleware
  },
  {
    path: '/admin/announcement',
    name: 'admin-announcement',
    component: AdminAnnouncement,
    beforeEnter: middleware
  },
  {
    path: '/admin/announcement/create',
    name: 'admin-announcement-form',
    component: AnnouncementForm,
    beforeEnter: middleware
  },
  {
    path: '/admin/announcement/:id',
    name: 'admin-announcement-detail',
    component: AnnouncementDetail,
    beforeEnter: middleware
  },
  {
    path: '/qualifications-question',
    name: 'qualifications-question',
    component: QualificationsQuestion,
    beforeEnter: middleware
  },
  {
    path: '/admin/qualifications-question',
    name: 'admin-qualifications-question',
    component: AdminQualificationsQuestion,
    beforeEnter: middleware
  },
  {
    path: '/admin/qualifications-question/create',
    name: 'qualifications-question-form',
    component: QualificationsQuestionForm,
    beforeEnter: middleware
  },
  {
    path: '/admin/qualifications-question/:id',
    name: 'qualifications-question-edit',
    component: QualiticationsQuestionEdit,
    beforeEnter: middleware
  },
  {
    path: '/student-loan-request-record',
    name: 'student-loan-request-record',
    component: StudentLoanRequestRecord,
    beforeEnter: middleware
  },
  {
    path: '/student-loan-request-record/create',
    name: 'student-loan-request-record-form',
    component: StudentLoanRequestRecordForm,
    beforeEnter: middleware
  },
  {
    path: '/student-loan-request-record/:id',
    name: 'student-loan-request-record-detail',
    component: StudentLoanRequestRecordDetail,
    beforeEnter: middleware
  },
  {
    path: '/admin/student-loan-request-record',
    name: 'admin-student-loan-request-record',
    component: AdminStudentLoanRequestRecord,
    beforeEnter: middleware
  },
  {
    path: '/admin/student-loan-request-record/:id',
    name: 'admin-student-loan-request-record-detail',
    component: AdminStudentLoanRequestRecordDetail,
    beforeEnter: middleware
  },
  {
    path: '/volunteer-activity-hours-record',
    name: 'volunteer-activity-hours-record',
    component: VolunteerActivityHoursRecord,
    beforeEnter: middleware
  },
  {
    path: '/volunteer-activity-hours-record/create',
    name: 'volunteer-activity-hours-record-form',
    component: VolunteerActivityHoursRecordForm,
    beforeEnter: middleware
  },
  {
    path: '/volunteer-activity-hours-record/:id',
    name: 'volunteer-activity-hours-record-detail',
    component: VolunteerActivityHoursRecordDetail,
    beforeEnter: middleware
  },
  {
    path: '/volunteer-activity-hours-record-doc/:id',
    name: 'volunteer-activity-hours-record-doc',
    component: VolunteerActivityHoursRecordDoc,
    beforeEnter: middleware
  },
  {
    path: '/admin/volunteer-activity-hours-record',
    name: 'admin-volunteer-activity-hours-record',
    component: AdminVolunteerActivityHoursRecord,
    beforeEnter: middleware
  },
  {
    path: '/admin/volunteer-activity-hours-record/:id',
    name: 'admin-volunteer-activity-hours-record-detail',
    component: AdminVolunteerActivityHoursRecordDetail,
    beforeEnter: middleware
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
