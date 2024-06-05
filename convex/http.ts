import { httpRouter } from "convex/server";
import { handleClientScriptLoad } from "next/script";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/dist";

const validatePayload = async(req: Request):
    Promise<WebhookEvent | undefined> => {
        const payload = await req.text()

        const svixHeaders = {
            "svix-id": req.headers.get("svix-id")!,
            "svix-timestamp": req.headers.get("svix-timestamp")!,
            "svix-signature": req.headers.get("svix-signature")!,
        }

        const webhook = new Webhook(
            process.env.CLERK_WEBHOOK_SECRET || "" )


        try{
            const event = webhook.verify(payload,
                svixHeaders) as WebhookEvent

            return event
        }catch (error){
            console.error("Clerk Webhook request cannot be verified");
            return;
        }
    }

const handleClientWebhook = httpAction( 
    async (ctx, req) => {
        const event = await validatePayload(req);

        if(!event){
            return new Response("Could not validate Clerk payload", 
                {
                    status: 400;
                })
        }
        
    })

const http = httpRouter()

http.route({
    path: "/clerk-users-webhook",
    method: "POST",
    handler: handleClientWebhook
})

export default http;