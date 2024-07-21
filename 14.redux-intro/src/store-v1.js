import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload["loan"],
        loanPurpose: action.payload["loanPurpose"],
      };

    case "account/payLoan":
      return { ...state, loan: 0, loanPurpose: "" };

    default:
      return state;
  }
}

function customerReducer(state=initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
        return{
            ...state,
            fullName: action.payload
        }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})
const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { loan: amount, loanPurpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

function createCustomer(fname, Id) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fname,
      nationalID: Id,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(newFname) {
  return {
    type: "customer/updateName",
    payload: newFname,
  };
}

store.dispatch(createCustomer("soroush", "123"));
console.log(store.getState())
store.dispatch(deposit(750));
console.log(store.getState());