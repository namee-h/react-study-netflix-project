import React from "react";
import netflixLogo from "../assets/logo.png";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export default function AppLayout() {
  const [keyword, setKeyword] = useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q");
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const navigate = useNavigate();

  const searchByKeyword = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) {
      alert("검색어를 입력해주세요");
      return;
    }
    if (trimmed === currentQuery) {
      alert(`"${trimmed}"에 대한 결과를 이미 보고있습니다.`);
      setKeyword("");
      return;
    }
    // url바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };
  const moveToHome = () => {
    navigate("/");
  };
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
  ];

  return (
    // className={'borders'}
    <div>
      <Box width="100%" sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#141414" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <img
                onClick={moveToHome}
                src={netflixLogo}
                alt="Netflix Logo"
                style={{ height: "80px", cursor: "pointer" }}
              />
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                {navItems.map(({ label, path }) => (
                  <Button
                    key={label}
                    component={Link}
                    to={path}
                    sx={{ color: "#fff" }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Box>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ display: { xs: "flex", sm: "none" }, ml: "auto" }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="form"
              onSubmit={searchByKeyword}
              sx={{
                display: { xs: "none", sm: "flex" },
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </Search>
              <Button variant="outlined" color="warning" type="submit">
                Search
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="top"
          open={mobileOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { backgroundColor: "#141414", padding: 2, color: "#fff" },
          }}
        >
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                onClick={toggleDrawer}
                fullWidth
                sx={{ justifyContent: "flex-start", color: "#fff" }}
              >
                {item.label}
              </Button>
            ))}

            {/* Search 영역 */}
            <Box component="form" onSubmit={searchByKeyword} sx={{ mt: 2 }}>
              <Search sx={{ width: "100%" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </Search>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={toggleDrawer}
                color="warning"
                type="submit"
              >
                Search
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
      <Outlet />
    </div>
  );
}
