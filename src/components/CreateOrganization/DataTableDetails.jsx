import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import apiClient from "../../services/ApiClient";
import { useSelector } from "react-redux";
import { Table, TextField, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Skeleton, Pagination, MenuItem, Select, TableContainer, Paper } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export const DataTableDetails = () => {
	const [queryParams, setQueryParams] = useState({ search: '', sortOrder: 'asc', page: 1, sortBy: 'name', perPage: 10 });
	const [searchVal, setSearchVal] = useState("");
	const formSubmitted = useSelector(state => state.createOrganization.formDetailsSubmitted);
	let lastRun = null;
	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			width: 130
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 130
		},
		{
			field: 'subdomain',
			headerName: 'Sub Domain',
			width: 130
		},
	];
	const rowsPerPageList = [10, 20, 25];

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setQueryParams(prev => ({ ...prev, search: searchVal, page: 0 }));
		}, 300);

		return () => clearTimeout(debounceTimeout);
	}, [searchVal]);

	const getOrganizationList = async (queryParams) => {
		try {
			const response = await apiClient.get("organizations", {
				params: {
					...queryParams
				},
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};


	const { data: organizationList = {}, isLoading, isFetching } = useQuery(
		["getOrganizationList", queryParams, formSubmitted],
		() => getOrganizationList(queryParams),
		{
			keepPreviousData: true,
			staleTime: 30000,
			onError: (err) => {
				console.log('err : ', err);

			},
			onSuccess: (data) => {
				console.log('data : ', data);

			},
		}
	);

	const handleChangePage = (_, newPage) => {
		setQueryParams((prev) => ({
			...prev,
			page: newPage
		}))
	};

	const handleChangeRowsPerPage = (event) => {
		setQueryParams((prev) => ({
			...prev,
			perPage: parseInt(event.target.value, 10),
			page: 0
		}));
	};

	const handleRequestSort = (property) => {
		const isAsc = queryParams.sortBy === property && queryParams.sortOrder === 'asc';
		setQueryParams((prev) => ({
			...prev,
			sortOrder: isAsc ? 'desc' : 'asc',
			sortBy: property,
			page: 0
		}));
	};

	const getSearchVal = (e) => {
		const { value } = e.target;
		setSearchVal(value);
	}

	const resetSearchVal = () => {
		setSearchVal("");
		setQueryParams((prev) => ({
			...prev,
			search: ''
		}))
	}

	const getHighlightedText = (text) => {
		const parts = text.split(new RegExp(`(${queryParams.search})`, 'gi'));
		return parts.map((part, index) => part.toLowerCase() === queryParams.search.toLowerCase() ? <span className=" bg-[#FFFF99]" key={index}>{part}</span> : part);
	}


	return <div className=" grid gap-4 ">
		<h2>Organization List</h2>
		<TextField placeholder="Search..." variant="outlined" value={searchVal} onChange={getSearchVal} size="small" className=" md:w-80 w-full md:justify-self-end justify-self-center" slotProps={{ input: { endAdornment: (searchVal) ? <FontAwesomeIcon icon={faXmark} className=" cursor-pointer" onClick={resetSearchVal} /> : null } }} />
		<Paper sx={{ width: '100%', overflow: 'hidden' }} className=" rounded-xl shadow-xl pb-5">
			<TableContainer sx={{ maxHeight: 440, height: 440 }}>
				<Table stickyHeader>
					<TableHead >
						<TableRow>
							{
								columns.length > 0 && columns.map(val => (
									<TableCell key={`${val.headerName}_headercell`} sortDirection={queryParams.sortBy == val.field ? queryParams.sortOrder : false} className="!bg-[rgb(25,118,210)]">
										<TableSortLabel active={queryParams.sortBy == val.field} direction={queryParams.sortBy == val.field ? queryParams.sortOrder : 'asc'} onClick={e => handleRequestSort(val.field)} className=" !text-white text-base font-bold" sx={{ backgroundColor: 'inherit' }}>
											{val.headerName}
										</TableSortLabel>
									</TableCell>
								))
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{
							(isLoading || isFetching) ? (
								Array.from({ length: 4 }).map((_, index) => (
									<TableRow key={index}>
										{
											columns.length > 0 && columns.map((column, i) => (
												<TableCell key={`${index}_${i}_${column.field}`}>
													<Skeleton animation="wave" height={25} />
												</TableCell>
											))
										}
									</TableRow>
								))
							) : (
								(organizationList?.data?.length > 0) && organizationList.data.map(val => (
									<TableRow key={val.id}>
										{
											columns.length > 0 && columns.map(column => (
												<TableCell key={`${val.id}_${column.field}`}>{getHighlightedText(val[column.field])}</TableCell>
											))
										}
									</TableRow>
								))
							)
						}
					</TableBody>
				</Table>
				{organizationList?.data?.length <= 0 && <div className=" text-center p-5 w-full">There is no records.</div>}
				{!organizationList && <div className=" text-center p-5 w-full">There is no records.</div>}
			</TableContainer>
			{
				organizationList?.data?.length > 0 && columns.length > 0 &&
				(
					<>
						<div className=" flex justify-between items-center flex-wrap mt-5 px-5 gap-4">
							<div className=" flex gap-3 items-center">
								Records per page :
								<Select onChange={handleChangeRowsPerPage} value={queryParams.perPage} className=" w-20 h-10">
									{
										rowsPerPageList.length > 0 && rowsPerPageList.map(val => (
											<MenuItem key={val} value={val}>{val}</MenuItem>
										))
									}
								</Select>
							</div>
							<Pagination count={organizationList.last_page} boundaryCount={3} siblingCount={1} defaultValue={1} onChange={handleChangePage} />
						</div>
					</>
				)
			}
		</Paper>
	</div>
};
