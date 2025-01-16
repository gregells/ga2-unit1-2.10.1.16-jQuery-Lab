/*----- constants -----*/

/*----- state variables -----*/
let listOfSkills;

/*----- cached elements  -----*/
const $skillsEl = $('ul');
const $newSkillEl = $('input');
const $submitButton = $('#submit');

/*----- event listeners -----*/
$submitButton.on('click', handleSubmit);
$skillsEl.on('click', 'li', handleDelete);
document.addEventListener('keydown', handleKeyPress);

/*----- functions -----*/
function init() {
    listOfSkills = localStorage.getItem('listOfSkills') ? JSON.parse(localStorage.getItem('listOfSkills')) : [];
    render();
}

init();

function handleSubmit(evt) {
    evt.preventDefault();
    // Add the new skill to the list:
    listOfSkills.push($newSkillEl.val());
    // Clear the input field:
    $newSkillEl.val('');
    // Save the updated list to local storage:
    localStorage.setItem('listOfSkills', JSON.stringify(listOfSkills));
    // Re-render the list:
    render();
}

function handleDelete(evt) {
    // Check if the event target is a button, if not, return:
    if (evt.target.tagName !== 'BUTTON') return;
    // Get the skill text from the sibling span element:
    let skill = $(evt.target.nextSibling).text();
    // Find the index of the skill to be deleted:
    const index = listOfSkills.indexOf(skill);
    // Splice that skill out of the list:
    listOfSkills.splice(index, 1);
    // Save the updated list to local storage:
    localStorage.setItem('listOfSkills', JSON.stringify(listOfSkills));
    // Re-render the list:
    render();
}

function handleKeyPress(evt) {
    // Trigger a click event on the submit button if the enter key is pressed:
    if (evt.key === 'Enter') {
        $submitButton.trigger('click');
    }
}

function render() {
    // Clear out the list container:
    $skillsEl.html('');
    
    // Iterater over the list to render each skill:
    listOfSkills.forEach(skill => {
        // Create the delete button:
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#10060';
        deleteButton.setAttribute('class', 'btn btn-sm btn-outline-danger mx-2');

        // Create the span element with the skill text:
        const spanEl = document.createElement('span');
        spanEl.textContent = skill;
        
        // Create the list element and append the delete button and span:
        const listEl = document.createElement('li');
        listEl.setAttribute('class', 'list-group-item px-0');
        listEl.appendChild(deleteButton);
        listEl.appendChild(spanEl);

        // Append the list element to the skills container:
        $skillsEl.append(listEl);
    });
}