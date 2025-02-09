// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class ChatService {
//   private socket: Socket;
//   private apiUrl = `${environment.apiUrl}/api/v1/user/getData`; // URL for user data

//   constructor(private http: HttpClient) {
//     this.socket = io('http://localhost:4000'); // Replace with your backend URL
//   }

//   // Get user details (e.g., username)
//   getUserById(): Observable<any> {
//     return this.http.get(`${this.apiUrl}`);
//   }

//   // Join Room
//   joinRoom(username: string, room: string) {
//     this.socket.emit('joinRoom', { username, room });
//   }

//   // Leave Room
//   leaveRoom(username: string, room: string) {
//     this.socket.emit('leaveRoom', { username, room });
//   }

//   // Send Private Message
//   sendPrivateMessage(receiver: string, sender: string, message: string) {
//     this.socket.emit('privateMessage', { sender, receiver, message });
//   }

//   // Send Group Message
//   sendGroupMessage(room: string, sender: string, message: string) {
//     this.socket.emit('groupMessage', { room, sender, message });
//   }

//   // Listen for Group Messages
//   onGroupMessage(): Observable<any> {
//     return new Observable((observer) => {
//       this.socket.on('groupMessage', (data) => {
//         observer.next(data);
//       });
//     });
//   }

//   // Listen for Private Messages
//   onPrivateMessage(): Observable<any> {
//     return new Observable((observer) => {
//       this.socket.on('privateMessage', (data) => {
//         observer.next(data);
//       });
//     });
//   }

//   // Listen for General Messages
//   onMessage(): Observable<any> {
//     return new Observable((observer) => {
//       this.socket.on('message', (data) => {
//         observer.next(data);
//       });
//     });
//   }

//   // Disconnect Socket
//   disconnect() {
//     this.socket.disconnect();
//   }
// }

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private apiUrl = `${environment.apiUrl}/api/v1/user/getData`;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:4000'); // Update with your backend URL
  }

  getUserById(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  joinRoom(username: string, room: string) {
    this.socket.emit('joinRoom', { username, room });
  }

  leaveRoom(username: string, room: string) {
    this.socket.emit('leaveRoom', { username, room });
  }

  sendPrivateMessage(receiver: string, sender: string, message: string) {
    this.socket.emit('privateMessage', { sender, receiver, message });
  }

  sendGroupMessage(room: string, sender: string, message: string) {
    this.socket.emit('groupMessage', { room, sender, message });
  }

  onGroupMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('groupMessage', (data) => {
        observer.next(data);
      });
    });
  }

  onPrivateMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('privateMessage', (data) => {
        observer.next(data);
      });
    });
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  getActiveUsers(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('activeUsers', (users) => {
        observer.next(users);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
