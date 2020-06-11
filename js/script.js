window.addEventListener("DOMContentLoaded", () => {
  function req() {
    
    getResources("http://localhost:3000/people") //cererea spre server. ne intoarce un Promes
      //.then((data) => data.json()) //primim, daca totul e bine, datele venite de la server.Aceasta nu ne intoarce un json obiect, ci un alt Promes
      .then((data) => createCards(data.data)) //aici deja putem prelucra datele
      .catch((err) => console.error(err));

    this.remove(); //stergem butonul dupa click
  }

  async function getResources(url) {
    //pentru a scapa de codul care se repeta
    let res = await axios(`${url}`); //folosim async await pentru a astepta datele de pe server

    if (res.status !== 200) {
      throw new Error(`Could not fetch ${url}, 
            status: ${res.status}`); //e bine sa cerem status deoarece fetch default nu arata care e problema
    }

    return res; //in loc de  .then( data => data.json()) .axios transforma singur datele json in obiect
  }

  document
    .querySelector("button")
    .addEventListener("click", req, { once: true });
  //aici nu chemam functia (req()). al treile argument options { }. ii spunem sa lucreze doar o data

  function createCards(response) {
    response.forEach((item) => {
      let card = document.createElement("div");
      card.classList.add("card");

      let icon;
      if (item.sex === "male") {
        icon = "icons/mars.png";
      } else {
        icon = "icons/female.png";
      }
      card.innerHTML = `
                    <img src="${item.photo}" alt="phoyo"> 
                    <div class="name"> ${item.name} ${item.surname}</div>
                    <div class="sex"> <img src="${icon}" alt="sex"> </div>
                    <div class="age">${item.age}</div>`;
      document.querySelector(".app").appendChild(card);
    });
  }
});
