<template>
  <section class="portfolio-manager" id="portfolio-manager">
    <div class="pm-header">
      <h2>Portfolio Manager</h2>
      <p>
        A beginner-friendly CRUD example that connects this Vue app to a monday.com board. It reads, create, update, and delete portfolio items!
      </p>
    </div>

    <div class="pm-layout">
      <!-- Left panel - the form -->
      <div class="pm-panel pm-form-panel">
        <h3>
          {{ isEditing ? "Edit Portfolio Item" : "Create Portfolio Item" }}
        </h3>
        <p class="pm-helper-text">
          This form only uses these fields: title, description, tech stack,
          status, GitHub link, and image URL.
        </p>

        <form class="pm-form" @submit.prevent="handleSubmit">
          <label>
            <span>Project Title</span>
            <input
              v-model.trim="form.title"
              type="text"
              placeholder="Example: Mood Bloom"
              required
            />
          </label>

          <label>
            <span>Description</span>
            <textarea
              v-model.trim="form.description"
              rows="5"
              placeholder="Write a simple description of the project"
            />
          </label>

          <label>
            <span>Tech Stack</span>
            <input
              v-model.trim="form.techStack"
              type="text"
              placeholder="Example: Vue, Node.js, PostgreSQL"
            />
          </label>

          <label>
            <span>Status</span>
            <input
              v-model.trim="form.status"
              type="text"
              placeholder="Example: Working on it"
            />
          </label>

          <label>
            <span>GitHub Link</span>
            <input
              v-model.trim="form.githubLink"
              type="text"
              placeholder="Example: https://github.com/your-name/project"
            />
          </label>

          <label>
            <span>Image URL</span>
            <input
              v-model.trim="form.imageUrl"
              type="text"
              placeholder="Example: https://images.example.com/project.png"
            />
          </label>

          <div class="pm-button-row">
            <button type="submit" :disabled="isBusy">
              {{
                isBusy
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Item"
              }}
            </button>
            <button
              v-if="isEditing"
              type="button"
              class="pm-secondary"
              @click="resetForm"
              :disabled="isBusy"
            >
              Cancel Edit
            </button>
          </div>
        </form>
      </div>

      <!-- Right panel - the list of Portfolio Items -->
      <div class="pm-panel pm-list-panel">
        <div class="pm-list-header">
          <div>
            <h3>Portfolio Items</h3>
            <p class="pm-helper-text">
              Reading directly from your monday.com board.
            </p>
          </div>
          <button class="pm-secondary" @click="loadItems" :disabled="isBusy">
            {{ isBusy ? "Working..." : "Refresh List" }}
          </button>
        </div>

        <p v-if="message" class="pm-message">{{ message }}</p>
        <p v-if="errorMessage" class="pm-error">{{ errorMessage }}</p>
        <div v-if="isLoading" class="pm-loading">
          Loading portfolio items...
        </div>
        <div v-else-if="items.length === 0" class="pm-empty">
          No portfolio items found yet. Create your first item using the form.
        </div>

        <div v-else class="pm-card-list">
          <article v-for="item in items" :key="item.id" class="pm-card">
            <div class="pm-card-top">
              <div>
                <h4>{{ item.title }}</h4>
                <p class="pm-status">
                  Status: {{ item.status || "No status yet" }}
                </p>
              </div>
              <div class="pm-card-actions">
                <button
                  class="pm-secondary"
                  @click="startEdit(item)"
                  :disabled="isBusy"
                >
                  Edit
                </button>
                <button
                  class="pm-danger"
                  @click="handleDelete(item)"
                  :disabled="isBusy"
                >
                  Delete
                </button>
              </div>
            </div>

            <p class="pm-description">
              {{ item.description || "No description provided." }}
            </p>
            <ul class="pm-details">
              <li>
                <strong>Tech Stack:</strong>
                {{ item.techStack || "None listed" }}
              </li>
              <li>
                <strong>GitHub Link:</strong>
                {{ item.githubLink || "None listed" }}
              </li>
              <li>
                <strong>Image URL:</strong> {{ item.imageUrl || "None listed" }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * This is where we:
 * - Store state
 * - React to user's actions
 * - call the monday service file
 * - decide what happens when buttons are clicked!
 */
// computed: create a value based on other reactive values
// onMounted: runs code when the component first appears on the page
// reactive: stores our form's objects
// ref: stores simple reactive values arrays, booleans, and strings
import { computed, onMounted, reactive, ref } from "vue";

// TODO Import service file's functions
import { fetchPortfolioItems, createPortfolioItem } from "../services/portfolioMondayClient";
// Let's us use the functions we created in portfolioMondayClient.js here!
import {
  fetchPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "../services/portfolioMondayClient";

/**
 * Reactive State!
 *
 * PortfolioManager, state includes:
 * - portfolio items
 * - loading flags
 * - success/error messages
 * - which items we are editing
 * - the form values
 */
const items = ref([]);
const isLoading = ref(false);
const isBusy = ref(false);
const message = ref("");
const errorMessage = ref("");
const editingItemId = ref("");

// This function gives us a clean, default form shape.
// We use it when the app first loads and anytime we reset the form.
const createEmptyForm = () => ({
  title: "",
  description: "",
  techStack: "",
  status: "",
  githubLink: "",
  imageUrl: ""
  imageUrl: "",
});

// Hold the values from the inputs in the template above
const form = reactive(createEmptyForm());

// isEditing becomes TRUE when editingItemId has a value, otherwise FALSE
//  Control the text of the buttons ("Save Changes", "Create Item", "Cancel Edit")
const isEditing = computed(() => Boolean(editingItemId.value));

// Clears success/error messages BEFORE a new action begins
const resetMessages = () => {
  message.value = "";
  errorMessage.value = "";
};

// Reset the form back to blank values AND returns to CREATE mode.
const resetForm = () => {
  // 1. clears ALL form fields
  Object.assign(form, createEmptyForm());
  // 2. clear the editingItemId
  editingItemId.value = "";
};

/**
 * READ FUNCTION
 * The service file TALKS to monday.com
 * Decide what the UI (what the user sees) should do BEFORE and AFTER that call (API).
 * Specifically:
 * - clear old messages
 * - turn on the loading states
 * - ask the service for items
 * - save those items into the component state
 * - show success or error feedback
 * - turn loading state OFF
 */
const loadItems = async () => {
  resetMessages();
  isLoading.value = true;
  try {
    // Wait for a response from the fetchPortfolioItems function(defined in the /services/portfolioMondayClient.js)
    items.value = await fetchPortfolioItems();
    // Success message!
    message.value = "Yay!! Portfolio items loaded from monday.com!";
  } catch (error) {
    // Error message!
    errorMessage.value = error.message || "Oh no! :( We did not load the items from monday.com!";
    errorMessage.value =
      error.message || "Oh no! :( We did not load the items from monday.com!";
  } finally {
    // Even if it's a success or error, STOP the loading!
    isLoading.value = false;
  }
};

/**
 * UPDATE
 * Loading the values of the item into the form.
 *
 * @param item object that holds the item's data
 */
const startEdit = (item) => {
  resetMessages();

  // Updates the value for editingItemId
  editingItemId.value = item.id;

  // Enters the values of the selected item into the form
  Object.assign(form, {
    title: item.title,
    description: item.description,
    techStack: item.techStack,
    status: item.status,
    githubLink: item.githubLink,
    imageUrl: item.imageUrl,
  });
  message.value = `Loaded "${item.title}" into the form for editing.`;
};

/**
 * CREATE + UPDATE
 * Steps this function takes:
 * - clear messages
 * - set as isBusy = true, since we are currently working with the form
 * - Use try...catch...finally to check for success and error:
 * ---> Try: If we are currently editing a row (UPDATING), run the function that updates the row's data. Otherwise (else), we are CREATING data, so run the createPortfolioItem() function. Then, clear the form's fields (resetForm() function we created above) and reload the items.
 * ---> Catch(error): If an error is returned from either the UPDATE or CREATE API, display it OR display our default error message.
 * ---> Finally: Whether it's a success or error, we want to signal that we are no longer working with the form. We are done. So, set isBusy back to false.
 *
 */
const handleSubmit = async () => {
  resetMessages();
  isBusy.value = true;
  try {
    // Check if we are editing, send the current form values to the update function (DOESNT EXIST YET)
    if (isEditing.value) {
      // TODO Add logic
      await updatePortfolioItem(editingItemId.value, { ...form });
      message.value = "Yippee! Item was successfully edited!";
    }
    // Assuming we creating a new item using the form values
    else {
      await createPortfolioItem({...form});
      message.value = "Yay! Your new item was a successfully added!"
      await createPortfolioItem({ ...form });
      message.value = "Yay! Your new item was a successfully added!";
    }
    // Clear form's fields
    resetForm();
    // Reload items. Using "await" because we want process to stop here and wait for loadItems() function to finish before continuing.
    await loadItems();
  } catch (error) {
    errorMessage.value = error.message || "Oh no! Your new item did not get added.";
    errorMessage.value =
      error.message || "Oh no! Your new item did not get added.";
  } finally {
    isBusy.value = false;
  }
};

// DELETE function!
// Runs the delete function we defined in the portfolioMondayClient.js
const handleDelete = async (item) => {
  // Asks the user if they're certain they want to remove the item
  const userConfirmation = window.confirm(
    `Delete "${item.title}"? This removes the item from monday.com board!!`,
  );

  // If the user cancels, stop here!!
  if (!userConfirmation) {
    return;
  }

  resetMessages();
  isBusy.value = true;

  try {
    await deletePortfolioItem(item.id);
    message.value = "Yay! Portfolio item deleted!";

    // Checks for the case that the user first tried editing the item selected to deleted. If so, clears the form first.
    if (editingItemId.value === item.id) {
      resetForm();
    }
    // Reload the items
    await loadItems();
  } catch (error) {
    errorMessage.value = error.message || "Error! Failed to delete item";
  } finally {
    isBusy.value = false;
  }
};

// Loads the items on load of the component
onMounted(loadItems);
</script>

<style scoped>
.portfolio-manager {
  padding: 2rem;
  background: #f5f7fb;
}
.pm-header {
  max-width: 900px;
  margin: 0 auto 1.5rem;
}
.pm-header h2,
.pm-panel h3,
.pm-card h4 {
  margin-bottom: 0.5rem;
}
.pm-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.pm-panel {
  background: #fff;
  border: 1px solid #d9e0ea;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
}
.pm-form {
  display: grid;
  gap: 1rem;
}
.pm-form label {
  display: grid;
  gap: 0.45rem;
}
.pm-form input,
.pm-form textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #c9d3e0;
  border-radius: 8px;
  font: inherit;
}
.pm-button-row,
.pm-list-header,
.pm-card-top,
.pm-card-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: center;
}
button {
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font: inherit;
  background: #1f4bb3;
  color: white;
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.pm-secondary {
  background: #e8eef9;
  color: #173b89;
}
.pm-danger {
  background: #b42318;
  color: white;
}
.pm-helper-text,
.pm-status,
.pm-message,
.pm-error,
.pm-loading,
.pm-empty,
.pm-description,
.pm-details {
  margin: 0;
}
.pm-message {
  color: #0f7b3e;
  margin-bottom: 1rem;
}
.pm-error {
  color: #b42318;
  margin-bottom: 1rem;
}
.pm-card-list {
  display: grid;
  gap: 1rem;
}
.pm-card {
  border: 1px solid #d9e0ea;
  border-radius: 10px;
  padding: 1rem;
  background: #fbfcff;
}
.pm-details {
  padding-left: 1.2rem;
}
@media (max-width: 900px) {
  .pm-layout {
    grid-template-columns: 1fr;
  }
  .pm-list-header,
  .pm-card-top {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>