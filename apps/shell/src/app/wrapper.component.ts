import { AfterContentInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { registry } from './registry';

@Component({
  template: '<div #vc></div>',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class WrapperComponent implements AfterContentInit {

  @ViewChild('vc', { read: ElementRef, static: true })
  vc!: ElementRef<any>;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private route: ActivatedRoute) { }

  ngAfterContentInit(): void {

    const elementName = this.route.snapshot.data['elementName'];
    const importName = this.route.snapshot.data['importName'] as keyof typeof registry;

    const importFn = registry[importName];

    console.log('importing', importName, 'from registry', importFn);
    console.log('elementName', elementName);
    importFn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(_ => console.debug(`element ${elementName} loaded!`))
      .catch((err: any) => console.error(`error loading ${elementName}:`, err));

    const element = document.createElement(elementName);
    this.vc.nativeElement.appendChild(element);

  }

}
