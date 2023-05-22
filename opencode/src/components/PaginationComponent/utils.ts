import { useSelector } from "react-redux"
import { GET_REPOSITIRIES_PREV, IPageInfo } from "../../graphql/requests"
import { fetchRepositoriesAsync } from "../../redux/fetch/fetchRepositoriesAsync"
import { RootState } from "../../redux/store"

export const useFetchRepAsyncPrev = () => {
	const itemSearch = useSelector((state : RootState) => state.settings.itemSearch)
	const pageInfo: IPageInfo = useSelector((state: RootState) => state.settings.pageInfo);
	const sort = useSelector((state: RootState) => state.settings.sort);
	const countItemsPerPage = useSelector(
		(state: RootState) => state.settings.countItemsPerPage
	);

	return fetchRepositoriesAsync({
		query: GET_REPOSITIRIES_PREV,
		name: itemSearch, 
		first: countItemsPerPage,
		cursor: pageInfo.startCursor,
		sort: sort
	})
}