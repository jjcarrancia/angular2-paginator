# angular2-paginator
A pagination module for Angular2 apps.

How to use:
```
  <angular2-paginator
    [pageSize]="elementsByPage"
    [totalItems]="totalItems"
    [blockSize]="pagesByBlock"
    (onPageChange)="pageChanged($event)"
    [firstElementMessage]="'First'"
    [lastElementMessage]="'Last'">
  </angular2-paginator>
```
The _onPageChange_ event action: pageChanged($event), will emit an event with the new page, to use it on your components using this directive.

> **Optional fields:**  

> - _firstElementMessage_ - By default **<<**.
> - _lastElementMessage_ - By default **>>**.
> - _pageSize_ - By default **10**.
> - _blockSize_ - By default **5**.
