import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/home/Home';
import MovieList from './components/MovieList/MovieList';
import Movie from './pages/MovieDetail/Movie';
function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route index element = {<Home/>}></Route>
          <Route path='movie/:id' element={ <Movie></Movie>}></Route>
          <Route path='movies/:type' element={<MovieList/>}></Route>
          <Route path='/*' element={<h1>404 Not Found</h1>}></Route>

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
