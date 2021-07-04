import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ApexCharts from 'apexcharts';
import {PollVote} from '../types';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements AfterViewInit {

  @Input() voted: boolean;
  @Input() options: string[];
  @Input() results: number[];
  @Input() question: string;
  @Input() id: number;
  @Input() Vote: number;

  @Output() pollVoted: EventEmitter<PollVote> = new EventEmitter();

  voteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      selected: this.fb.control('', [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    if (this.voted) {
      this.generateChart();
    }
  }
    submitForm() {
      const pollVoted: PollVote = {
        id: this.id,
        vote: this.voteForm.get('selected').value
      };

      this.pollVoted.emit(pollVoted);
    }

    generateChart() {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data: this.results,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: this.options,
      },
    };

    const chart = new ApexCharts(document.getElementById('poll-results'), options);
    chart.render();
    }
}
