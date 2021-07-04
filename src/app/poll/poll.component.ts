import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  @Input() question: string;
  @Input() votes: number[];
  @Input() voted: boolean;
  @Input() pollImage: string;

  numofVotes: number;

  constructor() {
  }

  ngOnInit(): void {
    if (this.votes.length) {
      this.numofVotes = this.votes.reduce((acc, curr) => {
        return acc += curr;
      });
    }
  }

}
