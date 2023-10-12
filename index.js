let game;
let start = document.getElementById('start');
let backOfCard = 'https://png.pngtree.com/thumb_back/fh260/background/20211215/pngtree-luxury-royal-golden-mandala-background-with-borders-for-invitation-and-wedding-image_919673.png'

start.addEventListener('click', () => {
    console.log('Starting game');
    let form = document.getElementById('signIn');
    let p1Name = document.getElementById('p1Name');
    let p2Name = document.getElementById('p2Name');

    form.style.display = 'none';
    start.style.display = 'none';

    game = new Game(p1Name.value,p2Name.value);
})



class Game {
    constructor(name1,name2) {
        this.table = document.getElementById('table');
        this.randomizePlayers(name1,name2);
        this.createDeck();
        this.cards = [];
        this.round = [];
    }

    randomizePlayers(name1,name2) {

        let num = randomNum(1,2);

        if (num === 1) {
            this.player1 = {name: name1, score: 0};
            this.player2 = {name: name2, score: 0}
        } else {
            this.player1 = {name: name2, score: 0};
            this.player2 = {name: name1, score: 0}
        }
    }

    createDeck() {
        //grab 10 images //make 20 cards

        //start with a random # so that the cards are alwats differ

        let num = randomNum(1,41);
        let start = num;
        
        for (let x = num; x < start + 10; x++) {
            fetch(`https://650a6b9ddfd73d1fab085a6b.mockapi.io/cards/${x}`)
                .then(res => res.json())
                .then(data => {
                    let card = {
                        image: data.image, 
                        faceUp: false,
                        id: +data.id,
                    };
                    this.cards.push(card,{...card, id: +data.id + 50});
                    this.cards = shuffleArray(this.cards);
                });
        }

        let showCards = document.createElement('button');
        showCards.innerText = 'Deal cards!';
        showCards.addEventListener('click', () => {
            this.dealCards();
            showCards.style.display = "none";
        })
        document.body.append(showCards);
    }

    dealCards() {        
        for (let card of this.cards) {
            let image;
            image = document.createElement('img');
            image.setAttribute('id',card.id);
            if (card.faceUp) {
                image.style.backgroundImage = `url(${card.image})`;
                image.setAttribute('class','card');
            } else {
                image.style.backgroundImage = `url(${backOfCard})`;
                image.setAttribute('class','upsideDown');
            }
            image.addEventListener('click',() => this.flipCard(card))
            this.table.append(image);
        }
    }

    flipCard(card) {

        if (this.round.length === 2) {
            console.log('switch player');
            return;
        } 

        this.round.push(card);

        let flippedCard = document.getElementById(card.id);
        if (card.faceUp) {
            flippedCard.style.backgroundImage = `url(${backOfCard})`;
            flippedCard.setAttribute('class','upsideDown');
        } else {
            flippedCard.style.backgroundImage = `url(${card.image})`;
            flippedCard.setAttribute('class','card');
        }

        console.log(this.round);

    }


}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}