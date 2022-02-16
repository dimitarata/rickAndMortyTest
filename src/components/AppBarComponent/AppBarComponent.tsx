import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {Search, SearchIconWrapper, StyledInputBase} from "../muiComponents";

interface AppBarProps {
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AppBarComponent = (props:AppBarProps) => {
  return (
    <AppBar position="static">
          <Toolbar>
            <img
              src={require("../../assets/apilogo.png")}
              height={"80px"}
              alt="apilogo"
            ></img>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img
                src={require("../../assets/logo.png")}
                height={"80px"}
                alt="logo"
              ></img>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={props.handleSearchChange}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
  )
}

export default AppBarComponent
