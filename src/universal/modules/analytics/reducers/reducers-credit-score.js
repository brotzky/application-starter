const initialState = {
  summaries: [
  ],
  filter: {
    year: '',
    scale: 'STANDARD',
  },
  isFetchingCreditScores: false,
};

const summaries = [
  {
    score: 785,
    date:"2017-03-18",
    reasons:[
    "Ratio of balances to credit limits on revolving accounts is too high",
    "Length of time accounts has been established is too short",
    "Serious delinquency, and public record or collection field"
    ]
  },
  {
    score:643,
    date:"2017-02-18",
    reasons:[
    "Ratio of balances to credit limits on revolving accounts is too high",
    "Length of time accounts has been established is too short",
    "Serious delinquency, and public record or collection field"
    ]
  },
  {
    score:700,
    date:"2017-01-18",
    reasons:[
    "Ratio of balances to credit limits on revolving accounts is too high",
    "Length of time accounts has been established is too short",
    "Serious delinquency, and public record or collection field"
    ]
  },
  {
    score:774,
    date:"2016-12-18",
    reasons:[
    "Ratio of balances to credit limits on revolving accounts is too high",
    "Length of time accounts has been established is too short",
    "Serious delinquency, and public record or collection field"
    ]
  },
  {
    score:733,
    date:"2016-11-18",
    reasons:[
      "Ratio of balances to credit limits on revolving accounts is too high",
      "Too many inquiries",
      "Serious delinquency, and public record or collection field"
    ]
  },
  {
    score:763,
    date:"2016-10-18",
    reasons:[
      "Ratio of balances to credit limits on revolving accounts is too high",
      "Too many inquiries",
      "Serious delinquency, and public record or collection field"
    ]
  },
  {
    score:774,
    date:"2016-09-19",
    reasons:[
      "Tax lien on bureau",
      "Length of time accounts has been established is too short",
      "Low revolving limits"
    ]
  },
  {
    score:714,
    date:"2016-08-25",
    reasons:[
      "Collections on bureau",
      "Bankruptcy on bureau",
      "Low revolving limits"
    ]
  },
  {
    score:764,
    date:"2016-07-27",
    reasons:[
      "Too many inquiries",
      "Serious delinquency, and public record or collection field",
      "Credit utilization too high"
    ]
  },
  {
    score: 832,
    date:"2016-06-28",
    reasons:[
      "Ratio of balances to credit limits on revolving accounts is too high",
      "Credit utilization too high",
      "Amount owed too high on accounts"
    ]
  },
  {
    score:771,
    date:"2016-05-28",
    reasons:[
      "Time since delinquency is too recent or unknown",
      "Ratio of balances to credit limits on revolving accounts is too high",
      "Level of delinquency on accounts is too high"
    ]
  },
  {
    score:766,
    date:"2016-04-26",
    reasons:[
      "Too many inquiries",
      "Length of time accounts has been established is too short",
      "Number of accounts with delinquency is too high"
    ]
  },
  {
    score:732,
    date:"2016-03-23",
    reasons:[
      "Too many accounts with balances",
      "Serious delinquency, and public record or collection field",
      "Credit utilization too high"
    ]
  },
  {
    score:780,
    date:"2016-02-27",
    reasons:[
      "Tax lien on bureau",
      "Time since delinquency is too recent or unknown",
      "Amount owed too high on accounts"
    ]
  },
  {
    score:767,
    date:"2016-01-31",
    reasons:[
      "Time since delinquency is too recent or unknown",
      "Length of time accounts has been established is too short",
      "Amount owed too high on accounts"
    ]
  },
  {
    score:752,
    date:"2015-12-30",
    reasons:[
      "Serious delinquency, and public record or collection field",
      "Amount owed too high on accounts",
      "Number of accounts with delinquency is too high"
    ]
  },
  {
    score:741,
    date:"2015-11-27",
    reasons:[
      "Time since delinquency is too recent or unknown",
      "Low revolving limits",
      "Serious delinquency"
    ]
  },
  {
    score:732,
    date:"2015-11-01",
    reasons:[
      "Ratio of balances to credit limits on revolving accounts is too high",
      "Too many inquiries",
      "Collections on bureau"
    ]
  },
  {
    score:730,
    date:"2015-10-03",
    reasons:[
      "Too many inquiries",
      "Number of accounts with delinquency is too high",
      "Low revolving limits"
    ]
  },
  {
    score:730,
    date:"2015-09-01",
    reasons:[
      "Tax lien on bureau",
      "Collections on bureau",
      "Length of time accounts has been established is too short"
    ]
  }
].reverse();

import { CREDIT_SCORE_TRENDS_UPDATE_FILTER } from '../trends/constants';
import { 
  GET_CREDIT_SCORE_REQUEST,
  GET_CREDIT_SCORE_SUCCESS,
  GET_CREDIT_SCORE_FAILURE,
} from 'grow-actions/credit-score/constants';

export default function creditScoreReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CREDIT_SCORE_REQUEST:
      return Object.assign({}, state, {
        isFetchingCreditScores: true,
      });
    case GET_CREDIT_SCORE_SUCCESS:
    case GET_CREDIT_SCORE_FAILURE:
      return Object.assign({}, state, {
        summaries: summaries,
        // summaries: initialState.summaries,
        isFetchingCreditScores: false,
      });
    case CREDIT_SCORE_TRENDS_UPDATE_FILTER:
      return Object.assign({}, state, {
        filter: Object.assign({}, state.filter, action.payload),
      });
    default:
      return state;
  }
}
