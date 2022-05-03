import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>

  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  getFirstElem(tagName: string) {
    const elem = this.fixture.debugElement.query(By.css(tagName));
    return elem?.nativeElement ;
  }

  getNthElement(tagName: string, n: number){
    const elem = this.fixture.debugElement.queryAll(By.css(tagName));
    return elem[n]?.nativeElement;
  }

  getFirstElemText(tagName: string): string {
    const elem = this.fixture.debugElement.query(By.css(tagName));
    if (elem) {
      return elem.nativeElement.textContent;
    }
    return "";
  }

  getNthElementText(tagName: string, n: number){
    const elem = this.fixture.debugElement.queryAll(By.css(tagName));
    return elem[n]?.nativeElement.textContent;
  }

  countElems(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }

  findAll(tagName: string) {
    return this.fixture.debugElement
      .queryAll(By.css(tagName));
  }
}
