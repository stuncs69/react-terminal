import dict from "./default"

export function runCommand(command: string) {
	const cmd = {
	  superuser: command.split(" ")[0] === "sudo",
	  name: command.split(" ")[0] === "sudo" ? command.split(" ")[1] : command.split(" ")[0],
	  parameters: command.split(" ").slice(command.split(" ")[0] === "sudo" ? 2 : 1)
	};
	let found = false;
	for (const key in dict) {
		if (!found) {
			if (dict.hasOwnProperty(key)) {
				const item = dict[key]
				if (item.name.toLowerCase() == cmd.name.toLowerCase()) {
					return item.function(cmd.parameters)
				}
			}			
		}
	}
	return ["Command not found"]
}
  