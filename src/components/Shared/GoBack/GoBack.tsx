import { useNavigate } from 'react-router-dom';

export default function GoBack() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return <span onClick={handleGoBack}>{'< Back'}</span>;
}
