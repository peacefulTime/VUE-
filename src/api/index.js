import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 登录验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}
// 获取用户列表
export const userList = params => {
  return axios.get('users', params).then(res => res.data)
}
// 修改用户状态
export const changeStatus = params => {
  return axios.put(`users/${params.uId}/state/${params.type}`, params).then(res => res.data)
}
// 添加用户
export const addUser = params => {
  return axios.post('users', params).then(res => res.data)
}
// 根据ID查询用户信息
export const queryUser = params => {
  return axios.get(`users/${params.id}`, params).then(res => res.data)
}
// 编辑用户提交
export const editeUserData = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data)
}
// 删除单个用户
export const deleteSingleUser = params => {
  return axios.delete(`users/${params}`, params).then(res => res.data)
}
// 角色列表
export const grantUserList = () => {
  return axios.get('roles').then(res => res.data)
}
// 分配用户角色
export const grantUserRole = params => {
  return axios.put(`users/${params.id}/role`, {id: params.id, rid: params.rid}).then(res => res.data)
}
// 获取所有权限列表
export const allRightList = params => {
  return axios.get(`rights/${params.type}`, {type: params.type}).then(res => res.data)
}
// 删除角色指定权限
export const deleteRoles = params => {
  return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data)
}
// 添加角色
export const addRoles = params => {
  return axios.post(`roles`, {roleName: params.roleName, roleDesc: params.roleDesc}).then(
    res => res.data)
}
// 编辑提交角色
export const submitRole = params => {
  return axios.put(`roles/${params.id}`, {roleName: params.roleName, roleDesc: params.roleDesc}).then(
    res => res.data)
}
// 角色授权
export const submitRight = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, rids).then(
    res => res.data)
}
// 获取左侧菜单权限
export const getMenu = () => {
  return axios.get(`menus`).then(res => res.data)
}
// 商品分类管理
export const getCategories = (params) => {
  return axios.get('categories', {params: params}).then(res => res.data)
}
// 添加分类
export const addCategories = params => {
  return axios.post(`categories`, params).then(
    res => res.data)
}
// 根据id查询分类
export const getCatById = (params) => {
  return axios.get('categories/{id:params.id}', {params: params}).then(res => res.data)
}
