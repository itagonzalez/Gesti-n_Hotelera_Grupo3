import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookRoomPageRoutingModule } from './book-room-routing.module';

import { BookRoomPage } from './book-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookRoomPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BookRoomPage]
})
export class BookRoomPageModule {}
