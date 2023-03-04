import {apiGet} from '../utils/requests'

export const get_carousel_list = async () => {
  let {data} = await apiGet('carousels')
  return data
}
