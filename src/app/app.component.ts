import {Component} from '@angular/core';
import {AnalyzerResult} from "./analyzer-result";
import {DiminutionService} from "./analyzer/diminution.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  wordToDiminutize: string
  analyzerResult: AnalyzerResult = {rule:"", final: ""}

  constructor(private diminutionService: DiminutionService) {
    this.wordToDiminutize = ""
  }


  title = 'diminutizeMe';

  analyze() {
    this.analyzerResult = this.diminutionService.diminutize(this.wordToDiminutize)
  }
}
