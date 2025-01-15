/*----- constants -----*/

/*----- state variables -----*/
let listOfSkills;

/*----- cached elements  -----*/
const $skillsEl = $('ul');
const $newSkillEl = $('input');
const $submitButton = $('button');

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
    if (evt.target.tagName !== 'SPAN') return;
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
        $skillsEl.append(`<li><span>&#10060 </span>${skill}</li>`);
    });
}