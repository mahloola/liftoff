import { useQuery } from '@tanstack/react-query';

export default function useBikeDescription(productName: string) {
  return useQuery({
    queryKey: ['bike-search', productName],

    queryFn: async () => {
      const query = encodeURIComponent(productName);

      const response = await fetch(
        // `https://bikeindex.org/api/v3/search?page=1&per_page=10&query=${query}&location=IP&distance=10&stolenness=stolen`
        `https://bikeindex.org/api/v3/search?page=1&per_page=10&query=peugot&location=IP&distance=10&stolenness=stolen`
        // would ideally search for the actual product name but this API doesn't really have that data
        // we'll just use peugot to search for generic bikes
      );

      if (!response.ok) {
        throw new Error('Failed to fetch bike data');
      }

      const data = await response.json();

      return data;
    },

    staleTime: 1000 * 60 * 10,
  });
}
