//Assigning variable to all buttons, forms and modals
const addButton = document.getElementById('addItems');
const dialogText = document.getElementById('dialogText');
const textTitle = document.getElementById('inputText');
const textDate = document.getElementById('inputDate');
const textDescription = document.getElementById("inputDescription");
const main = document.querySelector('main');
const addBtn = document.getElementById('add-btn');
const modalForm = document.getElementById('modalForm');
const cancelBtn = document.getElementById('cancel-btn');
const secondDialogText = document.getElementById('secondDialogText')
const deleteNoteBtn = document.getElementById('deleteNote');
const cancelDeleteNoteBtn = document.getElementById('cancelDeleteNote')
const editBtn = document.getElementById('editBtn');
const closeEditBtn = document.getElementById('closeEditBtn')
const thirdDialogText = document.getElementById('thirdDialogText');

//Fetching the previously written notes data from the localStrorage(if available)
//If user does not have previously written data, then it will just be an empty array
const userInputs = JSON.parse(localStorage.getItem('data')) || []

//pushing written inputs to the userInputs array and saving it ti localStorage
const addNoteElements = (title, date, description)=>{
    userInputs.push({
        title,
        date,
        description
})
    localStorage.setItem('data', JSON.stringify(userInputs))
    return { title, date, description }
}

//creating a deleteElement function to delete previously written notes(if user wishes to)
const deleteElement = (e)=>{
    const match = userInputs.findIndex((x) => x.title === `${e.parentNode.parentNode.getAttribute('id')}`)
    secondDialogText.showModal();
    deleteNoteBtn.addEventListener('click', ()=>{
        e.parentNode.parentNode.remove();
        userInputs.splice(match, 1)
        localStorage.setItem('data', JSON.stringify(userInputs))
        secondDialogText.close();
    })
}

//creating an editElement button to edit the previously written notes if user wishes to
const editElement = (e)=>{
    const match = userInputs.findIndex((x)=> x.title === `${e.parentNode.parentNode.getAttribute('id')}`)
    textTitle.value = userInputs[match].title;
    textDate.value = userInputs[match].date;
    textDescription.value = userInputs[match].description;
    dialogText.showModal()
    addBtn.addEventListener('click', ()=>{
        const check = userInputs.splice(match, 1)
        e.parentNode.parentNode.remove()
        userInputs[match],title = textTitle.value;
        userInputs[match],date = textDate.value
        userInputs[match],description = textDescription.value;
        console.clear()
    })
    cancelBtn.addEventListener('click', ()=>{
        if(textTitle.value !== userInputs[match].title || textDate.value !== userInputs[match].date || textDescription.value !== userInputs[match].description){
            thirdDialogText.showModal()
            closeEditBtn.addEventListener('click', ()=>{
                thirdDialogText.close()
                dialogText.showModal()
            })
            editBtn.addEventListener('click', ()=>{
                thirdDialogText.close()
            })
        }else if (
          textTitle.value == userInputs[match].title ||
          textDate.value == userInputs[match].date ||
          textDescription.value == userInputs[match].description
        ){
            thirdDialogText.close()
          dialogText.close();
        }
    })
    console.clear()
    
}

//creating a createElementsForText to automatically create notes on user inputs
const createElementsForText = ({title, date, description})=>{
    const mainString = `<div class="note" id="${title}">
    <h3>${title}</h3>
    <p>${date}</p>
    <p>${description}</p>
    <div class="buttoned">
    <button class="${title} btns" onclick="deleteElement(this)" type="submit">Delete<button><button class="btns" onclick="editElement(this)">Edit</button>
    </div>
    </div>`;
    main.innerHTML += mainString;
}

//the forEach creates element for all objects in the userInputs array
userInputs.forEach(createElementsForText)

//adding the necessary event listeners
addButton.addEventListener('click', ()=>{
    dialogText.showModal();
})

cancelBtn.addEventListener('click', ()=>{
    if(textTitle.value !== '' || textDate.value !== '' || textDescription.value !== ''){
        thirdDialogText.showModal()
        editBtn.addEventListener('click',
        ()=>{
            thirdDialogText.close()
            dialogText.close()
            textTitle.value = '';
            textDate.value = '';
            textDescription.value = '';
        }
        )
        closeEditBtn.addEventListener('click', ()=>{
            thirdDialogText.close()
        })
    }else{
    dialogText.close()
}})

modalForm.onsubmit = e =>{
    e.preventDefault()
    const newNotes = addNoteElements(
        textTitle.value,
        textDate.value,
        textDescription.value
    )
    dialogText.close()
    createElementsForText(newNotes)
    dialogText.close()
    textDate.value = '';
    textDescription.value = '';
    textTitle.value = '';
}

cancelDeleteNoteBtn.addEventListener('click', ()=>secondDialogText.close())
document.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        dialogText.showModal()
    }
})

if(main.innerHTML == ''){
    main.style.display == "none";
}else{
    main.style.display = "flex";
}
