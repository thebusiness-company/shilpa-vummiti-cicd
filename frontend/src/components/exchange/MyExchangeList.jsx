import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../ui/Loader';
const UserRequests = () => {
  const { data, isLoading } = useQuery('userRequests', () =>
    axios
      .get('/api/return-exchange/my-requests/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => res.data)
  );

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2>My Return/Exchange Requests</h2>
      {data.map((req) => (
        <div key={req.id}>
          <p>Product: {req.product_name}</p>
          <p>Type: {req.request_type}</p>
          <p>Status: {req.status}</p>
          <p>Reason: {req.reason}</p>
        </div>
      ))}
    </div>
  );
};

export default UserRequests;
