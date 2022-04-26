import axios from "axios";

//creates a single Axios instace for our entire app
const apiClient = axios.create({
  //baseURL for all calls to use
  baseURL: "http://localhost:3000",
  withCredentials: false,
  //authentication/configuration that our API calls will need to communicate
  //with our server
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //throws and error if API call takes longer than 10 seconds:
  timeout: 10000,
});

export default {
  //create a 'getEvents' function which uses API client to get events
  //two paramets for pagination perPage limits how many events will show per page,
  //page is the current page
  //then concatinate our API call url with perPage and page info
  getEvents(perPage, page) {
    //uses baseURL from above to make the get call to 'http://localhost:3000/events'
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  //postEvent takes in the event
  postEvent(event) {
    //then posts it out to this endpoint, which will add it to our mock database
    return apiClient.post("/events", event);
  },
};
