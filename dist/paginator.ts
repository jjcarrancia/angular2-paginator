import {Component, OnChanges, OnInit, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "angular2-paginator",
    template: `
    <div *ngIf="totalItems > 10">
      <ul class="pagination-ss">
        <li *ngIf="(block !== 0) && (lastBlock > 0)" (click)="changePage(1)">{{first}}</li>
        <li *ngIf="actualPage !== 1" (click)="changePage(actualPage - 1)"> < </li>
        <li [ngClass]="{'active': (pageNumber == actualPage)}" *ngFor="let pageNumber of pages[block]" (click)="changePage(pageNumber)">{{pageNumber}}</li>
        <li *ngIf="actualPage !== lastPage" (click)="changePage(actualPage + 1)"> > </li>
        <li *ngIf="(lastBlock > block) && (lastBlock > 0)" (click)="changePage(lastPage)">{{last}}</li>
      </ul>
    </div>
  `,
    styles: [`
    ul.pagination-ss{
      display: inline-block;
      padding-left: 0;
      margin: 20px 0;
      border-radius: 4px;
    }
    ul.pagination-ss li{
      list-style-type: none;
      float: left;
      padding: 6px 12px;
      color: #00a9e0;
      border: 1px solid #d1d1d1;
      margin-left: -1px;
      font-size: 15px;
    }
    ul.pagination-ss li.active{
      background-color: #dedede;
      box-shadow: inset 0 3px 5px rgba(0,0,0,0.05);
    }
    ul.pagination-ss li:hover{
      cursor: pointer;
      background-color: #e2e2e2;
    }
    ul.pagination-ss li:first-child{
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    ul.pagination-ss li:last-child{
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    `]
})

export class Paginator implements OnChanges, OnInit {
    pages: Array<any> = [];
    actualPage: number;
    lastPage: number;
    block: number;
    lastBlock: number;
    first: string;
    last: string;
    psize: number;
    bsize: number;
    /* Inputs */
    @Input() pageSize: number;
    @Input() totalItems: number;
    @Input() blockSize: number;
    @Input() firstElementMessage: string;
    @Input() lastElementMessage: string;
    /* Outputs */
    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.actualPage = 1;
        this.block = 0;
    }

    ngOnInit() {
        if (this.pageSize && this.pageSize > 0) {
            this.psize = this.pageSize;
        } else {
            this.psize = 10;
        }
        if (this.blockSize && this.blockSize > 0) {
            this.bsize = this.blockSize;
        } else {
            this.bsize = 5;
        }
        if (this.firstElementMessage || this.firstElementMessage === "") {
            this.first = this.firstElementMessage;
        } else {
            this.first = "<<";
        }
        if (this.lastElementMessage || this.lastElementMessage === "") {
            this.last = this.lastElementMessage;
        } else {
            this.last = ">>";
        }
    }

    ngOnChanges(change) {
        this.lastPage = Math.ceil(this.totalItems / this.psize);
        this.lastBlock = Math.ceil(this.lastPage / this.bsize) - 1;
        this.pages = [];
        for (let b = 0; b <= this.lastBlock; b++) {
            this.pages.push([]);
        }
        let indexBlock = 0;
        for (let i = 1; i <= this.lastPage; i++) {
            this.pages[indexBlock].push(i);
            if (i % this.bsize === 0) {
                indexBlock++;
            }
        }
        if (change.totalItems.currentValue % this.psize === 0 && change.totalItems.previousValue % this.psize === 1) {
            this.deletePage();
        }
    }

    deletePage() {
        if (this.actualPage > this.lastPage) {
            this.actualPage--;
            this.block = Math.ceil(this.actualPage / this.bsize) - 1;
            this.lastPage = Math.ceil(this.totalItems / this.psize);
            this.lastBlock = Math.ceil(this.lastPage / this.bsize) - 1;
            this.onPageChange.emit(this.actualPage);
        }
    }

    changePage(n: number) {
        if (this.actualPage !== n && n > 0 && n <= this.lastPage) {
            this.block = Math.ceil(n / this.bsize) - 1;
            this.actualPage = n;
            this.onPageChange.emit(this.actualPage);
        }
    }
}
