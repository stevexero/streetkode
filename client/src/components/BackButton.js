import { Link } from 'react-router-dom';

const BackButton = ({ url }) => {
  return (
    <Link to={url} className='btn btn-reverse btn-back'>
      <h5>{'<- Back'}</h5>
    </Link>
  );
};
export default BackButton;
