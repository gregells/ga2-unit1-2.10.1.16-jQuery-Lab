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
    listOfSkills = [];
    render();
}

init();

function handleSubmit(evt) {
    evt.preventDefault();
    // Add the new skill to the list:
    listOfSkills.push($newSkillEl.val());
    // Clear the input field:
    $newSkillEl.val('');
    // Re-render the list:
    render();
}

function handleDelete(evt) {
    console.log(evt.target);
    // if (evt.target.tagName !== 'SPAN') return;
    if (evt.target.tagName !== 'BUTTON') return;
    console.log('delete this skill');
    // let skill = $(evt.target).text();
    let skill = $(evt.target.nextSibling).text();
    console.log(skill);
    // Find the index of the skill to be deleted:
    const index = listOfSkills.indexOf(skill);
    // Splice that skill out of the list:
    listOfSkills.splice(index, 1);

    // listOfSkills = listOfSkills.filter(s => s !== skill);
    render();
}

function handleKeyPress(evt) {
    if (evt.key === 'Enter') {
        $submitButton.trigger('click');
    }
}

function render() {
    // Clear out the list container:
    $skillsEl.html('');
    
    // Iterater over the list to render each skill:
    listOfSkills.forEach(skill => {
        // Create the delete button to add to each skill:
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#10060';
        deleteButton.setAttribute('class', 'btn btn-sm btn-outline-danger mx-2');

        const spanEl = document.createElement('span');
        spanEl.textContent = skill;
        
        const listEl = document.createElement('li');
        listEl.setAttribute('class', 'list-group-item px-0');

        // listEl.innerHTML = `<span>&#10060 </span>${skill}`;
        listEl.appendChild(deleteButton);
        listEl.appendChild(spanEl);
        $skillsEl.append(listEl);
        // $skillsEl.append(`<li><span>&#10060 </span>${skill}</li>`);
    });
}