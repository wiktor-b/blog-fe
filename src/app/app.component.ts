'use client';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'blog-fe';
  userService = inject(UserService);
  constructor() {
    const user = this.userService.getUserFromStorage();
    const randomUser = `user_${Math.floor(Math.random() * 40000)}`;
    if (!user) {
      this.userService.createUser(randomUser).subscribe((user) => {
        console.log('user created', user);
        this.userService.saveUserToStorage(user);
      });
    }
  }
}
