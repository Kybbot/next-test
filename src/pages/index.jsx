import groq from "groq";

import { getClient } from "../lib/sanity-serve";
import Card from "../components/Card";

const Home = ({ posts }) => {
	console.log(posts);
	return (
		<main className="posts-container">
			{posts.map((post) => (
				<Card key={post._id} post={post} />
			))}
		</main>
	);
};

export async function getStaticProps({ preview = false }) {
	const posts = await getClient(preview).fetch(groq`
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