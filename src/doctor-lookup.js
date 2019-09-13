export function getDoctorInfo(query) {
  return new Promise(function(resolve, reject) {
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=or-portland&user_location=37.773%2C-122.413&skip=0&limit=25&user_key=${process.env.exports.apiKey}`;
    let request = new XMLHttpRequest();
    request.onload = function() {
      if(this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}
