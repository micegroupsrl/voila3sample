import { Component, ElementRef, NgZone, OnInit, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatService, Message } from 'src/app/utilities/services/chat.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileDialog } from 'src/app/layout/profile/profile-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    @ViewChild('scrollframe', { static: false }) scrollFrame!: ElementRef;
    @ViewChildren('message') itemElements!: QueryList<any>;

    private isNearBottom = true;
    private scrollContainer: any;
    messages: Message[] = [];
    public form!: FormGroup;
    value!: string;
    firstMsg = true;
    index = 0;
    isLoading = false;
    isOpen = true;
    isMessageStarted = true;
    empty = false;
    position = { x: 0, y: 0 };
    positionClosed = { x: window.innerWidth / 2, y: 100 };
    versions = [
        {
            width: '25px',
            height: '7.5px',
            color: '#3f51b5a1'
        }
    ];
    mobileQuery: MediaQueryList;
    
    // Subscriptions
    private subscriptions = new Subscription();

    constructor(
        public chatService: ChatService,
        private _mdr: MatDialogRef<ProfileDialog>,
        private zone: NgZone,
        private fb: FormBuilder,
        media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    }

    audioFile = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3');

    playFile() {
        this.audioFile.play();
    }

    public onDragEnded(event: CdkDragEnd): void {
        this.position = { x: event.source.getFreeDragPosition().x, y: event.source.getFreeDragPosition().y }; // returns { x: 0, y: 0 }
    }

    ngOnInit() {
        this._mdr.updatePosition({ bottom: '0px', right: (window.innerWidth / 20).toString() + 'px' });
        this.form = this.fb.group({
            thePrivilegePerRole: ''
        });

        this.subscriptions.add(
            this.chatService.conversation.subscribe(val => {
                if (val.at(0)!.author == 'user') {
                    this.messages = this.messages.concat(val);
                    this.index++;
                    this.firstMsg = true;
                    this.isLoading = true;
                    this.isMessageStarted = true;
                }

                if (val.at(0)!.author == 'bot' && this.firstMsg) {
                    this.isLoading = false;
                    this.messages = this.messages.concat(val);
                    this.index++;
                    this.firstMsg = false;
                    this.scrollToBottom();
                } else if (val.at(0)!.author == 'bot' && this.firstMsg === false) {
                    this.messages.at(this.index - 1)!.content = this.messages.at(this.index - 1)!.content + val.at(0)!.content;
                    if (this.isMessageStarted === true) {
                        this.playFile();
                    }
                    this.scrollToBottom();
                    this.isMessageStarted = false;
                }
            })
        );
    }

    ngAfterViewInit() {
        this.scrollContainer = this.scrollFrame.nativeElement;
        this.subscriptions.add(
            this.itemElements.changes.subscribe(_ => this.onItemElementsChanged())
        );
    }

    get getForm() {
        return this.form.get('thePrivilegePerRole') as FormControl;
    }

    private scrollToBottom(): void {
        this.scrollContainer.scroll({
            top: this.scrollContainer.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    private isUserNearBottom(): boolean {
        const threshold = 150;
        const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
        const height = this.scrollContainer.scrollHeight;
        return position > height - threshold;
    }

    private onItemElementsChanged(): void {
        if (this.isNearBottom) {
            this.scrollToBottom();
        }
    }

    scrolled(event: any): void {
        this.isNearBottom = this.isUserNearBottom();
    }

    sendMessage() {
        this.chatService.getBotAnswer(this.getForm.value);
        this.getForm.setValue('');
        this.scrollToBottom();
    }

    close() {
        this._mdr.close(false);
    }

    refresh() {
        this.messages = [];
        this.chatService = new ChatService(this.zone);
    }

    windowed() {
        this.isOpen = false;

        this.position = { x: 0 - this.position.x, y: 0 - this.position.y };
        this._mdr.updatePosition({ bottom: '0px', right: (window.innerWidth / 20).toString() + 'px' });

        if (this.mobileQuery.matches) {
            this._mdr.updateSize('250px', '62px');
        } else this._mdr.updateSize('340px', '62px');
    }

    openWindow() {
        this.isOpen = true;

        this.position = { x: 0, y: 0 };
        this._mdr.updateSize('auto', 'auto');
    }

    changePosition() {
        this.position = { x: this.position.x, y: this.position.y };
    }

    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this.subscriptions.unsubscribe();
    }
}
