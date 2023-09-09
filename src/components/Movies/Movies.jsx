import React from "react";
import SearchForm from "../SeachForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import "./movies.css";

export default function Movies() {
  return (
    <main className="page">
      <SearchForm />
      <MovieCardList />
    </main>
  );
}
