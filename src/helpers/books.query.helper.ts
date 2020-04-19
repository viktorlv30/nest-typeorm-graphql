export const SQL_LIKE_OPERATOR = '%';

/**
 * 1. Trim whitespace around initial query string
 * 2. Then trim whitespace after a leading '%' and before a trailing '%'
 * Example: ' % Art of %    \n' => '%Art of%'
 * @param filter
 */
export function prepareLikeQueryString(filter: string) {
	const trimmedSearch = filter.trim();
	const isLeadingLike = trimmedSearch.startsWith(SQL_LIKE_OPERATOR);
	const isTrailingLike = trimmedSearch.endsWith(SQL_LIKE_OPERATOR);
	let searchQuery = isLeadingLike
		? SQL_LIKE_OPERATOR + trimmedSearch.slice(1).trim()
		: trimmedSearch;
	searchQuery = isTrailingLike
		? searchQuery.slice(0, -1).trim() + SQL_LIKE_OPERATOR
		: searchQuery;
	return searchQuery;
}
