import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import HomePage from './pages/HomePage/HomePage'
import MoviePage from './pages/Movies/MoviePage'
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'


// 홈페이지  /
// 영화 전체 보여주는 페이지  (검색) /movies
// 영화 디테일페이지 /movies/:id
function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<HomePage/>}/>
        {/* <Route path='/movies' element={<MoviePage/>}/>
        <Route path='/movies/:id' element={<MovieDetailPage/>}/> */}
        <Route path='movies'>
          <Route index element={<MoviePage/>}/>
          <Route path=':id' element={<MovieDetailPage/>}/>
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage/>}/>
     </Routes>
    </>
  )
}

export default App
