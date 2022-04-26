<template>
  <!-- using v-for to make a new notification bar for every notification
passing in the entire notification object as a prop to be used in notification bar  -->
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    NotificationBar,
  },
  //bringing in the notifications state array from the notification module
  computed: mapState("notification", ["notifications"]),
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
