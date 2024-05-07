let count = 0;
let questionsArr = [
  {
    Q: "What car company produces the Mustang?",
    A: "A) Ford",
    B: "B) Chevrolet",
    C: "C) Dodge",
    D: "D) Toyota",
  },
  {
    Q: "What car company produces the Camaro?",
    A: "A) Ford",
    B: "B) Chevrolet",
    C: "C) Dodge",
    D: "D) Toyota",
  },
  {
    Q: "What car company produces the Challenger?",
    A: "A) Ford",
    B: "B) Chevrolet",
    C: "C) Dodge",
    D: "D) Toyota",
  },
  {
    Q: "What car company produces the Civic?",
    A: "A) Honda",
    B: "B) Toyota",
    C: "C) Nissan",
    D: "D) Hyundai",
  },
  {
    Q: "What car company produces the Corolla?",
    A: "A) Honda",
    B: "B) Toyota",
    C: "C) Nissan",
    D: "D) Hyundai",
  },
  {
    Q: "What car company produces the Altima?",
    A: "A) Honda",
    B: "B) Toyota",
    C: "C) Nissan",
    D: "D) Hyundai",
  },
  {
    Q: "What car company produces the Sonata?",
    A: "A) Honda",
    B: "B) Toyota",
    C: "C) Nissan",
    D: "D) Hyundai",
  },
  {
    Q: "What car company produces the Mustang Mach-E?",
    A: "A) Ford",
    B: "B) Chevrolet",
    C: "C) Dodge",
    D: "D) Tesla",
  },
  {
    Q: "What car company produces the Bolt EV?",
    A: "A) Ford",
    B: "B) Chevrolet",
    C: "C) Dodge",
    D: "D) Tesla",
  },
  {
    Q: "What car company produces the Model S?",
    A: "A) Ford",
    B: "B) Chevrolet",
    C: "C) Dodge",
    D: "D) Tesla",
  },
]; //array of questions with the answers (no sign to correct answer)
let correctAns = ["A", "B", "C", "A", "B", "C", "D", "A", "B", "D"];
//an array of the correct answers, index0 = q1 and so on.
let userAnswers, userAnswersJson;
initUserAnswer();
function initUserAnswer() {
  if (localStorage.getItem("userAns") == null) {
    //if there is no local storage for userAns, create one.
    let userAnswers = [];
    let userAnswersJson = JSON.stringify(userAnswers);
    localStorage.setItem("userAns", userAnswersJson);
  } else {
    //if there is a local storage for userAns, update the arrays.
    userAnswersJson = localStorage.getItem("userAns");
    userAnswers = JSON.parse(userAnswersJson);
  }
  printQuestions();
  for (let i in userAnswers) {
    //adding forder to any question the user already answered in the past (localStorage):
    if (userAnswers[i] != null) {
      //remove border to all the answer in that question - reset
      document.querySelector(`#q${i}A`).style = "border:none";
      document.querySelector(`#q${i}B`).style = "border:none";
      document.querySelector(`#q${i}C`).style = "border:none";
      document.querySelector(`#q${i}D`).style = "border:none";
      //adding border to the selected answer only
      document.querySelector(`#q${i}${userAnswers[i]}`).style =
        "border:1px solid black";
    }
  }
}
function reset() {
  //reset function - won't clear all local storage, only resetting userAns.
  userAnswers = [];
  userAnswersJson = JSON.stringify(userAnswers);
  localStorage.setItem("userAns", userAnswersJson);
  printQuestions(); //print th questions again to color it by default;
  document.querySelector("#score").style = "display: none";
}

function printQuestions() {
  let quizElement = document.querySelector("#quiz");
  quizElement.innerHTML = "<ol id = 'quizOl' start = '1'>";
  for (let i = 0; i < questionsArr.length; i++) {
    document.querySelector("#quizOl").innerHTML += `
    <li>${questionsArr[i].Q}<ul>
        <li  id = 'q${i}A' onclick="addAns('${i}','A')"> ${questionsArr[i].A}</li>
        <li  id = 'q${i}B' onclick="addAns('${i}','B')"> ${questionsArr[i].B}</li>
        <li  id = 'q${i}C' onclick="addAns('${i}','C')"> ${questionsArr[i].C}</li>
        <li  id = 'q${i}D' onclick="addAns('${i}','D')"> ${questionsArr[i].D}</li></ul></li>`;
  }
  quizElement.innerHTML += "</ol>";
}
function updateCount() {
  //updates localStorage count for the user's correct answers.
  count = 0;
  for (let i in userAnswers) {
    //checks only in the questions user has answered
    if (userAnswers[i] == correctAns[i]) {
      count += 10;
    }
  }
}
function colorAns() {
  //the function will run over all the answered questions,
  // reset the color to black as default and then color the choosen answer
  // with the right color. its in a loop so it will go on every question user
  // answered and saved in the localStorage (userAns).
  for (let i in userAnswers) {
    let answerRow = document.querySelector(`#q${i}${userAnswers[i]}`);
    //RESETING THE COLOR
    document.querySelector(`#q${i}A`).style = "color:black";
    document.querySelector(`#q${i}B`).style = "color:black";
    document.querySelector(`#q${i}C`).style = "color:black";
    document.querySelector(`#q${i}D`).style = "color:black";
    //COLOR THE SELECTED ANSWER
    if (userAnswers[i] != null) {
      if (userAnswers[i] == correctAns[i]) {
        answerRow.style = "color:green";
      } else {
        answerRow.style = "color:red";
      }
    }
  }
}
function addAns(qNum, ans) {
  //adds the answer to the localStorage.
  //remove border to all the answer in that question - reset
  document.querySelector(`#q${qNum}A`).style = "border:none";
  document.querySelector(`#q${qNum}B`).style = "border:none";
  document.querySelector(`#q${qNum}C`).style = "border:none";
  document.querySelector(`#q${qNum}D`).style = "border:none";
  //adding border to the selected answer only
  document.querySelector(`#q${qNum}${ans}`).style = "border:1px solid black";
  userAnswers[qNum] = ans;
  userAnswersJson = JSON.stringify(userAnswers);
  localStorage.setItem("userAns", userAnswersJson);
}
function revealScore() {
  //the function will update the count,
  // print it in the lables, and color the answers.
  updateCount();
  colorAns();
  document.querySelector("#score").innerText = `your score is: ${count}/100`;
  document.querySelector("#score").style = "display: block";
}
