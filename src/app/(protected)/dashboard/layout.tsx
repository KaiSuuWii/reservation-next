"use client";

import React from 'react';
import Sidebar from './sidebar';
import Roles from './roles/page';
import { useAccount } from '../provider';

export default function DashboardLayout({ children }: { children: React.ReactNode}) {

    const { account } = useAccount();

    if (!account.email) { // loading spinner
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f3f4f6'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '6px solid #e5e7eb',
                    borderTop: '6px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    else if (!account.role) { // role picker
        return <Roles />;
    }
    
    return ( // dashboard
        <Sidebar>
            {children}
        </Sidebar>
    );
}