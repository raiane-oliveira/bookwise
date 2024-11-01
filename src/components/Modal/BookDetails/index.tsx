import * as Dialog from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { BookOpen, BookmarkSimple, X } from "phosphor-react";
import { Box } from "../../Data-Display/Box";
import Image from "next/image";
import { Book, ReviewedBook, User } from "@/@types/interfaces";
import { Text } from "../../Typography/Text";
import { Stars } from "../../Data-Display/Stars";
import { Link } from "../../Navigation/Link";
import { Login } from "../Login";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Avatar } from "../../Data-Display/Avatar";
import { formatToRelativeDate } from "@/utils/format-to-relative-date";
import { useState } from "react";
import { CreateReviewForm } from "./CreateReviewForm";
import LinkNext from "next/link";
import { ReadMore } from "@/components/Actions/ReadMore";

interface BookDetailsProps {
	book: Book;
}

interface UsersReviews extends ReviewedBook {
	user: User;
}

export function BookDetails({ book }: BookDetailsProps) {
	const [isUserRatingBook, setIsUserRatingBook] = useState(false);
	const session = useSession();

	const { data: usersReviews, refetch } = useQuery<UsersReviews[]>(
		["users-reviews", book.id],
		async () => {
			const response = await api.get(`/reviewed-book/${book.id}`);
			return response.data;
		},
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retry: 2,
		},
	);

	function handleCancelUserRating() {
		setIsUserRatingBook(false);
	}

	const currentUserReview = usersReviews?.find(
		(reviews) => reviews.user_id === session.data?.user.id,
	);

	const categories = book.categories
		?.map((category) => category.name)
		.join(", ");
	const authors = book.authors.map((author) => author.name).join(", ");

	return (
		<Dialog.Portal>
			<Dialog.Overlay
				className={`fixed inset-0 z-50 grid overflow-y-auto bg-black/60`}
			>
				<Dialog.Content className="ml-auto h-full w-full max-w-[41.25rem] bg-gray-800 px-8 py-12 shadow-[-4px_0px_30px_0px_rgba(0,0,0,0.50)] sm:px-12 sm:py-16">
					<Dialog.Close className="absolute right-4 top-4 sm:right-8 sm:top-6">
						<X className="h-6 w-6 text-gray-400" />
					</Dialog.Close>

					<Box variant="secondary" className="flex-col gap-10 px-8 pb-4 pt-6">
						<div className="flex flex-wrap gap-8">
							<Image
								src={book.image_url || ""}
								alt=""
								className="h-60 w-40 rounded-[0.625rem]"
								width={171}
								height={242}
							/>

							<div className="flex flex-1 flex-col gap-2">
								<Text
									as="strong"
									className="text-lg/base font-bold text-gray-100"
								>
									{book.name}
								</Text>
								<Text size="md">{authors}</Text>

								<div className="mt-auto">
									<Stars stars={Number(book.rating)} />
									<Text className="mt-1 text-gray-400">
										{usersReviews?.length}{" "}
										{usersReviews?.length === 1 ? "avaliação" : "avaliações"}
									</Text>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap gap-6 border-t border-gray-600 py-6 sm:gap-14">
							<div className="flex items-center gap-4">
								<BookmarkSimple className="h-6 w-6 text-green-100" />
								<div>
									<Text>Categoria</Text>
									<Text
										className="font-bold leading-base text-gray-200"
										size="md"
									>
										{categories || "Nenhuma categoria"}
									</Text>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<BookOpen className="h-6 w-6 text-green-100" />
								<div>
									<Text>Páginas</Text>
									<Text
										className="font-bold leading-base text-gray-200"
										size="md"
									>
										{book.pages || "Não especificado"}
									</Text>
								</div>
							</div>
						</div>
					</Box>

					<div className="mt-10 space-y-3">
						<div className={`mb-1 flex items-center justify-between`}>
							<Text className="text-gray-200">Avaliações</Text>
							{session.status === "unauthenticated" ? (
								<Dialog.Root>
									<Dialog.Trigger asChild>
										<Link href="" variant="secondary" as="button">
											Avaliar
										</Link>
									</Dialog.Trigger>

									<Login />
								</Dialog.Root>
							) : (
								<Link
									onClick={() => setIsUserRatingBook(true)}
									variant="secondary"
									as="button"
									href=""
									className={isUserRatingBook ? "hidden" : ""}
								>
									Avaliar
								</Link>
							)}
						</div>

						{isUserRatingBook && (
							<CreateReviewForm
								bookId={book.id}
								onCancelUserRating={handleCancelUserRating}
								refetchData={refetch}
							/>
						)}

						{currentUserReview && (
							<Box size="sm" className="flex-col p-6">
								<LinkNext
									href={`/profile/${currentUserReview.user_id}`}
									className="flex flex-wrap items-start gap-4"
								>
									<div className="flex items-start gap-4">
										<Avatar src={currentUserReview.user.avatar_url} alt="" />
										<div>
											<Text
												size="md"
												className="font-bold leading-base text-gray-100"
											>
												{currentUserReview.user.name}
											</Text>
											<Text className="text-gray-400">
												{formatToRelativeDate(currentUserReview.created_at)}
											</Text>
										</div>
									</div>

									<Stars
										stars={currentUserReview.stars}
										className="sm:ml-auto"
									/>
								</LinkNext>
								<ReadMore text={currentUserReview.review} />
							</Box>
						)}

						{usersReviews?.map((book) => {
							if (book.user_id === session.data?.user.id) {
								return null;
							}

							return (
								<Box
									key={book.id}
									size="sm"
									variant="secondary"
									className="flex-col p-6"
								>
									<LinkNext
										href={`/profile/${book.user_id}`}
										className="flex flex-wrap items-start gap-4"
									>
										<Avatar src={book.user.avatar_url} alt="" />
										<div>
											<Text
												size="md"
												className="font-bold leading-base text-gray-100"
											>
												{book.user.name}
											</Text>
											<Text className="text-gray-400">
												{formatToRelativeDate(book.created_at)}
											</Text>
										</div>
										<Stars stars={book.stars} className="sm:ml-auto" />
									</LinkNext>
									<ReadMore text={book.review} />
								</Box>
							);
						})}
					</div>
				</Dialog.Content>
			</Dialog.Overlay>
		</Dialog.Portal>
	);
}
