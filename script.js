const UiMaker = (data)=> {
  data.map((ele, i) => {

    let question = document.createElement("h2");
    question.innerHTML = `${i + 1}.  ${ele.question}`
  
    let option_a = document.createElement("button");
    option_a.innerHTML = ele.options.A
  
  
  
    let option_b = document.createElement("button");
    option_b.innerHTML = ele.options.B
  
    let option_c = document.createElement("button");
    option_c.innerHTML = ele.options.C
  
  
    let option_d = document.createElement("button");
    option_d.innerHTML = ele.options.D
  
    let answer = document.createElement("button");
    answer.innerHTML = ele.correct
    
    
    let div = document.createElement("div");
    div.append(question, option_a, option_b, option_c, option_d)
  
    document.getElementById("product").append(div);

    
      option_a.addEventListener("click",showcorrectAnswer);
      option_b.addEventListener("click",showcorrectAnswer);
      option_c.addEventListener("click",showcorrectAnswer);
      option_d.addEventListener("click",showcorrectAnswer);
      answer.addEventListener("click",showcorrectAnswer);
      function showcorrectAnswer() {
        if (ele.correct === "A") {
          option_a.style.backgroundColor = "green";
        } else if (ele.correct === "B") {
          option_b.style.backgroundColor = "green";
        } else if (ele.correct === "C") {
          option_c.style.backgroundColor = "green";
        } else if (ele.correct === "D") {
          option_d.style.backgroundColor = "green";
        }
        else {
          option_a.style.backgroundColor = "red";
          option_b.style.backgroundColor = "red";
          option_c.style.backgroundColor = "red";
          option_d.style.backgroundColor = "red";
        }
      }
  });

}
const getData =() => {
  fetch("http://localhost:3000/questions")
   .then(res => res.json())
   .then(data => UiMaker(data))
};

getData()


const QuestionHandler = (e) => {
  e.preventDefault();
  let question = document.getElementById("question").value;
  let option_a = document.getElementById("option_a").value;
  let option_b = document.getElementById("option_b").value;
  let option_c = document.getElementById("option_c").value;
  let option_d = document.getElementById("option_d").value;
  let answer = document.getElementById("answer").value;
  let obj = {
    question: question,
    options: {
      A: option_a,
      B: option_b,
      C: option_c,
      D: option_d
    },
    correct: answer
    }
    fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
  }

document.getElementById("formData").addEventListener("submit", QuestionHandler)