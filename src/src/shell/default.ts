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
	},
	curl: {
		name: "curl",
		//@ts-ignore
		function: curl,
		info: {
			description: "fetch a url."
		}
	},
	jsh: {
		name: "jsh",
		//@ts-ignore
		function: jsh,
		info: {
			description: "Run some JS from the terminal."
		}
	},
	jfetch: {
		name: "jfetch",
		//@ts-ignore
		function: jfetch,
		info: {
			description: "Show basic specs."
		}
	},
}

function jsh(params: Array<string>) {
	let sentence = ""
	params.forEach(letter => sentence = sentence + letter + " ")
	sentence = sentence.slice(0, -1)

	let result = [] as Array<string>;

	const _debugLog = console.log;

	console.log = function(message) {
		result.push(message)
	}

	eval(sentence)

	return result;
}

function jfetch(_: Array<string>) {
	let result = [
		`CPU Cores: ${navigator.hardwareConcurrency}`,
		`User Agent: ${navigator.userAgent}`,
		`Preferred language: ${navigator.language}`,
		`Online: ${navigator.onLine}`
	] as Array<string>;

	return result
}

function tuxsay(params: Array<string>) {
	let sentence = ""
	params.forEach(letter => sentence = sentence + letter + " ")
	sentence = sentence.slice(0, -1)

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
async function curl(params: Array<string>): Promise<Array<string>> {
	if (params.length !== 1) {
	  return ["curl: no url specified"];
	}
  
	const url = params[0];
	let result = [] as Array<string>;
  
	result.push(`fetching ${url}...`);
	result.push("");
  
	try {
	  const response = await fetch(url);
	  const text = await response.text();
	  result.push(text);
	} catch (error) {
	  result.push(`error fetching ${url}: ${error}`);
	}
  
	return result;
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