import styled, { css } from "styled-components";

const types = {
    horizontal : css`
    justify-content: space-between;
    align-items: center;
    `,
    vertical : css`
        flex-direction: column;
        gap: 1.6rem;
    `
}

const Row = styled.div`
    display: flex;
    ${props=> types[props.type]}
`;

Row.defaultProps = {
    type: "vertical"
}
export default Row;