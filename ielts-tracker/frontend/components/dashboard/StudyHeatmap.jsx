/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const WEEK_COLUMNS = 52;
const DAYS_PER_WEEK = 7;
const DISPLAY_GRID_DAYS = WEEK_COLUMNS * DAYS_PER_WEEK;
const YEAR_OPTIONS = [2026, 2025, 2024];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const toDateKey = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const scoreToLevel = (score) => {
  if (score <= 0) return 0;
  if (score <= 2) return 1;
  if (score <= 4) return 2;
  if (score <= 7) return 3;
  return 4;
};

const formatLongDate = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const StudyHeatmap = ({ progressData = [] }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [gridDays, setGridDays] = useState([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    day: null,
  });
  const gridRef = useRef(null);

  const progressByDate = useMemo(() => {
    const map = new Map();

    progressData.forEach((entry) => {
      const key = toDateKey(entry?.date);
      if (!key) {
        return;
      }

      const listening = toNumber(entry?.listening);
      const reading = toNumber(entry?.reading);
      const writing = toNumber(entry?.writing);
      const speaking_minutes = toNumber(entry?.speaking_minutes);
      const vocabulary_count = toNumber(entry?.vocabulary_count);

      const existing = map.get(key) || {
        listening: 0,
        reading: 0,
        writing: 0,
        speaking_minutes: 0,
        vocabulary_count: 0,
      };

      map.set(key, {
        listening: existing.listening + listening,
        reading: existing.reading + reading,
        writing: existing.writing + writing,
        speaking_minutes: existing.speaking_minutes + speaking_minutes,
        vocabulary_count: existing.vocabulary_count + vocabulary_count,
      });
    });

    return map;
  }, [progressData]);

  useEffect(() => {
    const now = new Date();
    const rangeEnd =
      selectedYear === currentYear ? new Date(now) : new Date(selectedYear, 11, 31);

    rangeEnd.setHours(0, 0, 0, 0);

    const rangeStart = new Date(rangeEnd);
    rangeStart.setDate(rangeStart.getDate() - 364);

    const days = [];

    for (let index = 0; index < 365; index += 1) {
      const dayDate = new Date(rangeStart);
      dayDate.setDate(rangeStart.getDate() + index);

      const key = toDateKey(dayDate);
      const values =
        (key && progressByDate.get(key)) || {
          listening: 0,
          reading: 0,
          writing: 0,
          speaking_minutes: 0,
          vocabulary_count: 0,
        };

      const score =
        values.listening +
        values.reading +
        values.writing +
        values.speaking_minutes / 10 +
        values.vocabulary_count / 5;

      days.push({
        key,
        date: dayDate,
        listening: values.listening,
        reading: values.reading,
        writing: values.writing,
        speaking_minutes: values.speaking_minutes,
        vocabulary_count: values.vocabulary_count,
        score,
      });
    }

    setGridDays(days);
    setTooltip((previous) => ({ ...previous, visible: false, day: null }));
  }, [selectedYear, currentYear, progressByDate]);

  const coloredDays = useMemo(
    () =>
      gridDays.map((day) => {
        const level = scoreToLevel(day.score);
        return {
          ...day,
          level,
          color: LEVEL_COLORS[level],
        };
      }),
    [gridDays]
  );

  const studyDaysCount = useMemo(
    () => coloredDays.filter((day) => day.score > 0).length,
    [coloredDays]
  );

  const visibleDays = useMemo(() => coloredDays.slice(-DISPLAY_GRID_DAYS), [coloredDays]);

  const weekColumns = useMemo(() => {
    const columns = [];

    for (let week = 0; week < WEEK_COLUMNS; week += 1) {
      const start = week * DAYS_PER_WEEK;
      columns.push(visibleDays.slice(start, start + DAYS_PER_WEEK));
    }

    return columns;
  }, [visibleDays]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let previousMonth = -1;

    weekColumns.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (!firstDay) {
        return;
      }

      const month = firstDay.date.getMonth();
      if (month !== previousMonth) {
        labels.push({ weekIndex, label: MONTH_NAMES[month] });
        previousMonth = month;
      }
    });

    return labels;
  }, [weekColumns]);

  const monthLabelByWeek = useMemo(() => {
    const map = new Map();
    monthLabels.forEach((entry) => map.set(entry.weekIndex, entry.label));
    return map;
  }, [monthLabels]);

  const showTooltip = (event, day) => {
    const containerRect = gridRef.current?.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();

    if (!containerRect) {
      return;
    }

    setTooltip({
      visible: true,
      day,
      x: cellRect.left - containerRect.left + cellRect.width / 2,
      y: cellRect.top - containerRect.top - 8,
    });
  };

  const hideTooltip = () => {
    setTooltip((previous) => ({ ...previous, visible: false, day: null }));
  };

  return (
    <div
      className="w-full rounded-md border p-4"
      style={{
        backgroundColor: '#0d1117',
        borderColor: '#30363d',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-[#c9d1d9]">
          {studyDaysCount} study days in the last year
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-[#30363d] px-3 py-1.5 text-xs text-[#c9d1d9] transition-colors hover:bg-[#161b22]"
        >
          <span>Settings</span>
          <span aria-hidden="true">v</span>
        </button>
      </div>

      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 ml-8 flex" style={{ columnGap: '3px' }}>
            {Array.from({ length: WEEK_COLUMNS }).map((_, weekIndex) => {
              const monthLabel = monthLabelByWeek.get(weekIndex);
              const monthKey = weekColumns[weekIndex]?.[0]?.key || `month-fallback-${monthLabel || weekIndex}`;
              return (
                <div
                  key={monthKey}
                  className="relative"
                  style={{ width: '10px', minWidth: '10px', height: '16px' }}
                >
                  {monthLabel ? (
                    <span className="absolute left-0 top-0 text-[12px] text-[#8b949e]">
                      {monthLabel}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="relative" ref={gridRef}>
            <div className="flex">
              <div className="mr-2 flex flex-col" style={{ rowGap: '3px' }}>
                {DAY_LABELS.map((label, rowIndex) => (
                  <div
                    key={`day-label-${label || rowIndex}`}
                    className="h-[10px] text-[12px] leading-[10px] text-[#8b949e]"
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div className="flex" style={{ columnGap: '3px' }}>
                {weekColumns.map((week, weekIndex) => (
                  <div
                    key={week[0]?.key || `week-fallback-${weekIndex}`}
                    className="flex flex-col"
                    style={{ rowGap: '3px' }}
                  >
                    {week.map((day) => (
                      <button
                        key={day.key || `${weekIndex}-${day.date.toISOString()}`}
                        type="button"
                        className="rounded-[2px] transition duration-100 hover:scale-[1.4] hover:brightness-125"
                        style={{
                          width: '10px',
                          height: '10px',
                          backgroundColor: day.color,
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(event) => showTooltip(event, day)}
                        onMouseLeave={hideTooltip}
                        aria-label={`${Math.round(day.score)} activities on ${formatLongDate(day.date)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {tooltip.visible && tooltip.day ? (
              <div
                className="pointer-events-none absolute z-20 min-w-[220px] rounded-md border border-white/15 bg-[#161b22]/95 px-3 py-2 text-xs text-white shadow-2xl backdrop-blur"
                style={{
                  left: `${tooltip.x}px`,
                  top: `${tooltip.y}px`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <p className="font-medium text-white">{formatLongDate(tooltip.day.date)}</p>
                <p className="mt-1 text-[#c9d1d9]">
                  {Math.round(tooltip.day.score)} study activities
                </p>
                <div className="my-2 h-px bg-white/20" />
                <div className="space-y-1 text-[#e6edf3]">
                  <div className="flex items-center justify-between gap-4">
                    <span>Listening:</span>
                    <span>{tooltip.day.listening} tests</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Reading:</span>
                    <span>{tooltip.day.reading} passage</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Writing:</span>
                    <span>{tooltip.day.writing} tasks</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Speaking:</span>
                    <span>{tooltip.day.speaking_minutes} min</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Vocabulary:</span>
                    <span>{tooltip.day.vocabulary_count} words</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex items-center justify-end text-[12px] text-[#8b949e]">
            <span className="mr-2">Less</span>
            <div className="flex" style={{ columnGap: '3px' }}>
              {LEVEL_COLORS.map((color) => (
                <div
                  key={`legend-${color}`}
                  className="rounded-[2px]"
                  style={{ width: '10px', height: '10px', backgroundColor: color }}
                />
              ))}
            </div>
            <span className="ml-2">More</span>
          </div>
        </div>

        <div className="flex w-[72px] flex-col items-end gap-2 pt-6">
          {YEAR_OPTIONS.map((year) => {
            const isActive = year === selectedYear;

            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`text-xs transition-colors ${
                  isActive
                    ? 'rounded-md bg-[#1f6feb] px-2 py-1 font-medium text-white'
                    : 'px-1 text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyHeatmap;
