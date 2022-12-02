const form = document.getElementById("question-form")               
const addQuestionBtn = document.getElementById("show-btn")          
const questionCard = document.querySelector(".question-card")
const questionList = document.getElementById("questions-list")      
const question = document.getElementById("question-input")         
const answer = document.getElementById("answer-input")              
const closeBtn = document.querySelector(".close-btn")               
const feedback = document.querySelector(".feedback")
const saveBtn = document.querySelector(".submitBtn")

//For local storage--refreshing the page every time
document.addEventListener('DOMContentLoaded', refreshItems);
// for local storage purpose
const id = new Date().getTime().toString(); 

//click on the Add Question button
addQuestionBtn.addEventListener("click" , function(){
    questionCard.classList.add("showItem")
})
closeBtn.addEventListener("click" , function(){
    questionCard.classList.remove("showItem")
})

form.addEventListener("submit" , function(e){
    e.preventDefault()
    const questionValue = question.value
    const answerValue = answer.value
    console.log("questionValue: ", questionValue)
    console.log("answerValue: ", answerValue)

    if(questionValue !== "" && answerValue !== ""){         
        const element = document.createElement("div")       
        let attr = document.createAttribute("data-id");     
        attr.value = id; 
        element.classList.add("col-md-4")   
        element.innerHTML = `<div class="card card-body flashcard my-3">
        <h4 class="text-capitalize">${question.value}</h4>
        <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
        <h5 class="answer mb-3">${answer.value}</h5>
        <div class="flashcard-btn d-flex justify-content-between">
        <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
        <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
        </div>`
        questionList.appendChild(element)
        setLocalStorage(id , questionValue , answerValue);   
   
        //Show/Hide button--we don't need forEach ot for loop
        const showHideAnswer = element.querySelector(".show-answer")
        console.log(showHideAnswer)
        showHideAnswer.addEventListener("click" , function(){
            console.log(showHideAnswer)
            const test = showHideAnswer.parentElement.childNodes[5] 
            //below lines or use toggle
            if(test.classList.contains("showItem")) {
                test.classList.remove("showItem")
            }
            else {
                test.classList.add("showItem")
            }
        })

        //Edit button----we don't need forEach ot for loop
        const editBtn = element.querySelector(".edit-flashcard")
        editBtn.addEventListener("click" , function(){
            question.value = editBtn.parentElement.parentElement.childNodes[1].textContent
            questionList.removeChild(element) 
            deleteLocalStorage(id, questionValue, answerValue);     
        })

        // Delete button----we don't need forEach ot for loop
        const deleteBtn = element.querySelector(".delete-flashcard")            
        deleteBtn.addEventListener("click" , function(){
            questionList.removeChild(element) 
            deleteLocalStorage(id, questionValue, answerValue);   //local storage
        })
    }
        
    //alert--part2
    else{
        feedback.innerHTML = "Cannot Add Empty Values"
        feedback.classList.add("showItem" , "alert-danger") 
            
        setTimeout(() => {
            feedback.classList.remove("showItem" , "alert-danger")
        }, 3000);
            
    }
    question.value = ""
    answer.value = ""
})      
   

//**********Local Storage *****************************/
const questionValue = question.value
const answerValue = answer.value
//update
function setLocalStorage(id , questionValue , answerValue){
    const listItems={       
        id: id,
        questionValue: questionValue,
        answerValue:  answerValue
    }
    console.log(listItems)
    let items = getLocalStorage()        
    console.log(items)
    items.push(listItems)   
    //update the list
    localStorage.setItem("cardList" , JSON.stringify(items))
}

//display
function getLocalStorage(){    
    console.log("fire")
    return localStorage.getItem("cardList") ? JSON.parse(localStorage.getItem("cardList")) : []   
}

//for refreshing the page everytime
function refreshItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
      items.forEach(function (item) {
        createItem2(item.id, item.questionValue, item.answerValue);
      });
    }
}
  


//delete each item
function deleteLocalStorage(id,questionValue,answerValue){
    let items = getLocalStorage();
    let index = items.findIndex(function(item){     //.findIndex for get index of object inside array--for finding index in array we use indexOf
        if(item.id === id && item.questionValue === questionValue && item.answerValue === answerValue){
            console.log(id)
            return item     //return the first item
        }
        
    });
    console.log(index)
    items.splice(index, 1);
    //first delete existing list
    // localStorage.removeItem('cardList');
    //add new updated/edited list
    localStorage.setItem("cardList", JSON.stringify(items))
}

//for refreshing page
function createItem2(id, questionValue, answerValue){
    const element = document.createElement("div")       
    let attr = document.createAttribute("data-id");       
    attr.value = id; 
    element.classList.add("col-md-4")   
    element.innerHTML = `<div class="card card-body flashcard my-3">
    <h4 class="text-capitalize">${questionValue}</h4>
    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
    <h5 class="answer mb-3">${answerValue}</h5>
    <div class="flashcard-btn d-flex justify-content-between">
    <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
    <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
    </div>`
    questionList.appendChild(element)

    //Show/Hide button
    const showHideAnswer = element.querySelector(".show-answer")
    console.log(showHideAnswer)
    showHideAnswer.addEventListener("click" , function(){
        console.log(showHideAnswer)
        const test = showHideAnswer.parentElement.childNodes[5] 
        //below lines or use toggle
        if(test.classList.contains("showItem")) {
            test.classList.remove("showItem")
        }
        else {
            test.classList.add("showItem")
        }
    })

    //Edit button
    const editBtn = element.querySelector(".edit-flashcard")
    editBtn.addEventListener("click" , function(){
        question.value = editBtn.parentElement.parentElement.childNodes[1].textContent
        questionList.removeChild(element) //remove the previous and add the new one instead of this one
    })

    // Delete button----we don't need forEach ot for loop
    const deleteBtn = element.querySelector(".delete-flashcard")            
    deleteBtn.addEventListener("click" , function(){
        questionList.removeChild(element) 
    })
}