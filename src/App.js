import React,{Component} from 'react'
import './App.css'
import { Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import BooksList from "./components/BooksList";

class BooksApp extends Component {


    render() {
    return (
      <div className="app">
          {/*Search - Component*/}
            <Route
              path='/search'
              render={()=> (
                  <SearchForm
                  />
              )}
            />
            {/*ListBook - Component*/}
            <Route
              exact
              path='/'
              render={() => (
                  <BooksList />
              )}
            />
      </div>
    )
  }
}

export default BooksApp
