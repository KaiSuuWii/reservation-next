import { AccountProvider } from "./provider";

export default async function DashboardLayout({ children, }: { children: React.ReactNode }) {
    
    return (
        <AccountProvider>
            {children}
        </AccountProvider>
    );
}