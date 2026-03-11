<template>
  <!--
    =========================================
    SERIES 2 — SidePanel.vue (NEW FILE)
    =========================================
    This is our first separate component!
    It lives on the left side of the screen
    and holds our navigation links.

    New concepts in this file:
    - defineProps: receives data from App.vue
    - v-for: renders a list of nav items automatically
    - :class binding: adds "active" class based on a condition
    - :href binding: sets the href from our data
  -->
  <aside class="side-panel">

    <!-- Site owner name and role -->
    <div class="panel-title">Jane Doe</div>
    <div class="panel-subtitle">Portfolio</div>

    <!-- 
      v-for loops through our navItems array below
      and creates one <li> for each item automatically.
      If we add a new item to navItems, a new link appears — no extra HTML needed!
    -->
    <nav>
      <ul class="nav-list">
        <li v-for="item in navItems" :key="item.id">
          <!-- 
            =========================================
            Dynamic Bindings (Vue Magic) Explained:
            =========================================
            Vue uses data from our script to build the HTML. 
            For example, if `item.id` is 'about', Vue translates this template:
            
            <a :href="item.href" :class="{ active: activeSection === item.id }">
              {{ item.label }}
            </a>
            
            Into this standard HTML that the browser understands 
            (assuming the current activeSection is also 'about'):
            
            <a href="#about" class="active">
              About
            </a>

            How it works:
            1. :href -> The colon tells Vue to read the value from our data array.
            2. :class -> Adds the 'active' CSS class ONLY if the condition is true.
            3. {{ }} -> Outputs the actual text (like "About") onto the screen.
          -->
          <a
            :href="item.href"
            :class="{ active: activeSection === item.id }"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

  </aside>
</template>


<script setup>
// =========================================
// PROPS — Data passed in from App.vue
// =========================================
// App.vue tells us which section is currently
// visible so we can highlight the right nav link.
// 
// defineProps "registers" custom attributes (props) that parent components
// can pass down to this child component.
// Here we are expecting a property named "activeSection" that is a String.
// If the parent forgets to pass it, we default to 'hero'.
defineProps({
  activeSection: {
    type: String,
    default: 'hero'
  }
})

// =========================================
// NAV ITEMS — The data that v-for loops through
// =========================================
// Add or remove items here and the nav updates automatically!
const navItems = [
  { id: 'hero',     label: 'Home',     href: '#hero' },
  { id: 'about',    label: 'About',    href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact',  label: 'Contact',  href: '#contact' },
]
</script>

<style scoped>

/* ========================================= */
/* THE SIDE PANEL CONTAINER                  */
/* ========================================= */
.side-panel {
  /*
  GOAL: Give the panel a dark blue/gray background color.
  THINK: What property changes the color behind the text?
  */


  /*
  GOAL: Make the text inside the panel white by default.
  THINK: What property changes the color of text?
  */


  /*
  GOAL: Add breathing room inside the panel (e.g. 2rem top/bottom, 1.5rem left/right).
  THINK: Which property adds space inside an element's border?
  */


  /*
  GOAL: Assure the panel stretches the full height of the screen.
  THINK: What property ensures a minimum height? What viewport unit represents 100% height?
  */


  /*
  GOAL: Turn on flexbox mode to stack things easily.
  THINK: What display value enables flexbox?
  */


  /*
  GOAL: Stack the title and navigation links vertically (top-to-bottom).
  THINK: What flex direction makes items flow from top to bottom?
  */


  /*
  GOAL: Add a nice gap between the title and the links.
  */

}

/* ========================================= */
/* PANEL TITLE                               */
/* ========================================= */
.panel-title {
  /*
  GOAL: Make the title text large using rem units.
  */


  /*
  GOAL: Make the text bold.
  */

}

/* ========================================= */
/* PANEL SUBTITLE                            */
/* ========================================= */
.panel-subtitle {
  /*
  GOAL: Make the subtitle text a little smaller (e.g., normal paragraph size).
  */


  /*
  GOAL: Make the text a light gray color so it doesn't stand out as much as the title.
  */

}

/* ========================================= */
/* NAVIGATION LIST (<ul>)                    */
/* ========================================= */
.nav-list {
  /*
  GOAL: Remove the default bullet points from the list.
  THINK: Which list-style property removes bullets?
  */


  /*
  GOAL: Remove default browser padding and margin.
  */


  /*
  GOAL: Use flexbox and a column direction to stack the links vertically.
  */


  /*
  GOAL: Add a small gap between the individual links.
  */

}

/* ========================================= */
/* LINKS (<a>)                               */
/* ========================================= */
a {
  /*
  GOAL: Remove the default blue underline from the links.
  THINK: What text property controls underlines?
  */


  /*
  GOAL: Change the link text color to white or light gray.
  */


  /*
  GOAL: Make the link behave like a block element so padding works correctly.
  */


  /*
  GOAL: Add padding to make the link a larger, easier-to-click target.
  */


  /*
  GOAL: Slightly round the corners of the links.
  */


  /*
  GOAL: Tell the browser to smoothly transition the background color over 0.2s.
  THINK: What property allows you to animate a change?
  */

}

/*
  GOAL: When the user hovers over a link, change its background color to a slightly lighter dark-gray.
  THINK: What pseudo-class is used for hover states?
*/
a:hover {

}

/*
  GOAL: When the link has the "active" class, give it a bright green background and make the text bold.
*/
a.active {

}

</style>