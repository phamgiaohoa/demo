import Actions from '../actions';

const initialState = {
  isFirstLaunching: true,
};

export const general = (state = initialState, action) => {
  switch (action.type) {
    case Actions.IS_FIRST_LAUNCHING:
      return {...state, isFirstLaunching: false};

    default:
      return state;
  }
};

export const GeneralReducer = {general};
