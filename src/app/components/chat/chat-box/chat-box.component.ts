import { Component,ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  @Input() showChat!: boolean;
  @Output() toggleShowChat = new EventEmitter();

  chatIsVisible = false

  // @HostListener('click')
  // clickInside() {
  //   this.wasInside = true;
  // }

  @HostListener('document:click')
  clickout() {
    if(this.showChat && this.chatIsVisible) {
      this.toggleShowChat.emit();
      this.chatIsVisible = false
    }
    else if(this.showChat && !this.chatIsVisible) {
      this.chatIsVisible = true
    }
    else if(!this.showChat) {
      this.chatIsVisible = false
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
