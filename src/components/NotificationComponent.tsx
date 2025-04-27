import React, { useState, useEffect } from 'react';
import {
    Bell,
    AlertTriangle,
    Info,
    Clock,
    X,
    CheckCircle,
    FileText
} from 'lucide-react';

interface Notification {
    type: 'reservation' | 'reminder' | 'update' | 'alert' | 'approval' | 'completed';
    read: boolean;
    reservationNumber: string;
    startDate: string;
    endDate: string;
    schoolUnit: string;
    representative: string;
    eventName: string;
    contactNumber: string;
    venue: string[] | string; // Accept both string array or string
    eventType: string[] | string; // Accept both string array or string

    // conditional show if it exists in the modal
    // uao
    manpowerNeeded?: string[] | string;

    // ppo
    equipment_needed?: string[] | string;
    presentation_equipment?: string[] | string;
    stage_options?: string[] | string;
    lighting_options?: string[] | string;
    
    // files/attachments for completed events
    attachments?: string[];
}

interface NotificationComponentProps {
    notifications?: Notification[];
    onMarkAllAsRead: () => void;
    onNotificationClick: (notification: Notification) => void;
    onViewLetterOfRequest?: (notification: Notification) => void;
    onAcknowledge?: (notification: Notification) => void;
    onApprove?: (notification: Notification) => void;
    onViewAttachment?: (notification: Notification, attachmentName: string) => void;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
    notifications = [],
    onMarkAllAsRead,
    onNotificationClick,
    onViewLetterOfRequest = () => { },
    onAcknowledge = () => { },
    onApprove = () => { },
    onViewAttachment = () => { },
}) => {
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const defaultNotifications: Notification[] = [];

    const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;
    const unreadCount = displayNotifications.filter(n => !n.read).length;

    // Helper function to handle arrays or strings
    const formatList = (value: string[] | string | undefined): string => {
        if (!value) return '';
        if (Array.isArray(value)) return value.join(', ');
        return value;
    };

    // Helper function to ensure value is an array
    const ensureArray = (value: string[] | string | undefined): string[] => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        return [value];
    };

    const handleNotificationClick = (notification: Notification) => {
        setSelectedNotification(notification);
        onNotificationClick(notification);
    };

    const handleCloseModal = () => {
        setSelectedNotification(null);
    };

    const handleViewLetterOfRequest = () => {
        if (selectedNotification) {
            onViewLetterOfRequest(selectedNotification);
        }
    };

    const handleAcknowledge = () => {
        if (selectedNotification) {
            onAcknowledge(selectedNotification);
            setSelectedNotification(null); // Close the modal after acknowledging
        }
    };

    const handleApprove = () => {
        if (selectedNotification) {
            onApprove(selectedNotification);
            setSelectedNotification(null); // Close the modal after approving
        }
    };

    const handleViewAttachment = (attachmentName: string) => {
        if (selectedNotification) {
            onViewAttachment(selectedNotification, attachmentName);
        }
    };

    // Close modal when escape key is pressed
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && selectedNotification) {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [selectedNotification]);

    // Handle click outside to close
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const renderNotificationIcon = (type: Notification['type'], read: boolean) => {
        const iconColor = read ?
            (type === 'reservation' ? 'text-blue-500' :
                type === 'reminder' ? 'text-yellow-500' :
                    type === 'update' ? 'text-green-500' :
                        type === 'approval' ? 'text-purple-500' :
                            type === 'completed' ? 'text-green-700' :
                                'text-red-500') :
            'text-white';

        const iconSize = 'w-6 h-6';

        switch (type) {
            case 'reservation':
                return <Bell className={`${iconSize} ${iconColor}`} />;
            case 'reminder':
                return <Clock className={`${iconSize} ${iconColor}`} />;
            case 'update':
                return <Info className={`${iconSize} ${iconColor}`} />;
            case 'approval':
                return <CheckCircle className={`${iconSize} ${iconColor}`} />;
            case 'completed':
                return <FileText className={`${iconSize} ${iconColor}`} />;
            case 'alert':
                return <AlertTriangle className={`${iconSize} ${iconColor}`} />;
            default:
                return null;
        }
    };

    const getTypeLabel = (type: Notification['type']) => {
        switch (type) {
            case 'reservation': return 'Reservation';
            case 'reminder': return 'Reminder';
            case 'update': return 'Update';
            case 'alert': return 'Alert';
            case 'approval': return 'Approval';
            case 'completed': return 'Completed';
            default: return 'Notification';
        }
    };

    const getTypeColor = (type: Notification['type']) => {
        switch (type) {
            case 'reservation': return 'bg-blue-500 hover:bg-blue-600';
            case 'reminder': return 'bg-yellow-500 hover:bg-yellow-600';
            case 'update': return 'bg-green-500 hover:bg-green-600';
            case 'alert': return 'bg-red-500 hover:bg-red-600';
            case 'approval': return 'bg-purple-500 hover:bg-purple-600';
            case 'completed': return 'bg-green-700 hover:bg-green-800';
            default: return 'bg-gray-500 hover:bg-gray-600';
        }
    };

    const getNotificationBgColor = (read: boolean, type: Notification['type']) => {
        if (read) {
            return 'bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'; // Lighter for read
        } else {
            switch (type) {
                case 'reservation': return 'bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-200';
                case 'reminder': return 'bg-yellow-50 hover:bg-yellow-100 border border-yellow-100 hover:border-yellow-200';
                case 'update': return 'bg-green-50 hover:bg-green-100 border border-green-100 hover:border-green-200';
                case 'alert': return 'bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200';
                case 'approval': return 'bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200';
                case 'completed': return 'bg-green-50 hover:bg-green-100 border border-green-100 hover:border-green-200';
                default: return 'bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200';
            }
        }
    };

    const getNotificationTextColor = (read: boolean) => {
        return read ? 'text-gray-600' : 'text-gray-800'; // Slightly darker for unread
    };

    const getSecondaryTextColor = (read: boolean) => {
        return read ? 'text-gray-400' : 'text-gray-500'; // Lighter for read
    };

    const getCn = (...classes: string[]) => classes.filter(Boolean).join(' ');

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">Staff Notifications</h2>
                    {unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
                <button
                    className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
                    onClick={onMarkAllAsRead}
                >
                    Mark all as read
                </button>
            </div>

            <ul className="space-y-4">
                {displayNotifications.map((notification) => (
                    <li
                        key={notification.reservationNumber}
                        className={getCn(
                            "p-4 rounded-lg shadow-md cursor-pointer transition-colors border",
                            getNotificationBgColor(notification.read, notification.type),
                            "hover:shadow-lg hover:scale-[1.01]" // Add a subtle scale on hover
                        )}
                        onClick={() => handleNotificationClick(notification)}
                    >
                        <div className="flex items-start gap-4">
                            <div className={getCn(
                                "flex-shrink-0 p-2 rounded-md",
                                notification.read ? 'bg-gray-100' : getTypeColor(notification.type), // Lighter bg for read
                                notification.read ? 'text-gray-500' : 'text-white'
                            )}>
                                {renderNotificationIcon(notification.type, notification.read)}
                            </div>
                            <div className="flex-1">
                                <div className={getCn(
                                    "grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 text-sm",
                                    getNotificationTextColor(notification.read)
                                )}>
                                    <div>
                                        <span className={getCn(
                                            "block text-xs mb-1",
                                            getSecondaryTextColor(notification.read)
                                        )}>Reservation</span>
                                        <span className="font-medium">{notification.reservationNumber}</span>
                                    </div>
                                    <div>
                                        <span className={getCn(
                                            "block text-xs mb-1",
                                            getSecondaryTextColor(notification.read)
                                        )}>Start Date</span>
                                        <span className="font-medium">{notification.startDate}</span>
                                    </div>
                                    <div>
                                        <span className={getCn(
                                            "block text-xs mb-1",
                                            getSecondaryTextColor(notification.read)
                                        )}>Venue</span>
                                        {/* Use formatList to safely handle both string and array */}
                                        <span className="font-medium">{formatList(notification.venue)}</span>
                                    </div>
                                    <div>
                                        <span className={getCn(
                                            "block text-xs mb-1",
                                            getSecondaryTextColor(notification.read)
                                        )}>Event</span>
                                        <span className="font-medium">{notification.eventName}</span>
                                    </div>
                                </div>
                            </div>
                            {!notification.read && (
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full self-center animate-pulse"></span> // Subtle pulse for unread
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Improved Modal */}
            {selectedNotification && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
                    onClick={handleBackdropClick}
                >
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all duration-300 scale-100" // Added rounded-xl and shadow-2xl
                    >
                        <div className={getCn(
                            "p-5 flex items-center justify-between",
                            getTypeColor(selectedNotification.type),
                            "text-white"
                        )}>
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-md bg-white/20">
                                    {renderNotificationIcon(selectedNotification.type, false)}
                                </div>
                                <h3 className="text-xl font-semibold">{selectedNotification.eventName}</h3> {/* Increased font size */}
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/30 text-white">
                                    {getTypeLabel(selectedNotification.type)}
                                </span>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-white hover:text-gray-200 focus:outline-none"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[75vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Event Details</h4> {/* Increased font size and spacing */}
                                    <div className="space-y-4"> {/* Increased spacing */}
                                        <div>
                                            <p className="text-sm text-gray-500">Reservation Number</p>
                                            <p className="text-gray-700 font-medium">{selectedNotification.reservationNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Event Name</p>
                                            <p className="text-gray-700 font-medium">{selectedNotification.eventName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Event Type</p>
                                            <div className="mt-1">
                                                {ensureArray(selectedNotification.eventType).map((type, index) => (
                                                    <span key={index} className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mr-1 mb-1">
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Venue</p>
                                            <div className="mt-1">
                                                {ensureArray(selectedNotification.venue).map((venue, index) => (
                                                    <span key={index} className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mr-1 mb-1">
                                                        {venue}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4"> {/* Increased gap */}
                                            <div>
                                                <p className="text-sm text-gray-500">Start Date</p>
                                                <p className="text-gray-700 font-medium">{selectedNotification.startDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">End Date</p>
                                                <p className="text-gray-700 font-medium">{selectedNotification.endDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Requester Information</h4> {/* Increased font size and spacing */}
                                    <div className="space-y-4"> {/* Increased spacing */}
                                        <div>
                                            <p className="text-sm text-gray-500">School/Unit</p>
                                            <p className="text-gray-700 font-medium">{selectedNotification.schoolUnit}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Representative</p>
                                            <p className="text-gray-700 font-medium">{selectedNotification.representative}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Contact Number</p>
                                            <p className="text-gray-700 font-medium">{selectedNotification.contactNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6"> {/* Increased margin and spacing */}
                                {selectedNotification.manpowerNeeded && selectedNotification.manpowerNeeded.length > 0 && (
                                    <div>
                                        <h5 className="text-md font-semibold text-gray-800 mb-2">Manpower Requirements</h5> {/* Increased font size */}
                                        <div className="flex flex-wrap gap-2">
                                            {ensureArray(selectedNotification.manpowerNeeded).map((item, index) => (
                                                <span key={index} className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.equipment_needed && selectedNotification.equipment_needed.length > 0 && (
                                    <div>
                                        <h5 className="text-md font-semibold text-gray-800 mb-2">Basic Facilities</h5>  {/* Increased font size */}
                                        <div className="flex flex-wrap gap-2">
                                            {ensureArray(selectedNotification.equipment_needed).map((item, index) => (
                                                <span key={index} className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.presentation_equipment && selectedNotification.presentation_equipment.length > 0 && (
                                    <div>
                                        <h5 className="text-md font-semibold text-gray-800 mb-2">Presentation Equipment</h5>  {/* Increased font size */}
                                        <div className="flex flex-wrap gap-2">
                                            {ensureArray(selectedNotification.presentation_equipment).map((item, index) => (
                                                <span key={index} className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.stage_options && selectedNotification.stage_options.length > 0 && (
                                    <div>
                                        <h5 className="text-md font-semibold text-gray-800 mb-2">Stage Options</h5>  {/* Increased font size */}
                                        <div className="flex flex-wrap gap-2">
                                            {ensureArray(selectedNotification.stage_options).map((item, index) => (
                                                <span key={index} className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.lighting_options && selectedNotification.lighting_options.length > 0 && (
                                    <div>
                                        <h5 className="text-md font-semibold text-gray-800 mb-2">Lighting Options</h5>  {/* Increased font size */}
                                        <div className="flex flex-wrap gap-2">
                                            {ensureArray(selectedNotification.lighting_options).map((item, index) => (
                                                <span key={index} className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Attachments section for completed events */}
                                {selectedNotification.type === 'completed' && selectedNotification.attachments && selectedNotification.attachments.length > 0 && (
                                    <div>
                                        <h5 className="text-md font-semibold text-gray-800 mb-2">Attachments</h5>
                                        <div className="space-y-2">
                                            {selectedNotification.attachments.map((attachment, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                    <div className="flex items-center">
                                                        <FileText className="h-5 w-5 text-gray-500 mr-2" />
                                                        <span className="text-sm text-gray-700">{attachment}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleViewAttachment(attachment)}
                                                        className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                            {/* Conditional buttons based on notification type */}
                            {selectedNotification.type === 'completed' ? (
                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                                    onClick={handleViewLetterOfRequest}
                                >
                                    View Completion Report
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                                    onClick={handleViewLetterOfRequest}
                                >
                                    View Letter of Request
                                </button>
                            )}

                            {selectedNotification.type === 'reservation' && (
                                <button
                                    className={getCn(
                                        "px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 transition-colors",
                                        getTypeColor(selectedNotification.type),
                                        `focus:ring-${getTypeColor(selectedNotification.type).split('-')[0]}-400`
                                    )}
                                    onClick={handleAcknowledge}
                                >
                                    Acknowledge
                                </button>
                            )}

                            {selectedNotification.type === 'approval' && (
                                <button
                                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
                                    onClick={handleApprove}
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {displayNotifications.length === 0 && (
                <div className="text-center py-16 px-4">
                    <Bell
                        className="mx-auto h-16 w-16 text-gray-300"
                        aria-hidden="true"
                    />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Check back later for updates.</p> {/* Added a more helpful message */}
                </div>
            )}
        </div>
    );
};

export default NotificationComponent;