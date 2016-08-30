"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Paginator = (function () {
    function Paginator() {
        this.pages = [];
        /* Outputs */
        this.onPageChange = new core_1.EventEmitter();
        this.actualPage = 1;
        this.block = 0;
    }
    Paginator.prototype.ngOnInit = function () {
        if (this.firstElementMessage || this.firstElementMessage === "") {
            this.first = this.firstElementMessage;
        }
        else {
            this.first = "<<";
        }
        if (this.lastElementMessage || this.lastElementMessage === "") {
            this.last = this.lastElementMessage;
        }
        else {
            this.last = ">>";
        }
    };
    Paginator.prototype.ngOnChanges = function (change) {
        this.lastPage = Math.ceil(this.totalItems / this.pageSize);
        this.lastBlock = Math.ceil(this.lastPage / this.blockSize) - 1;
        this.pages = [];
        for (var b = 0; b <= this.lastBlock; b++) {
            this.pages.push([]);
        }
        var indexBlock = 0;
        for (var i = 1; i <= this.lastPage; i++) {
            this.pages[indexBlock].push(i);
            if (i % this.blockSize === 0) {
                indexBlock++;
            }
        }
        if (change.totalItems.currentValue % this.pageSize === 0 && change.totalItems.previousValue % this.pageSize === 1) {
            this.deletePage();
        }
    };
    Paginator.prototype.deletePage = function () {
        if (this.actualPage > this.lastPage) {
            this.actualPage--;
            this.block = Math.ceil(this.actualPage / this.blockSize) - 1;
            this.lastPage = Math.ceil(this.totalItems / this.pageSize);
            this.lastBlock = Math.ceil(this.lastPage / this.blockSize) - 1;
            this.onPageChange.emit(this.actualPage);
        }
    };
    Paginator.prototype.changePage = function (n) {
        if (this.actualPage !== n && n > 0 && n <= this.lastPage) {
            this.block = Math.ceil(n / this.blockSize) - 1;
            this.actualPage = n;
            this.onPageChange.emit(this.actualPage);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "totalItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "blockSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Paginator.prototype, "firstElementMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Paginator.prototype, "lastElementMessage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Paginator.prototype, "onPageChange", void 0);
    Paginator = __decorate([
        core_1.Component({
            selector: "angular2-paginator",
            template: "\n    <div *ngIf=\"totalItems > 10\">\n      <ul class=\"pagination-ss\">\n        <li *ngIf=\"(block !== 0) && (lastBlock > 0)\" (click)=\"changePage(1)\">{{first}}</li>\n        <li *ngIf=\"actualPage !== 1\" (click)=\"changePage(actualPage - 1)\"> < </li>\n        <li [ngClass]=\"{'active': (pageNumber == actualPage)}\" *ngFor=\"let pageNumber of pages[block]\" (click)=\"changePage(pageNumber)\">{{pageNumber}}</li>\n        <li *ngIf=\"actualPage !== lastPage\" (click)=\"changePage(actualPage + 1)\"> > </li>\n        <li *ngIf=\"(lastBlock > block) && (lastBlock > 0)\" (click)=\"changePage(lastPage)\">{{last}}</li>\n      </ul>\n    </div>\n  ",
            styles: ["\n    ul.pagination-ss{\n      display: inline-block;\n      padding-left: 0;\n      margin: 20px 0;\n      border-radius: 4px;\n    }\n    ul.pagination-ss li{\n      float: left;\n      padding: 6px 12px;\n      color: #00a9e0;\n      border: 1px solid #d1d1d1;\n      margin-left: -1px;\n      font-size: 15px;\n    }\n    ul.pagination-ss li.active{\n      background-color: #dedede;\n      box-shadow: inset 0 3px 5px rgba(0,0,0,0.05);\n    }\n    ul.pagination-ss li:hover{\n      cursor: pointer;\n      background-color: #e2e2e2;\n    }\n    ul.pagination-ss li:first-child{\n      border-top-left-radius: 4px;\n      border-bottom-left-radius: 4px;\n    }\n    ul.pagination-ss li:last-child{\n      border-top-right-radius: 4px;\n      border-bottom-right-radius: 4px;\n    }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], Paginator);
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=paginator.js.map