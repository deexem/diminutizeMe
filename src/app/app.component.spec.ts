import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AnalyzerComponent} from "./analyzer/analyzer.component";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        AnalyzerComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'diminutizeMe'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('diminutizeMe');
  });

  function checkDiminution(wordToDiminutize: string, result: string) {
    const fixture = TestBed.createComponent(AppComponent);
    const input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
    input.value = wordToDiminutize;
    fixture.detectChanges()
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect(fixture.componentInstance.analyzerResult).not.toBeUndefined();
    const {final} = fixture.componentInstance.analyzerResult!;
    expect(final).toBe(result)
  }

  it("should diminutize koning", () => {
    checkDiminution("koning", "koninkje");
  });

  it("should diminutize gang", () =>{
    checkDiminution("gang", "gangetje");
  })

  it("should diminutize book", () => {
    checkDiminution("book", "bookje")
  })

  it("should diminutize boom", () => {
    checkDiminution("boom", "boompje")
  })

  it("should diminutize man", () => {
    checkDiminution("man", "mannetje")
  })

  it("should diminutize foto", () => {
    checkDiminution("foto", "fotootje")
  })

  it("should be empty if no input", () => {
    checkDiminution("", "")
  })

});
