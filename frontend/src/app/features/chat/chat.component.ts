// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ChatService } from '../../core/services/chat.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.scss'],
// })
// export class ChatComponent implements OnInit, OnDestroy {
//   username = 'User1';
//   room = 'General';
//   message = '';
//   messages: any[] = [];

//   constructor(private chatService: ChatService) {}

//   ngOnInit(): void {
//     // Join chat room
//     this.chatService.joinRoom(this.username, this.room);

//     // Listen for messages
//     this.chatService.onMessage().subscribe((data) => {
//       this.messages.push(data);
//     });

//     this.chatService.onPrivateMessage().subscribe((data) => {
//       this.messages.push({ text: `[Private] ${data.sender}: ${data.message}` });
//     });

//     this.chatService.onGroupMessage().subscribe((data) => {
//       this.messages.push({ text: `[Group] ${data.sender}: ${data.message}` });
//     });
//   }

//   sendMessage() {
//     if (this.message.trim()) {
//       this.chatService.sendGroupMessage(this.room, this.username, this.message);
//       this.message = '';
//     }
//   }

//   ngOnDestroy(): void {
//     this.chatService.leaveRoom(this.username, this.room);
//   }
// }


// import { Component } from '@angular/core';
// import { ChatService } from '../../core/services/chat.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.scss'],
// })
// export class ChatComponent {
//   chatOpen = false;
//   // username = 'User1';
//   username1: string = '';
//   user: any;
//   room = 'General';
//   message = '';
//   messages: any[] = [];

//   constructor(private chatService: ChatService) {
    
//   }

//   ngOnInit(): void {
//       this.chatService.getUserById().subscribe({
//         next: (data) => {
//           console.log(data);
//           this.user = data;
//           this.username1 = this.user.username;
//           this.chatService.joinRoom(this.username1, this.room);
//         },
//         error: (err) => {
//           console.error('Error fetching user', err);
//         }
//     })



//     this.chatService.onMessage().subscribe((data) => {
//       this.messages.push(data);
//     });

//     this.chatService.onPrivateMessage().subscribe((data) => {
//       this.messages.push({ sender: `[Private] ${data.sender}`, text: data.message });
//     });

//     this.chatService.onGroupMessage().subscribe((data) => {
//       this.messages.push({ sender: `[chat] ${data.sender}`, text: data.message });
//     });
//   }

//   toggleChat() {
//     this.chatOpen = !this.chatOpen;
//   }

//   sendMessage() {
//     if (this.message.trim()) {
//       this.chatService.sendGroupMessage(this.room, this.username1, this.message);
//       this.message = '';
//     }
//   }

//   ngOnDestroy(): void {
//     this.chatService.leaveRoom(this.username1, this.room);
//   }
// }


// import { Component } from '@angular/core';
// import { ChatService } from '../../core/services/chat.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.scss'],
// })
// export class ChatComponent {
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
//         this.joinRoom(this.room);
//       },
//       error: (err) => {
//         console.error('Error fetching user', err);
//       }
//     });

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
//     this.chatOpen = !this.chatOpen;
//   }

//   sendMessage() {
//     if (this.message.trim()) {
//       this.chatService.sendGroupMessage(this.room, this.username, this.message);
//       this.message = '';
//     }
//   }

//   joinRoom(room: string) {
//     this.chatService.leaveRoom(this.username, this.room);
//     this.room = room;
//     this.messages = []; // Clear chat history when switching rooms
//     this.chatService.joinRoom(this.username, this.room);
//   }

//   changeRoom() {
//     this.joinRoom(this.room);
//   }

//   createRoom() {
//     if (this.newRoom.trim() && !this.availableRooms.includes(this.newRoom)) {
//       this.availableRooms.push(this.newRoom);
//       this.joinRoom(this.newRoom);
//       this.newRoom = '';
//     }
//   }

//   ngOnDestroy(): void {
//     this.chatService.leaveRoom(this.username, this.room);
//   }
// }


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
  availableRooms: string[] = ['General', 'Tech Talk', 'Random']; // Default rooms

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getUserById().subscribe({
      next: (data) => {
        this.user = data;
        this.username = this.user.username;
        this.joinRoom(this.room); // Automatically join default room on init
      },
      error: (err) => {
        console.error('Error fetching user', err);
      }
    });

    // Listen for messages (group and private)
    this.chatService.onMessage().subscribe((data) => {
      this.messages.push(data);
    });

    this.chatService.onPrivateMessage().subscribe((data) => {
      this.messages.push({ sender: `[Private] ${data.sender}`, text: data.message });
    });

    this.chatService.onGroupMessage().subscribe((data) => {
      this.messages.push({ sender: `[Group] ${data.sender}`, text: data.message });
    });
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen; // Toggle the chat window visibility
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chatService.sendGroupMessage(this.room, this.username, this.message);
      this.message = ''; // Clear input after sending
    }
  }

  joinRoom(room: string) {
    this.chatService.leaveRoom(this.username, this.room); // Leave the current room
    this.room = room;
    this.messages = []; // Clear messages when switching rooms
    this.chatService.joinRoom(this.username, this.room); // Join the new room
  }

  createRoom() {
    if (this.newRoom.trim() && !this.availableRooms.includes(this.newRoom)) {
      this.availableRooms.push(this.newRoom); // Add new room to available rooms
      this.joinRoom(this.newRoom); // Join the newly created room
      this.newRoom = ''; // Clear new room input
    }
  }

  ngOnDestroy(): void {
    this.chatService.leaveRoom(this.username, this.room); // Ensure user leaves the room on component destruction
  }
}
