export const BASE_API_URL = 'http://localhost:5000/api/v1'

// auth
export const SIGNIN_URL = './signin'

// Project
export const getAllProjectURL = '/project/list'
export const deteteProjectURL = (id) => `/admin/${id}/deleted`
export const getDetailProjectURL = (id) => `/project/${id}/detail`
export const createProjectURL = './admin/project/create'
export const updateProjectURL = './admin/project/update'
