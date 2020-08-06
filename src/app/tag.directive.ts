import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[tagHost]',
})
export class TagDirective {
    constructor(public viewContainerRef:ViewContainerRef) {
        
    }
}