import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from "../features/authentication/UserAvatar"

const StyledHeader = styled.header`
    padding: 1.2rem 4.5rem;
    background-color: var(--color-grey-0);
    border-bottom: 1px solid var(--color-grey-100);
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.8rem;
`
function Header() {
    return (
        <StyledHeader>
            <UserAvatar/>
            <HeaderMenu/>
        </StyledHeader>
    )
}

export default Header
