export default function() {
  return [
    {
      title: "Portfolio Dashboard",
      to: "/portfolio-overview",
      htmlBefore: '<i class="material-icons">grid_view</i>',
      htmlAfter: ""
    },
    {
      title: "Stock Dashboard",
      htmlBefore: '<i class="material-icons">grid_view</i>',
      to: "/stock-dashboard",
    },
    {
      title: "Stock WatchList",
      htmlBefore: '<i class="material-icons">view_list</i>',
      to: "/watchlist",
    },
    {
      title: "Market News",
      htmlBefore: '<i class="material-icons">feed</i>',
      to: "/market-news",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
