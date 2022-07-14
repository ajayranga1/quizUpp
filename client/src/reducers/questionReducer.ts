import * as types from './../actionTypes/question';

const initialState = {
  allQuestions: [],
  loading: false,
  error: {},
};

const questionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.QUESTIONS_LOADING_SUCCESS:
      return { ...state, allQuestions: action.payload, loading: false };
    case types.QUESTIONS_LOADING_FAILED:
      return { ...state, loading: false, error: action.payload };
    // case types.DELETE_ITEM:
    //   return {
    //     ...state,
    //     questions: state.questions.filter(
    //       (item) => item._id !== action.payload
    //     ),
    //     loading: false,
    //   };
    // case types.ADD_ITEM:
    //   return {
    //     ...state,
    //     questions: [action.payload, ...state.questions],
    //     loading: false,
    //   };
    case types.QUESTIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default questionReducer;
