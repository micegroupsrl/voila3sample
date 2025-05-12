import { Injectable, NgZone } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Message {
    constructor(
        public author: string,
        public content: string
    ) {}
}

@Injectable()
export class ChatService {
    audioFile = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3');
    constructor(private zone: NgZone) {}

    conversation = new Subject<Message[]>();

    getBotAnswer(msg: string) {
        const eventSource = new EventSourcePolyfill(environment.intellivize + msg, {
            headers: {
                Authorization: `Bearer ` + environment.chatBotToken
            }
        });

        let answer = '';

        eventSource.onmessage = async event => {
            const messageData = JSON.parse(event.data);

            //this.zone.runTask()

            if (!messageData.chatTitle && messageData.choices.at(0).delta.content) {
                const mess = new Message('bot', messageData.choices.at(0).delta.content);
                this.conversation.next([mess]);
                answer = answer + messageData.choices.at(0).delta.content;
            }
            if (messageData.chatTitle) {
                eventSource.close();
            }
        };

        const userMessage = new Message('user', msg);
        this.conversation.next([userMessage]);
    }

    playFile() {
        this.audioFile.play();
    }

    playAudio() {
        this.playFile();
    }

    getBotMessage(msg: string) {
        return msg;
    }
}
