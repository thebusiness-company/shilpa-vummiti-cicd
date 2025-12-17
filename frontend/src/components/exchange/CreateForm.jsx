import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import API from '../../api';

const ReturnExchangeForm = ({ orderId, productId }) => {
  const [requestType, setRequestType] = useState('return');
  const [reason, setReason] = useState('');

  const mutation = useMutation((data) =>
    API.post('request/', data, )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ order: orderId, product: productId, request_type: requestType, reason });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
        <option value="return">Return</option>
        <option value="exchange">Exchange</option>
      </select>
      <textarea
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      />
      <button type="submit" disabled={mutation.isLoading}>
        Submit Request
      </button>
      {mutation.isSuccess && <p>Request submitted!</p>}
    </form>
  );
};

export default ReturnExchangeForm;
