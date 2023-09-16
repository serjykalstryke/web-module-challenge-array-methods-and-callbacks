const { fifaData } = require("./fifa.js");

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final

//(b) Away Team name for 2014 world cup final

//(c) Home Team goals for 2014 world cup final

//(d) Away Team goals for 2014 world cup final

//(e) Winner of 2014 world cup final */

let final2014 = fifaData.filter(
  (match) => match.Year === 2014 && match.Stage === "Final"
)[0];

console.log(final2014["Home Team Name"]); // (a)
console.log(final2014["Away Team Name"]); // (b)
console.log(final2014["Home Team Goals"]); // (c)
console.log(final2014["Away Team Goals"]); // (d)
console.log(
  final2014["Win conditions"].includes(final2014["Home Team Name"])
    ? final2014["Home Team Name"]
    : final2014["Away Team Name"]
); // (e)

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
  /* code here */
  return data.filter((match) => match.Stage === "Final");
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, getFinalsFn) {
  /* code here */
  return getFinalsFn(data).map((match) => match.Year);
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(data, getFinalsFn) {
  /* code here */
  return getFinalsFn(data).map((match) =>
    match["Home Team Goals"] > match["Away Team Goals"]
      ? match["Home Team Name"]
      : match["Away Team Name"]
  );
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getFinalsFn, getYearsFn, getWinnersFn) {
  /* code here */
  let years = getYearsFn(data, getFinalsFn);
  let winners = getWinnersFn(data, getFinalsFn);
  return years.map(
    (year, index) => `In ${year}, ${winners[index]} won the world cup!`
  );
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(getFinalsFn) {
  /* code here */
  let finalsData = getFinalsFn;
  let totalGoals = finalsData.reduce(
    (acc, match) => acc + match["Home Team Goals"] + match["Away Team Goals"],
    0
  );
  return (totalGoals / getFinalsFn.length).toFixed(2);
}

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
  /* code here */
  return data.filter(
    (match) =>
      (match["Home Team Initials"] === teamInitials ||
        match["Away Team Initials"] === teamInitials) &&
      match["Win conditions"].includes(teamInitials)
  ).length;
}

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getTotalGoals(data, team) {
  /* code here */
  return data.reduce((sum, match) => {
    if (match["Home Team Name"] === team) {
      return sum + match["Home Team Goals"];
    }
    if (match["Away Team Name"] === team) {
      return sum + match["Away Team Goals"];
    }
    return sum;
  });
}

function getGoals(data) {
  /* code here */
  let teams = [...new Set(data.map((match) => match["Home Team Name"]))];
  let maxAvgGoals = 0;
  let topScoringTeam = "";

  teams.forEach((team) => {
    let appearances = data.filter(
      (match) =>
        match["Home Team Name"] === team || match["Away Team Name"] === team
    ).length;
    let avgGoals = getTotalGoals(data, team) / appearances;

    if (avgGoals > maxAvgGoals) {
      maxAvgGoals = avgGoals;
      topScoringTeam = team;
    }
  });
}

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function getTotalGoalsAgainst(data, team) {
  return data.reduce((sum, match) => {
    if (match["Home Team Name"] === team) {
      return sum + match["Away Team Goals"];
    }
    if (match["Away Team Name"] === team) {
      return sum + match["Home Team Goals"];
    }
    return sum;
  }, 0);
}

function badDefense(data) {
  let teams = [
    ...new Set(
      data
        .map((match) => match["Home Team Name"])
        .concat(data.map((match) => match["Away Team Name"]))
    ),
  ];
  let maxAverageGoalsAgainst = 0;
  let worstDefenseTeam = "";

  teams.forEach((team) => {
    let appearances = data.filter(
      (match) =>
        match["Home Team Name"] === team || match["Away Team Name"] === team
    ).length;
    let averageGoalsAgainst = getTotalGoalsAgainst(data, team) / appearances;

    if (averageGoalsAgainst > maxAverageGoalsAgainst) {
      maxAverageGoalsAgainst = averageGoalsAgainst;
      worstDefenseTeam = team;
    }
  });

  return worstDefenseTeam;
}

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  console.log("its working");
  return "bar";
}
foo();
module.exports = {
  foo,
  getFinals,
  getYears,
  getWinners,
  getWinnersByYear,
  getAverageGoals,
};
