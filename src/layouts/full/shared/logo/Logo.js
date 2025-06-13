import { Link } from "react-router-dom";
import LogoDark1 from "../../../../../public/Milan.png";
import { styled } from "@mui/material";

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
      <img src={LogoDark1} alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
    </LinkStyled>
  );
};

export default Logo;
