import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
//import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
//import BlogPosts from "./views/BlogPosts";
import PortfolioDashboard from "./components/portfolio/PortfolioDashboard";
import StockWatchList from "./components/watchlist/StockWatchList";
import StockNews from "./components/stock-news/StockNews";
import StockDashboard from "./components/stocks/StockDashboard";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/portfolio-overview" />
  },
  {
    path: "/portfolio-overview",
    layout: DefaultLayout,
    component: PortfolioDashboard
  },
  {
    path: "/stock-dashboard",
    layout: DefaultLayout,
    component: StockDashboard
  },
  {
    path: "/watchlist",
    layout: DefaultLayout,
    component: StockWatchList
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/market-news",
    layout: DefaultLayout,
    component: StockNews
  }
];
