import DayTimeSlots from "./DayTimeSlots";
import events from "../data/events.json";
import Events from "./Events";

export default function DayView() {
  return (
    <div className="calendar">
      <div className="line"></div>
      <DayTimeSlots />
      <Events events={events} />
    </div>
  );
}
