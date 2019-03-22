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
    private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.someFunc(this.showTheseOnly);
    this.cmpFactory = this.cfr.resolveComponentFactory(ShowAllShowFewComponent);
    this.cmpRef = this.container.createComponent(this.cmpFactory);
    this.cmpRef.instance['emitShow']
      .subscribe(v => {
        this.showTheseOnly = v ? this.appNgLoopCount : this.appNgLoopOf.length;
        this.container.detach();
        this.container.clear();
        this.someFunc(this.showTheseOnly);
        this.container.insert(this.cmpRef.hostView);
      });

  }

  ngOnChanges() {
    console.log('onChanges');
  }

  someFunc(range) {
    for (const input of this.appNgLoopOf.slice(0, range)) {
      this.container.createEmbeddedView(this.template, {
        $implicit: input,
        index: this.appNgLoopOf.indexOf(input),
      });
    }
  }
}

