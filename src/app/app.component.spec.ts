import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AnalyzerComponent} from "./analyzer/analyzer.component";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

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

  function checkDiminution(wordToDiminutize: string, result: string, root: string, fusion: string, suffix: string) {
    const fixture = TestBed.createComponent(AppComponent);
    const input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
    input.value = wordToDiminutize;
    fixture.detectChanges()
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    let resultParagraph = fixture.nativeElement.querySelector("app-analyzer > #final");
    expect(resultParagraph).toBeTruthy()
    let rootSpan = fixture.debugElement.query(By.css("#root"))
    expect(rootSpan).toBeTruthy()
    expect(rootSpan.nativeElement.textContent).toBe(root)
    let fusionSpan = fixture.debugElement.query(By.css("#fusion"))
    expect(fusionSpan).toBeTruthy()
    expect(fusionSpan.nativeElement.textContent).toBe(fusion)
    let suffixSpan = fixture.debugElement.query(By.css("#suffix"))
    expect(suffixSpan).toBeTruthy()
    expect(suffixSpan.nativeElement.textContent).toBe(suffix)
    expect(resultParagraph.textContent).toBe(result)
  }

  const WordStructure = [
    ["koning", "koninkje", "konin", "k", "je"],
    ["gang", "gangetje", "gang", "et", "je"],
    ["book", "bookje", "book", "", "je"],
    ["boom", "boompje", "boo", "mp", "je"],
    ["man", "mannetje", "ma", "nnet", "je"],
    ["foto", "fotootje", "fot", "oot", "je"],
    ["viezi", "viezietje", "viez", "iet", "je"],
    ["party", "party'tje", "party", "'t", "je"]
  ]

  WordStructure.forEach(wp => it(`should turn ${wp[0]} into ${wp[1]} having the root ${wp[2]}, fusion: ${wp[3]}, suffix: ${wp[4]}`, () => {
    checkDiminution(wp[0], wp[1], wp[2], wp[3], wp[4])
  }))

  it("should be empty if no input", () => {
    checkDiminution("", "", "", "", "")
  })

  it("should not be thrown off by trailing whitespace", () => {
    checkDiminution("book   ", "bookje", "book", "", "je")
  })

});
