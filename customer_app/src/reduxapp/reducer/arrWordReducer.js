const defaultArrWords = [
  { id: 1, en: 'action', vn: 'hành động', memorized: true, isShow: false },
  { id: 2, en: 'actor', vn: 'Diễn viên', memorized: false, isShow: false },
  { id: 3, en: 'activity', vn: 'hoạt động', memorized: true, isShow: false },
  { id: 4, en: 'active', vn: 'chủ động', memorized: false, isShow: false },
  { id: 5, en: 'bath', vn: 'tắm', memorized: true, isShow: false },
  { id: 6, en: 'bedroom', vn: 'Phòng ngủ', memorized: false, isShow: false },
  { id: 7, en: 'yard', vn: 'Sân', memorized: true, isShow: false },
  { id: 8, en: 'yesterday', vn: 'Hôm qua', memorized: true, isShow: false },
  { id: 9, en: 'young', vn: 'Trẻ', memorized: false, isShow: false },
  { id: 10, en: 'zero', vn: 'Số 0', memorized: false, isShow: false },
  { id: 11, en: 'abandon', vn: 'từ bỏ', memorized: true, isShow: false },
  { id: 12, en: 'above', vn: 'phía trên', memorized: false, isShow: false },
  { id: 13, en: 'against', vn: 'Phản đối', memorized: false, isShow: false },
  { id: 14, en: 'arrange', vn: 'Sắp xếp', memorized: true, isShow: false },
]
const arrWordReducer = (state = defaultArrWords, action) => {
  if (action.type === 'TOGGLE_SHOW') {
    return state.map(e => {
      if (e.id !== action.id) return e
      return { ...e, isShow: !e.isShow }
    })
  }
  if (action.type === 'TOGGLE_MEMORIZED') {
    return state.map(e => {
      if (e.id !== action.id) return e
      return { ...e, memorized: !e.memorized }
    })
  }

  if (action.type === 'ADD_WORD') {
    return [
      {
        id: state.length + 1,
        en: action.en,
        vn: action.vn,
        memorized: false,
        isShow: false,
      },
    ].concat(state)
  }

  return state
}

export default arrWordReducer
