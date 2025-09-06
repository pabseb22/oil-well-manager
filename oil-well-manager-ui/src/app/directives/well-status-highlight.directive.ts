import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[wellStatusHighlight]',
  standalone: true
})
export class WellStatusHighlightDirective implements OnChanges {
  @Input('wellStatusHighlight') status: 'activo' | 'inactivo' | string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.status === 'activo') {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#4bb67699');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'background 0.2s');
    } else if (this.status === 'inactivo') {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#b4505084');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'background 0.2s');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background');
    }
  }
}
