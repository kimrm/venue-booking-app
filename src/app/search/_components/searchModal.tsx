"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input, CheckBox } from "@/components/form";
import { useRouter } from "next/navigation";
import {
	ActionButton,
	CancelButton,
	SubmitButton,
} from "@/components/UI/buttons";

export default function SearchModal({ close }: { close: () => void }) {
	const searchInput = useRef<HTMLInputElement>(null);
	const router = useRouter();

	useEffect(() => {
		searchInput.current?.focus();
	}, []);
	return (
		<div className="fixed left-0 top-0 z-50 flex h-full max-h-screen w-screen justify-center overflow-scroll bg-black bg-opacity-20 pb-20">
			<motion.div
				initial={{ opacity: 0, scale: 0.5, y: -200 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				className="mx-auto mt-5 h-fit w-full max-w-screen-md overflow-scroll rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-lg"
			>
				<h2 className="font-serif text-2xl font-bold">
					Find your next holiday
				</h2>
				<section id="searchForm" className="mt-4">
					<form>
						<Input
							ref={searchInput}
							id="search"
							type="text"
							title="Search for title, id or keywords"
						></Input>
						<h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide">
							Location
						</h3>
						<CheckBox id="location" title="Near my location"></CheckBox>
						<div className="flex flex-wrap gap-2">
							<Input type="text" id="city" title="City"></Input>
							<Input type="text" id="country" title="Country"></Input>
							<Input type="text" id="continent" title="Continent"></Input>
						</div>
						<h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide">
							Properties
						</h3>
						<div className="flex gap-2">
							<Input type="number" id="minGuests" title="Min. guests"></Input>
							<Input type="number" id="maxPrice" title="Max. price"></Input>
						</div>
						<h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide">
							Accomodations
						</h3>
						<div className="flex gap-5">
							<CheckBox id="wifi" title="Wifi"></CheckBox>
							<CheckBox id="parking" title="Parking"></CheckBox>
							<CheckBox id="pets" title="Pets"></CheckBox>
							<CheckBox id="breakfast" title="Breakfast"></CheckBox>
						</div>
					</form>
					<div className="mt-10 flex gap-2">
						<SubmitButton>Show results</SubmitButton>
						<CancelButton onClick={close}>Cancel</CancelButton>
					</div>
				</section>
			</motion.div>
		</div>
	);
}
