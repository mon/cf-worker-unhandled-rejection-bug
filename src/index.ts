async function throwing() {
  throw new Error("No luck");
}

function createVerifierReturningPromise() {
  return async (key: string) => throwing();
}

function createVerifierAwaitingPromise() {
  return async (key: string) => await throwing();
}

async function verifyJwt(jwt: string, verifier: (key: string) => Promise<void>) {
  await verifier(jwt);
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    console.log(url.pathname);
    switch (url.pathname) {
      case "/1":
        try {
          await verifyJwt("test", createVerifierReturningPromise());
        } catch (e) {
          return new Response(`JWT validation failed: ${e}`);
        }
      case "/2":
        try {
          await verifyJwt("test", createVerifierAwaitingPromise());
        } catch (e) {
          return new Response(`JWT validation failed: ${e}`);
        }
    }
    return new Response("Hello World!");
  },
} satisfies ExportedHandler<Env>;
