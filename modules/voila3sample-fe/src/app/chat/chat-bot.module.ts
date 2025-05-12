import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat.component';
import { ChatService } from '../utilities/services/chat.service';

@NgModule({
    imports: [SharedModule],
    exports: [ChatComponent],
    declarations: [ChatComponent],
    providers: [ChatService]
})
export class ChatBotModule {}
