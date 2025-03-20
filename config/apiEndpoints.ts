export const API_ENDPOINTS = {
    getUser: (userId: string) => `/user/${userId}`,
    getPosts: (postId?: string) => postId ? `/posts/${postId}` : '/posts',
    createPost: '/posts/create',
    updatePost: (postId: string) => `/posts/update/${postId}`,
    deletePost: (postId: string) => `/posts/delete/${postId}`,

     getAllProductsList: 'api/productsList',
     verifyLoginWithValidCredentials: 'api/verifyLogin',
  };