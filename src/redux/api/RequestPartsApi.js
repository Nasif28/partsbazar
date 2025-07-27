export const submitRequestParts = async (data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // This would be a fetch request in a real application
  // const response = await fetch('/api/parts-request', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // });

  // if (!response.ok) {
  //   throw new Error('Failed to submit request');
  // }

  // return response.json();

  // For demo purposes, just return the data
  return {
    status: "success",
    message: "Request submitted successfully",
    data,
  };
};
