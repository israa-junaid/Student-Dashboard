import { LOGIN_SUCCESS, LOGIN_FAIL } from "./Actions";
/** defining the initial state */
const initialstate = {
  id: "",
  name: "",
  email: "",
  contact: "",
  department: "",
  isSUBMIT: false,
  isINVITE: false,
  isACCEPTED: false,
  auth: false,
};
export default function DataRed(state = initialstate, action) {
  switch (action.type) {
    //case for login succcess
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        auth: action.payload.auth,
        email: action.payload.email,
        contact: action.payload.contact,
        department: action.payload.department,
        isSUBMIT: action.payload.isSUBMIT,
        isINVITE: action.payload.isINVITE,
        isACCEPTED: action.payload.isACCEPTED,
      };
    //case for login failure
    case LOGIN_FAIL:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        auth: action.payload.auth,
        email: action.payload.email,
        contact: action.payload.contact,
        department: action.payload.department,
        isSUBMIT: action.payload.isSUBMIT,
        isINVITE: action.payload.isINVITE,
        isACCEPTED: action.payload.isACCEPTED,
      };

    default:
      return state;
  }
}
