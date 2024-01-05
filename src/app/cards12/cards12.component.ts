import { Component ,ChangeDetectorRef} from '@angular/core';
import { Card12serviceService } from '../card12service.service';
import { Card } from '../card';
@Component({
  selector: 'app-cards12',
  templateUrl: './cards12.component.html',
  styleUrl: './cards12.component.scss'
})
export class Cards12Component {
  cards: Card[] = [];
  active_cards:Card[]=[]
  index1: number = 0;  // Define index1 property
  index2: number = 1;
  flippedCardIndices: number[] = [];
  matchedCardIndices: number[] = [];

  demo_images: Card[] = [
    {image:'https://picsum.photos/100', matched: false},
    {image:'https://picsum.photos/200', matched: false},
    {image:'https://picsum.photos/300', matched: false},
    {image:'https://picsum.photos/400', matched: false},
    {image:'https://picsum.photos/500', matched: false},
    {image:'https://picsum.photos/600', matched: false},
  ];
  constructor(private service: Card12serviceService , private cdr: ChangeDetectorRef) { 
  }
  ngOnInit(): void {
    this.service.numberOfUniqueImages = 6;
    this.generateCards().then(() => {
      this.generateUniqueImageArray();
    });
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
        this.cards.forEach(card => (console.log(card.image+" "+card.matched)
        ));
        // Match found
        //console.log("matching found"+this.active_cards);
        this.flippedCardIndices = [];
        this.active_cards = [];
        // Trigger change detection
        this.cdr.detectChanges();
      } 
      else {
        // No match, flip cards back
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
