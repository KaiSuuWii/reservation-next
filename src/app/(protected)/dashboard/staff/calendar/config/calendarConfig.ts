import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

export const localizer = momentLocalizer(moment);

export const eventTypeColors = {
    "Academic Event": "#4f46e5",
    "Sports Event": "#059669",
    "Leadership Seminar": "#7c3aed",
    "Workshop": "#0891b2",
    alert: "#ef4444",
    reminder: "#f59e0b",
    update: "#3b82f6",
};
