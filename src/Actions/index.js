import * as types from '../Types/index'

export const addHeadlines = headlines => ({
  type: types.HEADLINES_AVAILABLE,
  headlines
})

export const addCategoryHeadlines = (category, headlines, page = 1) => ({
  type: types.CATEGORY_HEADLINES_AVAILABLE,
  category,
  headlines,
  page
})
