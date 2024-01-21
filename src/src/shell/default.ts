interface Command {
    name: string;
    function: (params: string[]) => string[];
    info: {
        description: string;
    };
}

const dict: Record<string, Command> = {
	tuxsay: {
		name: "tuxsay",
		function: tuxsay,
		info: {
			description: "make tux say something for you. don't be mean, he'll be sad."
		}
	},
	help: {
		name: "help",
		function: help,
		info: {
			description: "help command. <-- you should be running this right now."
		}
	},
	clear: {
		name: "clear",
		function: tuxsay,
		info: {
			description: "clear the screen."
		}
	}
}


function tuxsay(params: Array<string>) {
	let sentence = ""
	params.forEach(letter => sentence=sentence+letter+" ")
	sentence = sentence.slice(0,-1)

	let length = sentence.length + 4

    const tuxAsciiArt = [
        "   \\",
        "    \\",
        "        .--.",
        "       |o_o |",
        "       |:_/ |",
        "      //   \\ \\",
        "     (|     | )",
        "    /'\\_   _/`\\",
        "    \\___)=(___/"
    ];

	const line = Array.from({ length }, () => '-').join('');

	console.log(line)

	return [line, `< ${sentence} >`, line, ...tuxAsciiArt]
}

function help(_params: Array<string>) {
	let result = [] as Array<string>

	for (const command in dict) {
		if (dict.hasOwnProperty(command)) {
			const item = dict[command]
			result.push(`${item.name} : ${item.info.description}`)
		}
	}

	return result
}

export default dict;