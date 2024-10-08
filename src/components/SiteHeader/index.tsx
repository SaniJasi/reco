import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/img/logo.svg";
import Vanessa from "../../assets/img/Vanessa.png";
import { ChevronIcon, FaqIcon } from "../../ui";

const pages = [
  {
    id: "menu-1",
    name: "Apps",
    slug: "/apps",
    submenu: [
      {
        id: "submenu-1",
        name: "Sub menu 1",
        slug: "/apps/link-1",
      },
      {
        id: "submenu-2",
        name: "Sub menu 2",
        slug: "/apps/link-2",
      },
    ],
  },
  {
    id: "menu-2",
    name: "Data",
    slug: "/data",
    submenu: [
      {
        id: "submenu-21",
        name: "Sub menu 1",
        slug: "/apps/link-1",
      },
      {
        id: "submenu-22",
        name: "Sub menu 2",
        slug: "/apps/link-2",
      },
    ],
  },
  {
    id: "menu-3",
    name: "Identities",
    slug: "/identities",
  },
  {
    id: "menu-4",
    name: "Identities",
    slug: "/identities",
  },
  {
    id: "menu-5",
    name: "Alerts",
    slug: "/alerts",
  },
  {
    id: "menu-6",
    name: "Investigation Center",
    slug: "/investigation-center",
  },
  {
    id: "menu-7",
    name: "Configurations",
    slug: "/configurations",
    submenu: [
      {
        id: "submenu-71",
        name: "Sub menu 1",
        slug: "/apps/link-1",
      },
      {
        id: "submenu-72",
        name: "Sub menu 2",
        slug: "/apps/link-2",
      },
    ],
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function SiteHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1F5CED" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            <img src={Logo} alt="Site logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img src={Logo} alt="Site logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ id, name, slug, submenu }) => (
              <React.Fragment key={id}>
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component="a"
                  href={slug}
                  aria-controls={`menu-appbar-${id}`}
                >
                  {name}
                  {submenu && submenu.length > 0 && <ChevronIcon />}
                </Button>

                {submenu && submenu.length > 0 && (
                  <Menu
                    sx={{ mt: "45px" }}
                    id={`menu-appbar-${id}`}
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
                    {submenu.map(({ id: childId, name, slug }) => (
                      <MenuItem key={childId} onClick={handleCloseUserMenu}>
                        <Typography
                          sx={{ textAlign: "center" }}
                          component="a"
                          href={slug}
                        >
                          {name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Security-Demo 2 "
                    src={Vanessa}
                    sx={{ width: 20, height: 20, mr: 1 }}
                  />
                  <Typography
                    fontWeight={600}
                    component="span"
                    color="white"
                    textTransform={"none"}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    Security-Demo 2
                    <ChevronIcon />
                  </Typography>
                </Button>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <IconButton>
              <FaqIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default SiteHeader;
