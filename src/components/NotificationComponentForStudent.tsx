import React from "react";

interface Notification {
  id: number;
  type: "reservation" | "reminder" | "update" | "alert";
  title: string;
  message: string;
  date: string;
  read: boolean;
  reservationNumber: string;
  startDate: string;
  endDate: string;
  pax: number;
  schoolUnit: string;
  representative: string;
  eventName: string;
  contactNumber: string;
  venue: string;
  eventType: string;
}

interface ListProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: Notification) => void;
}

interface DetailProps {
  notification: Notification;
  onClose: () => void;
}

type NotificationComponentForStudentProps = ListProps | DetailProps;

const NotificationComponentForStudent: React.FC<NotificationComponentForStudentProps> = (props) => {
  const isList = 'notifications' in props;

  const renderNotificationIcon = (type: Notification['type'], read: boolean) => {
    const iconColor = read ? 
      (type === 'reservation' ? 'text-blue-600' : 
       type === 'reminder' ? 'text-yellow-500' : 
       type === 'update' ? 'text-green-500' : 
       'text-red-500') : 
      'text-white';
    
    if (type === 'reservation') {
      return (
        <svg
          className={`w-6 h-6 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
      );
    } else if (type === 'reminder') {
      return (
        <svg
          className={`w-6 h-6 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      );
    } else if (type === 'update') {
      return (
        <svg
          className={`w-6 h-6 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      );
    } else if (type === 'alert') {
      return (
        <svg
          className={`w-6 h-6 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
      );
    }
    return null;
  };

  const getTypeLabel = (type: Notification['type']) => {
    switch(type) {
      case 'reservation': return 'Reservation';
      case 'reminder': return 'Reminder';
      case 'update': return 'Update';
      case 'alert': return 'Alert';
      default: return 'Notification';
    }
  };

  const getTypeBadgeColor = (type: Notification['type'], read: boolean) => {
    if (!read) return 'bg-white/20 text-white';
    
    switch(type) {
      case 'reservation': return 'bg-blue-100 text-blue-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      case 'update': return 'bg-green-100 text-green-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isList) {
    const { notifications, onMarkAllAsRead, onNotificationClick } = props as ListProps;

    return (
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">My Notifications</h1>
            {notifications.some(notification => !notification.read) && (
              <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {notifications.filter(n => !n.read).length} New
              </span>
            )}
          </div>
          <button 
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={onMarkAllAsRead}
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-16 px-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications yet</h3>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-5 border rounded-xl shadow-sm transition-all ${
                  notification.read 
                    ? 'bg-[#E3E3E3] border-gray-200 hover:border-gray-300 hover:shadow' 
                    : 'bg-[#005DA8] border-[#004A85] hover:bg-[#004A85]'
                } cursor-pointer`} 
                onClick={() => onNotificationClick(notification)}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-2.5 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-white/10'}`}>
                    {renderNotificationIcon(notification.type, notification.read)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold text-lg ${
                          notification.read ? 'text-gray-800' : 'text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeBadgeColor(notification.type, notification.read)}`}>
                          {getTypeLabel(notification.type)}
                        </span>
                      </div>
                      <span className={`text-xs font-medium ${
                        notification.read ? 'text-gray-500' : 'text-white/80'
                      }`}>
                        {notification.date}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${
                      notification.read ? 'text-gray-600' : 'text-white/90'
                    }`}>
                      {notification.message}
                    </p>

                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm ${
                      notification.read ? 'text-gray-700' : 'text-white/90'
                    }`}>
                      <div>
                        <span className={`block text-xs mb-1 ${notification.read ? 'text-gray-500' : 'text-white/70'}`}>
                          Reservation
                        </span>
                        <span className="font-medium">{notification.reservationNumber}</span>
                      </div>
                      <div>
                        <span className={`block text-xs mb-1 ${notification.read ? 'text-gray-500' : 'text-white/70'}`}>
                          Start Date
                        </span>
                        <span className="font-medium">{notification.startDate}</span>
                      </div>
                      <div>
                        <span className={`block text-xs mb-1 ${notification.read ? 'text-gray-500' : 'text-white/70'}`}>
                          Venue
                        </span>
                        <span className="font-medium">{notification.venue}</span>
                      </div>
                      <div>
                        <span className={`block text-xs mb-1 ${notification.read ? 'text-gray-500' : 'text-white/70'}`}>
                          Event
                        </span>
                        <span className="font-medium">{notification.eventName}</span>
                      </div>
                    </div>
                  </div>

                  {!notification.read && (
                    <div className="flex-shrink-0">
                      <span className="inline-block w-3 h-3 bg-white rounded-full"></span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  } else {
    const { notification, onClose } = props as DetailProps;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
        <div className="bg-white p-0 rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
          <div className={`p-6 ${
            notification.type === 'reservation' ? 'bg-blue-500' : 
            notification.type === 'reminder' ? 'bg-yellow-500' : 
            notification.type === 'update' ? 'bg-green-500' : 
            'bg-red-500'
          } text-white`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  {renderNotificationIcon(notification.type, false)}
                </div>
                <div>
                  <span className="text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">
                    {getTypeLabel(notification.type)}
                  </span>
                  <h2 className="text-xl font-bold mt-1">{notification.title}</h2>
                </div>
              </div>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-lg">
                {notification.date}
              </span>
            </div>
            <p className="mt-3 text-white/90">{notification.message}</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Event Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Reservation Number</p>
                    <p className="text-gray-800 font-medium">{notification.reservationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Event Name</p>
                    <p className="text-gray-800 font-medium">{notification.eventName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Event Type</p>
                    <p className="text-gray-800 font-medium">{notification.eventType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="text-gray-800 font-medium">{notification.venue}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="text-gray-800 font-medium">{notification.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="text-gray-800 font-medium">{notification.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Requester Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">School/Unit</p>
                    <p className="text-gray-800 font-medium">{notification.schoolUnit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Representative</p>
                    <p className="text-gray-800 font-medium">{notification.representative}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="text-gray-800 font-medium">{notification.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number of Participants</p>
                    <p className="text-gray-800 font-medium">{notification.pax}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 bg-gray-50 p-4 border-t">
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
            <button 
              className={`px-4 py-2 ${
                notification.type === 'reservation' ? 'bg-blue-500 hover:bg-blue-600' : 
                notification.type === 'reminder' ? 'bg-yellow-500 hover:bg-yellow-600' : 
                notification.type === 'update' ? 'bg-green-500 hover:bg-green-600' : 
                'bg-red-500 hover:bg-red-600'
              } text-white rounded-lg transition-colors`}
            >
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default NotificationComponentForStudent;