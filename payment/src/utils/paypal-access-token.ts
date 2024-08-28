export async function generateAccessToken() {
    const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}