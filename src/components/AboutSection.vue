<!-- <template> contains the HTML deciding how this specific component looks on the page. -->
<template>
  <!-- <section> and <div> are standard HTML tags used to group layout sections together. -->
  <section class="section">
    <h2>About Me</h2>
    <p class="bio">
      Hi! I'm Jane, a frontend developer who loves building
      clean, simple, and useful websites. I'm currently learning
      Vue.js and enjoying every step of the journey.
    </p>
    <div class="skills">

      <!--
        v-for="skill in skills": Like a regular for-loop, this tells Vue to repeat this <span>
        for every item inside the 'skills' array defined in our <script> below.
        We temporarily refer to the current item as 'skill'.

        :key="skill": Vue needs a unique identifier for every item in a loop.
        Since each skill in our array is a unique string (like 'html', 'JavaScript'),
        we can just use the string itself as the key!
      -->
      <span
        v-for="skill in skills"
        :key="skill"
        class="skill-tag"
      >
        <!-- The curly braces {{ }} inject the value of the current 'skill' variable straight into HTML -->
        {{skill}}
      </span>
    </div>
  </section>
</template>



<!-- <script setup> is where we write all our JavaScript logic. -->
<script setup>

// We use 'const' here because 'skills' is strictly our array of data, and we don't want to accidentally
// overwrite it with a completely different data type later.
// Note that we use square brackets [] to create an Array (a list of items).
// Inside the array, we have a list of simple Strings holding our skills.
const skills = ['html', 'JavaScript', 'SQL', 'Git', 'Vue 3']

</script>

<style scoped>

.section {

  /* FULL SCREEN HEIGHT */
  /*
  GOAL:
  The section should take at least the full height of the screen.

  THINK:
  - What unit represents viewport height?
  - How do we make something take a minimum height instead of fixed height?

  WRITE THE COMPLETE DECLARATION.
  */


  /* INNER SPACING */
  /*
  GOAL:
  Add large vertical spacing and medium horizontal spacing inside the section.

  THINK:
  - What property controls inner space?
  - How does shorthand spacing syntax work?
  - Which value controls top/bottom? Which controls left/right?
  */


  /* BACKGROUND USING A CSS VARIABLE */
  /*
  GOAL:
  Apply the light theme background color using a CSS variable.

  THINK:
  - How do we access a CSS custom property?
  - What function allows us to use variables?
  */


  /* ENABLE FLEXBOX */
  /*
  GOAL:
  Turn this container into a flex container.

  THINK:
  - What property activates flexbox?
  */


  /* STACK ITEMS VERTICALLY */
  /*
  GOAL:
  Children should stack top-to-bottom.

  THINK:
  - What controls main axis direction?
  */


  /* CENTER CONTENT ALONG MAIN AXIS */
  /*
  GOAL:
  Content should be centered vertically inside the full-height section.

  THINK:
  - In column direction, what property controls vertical alignment?
  */

}



/* ========================================= */
/* SECTION TITLE                            */
/* ========================================= */

h2 {

  /*
  GOAL:
  Make this heading significantly larger using rem units.

  THINK:
  - What property changes text size?
  - If 1rem = 16px, what would double that be?
  */


  /*
  GOAL:
  Make the text bold using numeric font-weight.

  THINK:
  - What value range represents bold weights?
  */


  /*
  GOAL:
  Apply the dark theme text color using a variable.
  */


  /*
  GOAL:
  Add spacing below this heading.
  */
}



/* ========================================= */
/* BIO PARAGRAPH                            */
/* ========================================= */

.bio {

  /*
  GOAL:
  Keep text at default readable size using rem.
  */


  /*
  GOAL:
  Apply muted theme color.
  */


  /*
  GOAL:
  Improve readability by increasing spacing between lines.

  THINK:
  - What property controls vertical text rhythm?
  */


  /*
  GOAL:
  Prevent paragraph from stretching too wide.

  THINK:
  - What property sets maximum width instead of fixed width?
  */


  /*
  GOAL:
  Add larger spacing below paragraph.
  */
}



/* ========================================= */
/* SKILLS CONTAINER                         */
/* ========================================= */

.skills {

  /*
  GOAL:
  Arrange skill tags horizontally.
  */


  /*
  GOAL:
  Allow them to wrap onto the next line when needed.
  */


  /*
  GOAL:
  Add space between skill tags without using margin.
  */


  /*
  GOAL:
  Prevent container from becoming too wide.
  */
}



/* ========================================= */
/* SKILL TAG                                */
/* ========================================= */

.skill-tag {

  /*
  GOAL:
  Add internal spacing to create a badge look.
  */


  /*
  GOAL:
  Apply white background using variable.
  */


  /*
  GOAL:
  Add thin solid border using theme border variable.
  */


  /*
  GOAL:
  Make edges rounded to create a pill shape.
  */


  /*
  GOAL:
  Slightly reduce text size compared to normal paragraph text.
  */


  /*
  GOAL:
  Apply dark theme color.
  */


  /*
  GOAL:
  Use medium font weight between normal and bold.
  */

}

</style>