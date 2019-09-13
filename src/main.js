import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { getDoctorInfo } from './doctor-lookup.js';

$(document).ready(function() {
  $("#doctor-lookup").submit(function(event) {
    event.preventDefault();
    let query = $("#query").val();
    let doctorPromise = getDoctorInfo(query);
    doctorPromise.then(function(response) {
      const doctorInfo = JSON.parse(response);

      console.log(doctorInfo);
    });
  });
});
