import { USER_DATA } from "./Actions";

const initialstate = {
  id: "",
  name: "",
  isSUBMIT: "",
  isINVITE: "",
  isACCEPTED: "",
};
export default function DataRed(state = initialstate, action) {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        isSUBMIT: action.payload.isSUBMIT,
        isINVITE: action.payload.isINVITE,
        isACCEPTED: action.payload.isACCEPTED,
      };

    default:
      return state;
  }
}
