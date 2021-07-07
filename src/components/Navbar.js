import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../index.css";

// Material-UI import
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Slide, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "inherit",
    color: "black",
    boxShadow: "0px 0px 0px 0px",
    marginTop: 100,
  },
  spacing: {
    fontSize: "25px",
    marginLeft: 100,
    marginRight: 100,
    textDecoration: "none",
    color: "inherit",
  },
  company: {
    fontSize: "25px",
    marginLeft: 100,
    marginRight: "auto",
    textDecoration: "none",
    color: "inherit",
  },
  navbar: {
    marginBottom: 200,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { productList } = useContext(CartContext);
  const trigger = useScrollTrigger();
  // dynamically change color of navbar based on current url
  const path = useLocation().pathname;
  const location = path.split("/")[2];

  return (
    <div className={classes.navbar}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar position="fixed" className={classes.header}>
          <Toolbar className={location ? location : "home"}>
            <Link to="/react-shopping-website/" className={classes.company}>
              <Typography variant="h6">
                <Box letterSpacing={4}>CLOUD COMPUTERS</Box>
              </Typography>
            </Link>
            <Link to="/react-shopping-website/shop" className={classes.spacing}>
              <Typography variant="h6">Shop</Typography>
            </Link>
            <Link to="/react-shopping-website/cart" className={classes.spacing}>
              <LocalMallOutlinedIcon fontSize="large" /> ({productList.length})
            </Link>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </div>
  );
};

export default Navbar;