import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { getDoctorInfo } from './doctor-lookup.js';

$(document).ready(function() {
  $("#doctor-lookup").submit(function(event) {
    event.preventDefault();
    $(".output").text("");
    let query = $("#query").val().split(" ").join("-");
    let doctorPromise = getDoctorInfo(query);
    doctorPromise.then(function(response) {
      const doctorInfo = JSON.parse(response);
      for (let i = 0; i < doctorInfo.data.length; i++) {
        let name;
        if (doctorInfo.data[i].profile.middle_name) {
            name = `${doctorInfo.data[i].profile.first_name} ${doctorInfo.data[i].profile.middle_name} ${doctorInfo.data[i].profile.last_name}, ${doctorInfo.data[i].profile.title}`;
          } else {
            name = `${doctorInfo.data[i].profile.first_name} ${doctorInfo.data[i].profile.last_name}, ${doctorInfo.data[i].profile.title}`;
          }
          let practices = [];
          for (let j = 0; j < doctorInfo.data[i].practices.length; j++) {
            let practiceName = doctorInfo.data[i].practices[j].name;
            let phoneArray = doctorInfo.data[i].practices[j].phones[0].number.split("");
            let practicePhone = `(${phoneArray.splice(0, 3).join("")}) ${phoneArray.splice(0, 3).join("")}-${phoneArray.join("")} `;
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
            practices.push(`<p><span class="practice">${practiceName}</span><br><span class="label">Phone:</span> ${practicePhone}<br><span class="label">Address:</span>${practiceAddress}<br><span class="label">Website:</span> ${practiceWebsite}<br><span class="label">Accepting New Patients:</span> ${acceptsNewPts}</p>`);
          }
          let practiceNames = practices.join("<br> ");
          $(".output").append(`<div class="card"><h3>${name}</h3><p>${practiceNames}</p></div>`);
      }
    });
    $(".output").show();
  });
});
