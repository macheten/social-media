import { CommentsModal } from "@/shared/components/shared/modals/comments-modal";
import { Api } from "@/src/services";

export default async function CommentsModalPage ({ params }: any) {
    const { postId } = await params

    return <CommentsModal postId={postId} />
}