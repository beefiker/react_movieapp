import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  /* state = {
    count: 0
  };
  add = () => {
    this.setState({ count: this.state.count + 1 }); // state에 직접적으로 기대는 효율이 나쁜 방법
  };
  minus = () => {
    this.setState(current => ({ count: current.count - 1 })); // 현재 state를 얻어서 효율이 좋은 방법
  }; 
  <h1> The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
        */
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    //async와 await을 사용해 접근이 끝날때까지기다리라고 명령
    const {
      data: {
        data: { movies }
      } // 데이터\데이터\무비 경로 표현은 최신 es6 자바스크립트의 data:{data:{movies}}로 표현 가능
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? ( // es6의 if문 같은건데, isLoading이 true이면 Loading을 보여주고, DidMount가 되어서 getMovies()를 실행시키면 isLoading을 false로 바꿔서 Movie 리스트를 보여주게 함.
          <div className="loader">
            <span className="loader_text"> Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
