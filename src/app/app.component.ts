import { Component, OnInit } from '@angular/core';
import {PollForm, PollVote} from './types';
import {PollService} from './poll-service/poll.service';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;
  activePoll = null;

  polls = this.ps.getPolls();

  constructor(private ps: PollService) {}

  ngOnInit() {
    this.ps.onEvent('pollCreated').subscribe(() => {
      this.polls = this.ps.getPolls();
    });
  }

  setActivePoll(poll) {
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100);
  }

  handlePollCreate(poll: PollForm) {
    this.ps.createPoll(poll);

  }

  handlePollVote(pollVoted: PollVote) {
    this.ps.vote(pollVoted.id, pollVoted.vote);

  }
}
