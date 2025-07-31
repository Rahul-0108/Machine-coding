Problem Description - Razorpay
You are tasked with implementing a function calculatePrizes(awards) that determines how much prize money each winner receives based on the government’s award allocation system.

Requirements
Award Allocation:
Every year, the government allocates a total of 1 rupee per category for awards.
The 1 rupee allocated to a category is split equally among the participating teams within that category for that year.
Each team further divides its allocated share equally among its team members (the winners).
Final Output: You need to return an array of objects where each object represents a category in a given year and the corresponding winners with their prize shares.
Function Signature
function calculatePrizes(awards)
Arguments:
awards (Array): An array of objects, where each object represents a winner's award. Each object contains the following keys:
name: The name of the winner.
category: The category of the award (e.g., "javelin", "Shooting").
team: The team the winner is part of.
year: The year in which the award was won.
Return:
(Array): The function should return an array of objects, where each object contains:
category: The category of the award.
year: The year of the award.
winners: An array of objects, where each object represents a winner and includes:
name: The name of the winner.
share: The amount of prize money the winner receives.
Example
Input:
const awards = [
  { name: "James Peebles", category: "javelin", team: "Mumbai Indians", year: 2019 },
  { name: "Michel Mayor", category: "javelin", team: "Gujarat Titans", year: 2019 },
  { name: "Didier Queloz", category: "javelin", team: "Gujarat Titans", year: 2019 },
  { name: "John B. Goodenough", category: "Shooting", team: "Chennai Super Kings", year: 2019 },
  { name: "M. Stanley Whittingham", category: "Shooting", team: "Chennai Super Kings", year: 2019 },
  { name: "Akira Yoshino", category: "Shooting", team: "Chennai Super Kings", year: 2019 },
  { name: "Arthur Ashkin", category: "javelin", team: "Pune Warriors", year: 2018 },
  { name: "Gerard Mourou", category: "javelin", team: "Deccan Chargers", year: 2018 },
  { name: "Donna Strickland", category: "javelin", team: "Deccan Chargers", year: 2018 },
  { name: "Frances H. Arnold", category: "Shooting", team: "Kolkata Riders", year: 2018 },
  { name: "George P. Smith", category: "Shooting", team: "Sunrisers Hyderabad", year: 2018 },
  { name: "Sir Gregory P. Winter", category: "Shooting", team: "Sunrisers Hyderabad", year: 2018 },
];
Output:
const prizes = [
  {
    category: "javelin",
    year: 2019,
    winners: [
      { name: "James Peebles", share: 0.5 },
      { name: "Michel Mayor", share: 0.25 },
      { name: "Didier Queloz", share: 0.25 },
    ],
  },
  {
    category: "Shooting",
    year: 2019,
    winners: [
      { name: "John B. Goodenough", share: 0.3333 },
      { name: "M. Stanley Whittingham", share: 0.3333 },
      { name: "Akira Yoshino", share: 0.3333 },
    ],
  },
  {
    category: "javelin",
    year: 2018,
    winners: [
      { name: "Arthur Ashkin", share: 0.5 },
      { name: "Gerard Mourou", share: 0.25 },
      { name: "Donna Strickland", share: 0.25 },
    ],
  },
  {
    category: "Shooting",
    year: 2018,
    winners: [
      { name: "Frances H. Arnold", share: 0.5 },
      { name: "George P. Smith", share: 0.25 },
      { name: "Sir Gregory P. Winter", share: 0.25 },
    ],
  },
];
Explanation:
For Javelin in 2019:
There are two teams: "Mumbai Indians" and "Gujarat Titans".
Each team gets 0.5 rupees (since the total is 1 rupee).
"Mumbai Indians" has one winner, James Peebles, who gets the entire 0.5 rupees.
"Gujarat Titans" has two winners, Michel Mayor and Didier Queloz, who split the team's 0.5 rupees equally, receiving 0.25 rupees each.