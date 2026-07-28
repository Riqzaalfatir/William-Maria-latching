// src/lib/api/twinklebook.ts

const BASE_URL = "https://api.twinklebook.com/api/Event";

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  errorEn?: string | null;
};

async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || json?.status === "Error" || json?.messageEN) {
      return {
        data: null,
        error: json?.message || json?.messageID || `Request gagal (status ${res.status})`,
        errorEn: json?.messageEN || null,
      };
    }

    return { data: json?.data ?? json, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Terjadi kesalahan jaringan",
      errorEn: null,
    };
  }
}

// --- EventByUrl ---
export function getEventByUrl<T = any>(url: string) {
  return apiRequest<T>(`/GetCurrentEvent?url=${encodeURIComponent(url)}`);
}

// --- CurrentGuest ---
export function getEventGuestByPin<T = any>(url: string, pin: string) {
  return apiRequest<T>(
    `/GetCurrentGuest?url=${encodeURIComponent(url)}&pin=${encodeURIComponent(pin)}`
  );
}

// --- OpenInvitation ---
export function openInvitation<T = any>(eventId: string, pin: string) {
  return apiRequest<T>(`/OpenInvitation`, {
    method: "POST",
    body: JSON.stringify({ eventId, pin }),
  });
}

// --- EventContentByEventId ---
export function getEventContent<T = any>(id: string) {
  return apiRequest<T>(`/GetEventContent?id=${encodeURIComponent(id)}`);
}

// --- SmartRSVPData ---
export function getSmartRsvpQuestionByPin<T = any>(url: string, pin: string) {
  return apiRequest<T>(
    `/GetSmartRSVPData?url=${encodeURIComponent(url)}&pin=${encodeURIComponent(pin)}`
  );
}

// --- EventSessionRSVPByPinEventId ---
export function getEventSessionByPin<T = any>(pin: string, eventId: string) {
  return apiRequest<T>(
    `/GetGuestEventSessionByPinNew?pin=${encodeURIComponent(pin)}&eventId=${encodeURIComponent(eventId)}`
  );
}

// --- GetAllPersonalGuestMessages (PMG - list ucapan) ---
export function getAllPersonalGuestMessages<T = any>(eventId: string) {
  return apiRequest<T>(`/GetAllPersonalGuestMessages?eventId=${encodeURIComponent(eventId)}`);
}

// --- SubmitPersonalGuestMessage (PMG - kirim ucapan baru) ---
export function submitPersonalGuestMessage<T = any>(payload: {
  eventId: string;
  mediaFileId: null;
  name: string;
  message: string;
  status: 1;
  type: 1;
}) {
  return apiRequest<T>(`/SubmitPersonalGuestMessage`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- InputRSVP ---
// ✅ Endpoint ini SUDAH DIKONFIRMASI ada di Postman collection terbaru dari tim.
// ⚠️ TAPI field `status` (angka) di payload BELUM JELAS mapping-nya ke Attend/Maybe/Not-Attend.
// Cross-check dulu ke tim atau ke pola `rsvpStatus` di response GetSmartRSVPData
// sebelum dipakai buat submit beneran.
export function submitEventRsvp<T = any>(payload: {
  eventId: string;
  url: string;
  pin: number;
  name: string;
  phone: string;
  status: number;
  maybeDate?: string;
  maybeNote?: string;
  questionList: Array<{
    eventSessionId: string;
    guestInvitation: number;
    questions: Array<{
      id: string;
      answer: string;
      optionAnswer: string;
      parentId: string;
      parentIndex: number;
    }>;
    guestAttendances: Array<{
      id: string;
      answer: string;
      optionAnswer: string;
      parentId: string;
      parentIndex: number;
    }>;
  }>;
}) {
  return apiRequest<T>(`/InputRSVP`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}