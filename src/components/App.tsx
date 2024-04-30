import { useContext, useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { UiContext } from "@/context/UiContext";
import { DataContext } from "@/context/DataContext";
import Continents from "./Continents";
import useLocation from "@/hooks/useLocation";
import { Suspense } from "react";
import { Hearts } from "react-loader-spinner";
import Loading from "./Loading";

interface Props {
	children: React.ReactNode;
}

export default function App({ children }: Props) {
	const { searchModalOpen, setSearchModalOpen } = useContext(UiContext) || {};
	const [guests, setGuests] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");
	const [minRating, setMinRating] = useState<string>("");
	const { countries, regions } = useContext(DataContext) || {};
	const [regionFilter, setRegionFilter] = useState<string>("");
	const [continentFilter, setContinentFilter] = useState<string>("");
	const { userLocation } = useLocation();

	function continentPickedHandler(continent: string) {
		setContinentFilter(continent);
	}

	return (
		<>
			{searchModalOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-50">
					<div className="z-100 absolute inset-0 flex items-center justify-center">
						<div className="mx-5 w-full rounded-lg bg-white p-4 shadow-lg lg:w-1/2">
							<h2 className="mb-3 text-2xl font-bold">Where are you going?</h2>
							<p>{continentFilter ? continentFilter : "Doesn't matter"}</p>
							<Continents continentPicked={continentPickedHandler} />
							<form className="mt-4">
								<select
									className="rounded-xl border p-2"
									value={guests}
									onChange={(e) => setGuests(e.target.value)}
								>
									<option value="">Guests</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="0">More</option>
								</select>
								<select
									className="rounded-xl border p-2"
									value={maxPrice}
									onChange={(e) => setMaxPrice(e.target.value)}
								>
									<option value="">Max price</option>
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="40">40</option>
									<option value="50">50</option>
									<option value="100">100</option>
									<option value="200">200</option>
									<option value="1000">1000</option>
									<option value="9000">9000</option>
									<option value="0">More</option>
								</select>
								<select
									className="rounded-xl border p-2"
									value={minRating}
									onChange={(e) => setMinRating(e.target.value)}
								>
									<option value="">Min rating</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
								<select className="rounded-xl border p-2">
									<option value="">Near me</option>
									<option value="1">1 km</option>
									<option value="2">2 km</option>
									<option value="3">3 km</option>
									<option value="4">4 km</option>
									<option value="5">5 km</option>
								</select>
								<select
									onChange={(e) => setRegionFilter(e.target.value)}
									className="rounded-xl border p-2"
								>
									<option value="">Region</option>
									{regions
										?.sort((a, b) => a.subregion?.localeCompare(b.subregion))
										.filter((region) => {
											if (continentFilter) {
												return region.continents.includes(continentFilter);
											} else {
												return region;
											}
										})
										.map((region) => (
											<option key={region.subregion} value={region.subregion}>
												{region.subregion}
											</option>
										))}
								</select>
								<select className="rounded-xl border p-2">
									<option value="">Country</option>
									{regionFilter
										? countries
												?.sort((a, b) => a.name.localeCompare(b.name))
												.map((country) =>
													country.region?.toLowerCase() ===
													regionFilter?.toLowerCase() ? (
														<option key={country.name} value={country.name}>
															{country.name}
														</option>
													) : null
												)
										: countries
												?.sort((a, b) => a.name.localeCompare(b.name))
												.map((country) => {
													return (
														<option key={country.name} value={country.name}>
															{country.name}
														</option>
													);
												})}
								</select>
								<input
									type="text"
									placeholder="Search for words in description"
									className="w-full rounded-lg border border-gray-300 p-2"
								/>
							</form>
							<button
								className="mt-4 rounded-lg bg-orange-400 px-4 py-2 text-white"
								onClick={() => {
									if (setSearchModalOpen) {
										setSearchModalOpen(false);
									}
								}}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="container mx-auto px-2">
				<div className="flex h-screen flex-col">
					<Header />
					<main className="flex-grow">{children}</main>
					<Footer />
				</div>
			</div>
		</>
	);
}
