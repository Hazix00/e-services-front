import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})
export class ChatButtonComponent implements OnInit {

  showChat = false

  constructor() { }

  toggleShowChat() {
    this.showChat = false
  }

  ngOnInit(): void {
  }

}
