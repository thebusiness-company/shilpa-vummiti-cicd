
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../api';

const AdminReturnRequests = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery('adminRequests', () =>
    API
      .get('admin-requests/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => res.data)
  );

  const mutation = useMutation(
    ({ id, status }) =>
      API.patch(
        `update-status/${id}/`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      ),
    {
      onSuccess: () => queryClient.invalidateQueries('adminRequests'),
    }
  );

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2>Admin Return/Exchange Requests</h2>
      {data.map((req) => (
        <div key={req.id} style={{ border: '1px solid gray', margin: '10px' }}>
          <p>User: {req.user}</p>
          <p>Product: {req.product_name}</p>
          <p>Type: {req.request_type}</p>
          <p>Status: {req.status}</p>
          <p>Reason: {req.reason}</p>
          <select
            defaultValue={req.status}
            onChange={(e) => mutation.mutate({ id: req.id, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminReturnRequests;
