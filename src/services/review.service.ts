export const getReviewsByProduct = async (
  productId: string,
  page: number = 1,
  limit: number = 3,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/item/${productId}?page=${page}&limit=${limit}`,
  );
  return res.json();
};

export const postReview = async (reviewData: any, token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });
  return res.json();
};

export const getMyReviews = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/my-reviews`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  return res.json();
};

export const deleteReview = async (reviewId: string, token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};
