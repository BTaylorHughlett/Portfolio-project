/**
 * WHAT IS DOT NOTATION?
 * * Think of Dot Notation as a "pathfinder."
 * It is the syntax we use to access a property or a 'nested' object
 * inside a larger data structure.
 * * Logic: Parent.Child.Grandchild
 * Example: Hotel.Floor.RoomNumber
 */

// --- THE MOCK DATA ---
// This represents a deeply nested "Hotel Earth" structure
const worldRegistry = {
  planet: "Earth",
  continent: {
    name: "North America",
    country: {
      name: "USA",
      state: "California",
      county: "San Francisco",
      address: {
        street: "888 Hospitality Way",
        zip: "94103",
        hotel: {
          brand: "The Galactic Inn",
          floors: [
            {
              level: 5,
              rooms: [
                { number: 501, status: "Occupied", type: "Suite" },
                { number: 502, status: "Available", type: "Deluxe" }
              ]
            }
          ]
        }
      }
    }
  }
};

const globalRegistry = {
  planet: "Earth",
  continents: [
    {
      name: "North America",
      countries: [
        {
          name: "USA",
          states: [
            {
              name: "California",
              counties: [
                {
                  name: "San Francisco",
                  locations: [
                    {
                      address: "101 Market St",
                      hotel: {
                        name: "The Cyber Suite",
                        rating: 4.8,
                        floors: [
                          { level: 1, rooms: [{ id: 101, type: "Lobby Lounge", price: 0 }] },
                          { level: 2, rooms: [{ id: 201, type: "Standard", price: 250 }, { id: 202, type: "Deluxe", price: 400 }] }
                        ]
                      }
                    },
                    {
                      address: "450 Post St",
                      hotel: {
                        name: "Union Square Grand",
                        rating: 4.5,
                        floors: [
                          { level: 10, rooms: [{ id: 1001, type: "Penthouse", price: 1200 }] }
                        ]
                      }
                    }
                  ]
                },
                {
                  name: "Los Angeles",
                  locations: [
                    {
                      address: "900 Wilshire Blvd",
                      hotel: { name: "Interstellar LA", rating: 4.9 }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Europe",
      countries: [
        {
          name: "United Kingdom",
          states: [
            {
              name: "Greater London",
              counties: [
                {
                  name: "Westminster",
                  locations: [
                    {
                      address: "10 Downing St",
                      hotel: {
                        name: "The Prime Stay",
                        rating: 5.0,
                        floors: [
                          { level: 1, rooms: [{ id: 1, type: "Royal Suite", price: 5000 }] }
                        ]
                      }
                    },
                    {
                      address: "221B Baker St",
                      hotel: { name: "The Sleuth’s Rest", rating: 4.2 }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "France",
          states: [
            {
              name: "Île-de-France",
              counties: [
                {
                  name: "Paris",
                  locations: [
                    {
                      address: "8 Rue Jean Goujon",
                      hotel: { name: "La Maison Central", rating: 4.7 }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

//console.log(worldRegistry.continent.country.address.hotel.floors)
console.log(globalRegistry.continents)