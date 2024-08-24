import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProtectedRoute({ children }) {
    const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();

  useEffect(function () {
    if(!isAuthenticated && !isLoading) navigate("/login")
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated && !isLoading) return children;
}

export default ProtectedRoute;
