import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

interface ToastContextProps {
	toasts: Toast[];
	showToast: (message: string, type?: ToastType) => void;
	removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = useCallback((message: string, type: ToastType = 'info') => {
		toastId += 1;
		const id = toastId;
		setToasts((prev) => [...prev, { id, message, type }]);
		setTimeout(() => removeToast(id), 3500);
	}, []);

	const removeToast = useCallback((id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ toasts, showToast, removeToast }}>
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};
