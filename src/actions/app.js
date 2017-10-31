export const APP_UPDATE = 'APP_UPDATE';
export function appUpdate(...ops) {
  return function (dispatch) {
    dispatch({
      type: APP_UPDATE, ...ops[0]
    });
  };
}