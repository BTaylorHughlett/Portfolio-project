/**
 * "service layer" for the Portfolio Manager component.
 * This file will handle the "talking" to monday.com for us
 * - PortfolioManager.vue handles the screen and user interaction
 * - This file handles talking to monday.com
 * - Keeps us organized!
 */
// endpoint!
const MONDAY_API_URL = "https://api.monday.com/v2";

// Setting up values from .env file
const config = {
  token: import.meta.env.VITE_MONDAY_TOKEN,
  boardId: import.meta.env.VITE_MONDAY_BOARD_ID,
  columns: {
    description: import.meta.env.VITE_MONDAY_DESCRIPTION_COLUMN_ID,
    techStack: import.meta.env.VITE_MONDAY_TECH_STACK_COLUMN_ID,
    status: import.meta.env.VITE_MONDAY_STATUS_COLUMN_ID,
    githubLink: import.meta.env.VITE_MONDAY_GITHUB_LINK_COLUMN_ID,
    imageUrl: import.meta.env.VITE_MONDAY_IMAGE_URL_COLUMN_ID,
  },
};

// Function to ensure the values within .env file exist before any request runs
const ensureConfig = () => {
  /**
   *  ([, value]) means "ignore the first part, grab only the second part"
   * So:
   * [, value] is deconstructing an array with two items and skipping the first item
   * Example:
   * ["VITE_MONDAY_TOKEN", config.token]
   * first part: "VITE_MONDAY_TOKEN"
   * second part: "abc123"
   *
   * !value
   * If value is missing, null, or undefined, then !value is true
   */
  const missingValues = [
    ["VITE_MONDAY_TOKEN", config.token],
    ["VITE_MONDAY_BOARD_ID", config.boardId],
    ["VITE_MONDAY_DESCRIPTION_COLUMN_ID", config.columns.description],
    ["VITE_MONDAY_TECH_STACK_COLUMN_ID", config.columns.techStack],
    ["VITE_MONDAY_STATUS_COLUMN_ID", config.columns.status],
    ["VITE_MONDAY_GITHUB_LINK_COLUMN_ID", config.columns.githubLink],
    ["VITE_MONDAY_IMAGE_URL_COLUMN_ID", config.columns.imageUrl],
  ].filter(([, value]) => !value);

  if (missingValues.length > 0) {
    /**
     * Example:
     * missingValues = [
     *     ["VITE_MONDAY_TOKEN", config.token],
     *     ["VITE_MONDAY_BOARD_ID", config.boardId]
     * ]
     * To:
     * "VITE_MONDAY_TOKEN, VITE_MONDAY_BOARD_ID..."
     */
    const missingValueName = missingValues.map(([name]) => name).join(", ");
    throw new Error(
      `Missing monday.com setup values: ${missingValueName}. Check your .env file!`,
    );
  }
};

// Generic helper that send a query or mutation to monday.com
// This will help keep the CRUD functions smaller and easier to read
const makeRequest = async (query, variables = {}) => {
  ensureConfig();

  const response = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: config.token,
    },
    body: JSON.stringify({ query, variables }),
  });

  // Create JavaScript object we can use
  const json = await response.json();

  // Capture any HTTP errors (e.g. 404, 401, 500, etc)
  if (!response.ok) {
    throw new Error(
      `Yikes! monday.com request failed with the status: ${response.status}`,
    );
  }

  // Capture GraphQL errors
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
};

// TO BE USED IN THE CREATE AND UPDATE FUNCTIONS!!
// We'll reference this later!
/**
 * Our Vue component (PortfolioManager.vue) uses a simple object shape that makes sense to us. BUT to monday.com it expects the data in it's own format.
 *
 * Basically, this function acts like a translator! Takes our app's data and reshapes it into the structure monday wants.
 */
const toColumnValuesObject = (item) => ({
  [config.columns.description]: item.description || "",
  [config.columns.techStack]: item.techStack || "",
  [config.columns.githubLink]: item.githubLink || "",
  [config.columns.imageUrl]: item.imageUrl || "",
  [config.columns.status]: item.status ? { label: item.staus } : {},
});

/**
 * Translates monday.com's response into a cleaner object that the Vue component can use :)
 * This is another kind of translator:
 * - the last function translated app data into API data
 * - this one translates API data BACK into app data
 */
const mapColumnsValues = (columnValues = []) => {
  /**
   * Example:
   * [
   *  ["abc", "Hello"],
   *  ["def", "World"],
   * ]
   *
   * Becomes:
   * {
   *  abc: "Hello",
   *  def: "World"
   * }
   */
  const valueById = Object.fromEntries(
    columnValues.map((column) => [column.id, column.text || ""]),
  );

  return {
    description: valueById[config.columns.description] || "",
    techStack: valueById[config.columns.techStack] || "",
    status: valueById[config.columns.status] || "",
    githubLink: valueById[config.columns.githubLink] || "",
    imageUrl: valueById[config.columns.imageUrl] || "",
  };
};

/**
 * READ
 * Function to handle returning data from monday.com to display to the user!
 */
export const fetchPortfolioItems = async () => {
  const query = `
    query GetPortfolioItems($boardId: [ID!]) {
      boards(ids: $boardId) {
        items_page {
          items {
            id
            name
            column_values {
              id
              text
            }
          }
        }
      }
    }
  `;

  // Create a new data const that captures the response of the API request (makeRequest(query, variables = {})) by passing it the query we defined above and the boardId value from the config object we defined earlier
  const data = await makeRequest(query, { boardId: [config.boardId] });

  /**
   * Optional Chaining (?)!
   *
   * This helps prevent crashes IF a value is missing. If something does not exist, we safely fall back to an empty array (e.g. || [])
   *
   * Let's break it down!
   * - data.boards = "go into the boards array"
   * - [0] = "get the first board"
   * - items_page = "go into the board's items page"
   * - items = "get the actual array of items"
   * - || [] = Otherwise, return an empty array!
   */
  const items = data.boards?.[0]?.items_page?.items || [];

  //   ...mapColumnsValues(item.column_values)
  /**
     * 1. Calls the mapColumnsValues(item.column_values)
     * 2. ... = spread syntax. Basically unpack an object's properties and places them here.
     * Example:
     * IF mapColumnsValues returns:
     * {
     *  description: "something",
     *  techStack: "node.js"
     * }
     *
     * Turns it into:
     * {
     *  id: "1",
        title: "Project #1",
        description: "something",
    *  techStack: "node.js"
    * }
    */
  return items.map((item) => ({
    id: item.id,
    title: item.name, // monday item.name becomes our Title field (look at the column Id query I posted in Teams!)
    ...mapColumnsValues(item.column_values),
  }));
};
