"use client";
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Account {
	email: string;
 	role: string;
}

interface AccountContextType {
 	account: Account;
 	refreshToken: () => Promise<void>;
 	revokeToken: () => Promise<void>;
 	updateSession: (callback: Function) => Promise<void>;
}

interface AccountProviderProps {
 	children: ReactNode;
}

const AccountContext = createContext<AccountContextType>({
	account: {
		email: "",
		role: "",
	},
	refreshToken: async () => {},
	revokeToken: async () => {},
	updateSession: async () => {},
});

export const AccountProvider = ({ children }: AccountProviderProps) => {
	const [account, setAccount] = useState<Account>({
		email: "",
		role: "",
	});
	const router = useRouter();

	const updateSession = async (callback: Function) => { // fetches the session data
		const response = await fetch('/api/session', { method: 'GET', });

		if (response.ok) {
			const data = await response.json();

			if (data && data.payload) {
				setAccount({
					email: data.payload.email,
					role: data.payload.role,
				});
			}
		} 
		else {
			await refreshToken();
		}

		callback();
	}

	const refreshToken = async () => { // forces a refresh of the access token
		const response = await fetch('/api/refresh', { method: 'POST', });

		if (response.ok) {
			const data = await response.json();

			if (data && data.payload) {
				setAccount({
					email: data.payload.email,
					role: data.payload.role,
				});
			}
		}
		else {
			await revokeToken();
		}
	};

	const revokeToken = async () => { // forces a revoke of the refresh token
		const response = await fetch('/api/revoke', { method: 'DELETE', });

		// clear the account state
		setAccount({
			email: "",
			role: "",
		});
		router.push('/login');
	};

	useEffect(() => {		
		updateSession(() => {});
	}, [router]);

 	return (
	 	<AccountContext.Provider value={{ account, refreshToken, revokeToken, updateSession }}> 
			{children} 
		</AccountContext.Provider> 
	);
};

export const useAccount = () => {
	const context = useContext(AccountContext);
 	if (!context) {
  		throw new Error("useAccount must be used within an AccountProvider");
  	}	
 	return context;
};