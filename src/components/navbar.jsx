import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const { status, logOut, user } = useAuthStore();
  const [anchorElNav, setAchorElnav] = useState(null);
  const [anchorElUser, setAchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAchorElnav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAchorElnav(null);
  };

  const handleCloseUserMenu = () => {
    setAchorElUser(null);
  };

  const logout = () => {
    logOut();
  };

  useEffect(() => {}, [user]);

  return (
    <>
      {status === "not-authenticated" ? (
        <></>
      ) : (
        <>
          {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </li>
                </ul>

                <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
                  <li className="nav-item">
                    <span className="nav-link">
                      {user.user}
                      &nbsp; &nbsp;
                    </span>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-outline-danger"
                      onClick={() => logout()}
                    >
                      Salir
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav> */}

          <AppBar position="static" style={{background: '#121212'}}>
            <Container maxWidth="xl">
              <Toolbar>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Link to="/" className="a">
                    Notes
                  </Link>
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link to="/"className="a" style={{ color: '#000'}}>Notes</Link>
                      </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link to="/about"  style={{ color: '#000'}}className="a">About</Link>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>

                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Link to="/" className="a">
                    Notes
                  </Link>
                </Typography>

                
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link className="a" to="/">
                      Notes
                    </Link>
                  </Button>

                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link className="a" to="/about">
                      About
                    </Link>
                  </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> 
                      <PersonIcon style={{color: '#fff', fontSize: '2rem'}} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={logOut} textAlign="center">
                        Log out
                      </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>
      )}

      <Outlet />
    </>
  );
};

export default Navbar;
