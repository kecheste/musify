import styled from "@emotion/styled";

// Icons
export const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FilterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M7 12H17M9 18H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Layout Components
export const Container = styled.main`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #4e4e4eff 0%,
    #000000ff 50%,
    #222222ff 100%
  );
  padding: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #e0e0e0;
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 24px 40px;

  @media (max-width: 1024px) {
    padding: 90px 20px 30px;
  }

  @media (max-width: 768px) {
    padding: 90px 16px 30px;
    grid-template-columns: 1fr;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start; /* This prevents equal height stretching */

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: fit-content; /* Ensure sidebar doesn't stretch */

  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;

    & > * {
      min-width: 280px;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const MobilePanelToggle = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  align-items: center;
  gap: 8px;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const RefreshButton = styled.button`
  margin-top: 18px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(110, 69, 226, 0.4);
  }
`;

export const ErrorContainer = styled.div`
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ff6b6b;
  font-size: 1.2rem;
`;

export const LoadingContainer = styled.div`
  padding-top: 140px;
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 1.2rem;
`;
