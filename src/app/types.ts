export interface Poll extends PollForm {
  id: number;
  results: number[];
  voted: boolean;
}

// tslint:disable-next-line:no-empty-interface
export interface PollForm {
  question: string;
  options: string[];
  thumbnail: string;
}

export interface PollVote {
  id: number;
  vote: number;
}

/*export interface Voter {
  id: string;
  voted: number[];
}*/
