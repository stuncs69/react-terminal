import { useEffect, useState } from "react";
import { runCommand } from "./shell/basic";

export default function App() {
	const [command, setCommand] = useState("");
	const [commandOutput, setCommandOutput] = useState([
		"welcome to react terminal.",
		"simple and awesome since 2024.",
		"need help? try the help command."
	] as Array<string>);
	const [usedCommands, setUsedCommands] = useState([] as Array<string>)
	const [hostName, _setHostName] = useState("user")

	useEffect(() => {
		const detectBackspace = (e: KeyboardEvent) => {
			console.log(e.code)
			switch (e.code) {
				case "Backspace":
					setCommand((prevCommand) => prevCommand.slice(0, -1))
					break
			}
		}

		const handleKeyPress = async (e: KeyboardEvent) => {
			switch (e.code) {
				case "Enter":
					setCommandOutput((old) => [...old, `${hostName} ~:$ ${command}`])
					//@ts-ignore
					if (command != "clear") {
						let run = await runCommand(command)
						setUsedCommands((old) => [...old, ...run])
						setCommandOutput((old) => [...old, ...run])
					}
					else setCommandOutput([])
					setCommand("")

					document.getElementById("scrollto")?.scrollIntoView({behavior: "smooth"})
					break;
				default:
					setCommand((prevCommand) => prevCommand + e.key);
					break;
			}
			e.preventDefault();
		};
		

		window.addEventListener("keydown", detectBackspace);
		window.addEventListener("keypress", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", detectBackspace);
			window.removeEventListener("keypress", handleKeyPress);
		};
	}, [command, setCommand, setCommandOutput]);
	
	return (
		<>
		<pre className="overflow-x-auto" id="content">
			{commandOutput.map(output => <p>{output}</p>)}
			<div>{hostName} ~:$ {command}<span className="animate-blink">█</span></div>
		</pre>
		<div className="top-3.5" id="scrollto">&nbsp;</div> {/* Kinda hacky */}
		</>
);
}
