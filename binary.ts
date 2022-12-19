import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

function integerToBinaryString(num) {
    if (num === 0) return '0';
    if (num === 1) return '1';

    let binaryString = '';
    while (num > 0) {
        binaryString = (num % 2) + binaryString;
        num = Math.floor(num / 2);
    }

    return binaryString;
}
router.get("/", (ctx) => {

    const styles = `
    body {
        margin: 1em;
        font-family: sans-serif;
    }
    pre {
        background-color: #eee;
        display: inline-block;
        padding: 0.5em;
        border-radius: 5px;
    }
    `;
    ctx.response.body = `
    <html>
        <head>
            <title>Integer to Binary Conversion API</title>
            <style>${styles}</style>
        </head>
        <body>
            <h1>Integer to Binary Conversion API</h1>
            <h2>Example API call</h2>
            <pre>${ctx.request.url.href}42</pre>
            <h2>Example response</h2>
            <pre>{"integer": "42","binary": "101010"}</pre>
        </body>
    </html>`;
});

router.get("/:int", (ctx) => {
    // console.log(ctx.params.int);
    const int = parseInt(ctx.params);
    ctx.response.body = {
        integer: ctx.params.int,
        binary: integerToBinaryString(ctx.params.int),
    };
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 80 });