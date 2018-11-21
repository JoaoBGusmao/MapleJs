import { ACCOUNT_CONSTS } from '../../constants';

const initialState = {};

const updateAccount = (state, action) => ({
  ...state,
  ...action.payload,
});

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_CONSTS.UPDATE_ACCOUNT:
      return updateAccount(state, action);
    default:
      return state;
  }
};

export default accountReducer;
