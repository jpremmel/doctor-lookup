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

      for (let i = 0; i < doctorInfo.data.length; i++) {
          let name = `${doctorInfo.data[i].profile.first_name} ${doctorInfo.data[i].profile.middle_name} ${doctorInfo.data[i].profile.last_name}, ${doctorInfo.data[i].profile.title}`;
          let practices = [];
          for (let j = 0; j < doctorInfo.data[i].practices.length; j++) {
            let practiceName = doctorInfo.data[i].practices[j].name;
            let practicePhone = doctorInfo.data[i].practices[j].phones[0].number;
            let practiceAddress;
            if (doctorInfo.data[i].practices[j].visit_address.street2) {
              practiceAddress = `<br>${doctorInfo.data[i].practices[j].visit_address.street}<br>${doctorInfo.data[i].practices[j].visit_address.street2}<br>${doctorInfo.data[i].practices[j].visit_address.city}, ${doctorInfo.data[i].practices[j].visit_address.state} ${doctorInfo.data[i].practices[j].visit_address.zip}`;
            } else {
              practiceAddress = `<br>${doctorInfo.data[i].practices[j].visit_address.street}<br>${doctorInfo.data[i].practices[j].visit_address.city}, ${doctorInfo.data[i].practices[j].visit_address.state} ${doctorInfo.data[i].practices[j].visit_address.zip}`;
            }
            let practiceWebsite;
            if (doctorInfo.data[i].practices[j].website) {
              practiceWebsite = doctorInfo.data[i].practices[j].website;
            } else {
              practiceWebsite = "No website listed";
            }
            let acceptsNewPts;
            if (doctorInfo.data[i].practices[j].accepts_new_patients) {
              acceptsNewPts = "Yes";
            } else {
              acceptsNewPts = "No";
            }
            practices.push(`<br><strong>${practiceName}</strong><br>${practicePhone}<br>${practiceAddress}<br>${practiceWebsite}<br>Accepting New Patients: ${acceptsNewPts}`);
          }

          let practiceNames = practices.join("<br> ");

          $(".output").append(`<div class="card"><h4><span class="label">Name: </span>${name}</h4><p>${practiceNames}</p></div>`);
      }

    });
  });
});
