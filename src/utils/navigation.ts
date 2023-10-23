import { useNavigate } from "react-router-dom";

export function externalNavigate(url:string) {
  const newWindow = window.open(url, '_blank');
  if (newWindow) {
      newWindow.opener = null;
  }
}

export const useNavigationHelper = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return {
    navigateTo
  };
};