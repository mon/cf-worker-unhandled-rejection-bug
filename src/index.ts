export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		console.log(url.pathname);
		switch (url.pathname) {
			case "/1":
				try {
					await (async () => Promise.reject("die"))();
				} catch (_) {
				}
				return new Response('Error case');
			case "/2":
				try {
					await (async () => { await Promise.reject("die") })();
				} catch (_) {
				}
				return new Response('Success case');
		}
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
