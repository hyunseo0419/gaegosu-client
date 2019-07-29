import React from 'react';
// import styled from "styled-components";
// import { Query } from "react-apollo";
// import { HOME_PAGE } from "./queries";
// import { Link } from "react-router-dom";
// import Movie from "./Movie";

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 0.7fr);
//   flex-wrap: wrap;
//   justify-items: center;
// `;

const Main = () => (
  <div>Main Page !</div>
  //   <Query query={HOME_PAGE}>
  //     {({ loading, data, error }) => {
  //       if (loading) return "loading";
  //       if (error) return "Something Happen !";
  //       return data.movies.map(movie => (
  //         <h2 key={movie.id}>
  //           <Link to={`/details/${movie.id}`}>
  //             {movie.title} / {movie.rating}
  //           </Link>
  //         </h2>
  //       ));
  //     }}
  //   </Query>
  //   <Container>
  //     <Query query={HOME_PAGE}>
  //       {({ loading, data, error }) => {
  //         if (loading) return "loading";
  //         if (error) return "something happened";
  //         return data.movies.map(movie => (
  //           <Movie
  //             id={movie.id}
  //             key={movie.id}
  //             poster={movie.medium_cover_image}
  //             title={movie.title}
  //             rating={movie.rating}
  //           />
  //         ));
  //       }}
  //     </Query>
  //   </Container>
);

export default Main;
