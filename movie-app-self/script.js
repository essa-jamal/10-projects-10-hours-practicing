const allMovies = [
  {
    title: "Fighting With My Family",
    rating: 7.1,
    duration: "1h 48m",
    type: "comedy",
    image: "fi1ghtwiththeflight.jpg",
    vedio:"https://www.youtube.com/watch?v=aJNsh4tJWLI",
    overview:
      "A comedy about a family that fights a little differently 	Born into a tight-knit wrestling family, Paige and her brother Zak are ecstatic when they get the once-in-a-lifetime opportunity to try out for the WWE. But when only Paige earns a spot in the competitive training program, she must leave her loved ones behind and face this new cutthroat world alone. Paige's journey pushes her to dig deep and ultimately prove to the world that what makes her different is the very thing that can make her a star.",
  },
  {
    title: "Beckett",
    rating: 8,
    duration: "1h 50m",
    type: "adventure,thriller,drama,action",
    image: "becket.jpg",
    overview:
      "Born to be murdered.	Whilst vacationing in Greece, Beckett, becomes the target of a manhunt after a devastating car accident forces him to run for his life across the country to clear his name but tensions escalate as the authorities close in and political unrest mounts which makes Beckett fall even deeper into a dangerous web of conspiracy.",
  },
  {
    title: "CODA",
    rating: 7.9,
    duration: "1h 51m",
    type: "drama,music",
    image: "Coda.jpg",
    overview:
      "Every family has its own language.	As a CODA (Child of Deaf Adults), Ruby is the only hearing person in her deaf family. When the family’s fishing business is threatened, Ruby finds herself torn between pursuing her love of music and her fear of abandoning her parents.",
  },
  {
    title: "Suicide Squad",
    rating: 5.9,
    duration: "2h 14m",
    type: "action,adventure,fantacy",
    image: "Suicide Squad.jpg",
    overview:
      "Worst Heroes Ever	From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.Worst Heroes Ever	From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.Worst Heroes Ever	From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.Worst Heroes Ever	From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.",
  },
  {
    title: "The Swarm",
    rating: 4.6,
    duration: "1h 41m",
    type: "drama,fantacy,horror",
    image: "The Swarm.jpg",
    overview:
      "A single mother breeds locusts as high-protein foods but has trouble getting them to reproduce until she finds they have a taste for blood.",
  },
];

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("main");
bindMovies(allMovies);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  
  main.innerHTML="";
  // getMovies(searchTerm);
  bindMovies(getMovies(searchTerm));
});

function getMovies(searchTerm) {
  const filteredMovies = [];

  allMovies.forEach((movie) => {
    if (movie.title.includes(searchTerm)) {
      filteredMovies.push(movie);
      console.log(movie.title);
    }
  });

  return filteredMovies;
}
function bindMovies(_movies) {
 // console.log(_movies);
 
  _movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.innerHTML="";
    movieEl.classList.add("movie");
    movieEl.innerHTML =
      
      '<img src="images/'+
      movie.image +
      '" alt="' +
      movie.title +
      '" />' +
      '<div class="image-info">' +
      "<h3>" +
      movie.title +
      "</h3>" +
      "<span class='"+getRatingClass( movie.rating) +"'>" +
      movie.rating +
      " </span></div>" +
      '<div class="overview">' +
      "<h4>overview:</h4>" +
      movie.overview +
      " </div>";
      
    main.appendChild(movieEl);
   // console.log(movieEl)
  });
}

function getRatingClass(rate){
if(rate>=8){
  return 'green';

  
}
else if(rate>5) {
return 'orange';
}
else
{
  return 'red';
}

}