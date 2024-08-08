import React, { useEffect, useState } from 'react';
import moment from 'moment';

const TimeRemainingOfServices = ({ startDay, endDay }) => {
  const [remainingTime, setRemainingTime] = useState({});
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const end = moment(startDay).add(endDay, 'days');
      const durationLeft = moment.duration(end.diff(now));

      if (durationLeft.asSeconds() <= 0) {
        clearInterval(interval);
        setRemainingTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setTimeOver(true);
      } else {
        setRemainingTime({
          days: durationLeft.days(),
          hours: durationLeft.hours(),
          minutes: durationLeft.minutes(),
          seconds: durationLeft.seconds(),
        });
        setTimeOver(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDay, endDay]);

  return (
    <div>
      {timeOver ? (
        <p className=' bg-red-600 text-white p-2 '>لقد انتهى الوقت المحدد لتسليم الخدمة يمكنك من رفع مشكلة الى الدعم الفني</p>
      ) : (
        <p>
          {remainingTime.days} أيام، {remainingTime.hours} ساعات، {remainingTime.minutes} دقائق، {remainingTime.seconds} ثواني
        </p>
      )}
    </div>
  );
};

export default TimeRemainingOfServices;
