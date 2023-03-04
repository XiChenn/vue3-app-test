import {apiGet} from '../utils/requests'

export const product_search = async (params) => {
  let {data} = await apiGet('products/', params)
  return data
}
