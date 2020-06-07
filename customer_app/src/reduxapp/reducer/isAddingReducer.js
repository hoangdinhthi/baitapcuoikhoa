const defaultState = false

const isAddingReducer = (state = defaultState, action) => {
  if (action.type === 'TOGGLE_ISADDING') return !state
  return state
}
export default isAddingReducer
