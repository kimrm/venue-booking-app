"use client";

import { useState, useContext } from "react";
import SearchModal from "./_components/searchModal";
import List from "@/components/venues/list";
import { UiContext } from "@/context/UiContext";

export default function SearchPage() {
	const { searchModalOpen, setSearchModalOpen } = useContext(UiContext) || {};
	const [filters, setFilters] = useState({
		lat: 0,
		lng: 0,
		search: "",
		city: "",
		country: "",
		continent: "",
		minGuests: 1,
		maxPrice: 9999,
		wifi: "",
		parking: "",
		breakfast: "",
		pets: "",
	});

	function handleModalClose() {
		if (setSearchModalOpen) setSearchModalOpen(false);
	}
	return (
		<div>
			{searchModalOpen && (
				<SearchModal
					filters={filters}
					setFilters={setFilters}
					close={handleModalClose}
				/>
			)}
			<h1 className="my-5 font-serif text-2xl">Browse all venues</h1>
			<List filters={filters} />
		</div>
	);
}
