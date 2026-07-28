const MINUTES_IN_DAY = 24 * 60;

export const DEFAULT_WAKE_TIME = "07:00";
export const DEFAULT_SLEEP_GOAL_HOURS = 8;

export function parseTime(value?: string) {
  if (!value || !/^\d{1,2}:\d{2}$/.test(value)) {
    return undefined;
  }

  const [hours, minutes] = value.split(":").map(Number);

  if (hours > 23 || minutes > 59) {
    return undefined;
  }

  return hours * 60 + minutes;
}

export function formatTime(totalMinutes: number) {
  const normalized =
    ((totalMinutes % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function splitTime(value?: string) {
  const total = parseTime(value) ?? parseTime(DEFAULT_WAKE_TIME) ?? 0;

  return { hours: Math.floor(total / 60), minutes: total % 60 };
}

/** The hour to be in bed so a wake time delivers the wanted hours of sleep. */
export function lightsOutFor(wakeTime: string, sleepHours: number) {
  const wakeMinutes = parseTime(wakeTime);

  if (wakeMinutes === undefined) {
    return undefined;
  }

  return formatTime(wakeMinutes - sleepHours * 60);
}