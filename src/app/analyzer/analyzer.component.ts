import {Component, Input, OnInit} from '@angular/core';
import {AnalyzerResult} from "../analyzer-result";

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {

  @Input() analyzerResult: AnalyzerResult = {rule: "", final: ""}

  constructor() {
  }

  ngOnInit(): void {
  }

}
