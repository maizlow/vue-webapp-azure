import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import postsService from "../services/posts.service"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
        await postsService.insertPost(context);
};

export default httpTrigger;