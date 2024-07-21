import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
  };
  
  
const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer:{
      prepare(fullName, nationalID){
        return {
          payload: {fullName, nationalID}
        }
      },
      reducer(state, action){
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = new Date().toISOString();
      }
    },
    updateName(state, action){
      state.fullName = action.payload;
    }
  }
})
  
export default customerSlice.reducer;
export const {createCustomer, updateName} = customerSlice.actions;
// export default function customerReducer(state=initialStateCustomer, action) {
//     switch (action.type) {
//       case "customer/createCustomer":
//         return {
//           ...state,
//           fullName: action.payload.fullName,
//           nationalID: action.payload.nationalID,
//           createdAt: action.payload.createdAt,
//         };
//       case "customer/updateName":
//           return{
//               ...state,
//               fullName: action.payload
//           }
//       default:
//         return state;
//     }
//   }
    
// export function createCustomer(fname, Id) {
//     return {
//       type: "customer/createCustomer",
//       payload: {
//         fullName: fname,
//         nationalID: Id,
//         createdAt: new Date().toISOString(),
//       },
//     };
//   }
  
// export function updateName(newFname) {
//     return {
//       type: "customer/updateName",
//       payload: newFname,
//     };
//   }