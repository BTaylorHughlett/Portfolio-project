// Gives us access to the variables defined in the .env file!
// Refer to the .env-example file to see how it should be formatted
// NOTE: Make sure to have .env listed in the .gitignore!! This information should always be hidden and never committed to the origin repo
import "dotenv/config";

// REVIEW: Work with monday.com in the API Playground to figure out what query you want to work with.
// TODO: Add the proper board id [Hint: Use the API Playground to figure out what ids you can use]
const MONDAY_QUERY = `
    query{
  boards(ids:18396816803) {
		items_page{
      items{
        id
        name
        column_values{
          id
          text
        }
      }
    }
  }
}
`;

// Make API Request
export const fetchFromMondayAPI = async () => {
  // Check if the token exists. If not, error.
  if (!process.env.MONDAY_TOKEN) {
    throw new Error("Missing MONDAY_TOKEN! Add it to your .env file.");
  }

  // Capturing the API's response in a variable by making a request!
  // The endpoint is the URL. This is the source we are pointing to to fetch data from
  const response = await fetch("https://api.monday.com/v2", {
    // monday.com uses POST due to the fact that it uses GraphQL. GraphQL typically only uses one type of endpoint (above) where you send a query to further defined what you want to do (GET, POST, PUT, PATCH, DELETE).
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // We have to send the API Token (from monday.com) to let the endpoint know we have permission to access the data!
      Authorization: process.env.MONDAY_TOKEN,
    },
    // We are taking the MONDAY_QUERY (above), turning it into a JSON string, and sending that to the API call. This is what we ACTUALLY want from the endpoint.
    body: JSON.stringify({ query: MONDAY_QUERY }),
  });

  // Turn the response into a JavaScript object
  const data = await response.json();

  // TODO: Use the status of the response to display different messages based on the error. Where would I do this?
  const status = response.status;

  // Return the constant "data" so that whenever we run this function (fetchFromMondayAPI), we get the results of the API call we just made at line 35
  // Return the constant "status" to display different messages based on the error.
  return { data, status };
};

// Now, we run the function!
fetchFromMondayAPI()
  // If it's a success, display a message and print the data as a string into the terminal
  .then((result) => {
    console.log(
      "Yay! I fetched the data from monday.com! The response was: ",
      result.status,
    );

    /**
     * Show the FULL JSON as a string in the terminal
     * null is passed into the stringify method to ignore all values that are not strings or numbers or even symbols.
     * 2 is passed into the stringify method to add space into the string output (helps make it a bit more readable)
     * (commented out, but feel free to enable it and run it to see what it looks like)
     */
    // console.log(JSON.stringify(result.data, null, 2));

    /**
     * Let's gets more specific using dot notation!
     * Take the results to get the data. Navigate to the first board and get items! Look at the MONDAY_QUERY we defined above to learn how the data is branched out.
     * Quiz: How would you get the values of the columns?
     */
    const items = result.data.data.boards[0].items_page.items;
    console.log(items);

    /**
     * Let's now work with maps
     * the map() method is used to loop through an object's key:value pairs. It's used to work with ALL of the data within an object in one go, without needing to constantly point at a key:value pair one at a time. Example, items[0].name, items[1].name, items[2].name, etc.
     * Quick review on how objects looks like:
     * const exampleObjectName = {
     *     keyName1: keysValue1,
     *     keyName2: "keysValue2",
     *     keyName3: keysValue3,
     * }
     *
     * With objects, you use dot notation to point to specific values. Example, if I used the above const and I wanted to get keyName2's value, I'd do exampleObjectName.keyName2.
     * Quiz: How would I get the value of keyName3?
     *
     * In this case below, we are looping through all of the key:value pairs in the "items" object (we defined above). We defined a new variable called "item" (represents an individual key:value pair in the object "items") and taking the name of every item and printing it out individually.
     */
    const itemName = items.map((item) => {
      console.log(item.name);
    });

    // Instead of printing out every name, let's display the data in a table instead using console.table()!
    // We are creating new column names (exampleId and exampleName) and giving it the values from the "items" object we created above using the keys "id" and "name" using dot notation
    // Quiz: How would I add another column into the table to display the "column_values" (refer the MONDAY_QUERY to figure out the proper dot notation)?
    console.table(
      items.map((item) => ({
        exampleId: item.id,
        exampleName: item.name,
      }))
    );
  })
  // If there's an error, display an error message and exit the process
  .catch((err) => {
    console.error("Aw shucks! Failed to fetch data from monday.com :( ");
    console.error("Reason: ", err.message);

    // Exit the process
    process.exit(1);
  });
