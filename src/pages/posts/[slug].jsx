import Image from "next/image";
import groq from "groq";
import { PortableText } from "@portabletext/react";

import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity-serve";
import Tag from "../../components/Tag";

const PostComponents = {
	types: {
		image: ({ value }) => {
			return (
				<div className="inside-post">
					<Image
						layout="responsive"
						width={1200}
						height={500}
						objectFit="cover"
						className="main-image"
						src={urlFor(value).url()}
						alt={value.alt || ""}
					/>
				</div>
			);
		},
	},
};

const Post = ({ postData }) => {
	const { title, mainImage, publishedAt, categories, body } = postData;

	return (
		<>
			{postData && (
				<article className="post-container">
					<h1>{title}</h1>
					<div className="img_wrapper-post">
						<Image layout="fill" objectFit="cover" className="main-image" src={urlFor(mainImage).url()} alt={title} />
					</div>
					<div>{publishedAt}</div>
					<hr />
					<div className="tag-container">
						{categories.map((category) => (
							<Tag key={category.id} title={category.title} />
						))}
					</div>
					<PortableText value={body} components={PostComponents} />
				</article>
			)}
		</>
	);
};

const query = groq`
	*[_type == "post" && slug.current == $slug][0] {
		title,
		mainImage,
		publishedAt,
		"about": author->bio,
		"username": author->username,
		"authorImage": author->avatar,
		"categories": categories[]->{id, title},
		body,
	}
`;

export async function getStaticPaths() {
	const paths = await sanityClient.fetch(groq`*[_type == "post" && defined(slug.current)][].slug.current`);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}

export async function getStaticProps({ params, preview = false }) {
	const postData = await sanityClient.fetch(query, { slug: params.slug });

	return {
		props: {
			postData,
		},
		revalidate: 30,
	};
}

export default Post;
