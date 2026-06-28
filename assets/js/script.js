fetch("data/school.json")

.then(response => response.json())

.then(data => {


/* =========================
   META TITLE
========================= */

document.title =
data.schoolName +
" | " +
data.event.name;



/* =========================
   HERO
========================= */

document.getElementById("hero-title").innerHTML =
data.hero.title;


document.getElementById("hero-description").innerHTML =
data.hero.description;



/* =========================
   EVENT
========================= */

document.getElementById("event-name").innerHTML =
data.event.name;


document.getElementById("event-date").innerHTML =
data.event.date;



/* =========================
   BELIEFS
========================= */


let beliefHTML = "";


data.beliefs.forEach(item => {


beliefHTML += `


<div class="card belief-card">


<img 
src="${item.image}" 
alt="${item.title}"
class="belief-icon"
>


<h3>

${item.title}

</h3>


<p>

${item.description}

</p>


</div>


`;


});


document.getElementById(
"belief-container"
).innerHTML = beliefHTML;





/* =========================
   THROUGH
========================= */


let throughHTML = "";


data.through.forEach(item => {


throughHTML += `


<div class="card">


<h3>

${item.title}

</h3>


<p>

${item.description}

</p>


</div>


`;


});


document.getElementById(
"through-container"
).innerHTML = throughHTML;



});
