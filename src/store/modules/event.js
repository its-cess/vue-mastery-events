import EventService from "@/services/EventService.js";

//ensures all mutations, actions, and getters will be namespaced under 'event'
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3,
};

export const mutations = {
  //mutations takes in state and the event object we created in component as payload
  ADD_EVENT(state, event) {
    //takes that event object from component
    //and pushes it to the state events array above^
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  //takes in commit context object and event as the payload
  createEvent({ commit, dispatch }, event) {
    //posts the event out to our mock database and sends in the event
    return EventService.postEvent(event)
      .then(() => {
        //only commits the ADD_EVENT if it posted successfully
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem creating your event: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
    //commits ADD_EVENT mutation and passes along event payload
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message,
        };
        //dispatch('namspace/add action', passing in notification const we just created
        //as payload, { root: true} makes sure it goes to the store, notification, and
        //then add action to be able to call this action)
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters }, id) {
    //using our getter to find the event by ID
    var event = getters.getEventById(id);
    //if we do find (event), then commit the SET_EVENT mutation
    // with the event ID that was found
    if (event) {
      commit("SET_EVENT", event);
      return event;
    }
    //if there was no event found by ID, then fetch it with the API call
    else {
      //call our service function sending in the event id
      return EventService.getEvent(id).then((response) => {
        //when it responds, we will set our data=to our event
        commit("SET_EVENT", response.data);
        return response.data;
      });
    }
  },
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
