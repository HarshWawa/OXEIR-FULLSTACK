exports.User_AppDashbaord_Routes = (app) => {
  app.use(
    "/userApp",
    require("./routes/userRoutes"),
    require("./routes/instructorRoutes"),
    require("./routes/learnerRoutes")
  );
};
