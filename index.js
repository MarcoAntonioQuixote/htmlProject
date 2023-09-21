let value = document.getElementById()

fetch('https://pokeapi.co/api/v2/pokemon/mew')
    .then(res => res.json())
    .then(data => {
        let img = data.sprites.front_default;
        let picture = document.createElement('img');
        picture.src = img;
        document.body.append(picture);
    });

let name = "Bad Ass";