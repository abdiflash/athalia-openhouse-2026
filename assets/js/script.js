fetch("data/school.json")

.then(response=>response.json())

.then(data=>{


document.title =
data.schoolName +
" | " +
data.event.name;



document.getElementById(
"hero-title"
).innerHTML =
data.hero.title;



document.getElementById(
"hero-description"
).innerHTML =
data.hero.description;



document.getElementById(
"event-name"
).innerHTML =
data.event.name;



document.getElementById(
"event-date"
).innerHTML =
data.event.date;





let beliefHTML="";


data.beliefs.forEach(item=>{


beliefHTML += `

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
"belief-container"
)
.innerHTML=beliefHTML;






let throughHTML="";


data.through.forEach(item=>{


throughHTML += `


<div class="card">

<h3>

${item}

</h3>


<p>

Mendampingi perjalanan anak bertumbuh.

</p>


</div>


`;


});



document.getElementById(
"through-container"
)
.innerHTML=throughHTML;



});
