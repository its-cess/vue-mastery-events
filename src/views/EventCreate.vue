<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a Category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="!$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="!$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="!$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <!-- installed/imported datepicker for this -->
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @closed="!$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        label="Select a Time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Datepicker,
  },
  data() {
    //creating a times array
    const times = [];
    //creating a for loop. starting at 1 going to 24.
    //then pushing them into the times array
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    //this is our data. times means the times array we created above
    return {
      times,
      //categories imported from the store so we can use them in the form above
      categories: this.$store.state.categories,
      //for the event data, we are calling a method we define below
      event: this.createFreshEventObject(),
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    createEvent() {
      //makes sure all of our fields are dirty
      this.$v.$touch();
      //if check.. if form is NOT invalid, then submit the form
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            //this pushes the user to the page of the event they just created
            this.$router.push({
              name: "event-show",
              params: { id: this.event.id },
            });
            //this clears our event object after a user sumits it.
            //put it inside of a .then() to make sure that it isn't cleared out if
            //it wasnt successfully sent to the backend
            this.event = this.createFreshEventObject();
          })
          //this will catch any errors and console.log it
          .catch(() => {
            NProgress.done();
          });
      }
    },
    createFreshEventObject() {
      //sets the user to the user that is stored in the state
      const user = this.$store.state.user.user;
      //gives a random id using math floor and math random
      // const id = Math.floor(Math.random() * 10000000);
      const id = this.$store.state.user.id++;
      //then returns this object
      return {
        //id set to the id const we created above
        id: id,
        //user set to the user const we created above
        user: user,
        //creates and sets rest of the categories to null
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
