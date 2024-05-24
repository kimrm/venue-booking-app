"use client";
import { Modal, ModalBody, ModalHeader } from "@/components/modal";
import { useState } from "react";
import { deleteBooking } from "@/actions/bookings";

import React from "react";

export default function CancelBooking({ id }: { id: string }) {
	const [modalOpen, setModalOpen] = useState(false);

	function handleCancel() {
		setModalOpen(false);
	}

	return (
		<>
			{modalOpen && (
				<Modal onConfirm={() => deleteBooking(id)} onCancel={handleCancel}>
					<ModalHeader>Delete booking</ModalHeader>
					<ModalBody>
						<p>Are you sure you want to delete this booking?</p>
					</ModalBody>
				</Modal>
			)}
			<button
				onClick={() => setModalOpen(true)}
				className="rounded-xl bg-red-100 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-red-50"
			>
				Cancel booking
			</button>
		</>
	);
}
