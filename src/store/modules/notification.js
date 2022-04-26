export const namespaced = true;

export const state = {
  notifications: [],
};

let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    });
  },
  DELETE(state, notificationToRemove) {
    //creating a new notificiations array by filtering out the one we want to remove
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    );
  },
};

export const actions = {
  add({ commit }, notification) {
    //commits the PUSH mutation taking in the notification as payload
    commit("PUSH", notification);
  },
  remove({ commit }, notificationToRemove) {
    //commits the DELETE mutation taking in the notificationToRemove as payload
    commit("DELETE", notificationToRemove);
  },
};
