import * as actionTypes from "./actionTypes";

const defaultState = {
  loading: false,
  error: null,
  successMessage: null,
  userInfo: null,
  alert: null,
  articles: [],
  article: null,
  idToken: "",
};

const taskReduser = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actionTypes.LOADING: {
      return {
        ...state,
        loading: true,
        successMessage: null,
        error: null,
      };
    }

    case actionTypes.SHOW_ALERT: {
      return {
        ...state,
        alert: action.payload,
      };
    }

    case actionTypes.HIDE_ALERT: {
      return {
        ...state,
        alert: null,
      };
    }

    case actionTypes.CREATE_ACCOUNT: {
      return {
        ...state,
        loading: false,
        successMessage: "Account created successfully",
        userInfo: action.payload,
        idToken: action.info.idToken,
      };
    }

    case actionTypes.LOGIN: {
      const users = Object.values(action.users);

      const userIndex = users.findIndex(
        (item) => item.email === action.payload.email
      );

      const userInfo = users[userIndex];
      return {
        ...state,
        loading: false,
        successMessage: "Logged successfully",
        userInfo,
        idToken: action.payload.idToken,
      };
    }

    case actionTypes.LOGOUT: {
      return {
        ...state,
        loading: false,
        userInfo: null,
        article: null,
        idToken: "",
      };
    }

    case actionTypes.CREATE_ARTICLE: {
      return {
        ...state,
        loading: false,
        successMessage: "Created successfully",
      };
    }

    case actionTypes.GET_ARTICLES: {
      const newArticles = Object.values(action.payload);
      return {
        ...state,
        loading: false,
        articles: newArticles,
        article: null,
      };
    }

    case actionTypes.GET_ARTICLE: {
      const article = state.articles.filter(
        (item) => item.articleId === action.payload
      );

      return {
        ...state,
        loading: false,
        article: { ...article[0] },
      };
    }

    case actionTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        loading: false,
        successMessage: "Changed successfully",
      };
    }

    case actionTypes.CHANGE_USERNAME: {
      return {
        ...state,
        loading: false,
        successMessage: "Changed successfully",
        userInfo: { ...action.payload },
      };
    }

    case actionTypes.SEND_COMMENT: {
      return {
        ...state,
        loading: false,
        successMessage: "Thanks for comment",
      };
    }

    default:
      return state;
  }
};

export default taskReduser;
