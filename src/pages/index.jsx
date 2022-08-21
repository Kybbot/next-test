import React from "react";
import groq from "groq";
import { useRouter } from "next/router";

import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { sanityClient } from "../lib/sanity-serve";

const Home = ({ posts }) => {
	const router = useRouter();

	const [currentPage, setCurrentPage] = React.useState(router.asPath.split("=")[1] || 1);

	const articlesPerPage = 1;
	const lastArticleInex = currentPage * articlesPerPage;
	const firstArticleIndex = lastArticleInex - articlesPerPage;
	const currentArticles = posts.slice(firstArticleIndex, lastArticleInex);

	const totalPages = Math.ceil(posts.length / articlesPerPage);

	const changePage = (page) => {
		setCurrentPage(page);
	};

	const prevPageHandler = () => {
		setCurrentPage((prevState) => (prevState === 1 ? 1 : prevState - 1));
	};

	const nextPageHandler = () => {
		setCurrentPage((prevState) => (prevState === totalPages ? prevState : prevState + 1));
	};

	return (
		<main className="posts-container">
			{currentArticles.map((post) => (
				<Card key={post._id} post={post} />
			))}
			<Pagination
				pages={totalPages}
				currentPage={currentPage}
				changePage={changePage}
				prevPageHandler={prevPageHandler}
				nextPageHandler={nextPageHandler}
			/>
		</main>
	);
};

export async function getStaticProps({ preview = false }) {
	const posts = await sanityClient.fetch(groq`
		*[_type == "post"] | order(publishedAt desc) {
			_id,
			slug,
			title,
			mainImage,
			"username": author->username,
			"authorImage": author->avatar,
			"categories": categories[]->{_id, title},
		}
	`);

	return {
		props: {
			posts,
		},
	};
}

export default Home;
