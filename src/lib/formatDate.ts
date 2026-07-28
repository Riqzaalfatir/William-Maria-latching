export function formatEventDate(isoDate?: string): string {
  if (!isoDate) return "SATURDAY, 19 SEPTEMBER 2026";
  const d = new Date(isoDate);
  return d
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
}

// ⬇️ TAMBAHIN INI DI BAWAHNYA, jangan hapus yang di atas
export function formatWeekdayMonth(isoDate?: string) {
  const fallback = { weekday: "SATURDAY", day: "19", month: "SEPTEMBER", year: "2026" };
  if (!isoDate) return fallback;

  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return fallback;

  const weekday = d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const day = String(d.getDate());
  const month = d.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  const year = String(d.getFullYear());

  return { weekday, day, month, year };
}