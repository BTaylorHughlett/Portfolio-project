<template>
  <section id="contact">
    <h2>Contact Me</h2>
    <!-- <form> groups all our inputs together so we can submit them at once -->
    <form>
      <!-- <label> tells the user what the input is for. `for="name"` connects it to the input with `id="name"` -->
      <label for="name">Name</label>
      
      <!-- <input> creates a typing field. -->
      <!-- v-model keeps `form.name` in sync with whatever the user types here in real time! -->
      <input id="name" type="text" v-model="form.name" placeholder="Your name" />
      
      <label for="email">Email</label>
      <!-- `type="email"` gives us a special email keyboard on mobile and does basic validation -->
      <input id="email" type="email" v-model="form.email" placeholder="your@email.com" />
      
      <label for="message">Message</label>
      <!-- <textarea> is for multi-line text (like paragraphs). `rows="5"` makes it 5 lines tall. -->
      <textarea id="message" rows="5" v-model="form.message" placeholder="Your message..."></textarea>
      
      <!-- <button type="submit"> triggers the form submission when clicked -->
      <button type="submit">Send Message</button>
    </form>
    <!-- 
      <pre> keeps exact formatting. 
      {{ form }} prints the live value of the 'form' variable from the script onto the screen.
      Handy for learning! Shows what v-model is capturing in real time.
      You can remove this once you understand how it works.
    -->
    <pre>{{ form }}</pre>
  </section>
</template>
<script setup>
import { ref } from 'vue'


// =========================================
// ref() — makes our data "reactive".
// When these values change as the user types, Vue updates the page automatically.
//
// We store name, email, and message all inside one `form` object for neatness.
// They start as empty strings `''` because the form starts empty.
// =========================================
const form = ref({
  name: '',
  email: '',
  message: ''
})
</script>

<style scoped>

/* ========================================= */
/* CONTACT FORM CONTAINER                    */
/* ========================================= */
#contact {
  /*
  GOAL: Limit the width of the form (e.g., max-width 400px) so it doesn't look stretched.
  */


  /*
  GOAL: Center the form block on the page.
  THINK: What horizontal margin value automatically centers block elements?
  */


  /*
  GOAL: Add breathing room inside the form container with padding.
  */


  /*
  GOAL: Give the container a very light gray background.
  */


  /*
  GOAL: Slightly round the corners of the container.
  THINK: What property rounds borders?
  */


  /*
  GOAL: Add a subtle drop shadow to make the form pop out from the background.
  THINK: Property relates to shadow on a box...
  */

}

/* ========================================= */
/* TITLES (<h2>)                             */
/* ========================================= */
h2 {
  /*
  GOAL: Center the title text.
  THINK: What property aligns text inside a container?
  */


  /*
  GOAL: Change the title color to a dark gray.
  */

}

/* ========================================= */
/* THE FORM TAG (<form>)                     */
/* ========================================= */
form {
  /*
  GOAL: Use flexbox to organize the form fields.
  */


  /*
  GOAL: Stack the labels and inputs vertically (top-to-bottom).
  */


  /*
  GOAL: Add a gap between the stacked elements.
  */

}

/* ========================================= */
/* LABELS                                    */
/* ========================================= */
label {
  /*
  GOAL: Make the label text bold.
  */


  /*
  GOAL: Give the label text a dark gray color.
  */

}

/* ========================================= */
/* INPUTS & TEXTAREA                         */
/* ========================================= */
input, textarea {
  /*
  GOAL: Add internal padding to make the text boxes taller and easier to click.
  */


  /*
  GOAL: Add a light gray solid border (e.g., 1px solid #ccc).
  */


  /*
  GOAL: Slightly round the corners.
  */


  /*
  GOAL: Make the text inside a bit larger for readability.
  */

}

/*
  GOAL: Style the input and textarea when the user is actively typing in them (the 'focus' state).
*/
input:focus, textarea:focus {
  /*
  GOAL: Remove the default browser outline highlight.
  THINK: What property removes the outline?
  */


  /*
  GOAL: Change the border color to green so the user knows they are typing in it.
  */


  /*
  GOAL: Optionally add a green drop shadow.
  */

}

/* ========================================= */
/* SUBMIT BUTTON                             */
/* ========================================= */
button {
  /*
  GOAL: Add padding to make the button larger.
  */


  /*
  GOAL: Give the button a bright green background.
  */


  /*
  GOAL: Change the text inside the button to white.
  */


  /*
  GOAL: Remove the default CSS border from the button.
  */


  /*
  GOAL: Slightly round the corners.
  */


  /*
  GOAL: Make the text inside larger.
  */


  /*
  GOAL: Change the mouse cursor so it turns into a pointing hand when hovering over it.
  THINK: Property relates to the cursor...
  */


  /*
  GOAL: Make the background color transition smoothly over 0.2 seconds.
  */

}

/*
  GOAL: When the button is hovered over, slightly change the background color.
*/
button:hover {

}

/* ========================================= */
/* PREFORMATTED TAG (<pre>)                  */
/* ========================================= */
pre {
  /*
  GOAL: Add some top margin to distance it from the form.
  */


  /*
  GOAL: Give it a dark background and hacker-green text.
  */


  /*
  GOAL: Add padding and rounded corners.
  */

}

</style>
