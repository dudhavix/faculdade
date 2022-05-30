import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:3030/"
});

export default {
    login: () => {
        return http.get(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Foauth2callback&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.heart_rate.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.body_temperature.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.nutrition.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.body.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.activity.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.location.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.blood_glucose.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.reproductive_health.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.sleep.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.blood_pressure.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.oxygen_saturation.read&client_id=987882199766-i0n7dhevjdfhv5dggffecdivqa16ms6q.apps.googleusercontent.com`)
    },
}