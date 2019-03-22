import {
  Directive,
  ViewContainerRef,
  OnChanges,
  TemplateRef,
  Input,
  ComponentFactoryResolver,
  OnInit,
  ComponentFactory,
  ComponentRef
} from '@angular/core';

import { ShowAllShowFewComponent } from './show-all-show-few/show-all-show-few.component'

@Directive({
  selector: '[appNgLoop]'
})
export class NgLoopDirective implements OnChanges, OnInit {
  @Input() appNgLoopOf: Array<any> = [];
  @Input() appNgLoopCount: number;

  cmpFactory: ComponentFactory<any>;
  cmpRef: ComponentRef<any>;

  private showTheseOnly = 4;

  constructor(private template: TemplateRef<any>,
    private container: ViewContainerRef,
    private cfr: ComponentFactoryResolver) {
    this.someFunc();
  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.cmpFactory = this.cfr.resolveComponentFactory(ShowAllShowFewComponent);
    this.cmpRef = this.container.createComponent(this.cmpFactory);
    this.cmpRef.instance['emitShow']
      .subscribe(v => {
        this.showTheseOnly = v ? this.appNgLoopCount : this.appNgLoopOf.length;
        console.log(this.appNgLoopOf);
        console.log('after app')
        console.log(this.showTheseOnly);
        this.someFunc();
  console.log(this.container.get(0));
      });
  }

  someFunc() {
    for (const input of this.appNgLoopOf.slice(0, this.showTheseOnly)) {
      this.container.createEmbeddedView(this.template, {
        $implicit: input,
        index: this.appNgLoopOf.indexOf(input),
      });
    }
  }
}

