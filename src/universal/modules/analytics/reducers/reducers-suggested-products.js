const suggustedProducts = {
  products: [
    {
      title: "RBC Rewards+ Visa Card",
      excerpt: "No annual fee card that gives you a choice",
      description: "You have $3,000 in balances on your credit cards. Consolidate those balances with a personal loan to save $500 in interest costs.",
      link: {
        source: "EXTERNAL",
        href: "http://www.rbcroyalbank.com/services/cards/rewards-plus-visa-credit-card/rewards-plus-visa-s-or.html?gclid=CIy2pdTqg9ECFRRgfgodWxgDzQ&utm_expid=64628281-1177.3a1MGAiJQ1y7UtBB6KzsoA.0"
       }
    },
    {
      title: "RBC Lifestyle Personal Loan",
      excerpt: "Borrow up to $50,000 from as low as %2.8",
      description: "You are paying 19.89% on your ScotiaBank Money Back credit card. Consolidate your debt with a RBC Personal loan and save up to $2,300 in payments.",
      link: {
        source: "INTERNAL",
        href: "/personal-loan/apply/personal"
      }
    },
    {
      title: "RBC Mortgage",
      excerpt: "Your home financing needs made easy",
      description: "You have enough saved for a 20% downpayment on a $488,000 home. RBC offers the rates and experience you need to buying your dream home.",
      link: {
        source: "EXTERNAL",
        href: "http://www.rbcroyalbank.com/services/cards/rewards-plus-visa-credit-card/rewards-plus-visa-s-or.html?gclid=CIy2pdTqg9ECFRRgfgodWxgDzQ&utm_expid=64628281-1177.3a1MGAiJQ1y7UtBB6KzsoA.0"
       }
    }
  ]
};

import { 
  GET_SUGGESTED_PRODUCTS_REQUEST,
  GET_SUGGESTED_PRODUCTS_SUCCESS,
  GET_SUGGESTED_PRODUCTS_FAILURE,
} from 'grow-actions/suggested-products/constants';

const initialState = {
  products: [],
  isFetchingSuggestedProducts: false,
};

export default function suggestedProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUGGESTED_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        isFetchingSuggestedProducts: true,
      });
    case GET_SUGGESTED_PRODUCTS_SUCCESS:
    case GET_SUGGESTED_PRODUCTS_FAILURE:
      return Object.assign({}, state, {
        products: suggustedProducts.products,
        isFetchingSuggestedProducts: false,
      });
    default:
      return state;
  }
}
