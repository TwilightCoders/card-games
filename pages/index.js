// Components
import Content from "components/Content"
import { H1 } from "components/Heading"

export default function Home() {
	return (
		<Content title="Home">
			<H1 center>Card Game Scorekeeper</H1>
			<p className="mt-4 max-w-2xl text-xl text-gray-500 text-center lg:mx-auto">
				An easy to use scorekeeping app for card games. Share scores on the cloud with friends,
				never worry about needing pen and paper again.
			</p>
		</Content>
	)
}
