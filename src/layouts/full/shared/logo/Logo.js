import { Link } from "react-router-dom";
import { styled, Typography } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      height={70}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" color="primary" fontWeight="bold">
        AdminMatka
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
