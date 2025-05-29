interface ArticleList {
  id: string
  userId: string
  categoryId: string
  title: string
  content: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  category?: Category
  user?: User
}

interface Category {
  id: string
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  username: string
}

interface AddEditArticles {
  imageUrl: string
  title: string
  content: string
  categoryId: string
}

interface ArticlesState {
  loading: boolean
  error: string | null
  message: string | null
  articlesDataList: ArticleList[]
  articlesDataDetail: ArticleList | undefined
  articlesDataListPage: number
  articlesDataListData: number
  articlesAdd: (payload: AddEditArticles) => Promise<void>
  articlesEdit: (payload: AddEditArticles, id: string) => Promise<void>
  articlesDelete: (id: string) => Promise<void>
  articlesList: (page: number, search?: string, category?: string, limit?: number) => Promise<void>
  articlesDetail: (id: string) => Promise<void>
  setDataDetail: (payload: ArticleList) => Promise<void>
}

interface UserData {
  id: string
  username: string
  role: string
}

interface UserLogin {
  username: string
  password: string
}

interface UserRegister {
  username: string
  password: string
  role: string
}

interface AuthState {
  user: UserData | null
  loading: boolean
  error: string | null
  message: string | null
  role: string | null
  login: (payload: UserLogin) => Promise<void>
  registerUser: (payload: UserRegister) => Promise<void>
  logout: () => void
  setUser: (user: UserData) => void
}

interface CategoriesList {
  id: string
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

interface CategoriesState {
  loading: boolean
  error: string | null
  message: string | null
  categoryDataList: CategoriesList[]
  categoryDataListPage: number
  categoryDataListData: number
  categoryAdd: (payload: { name: string }) => Promise<void>
  categoryEdit: (payload: { name: string }, id: string) => Promise<void>
  categoryDelete: (id: string) => Promise<void>
  categoryList: (page: number, search: string, limit?: number) => Promise<void>
}

interface LoadingProps {
  message?: string
  fullScreen?: boolean
}

interface PaginationProps {
  pageCount: number
  currentPage: number
  basePath: string
}

interface OptionSelection {
  value: string
  label: string
}

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  isMultipart?: boolean
}
