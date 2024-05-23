import { useEffect } from "react";
import ModalHeader from "./modalHeader";
import ModalBody from "./modalBody";
import ModalConfirmButton from "./modalConfirmButton";
import ModalCancelButton from "./modalCancelButton";
import { motion } from "framer-motion";

function Modal({
	children,
	onConfirm,
	onCancel,
}: {
	children: React.ReactNode;
	onConfirm?: () => void;
	onCancel?: () => void;
}) {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div className="fixed left-0 top-0 z-30 flex h-screen w-full items-center bg-black bg-opacity-80 px-2 py-5">
			<motion.div
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				className="mx-auto w-fit max-w-full rounded-lg bg-offwhite px-4 py-4 shadow-lg shadow-black"
			>
				{children}
				<div className="mt-5 flex gap-4">
					<ModalConfirmButton onClick={onConfirm} />
					<ModalCancelButton onClick={onCancel} />
				</div>
			</motion.div>
		</div>
	);
}

export { Modal, ModalHeader, ModalBody };
