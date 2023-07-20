/**
 * 路由权限校验;
 * v0.0.1 2023/07/20 gqd new file;
 */
import { Navigate, Outlet, } from 'umi'
import constants from '@/utils/constants'

export default (props: any) => {
  const token = sessionStorage.getItem(constants.MUTATION_TYPES.ACCESS_TOKEN)
  if (token) {
    return <Outlet />
  } else {
    return <Navigate to="/user/login" />
  }
}
