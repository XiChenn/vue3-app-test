import {apiGet} from '../utils/requests'

export const get_categories = async (params) => {
  let {data} = await apiGet('categories/', params)
  return data
}
