import { FORM_DATA } from "./Actions";

const initialstate = {
  id: "",
  name: "",
  membercount: "",
  organization: "",
  projectTitle: "",
  internal: "",
  external: "",
};
export default function DataRed(state = initialstate, action) {
  switch (action.type) {
    case FORM_DATA:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        organization: action.payload.organization,
        membercount: action.payload.membercount,
        projectTitle: action.payload.projectTitle,
        internal: action.payload.internal,
        external: action.payload.external,
      };

    default:
      return state;
  }
}
