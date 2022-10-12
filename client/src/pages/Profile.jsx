import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return <div>{user.name}'s profile page</div>;
};

export default Profile;
