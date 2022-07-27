import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
	return (
		<nav className="nav-container">
			<div className="nav-item-container">
				<h2>
					<Link href="/">
						<a>Travel Blog</a>
					</Link>
				</h2>
			</div>
			<div className="nav-item-container">
				<p>Lorem, ipsum.</p>
			</div>
		</nav>
	);
};

export default NavBar;
