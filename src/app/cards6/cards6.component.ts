import { Component,ViewChildren,QueryList,ChangeDetectorRef } from '@angular/core';
import { Card6Service } from '../card6.service';
import { CardComponent } from '../card/card.component';
import { Card } from '../card';
@Component({
  selector: 'app-cards6',
  templateUrl: './cards6.component.html',
  styleUrl: './cards6.component.scss'
})
export class Cards6Component {
  
  cards: Card[] = [];
  active_cards:Card[]=[]
  index1: number = 0;  // Define index1 property
  index2: number = 1;
  flippedCardIndices: number[] = [];
  matchedCardIndices: number[] = [];
  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;
    moves: number = 0;
    misses: number = 0;
    roundsPlayed: number = 0;
    knowledgePoints: number = 0;
    accuracy: number = 0;
  demo_images: Card[] = [
    {image:'https://picsum.photos/100', matched: false},
    {image:'https://picsum.photos/200', matched: false},
    {image:'https://picsum.photos/300', matched: false},
    {image:'https://picsum.photos/400', matched: false},
    {image:'https://picsum.photos/500', matched: false},
    {image:'https://picsum.photos/600', matched: false},
  ];
  constructor(private service: Card6Service , private cdr: ChangeDetectorRef) { 

  }
  ngOnInit(): void {
    this.service.numberOfUniqueImages = 3;
    this.generateCards().then(() => {
      this.generateUniqueImageArray();
    });
  }
  resetGame(): void {
    this.flippedCardIndices = [];
    this.matchedCardIndices = [];
    this.moves = 0;
    this.misses = 0;
    this.knowledgePoints = 0;
    this.accuracy = 0;

    // Reset the state of each card
    this.cards.forEach(card => {
      card.matched = false;
    });

    // Shuffle the cards for the new game
    this.generateCards().then(() => {
      this.generateUniqueImageArray();
    });
    // Trigger change detection
    this.cdr.detectChanges();
  }
  async generateCards(): Promise<void> {
    const uniqueImages = this.generateUniqueImageArray();
    this.cards = this.shuffle([...uniqueImages, ...uniqueImages]);
    console.log(this.cards);
  }
  selectedCards: string[] = [];
  handleCardClick(index: number,card:Card): void {
    console.log("card clicked");
    if (this.flippedCardIndices.length < 2 && !this.flippedCardIndices.includes(index)) {
      this.flippedCardIndices.push(index);
      this.active_cards.push(card);
      if (this.flippedCardIndices.length === 2) {
        this.moves++;
        setTimeout(() => {
          this.checkMatch();
        }, 1500);
      }
    }
  }
  checkMatch(): void {
      const [index1, index2] = this.flippedCardIndices;
      if (this.active_cards[0].image === this.active_cards[1].image) {
        this.active_cards.forEach(card => (card.matched = true));
        if (this.cards.every(c => c.matched)) {
          this.roundsPlayed++;
          this.accuracy = Math.round((this.knowledgePoints / this.moves) * 100);
          if (this.roundsPlayed === 1) {
            // Display the last card for a moment before going to the next round
            setTimeout(() => {
              this.resetGame();
            }, 1000); // Adjust the timeout duration as needed
          } else {
            this.resetGame();
          }
        }
      this.knowledgePoints += 10;
        // Match found
        //console.log("matching found"+this.active_cards);
        this.flippedCardIndices = [];
        this.active_cards = [];
        // Trigger change detection
        this.cdr.detectChanges();
      } 
      else {
        // No match, flip cards back
        this.misses++;
        this.flippedCardIndices = [];
        this.active_cards = [];
      }
  }
  generateUniqueImageArray(): Card[] {
    const images: Card[] = [];
    const uniqueNumber: number = this.service.numberOfUniqueImages;

    for (let i = 0; i < this.service.numberOfUniqueImages; i++) {
      images.push({ image: this.demo_images[i % uniqueNumber].image, matched: false });
    }
    console.log(images);
    return images;
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
