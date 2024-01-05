import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: string="";
  @Input() isFlipped: boolean=false;
  @Input() isMatched: boolean=false ;
  @Output() cardClicked = new EventEmitter<void>();

  handleCardClick(): void {
    if (!this.isFlipped) {
      this.cardClicked.emit();
    }
  }
 /* @Input() card: string = '';
  @Output() cardClicked = new EventEmitter<string>();
  isHidden: boolean = false;
  private _isFlipped: boolean = false;
  isMatched: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  get isFlipped(): boolean {
    return this._isFlipped;
  }

  set isFlipped(value: boolean) {
    if (value !== this._isFlipped) {
      this._isFlipped = value;
      this.cd.detectChanges();
    }
  }

  ngOnInit(): void {
    this.isFlipped = false;
    this.isMatched = false;
  }

  handleCardClick(): void {
    console.log("clicked is called");
    if (!this.isFlipped && !this.isMatched && !this.isHidden) {
      this.isFlipped = true;
      this.cardClicked.emit(this.card);
    }
  }

  flipBack(): void {
    console.log("flipping " + this.card + " " + this.isFlipped);
    this.isFlipped = false;
  }

  markAsMatched(): void {
    this.isMatched = true;
    this.isHidden = true; // Hide the image when matched
    console.log(this.isHidden);
  }

  async handleSelectedCardClick(): Promise<void> {
    if (!this.isFlipped && !this.isMatched && !this.isHidden) {
      this.isFlipped = true;
      this.cardClicked.emit(this.card);
      await this.delay(1000); // Adjust the duration in milliseconds
      this.flipBack();
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }*/
}
