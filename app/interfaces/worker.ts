
export type Worker = {
    name: string
    rating: number
    picture: string
    jobs: Array<String>
}

let nearYou: Array<Worker> = [
    {
      name: "James McDaniel",
      rating: 4.4,
      picture: "/profile_pics/grey.png",
      jobs: ["Food Delivery", "Collection"]
    },
    {
      name: "Tina Gotschi",
      rating: 5.0,
      picture: "/profile_pics/tina.png",
      jobs: ["Food Delivery", "Collection", "Dry Cleaning", "Babysitting", "Teaching"]
    },
    {
      name: "Clide Calzone",
      rating: 5.0,
      picture: "/profile_pics/stark.png",
      jobs: ["Food Delivery", "Collection", "Dry Cleaning", "Babysitting", "Teaching"]
    },
  ]

export default nearYou;
  