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

      for (let i = 0; i < doctorInfo.data[0].practices.length; i++) {
        let address = `<br>${doctorInfo.data[0].practices[i].visit_address.street}<br>${doctorInfo.data[0].practices[i].visit_address.street2}<br>${doctorInfo.data[0].practices[i].visit_address.city}, ${doctorInfo.data[0].practices[i].visit_address.state} ${doctorInfo.data[0].practices[i].visit_address.zip}`;
        let acceptsNewPts;
        if (doctorInfo.data[0].practices[i].accepts_new_patients) {
          acceptsNewPts = "Yes";
        } else {
          acceptsNewPts = "No";
        }
        $(".output").append(`<div class=\"card\"><h4><span class=\"label\">Name (first and last): </span>${doctorInfo.data[0].practices[i].name}</h4><p><span class=\"label\">Phone number: </span>5032161150</p><p><span class=\"label\">Address:</span>${address}</p><p><span class=\"label\">Website: </span>none</p><p><span class=\"label\">Accepting New Patients: </span>${acceptsNewPts}</p></div>`);
      }

    });
  });
});
