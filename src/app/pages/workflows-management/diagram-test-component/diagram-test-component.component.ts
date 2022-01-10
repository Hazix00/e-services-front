import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagram-test-component',
  templateUrl: './diagram-test-component.component.html',
  styleUrls: ['./diagram-test-component.component.scss']
})
export class DiagramTestComponentComponent implements OnInit {

  @Input() data!: any
  constructor() { }

  ngOnInit(): void {
  }
  alert(message: string, data: any) {
    alert(message)
    console.log(data);

  }
}
