import { HiOutlineMoon, HiOutlineSun, HiUser } from "react-icons/hi2";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;
function HeaderMenu() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={()=> toggleDarkMode()}>
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
