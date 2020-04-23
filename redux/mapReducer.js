import { SAVE_TBZB, SAVE_TBXX } from "./mapActions";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SAVE_TBZB:
      return {
        ...state,
        tbzb: payload,
      };

    case SAVE_TBXX:
      return {
        ...state,
        tbxx: payload,
      };

    default:
      return state;
  }
};
