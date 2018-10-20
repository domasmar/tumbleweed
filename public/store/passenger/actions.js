export const IS_LOADING = 'IS_LOADING';
export function isLoading(flag) {
  return {
    type: IS_LOADING,
    flag,
  };
}
