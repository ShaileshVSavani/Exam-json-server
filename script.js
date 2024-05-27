const UiMaker = (data)=> {
  data.map((ele, i) => {

    let question = document.createElement("h2");
    question.innerHTML = `${i + 1}.  ${ele.question}`
  
    let option_a = document.createElement("button");
    option_a.innerHTML = ele.options.A
    option_a.setAttribute('data-option', 'A');
  
    let option_b = document.createElement("button");
    option_b.innerHTML = ele.options.B
    option_b.setAttribute('data-option', 'B');
  
    let option_c = document.createElement("button");
    option_c.innerHTML = ele.options.C
    option_c.setAttribute('data-option', 'C');
  
  
    let option_d = document.createElement("button");
    option_d.innerHTML = ele.options.D
    option_d.setAttribute('data-option', 'D');
  
   
    
    let div = document.createElement("div");
    div.append(question, option_a, option_b, option_c, option_d)
  
    document.getElementById("product").append(div);

    
      option_a.addEventListener("click",showcorrectAnswer);
      option_b.addEventListener("click",showcorrectAnswer);
      option_c.addEventListener("click",showcorrectAnswer);
      option_d.addEventListener("click",showcorrectAnswer);
    
    
    function showcorrectAnswer(event) {
            const selectedOption = event.target.getAttribute('data-option');
            if (selectedOption === ele.correct) {
              event.target.style.backgroundColor = "green";
            } else {
              event.target.style.backgroundColor = "red";
            }
       }
  });

}
const getData =() => {
  fetch("http://localhost:3000/questions")
   .then(res => res.json())
    .then(data => UiMaker(data))
   .catch(err => console.error("Error fetching data:", err));
};

getData()


const QuestionHandler = (e) => {
  e.preventDefault();
  let que = document.getElementById("question").value;
  let option_a = document.getElementById("option_a").value;
  let option_b = document.getElementById("option_b").value;
  let option_c = document.getElementById("option_c").value;
  let option_d = document.getElementById("option_d").value;
  let answer = document.getElementById("answer").value;
  let obj = {
    question: que,
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
    .then(res => res.json())
      .then(data => {
        console.log("Question added:", data);
        getData();  
      })
      .catch(err => console.error("Error adding question:", err));
      
      document.getElementById("formData").reset();
  }

document.getElementById("formData").addEventListener("submit", QuestionHandler)
