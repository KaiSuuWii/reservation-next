import React from 'react';

export default function HomeLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
        <main className="flex-grow">{children}</main>
        <footer className="flex flex-col items-center justify-center bg-[#283971] text-white p-7">
            <p className="text-xs">© 2025 Xavier University - Ateneo de Cagayan</p>
            <p className="text-xs">Corrales Avenue, Cagayan de Oro City, Philippines</p>
        </footer>
    </div>
  );
}