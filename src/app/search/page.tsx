"use client";

import { useState, useContext, useEffect } from "react";
import SearchModal from "./_components/searchModal";
import List from "@/components/venues/list";
import { UiContext } from "@/context/UiContext";

export default function SearchPage() {
	const { searchModalOpen, setSearchModalOpen } = useContext(UiContext) || {};

	function handleModalClose() {
		if (setSearchModalOpen) setSearchModalOpen(false);
	}
	return (
		<div>
			{searchModalOpen && <SearchModal close={handleModalClose} />}
			<h1 className="font-serif text-2xl">Browse all venues</h1>
			<List />
		</div>
	);
}
