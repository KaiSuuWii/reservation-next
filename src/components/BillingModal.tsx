interface BillingItem {
    item: string;
    ratePerHour: number;
    hours: number;
    days?: number;
    total: number;
}

interface BillingStatementModalProps {
    isOpen: boolean;
    onClose: () => void;
    venueRentals: { [key: string]: number };
    manpowerServices: { [key: string]: number };
}

const BillingStatementModal: React.FC<BillingStatementModalProps> = ({
    isOpen,
    onClose,
    venueRentals,
    manpowerServices,
}) => {
    if (!isOpen) {
        return null;
    }

    const venueBillingItems: BillingItem[] = Object.keys(venueRentals)
        .filter((key) => venueRentals[key] > 0 && venueRentalPricesPerHour[key as keyof typeof venueRentalPricesPerHour])
        .map((key) => {
            const hours = venueRentals[key];
            const days = Math.floor(hours / 24) || null;
            const ratePerHour = venueRentalPricesPerHour[key as keyof typeof venueRentalPricesPerHour] || 0;
            const total = hours * ratePerHour;
            return {
                item: key.replace(/([A-Z])/g, ' $1').trim(),
                ratePerHour,
                hours,
                days: days || undefined,
                total
            };
        });

    const manpowerBillingItems: BillingItem[] = Object.keys(manpowerServices)
        .filter((key) => manpowerServices[key] > 0 && manpowerHourlyRatesPHP[key as keyof typeof manpowerHourlyRatesPHP])
        .map((key) => {
            const hours = manpowerServices[key];
            const days = Math.floor(hours / 24) || null;
            const ratePerHour = manpowerHourlyRatesPHP[key as keyof typeof manpowerHourlyRatesPHP] || 0;
            const total = hours * ratePerHour;
            return {
                item: key.replace(/([A-Z])/g, ' $1').trim(),
                ratePerHour,
                hours,
                days: days || undefined,
                total
            };
        });

    const totalVenueCost = venueBillingItems.reduce((sum, item) => sum + item.total, 0);
    const totalManpowerCost = manpowerBillingItems.reduce((sum, item) => sum + item.total, 0);
    const grandTotal = totalVenueCost + totalManpowerCost;
    const damageDepositFee = 8520;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-xl font-bold mb-6 text-center text-[#283971]">Billing Statement</h2>

                {/* Venue Rentals Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-[#283971]">(Venue)</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-2 text-left text-[#283971]">Facilities</th>
                                    <th className="py-2 text-center text-[#283971]">No. of Days</th>
                                    <th className="py-2 text-center text-[#283971]">No. of Hours</th>
                                    <th className="py-2 text-right text-[#283971]">Rate</th>
                                    <th className="py-2 text-right text-[#283971]">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venueBillingItems.length > 0 ? (
                                    venueBillingItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-2">{item.item}</td>
                                            <td className="py-2 text-center">{item.days || '-'}</td>
                                            <td className="py-2 text-center">{item.hours}</td>
                                            <td className="py-2 text-right">₱{item.ratePerHour.toLocaleString()}/hr</td>
                                            <td className="py-2 text-right">₱{item.total.toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-2 text-gray-600 text-center">No venue rentals selected.</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="border-t border-gray-300">
                                    <td colSpan={4} className="py-2 text-right font-semibold">Initial Amount:</td>
                                    <td className="py-2 text-right font-semibold">₱{totalVenueCost.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="border-b border-gray-300 w-full mb-6"></div>

                {/* Manpower Services Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-[#283971]">(Manpower)</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-2 text-left text-[#283971]">Facilities</th>
                                    <th className="py-2 text-center text-[#283971]">No. of Days</th>
                                    <th className="py-2 text-center text-[#283971]">No. of Hours</th>
                                    <th className="py-2 text-right text-[#283971]">Rate</th>
                                    <th className="py-2 text-right text-[#283971]">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manpowerBillingItems.length > 0 ? (
                                    manpowerBillingItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-2">{item.item}</td>
                                            <td className="py-2 text-center">{item.days || '-'}</td>
                                            <td className="py-2 text-center">{item.hours}</td>
                                            <td className="py-2 text-right">₱{item.ratePerHour.toLocaleString()}/hr</td>
                                            <td className="py-2 text-right">₱{item.total.toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-2 text-gray-600 text-center">No manpower services selected.</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4} className="py-2 text-right font-semibold">Initial Amount:</td>
                                    <td className="py-2 text-right font-semibold">₱{totalManpowerCost.toLocaleString()}</td>
                                </tr>
                                <tr className="border-t border-gray-300">
                                    <td colSpan={4} className="py-2 text-right font-bold text-lg text-[#283971]">Total Amount:</td>
                                    <td className="py-2 text-right font-bold text-lg text-[#283971]">₱{grandTotal.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Damage Fee and Note Section */}
                <div className="mb-6 text-sm">
                    <p className="text-gray-700">Damage Fee Deposit: ₱{damageDepositFee.toLocaleString()} (this is a fixed price)</p>
                    <p className="text-gray-700">Note: Pay at Finance Office</p>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all mr-2"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => alert('Implement Print/Download Logic')}
                        className="bg-[#283971] text-white px-4 py-2 rounded-lg hover:bg-[#1e2b58] transition-all"
                    >
                        Print / Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillingStatementModal;