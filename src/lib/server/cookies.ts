import type { Cookies } from '@sveltejs/kit';

export function setCookies(cookies: Cookies, values: Record<string, string>, options = {}) {
	for (const [key, value] of Object.entries(values)) {
		cookies.set(key, value, {
			path: '/',
			maxAge: 60 * 60,
			...options
		});
	}
}
