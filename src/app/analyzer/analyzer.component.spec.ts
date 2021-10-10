import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalyzerComponent} from './analyzer.component';
import {By} from "@angular/platform-browser";

describe('AnalyzerComponent', () => {
  let component: AnalyzerComponent;
  let fixture: ComponentFixture<AnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyzerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the root', () => {
    fixture.componentInstance.analyzerResult = {rule: "a rule", final: "a result", root: "boo", fusion: "k", suffix: "je"}
    fixture.detectChanges()
    let rootSpan = fixture.debugElement.query(By.css("#root"))
    expect(rootSpan).toBeTruthy()
    expect(rootSpan.nativeElement.textContent).toBe("book")
    expect(rootSpan.nativeElement).toHaveClass("root")
    expect(rootSpan).toBeTruthy()
  })

  it('should mark the fusion', () => {
    fixture.componentInstance.analyzerResult = {
      rule: "a rule",
      final: "a result",
      root: "boo",
      fusion: "k",
      suffix: "je"
    }
    fixture.detectChanges()
    let fusionSpan = fixture.debugElement.query(By.css("#fusion"))
    expect(fusionSpan).toBeTruthy()
    expect(fusionSpan.nativeElement.textContent).toBe("boo")
    expect(fusionSpan.nativeElement).toHaveClass("fusion")
    expect(fusionSpan).toBeTruthy()
  })

});
