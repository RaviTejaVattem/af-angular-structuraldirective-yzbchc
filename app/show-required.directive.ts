import {
  Directive,
  ViewContainerRef,
  OnChanges,
  TemplateRef,
  Input,
  ComponentFactoryResolver,
  OnInit,
  ComponentFactory,
  ComponentRef,
  SimpleChanges
} from '@angular/core';

import { ShowAllShowFewComponent } from './show-all-show-few/show-all-show-few.component'

@Directive({
  selector: '[showRequired]'
})
export class ShowRequiredDirective implements OnChanges, OnInit {
  @Input() showRequiredOf: Array<any> = [];
  @Input() showRequiredCount: number;

  cmpFactory: ComponentFactory<any>;
  cmpRef: ComponentRef<any>;

  private showTheseOnly = 4;

  constructor(private template: TemplateRef<any>,
    private container: ViewContainerRef,
    private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    if (this.showRequiredCount <= this.showRequiredOf.length) {
      this.cmpFactory = this.cfr.resolveComponentFactory(ShowAllShowFewComponent);
      this.cmpRef = this.container.createComponent(this.cmpFactory);
      this.cmpRef.instance['emitShow']
        .subscribe(v => {
          this.showTheseOnly = v ? this.showRequiredCount : this.showRequiredOf.length;
          this.container.detach();
          this.container.clear();
          this.createEmbeddedView(this.showTheseOnly);
          this.container.insert(this.cmpRef.hostView);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showRequiredOf']) {
      console.warn('input Changed');
      this.createEmbeddedView(this.showRequiredCount);
    }
  }

  createEmbeddedView(range) {
    for (const input of this.showRequiredOf.slice(0, range)) {
      this.container.createEmbeddedView(this.template, {
        $implicit: input,
        index: this.showRequiredOf.indexOf(input),
      });
    }
  }
}

