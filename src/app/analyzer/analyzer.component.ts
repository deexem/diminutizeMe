import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {

  @Input() finalWord: string = ""

  constructor() {
  }

  ngOnInit(): void {
  }

}
