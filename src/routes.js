import AddStudent from './components/AddStudent.vue';
import StudentDetails from './components/StudentDetails.vue';
import Address from './components/Address.vue';


const routes = [
    { path: '/students', component: AddStudent },
    { path: '/pay-now', component: StudentDetails },
    { path: '/address', component: Address },


];

export default routes;