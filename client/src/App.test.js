// import { render, screen } from '@testing-library/react';
// import App from './App';
// import {Provider} from "react-redux";
// import store from './store/store';


// test('renders countries link', () => {
//   render(<Provider store={store}><App /></Provider>);
//   const linkElement = screen.getByText(/countries/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"
import store from './store/store'
import Country from "./components/Country/Country"

test('It has a landing page desciptive', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/countries/i);
  expect(linkElement).toBeInTheDocument();
});

// test("Country component shows country info", () => {
//   const country = {
//     name: "Argentina",
//     imgFlag: "Link",
//     region: "Americas"
//   }
//   render(<Provider store={store}> <Router><Country country={country}/></Router></Provider>);
//   const countryName = screen.getByText(/Argentina/i) //La i hace que no sea case sensitive
//   const countryRegion = screen.getByText(/Americas/)
//   expect(countryName).toBeInTheDocument();
//   expect(countryRegion).toBeInTheDocument();
// })
