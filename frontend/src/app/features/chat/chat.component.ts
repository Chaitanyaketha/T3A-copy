
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ChatService } from '../../core/services/chat.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.scss'],
// })
// export class ChatComponent implements OnInit, OnDestroy {
//   chatOpen = false;
//   username: string = '';
//   user: any;
//   room = 'General';
//   newRoom = '';
//   message = '';
//   messages: any[] = [];
//   availableRooms: string[] = ['General', 'Tech Talk', 'Random']; // Default rooms

//   constructor(private chatService: ChatService) {}

//   ngOnInit(): void {
//     this.chatService.getUserById().subscribe({
//       next: (data) => {
//         this.user = data;
//         this.username = this.user.username;
//         this.joinRoom(this.room); // Automatically join default room on init
//       },
//       error: (err) => {
//         console.error('Error fetching user', err);
//       }
//     });

//     // Listen for messages (group and private)
//     this.chatService.onMessage().subscribe((data) => {
//       this.messages.push(data);
//     });

//     this.chatService.onPrivateMessage().subscribe((data) => {
//       this.messages.push({ sender: `[Private] ${data.sender}`, text: data.message });
//     });

//     this.chatService.onGroupMessage().subscribe((data) => {
//       this.messages.push({ sender: `[Group] ${data.sender}`, text: data.message });
//     });
//   }

//   toggleChat() {
//     this.chatOpen = !this.chatOpen; // Toggle the chat window visibility
//   }

//   sendMessage() {
//     if (this.message.trim()) {
//       this.chatService.sendGroupMessage(this.room, this.username, this.message);
//       this.message = ''; // Clear input after sending
//     }
//   }

//   joinRoom(room: string) {
//     this.chatService.leaveRoom(this.username, this.room); // Leave the current room
//     this.room = room;
//     this.messages = []; // Clear messages when switching rooms
//     this.chatService.joinRoom(this.username, this.room); // Join the new room
//   }

//   createRoom() {
//     if (this.newRoom.trim() && !this.availableRooms.includes(this.newRoom)) {
//       this.availableRooms.push(this.newRoom); // Add new room to available rooms
//       this.joinRoom(this.newRoom); // Join the newly created room
//       this.newRoom = ''; // Clear new room input
//     }
//   }

//   ngOnDestroy(): void {
//     this.chatService.leaveRoom(this.username, this.room); // Ensure user leaves the room on component destruction
//   }
// }
// // chat.component.ts


import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chatOpen = false;
  username: string = '';
  user: any;
  room = 'General';
  newRoom = '';
  message = '';
  messages: any[] = [];
  availableRooms: string[] = ['General', 'Tech Talk', 'Random'];
  
  activeUsers: string[] = []; // List of active users
  privateChatUser: string = ''; // Selected user for private chat

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getUserById().subscribe({
      next: (data) => {
        this.user = data;
        this.username = this.user.username;
        this.joinRoom(this.room);
      },
      error: (err) => {
        console.error('Error fetching user', err);
      }
    });

    this.chatService.onMessage().subscribe((data) => {
      this.messages.push(data);
    });

    this.chatService.onPrivateMessage().subscribe((data) => {
      this.messages.push({ sender: `[Private] ${data.sender}`, text: data.message });
    });

    this.chatService.onGroupMessage().subscribe((data) => {
      this.messages.push({ sender: `[Group] ${data.sender}`, text: data.message });
    });

    this.chatService.getActiveUsers().subscribe((users) => {
      this.activeUsers = users;
    });
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }

  sendMessage() {
    if (this.message.trim()) {
      if (this.privateChatUser) {
        this.chatService.sendPrivateMessage(this.privateChatUser, this.username, this.message);
        this.messages.push({ sender: `You (Private to ${this.privateChatUser})`, text: this.message });
      } else {
        this.chatService.sendGroupMessage(this.room, this.username, this.message);
      }
      this.message = '';
    }
  }

  joinRoom(room: string) {
    this.chatService.leaveRoom(this.username, this.room);
    this.room = room;
    this.messages = [];
    this.chatService.joinRoom(this.username, this.room);
  }

  createRoom() {
    if (this.newRoom.trim() && !this.availableRooms.includes(this.newRoom)) {
      this.availableRooms.push(this.newRoom);
      this.joinRoom(this.newRoom);
      this.newRoom = '';
    }
  }

  startPrivateChat(user: string) {
    this.privateChatUser = user;
    this.room = ''; // Clear room selection
    this.messages = [];
  }

  closePrivateChat() {
    this.privateChatUser = '';
    this.messages = [];
  }

  ngOnDestroy(): void {
    this.chatService.leaveRoom(this.username, this.room);
  }
}
