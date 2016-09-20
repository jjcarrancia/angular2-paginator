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

In this paginator, _firstElementMessage_ and _lastElementMessage_ are optional fields. By default they will be **<<** and **>>**.<br/>
The _onPageChange_ event action: pageChanged($event), will emit an event with the new page, to use it on your components using this directive.
