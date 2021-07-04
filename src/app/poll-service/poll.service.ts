import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Poll, PollForm} from '../types';
import {delay} from 'rxjs/operators';
import {Web3Service} from '../blokchain/web3.service';
import {fromAscii, toAscii} from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private web3: Web3Service) { }

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];
    const totalPolls = await this.web3.call('getTotalPolls');
    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);
    const voterNormalized = this.normalizeVoter(voter);

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i);
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
    }

    return polls;
  }

  vote(pollId: number, voteNumber: number) {
    this.web3.executeTransaction('vote', pollId, voteNumber);
  }

  // tslint:disable-next-line:no-shadowed-variable
  createPoll(poll: PollForm) {
    this.web3.executeTransaction(
      'createPoll',
       poll.question,
       poll.thumbnail || '',
       poll.options.map((opt) => fromAscii(opt))
    );
  }

  private normalizeVoter(voter) {
    return{
      id: voter[0],
      // tslint:disable-next-line:radix
      votedIds: voter[1].map((vote) => parseInt(vote))
    };
  }

  private normalizePoll(pollRaw, voter): Poll {
    return{
      // tslint:disable-next-line:radix
      id: parseInt(pollRaw[0]),
      question: pollRaw[1],
      thumbnail: pollRaw[2],
      // tslint:disable-next-line:radix
      results: pollRaw[3].map((vote) => parseInt(vote)),
      options: pollRaw[4].map(opt => toAscii(opt).replace(/\u0000/g, '')),
      // tslint:disable-next-line:triple-equals radix
      voted: voter.votedIds.length && voter.votedIds.find((votedId) => votedId === parseInt(pollRaw[0])) != undefined,
    };
  }

  onEvent(name: string) {
    return this.web3.onEvent(name);
  }
}
