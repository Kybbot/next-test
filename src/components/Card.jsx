import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/sanity";
import Tag from "./Tag";

const Card = ({ post }) => {
	return (
		<article className="card-container">
			<h2>
				<Link href={`posts/${post.slug.current}`}>
					<a>{post.title}</a>
				</Link>
			</h2>
			<p>Published on: {new Date(post.publishedAt).toDateString()}</p>
			<div className="img_wrapper">
				<Image
					layout="fill"
					objectFit="cover"
					className="main-image"
					src={urlFor(post.mainImage).url()}
					alt={post.title}
				/>
			</div>
			<hr />
			<div className="info-container">
				<p>Posted by: {post.username}</p>
				<Image height={50} width={50} className="avatar" src={urlFor(post.authorImage).url()} alt={post.username} />
			</div>
			<div className="tag-container">
				{post.categories.map((category) => (
					<Tag key={category._id} title={category.title} />
				))}
			</div>
		</article>
	);
};

export default Card;
