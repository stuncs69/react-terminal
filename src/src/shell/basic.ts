// // import dict from "./default"

// // export function runCommand(command: string) {
// // 	const cmd = {
// // 	  superuser: command.split(" ")[0] === "sudo",
// // 	  name: command.split(" ")[0] === "sudo" ? command.split(" ")[1] : command.split(" ")[0],
// // 	  parameters: command.split(" ").slice(command.split(" ")[0] === "sudo" ? 2 : 1)
// // 	};
// // 	let found = false;
// // 	for (const key in dict) {
// // 		if (!found) {
// // 			if (dict.hasOwnProperty(key)) {
// // 				const item = dict[key]
// // 				if (item.name.toLowerCase() == cmd.name.toLowerCase()) {
// // 					return item.function(cmd.parameters)
// // 				}
// // 			}
// // 		}
// // 	}
// // 	return [`command "${cmd.name}" not found.`]
// // }

// import dict from "./default";

// function levenshteinDistance(a: string, b: string): number {
// 	const m = a.length;
// 	const n = b.length;
// 	const dp: number[][] = [];

// 	for (let i = 0; i <= m; i++) {
// 		dp[i] = [];
// 		for (let j = 0; j <= n; j++) {
// 			if (i === 0) {
// 				dp[i][j] = j;
// 			} else if (j === 0) {
// 				dp[i][j] = i;
// 			} else {
// 				dp[i][j] = Math.min(
// 					dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0),
// 					dp[i - 1][j] + 1,
// 					dp[i][j - 1] + 1
// 				);
// 			}
// 		}
// 	}

// 	return dp[m][n];
// }

// export function runCommand(command: string) {
// 	const cmd = {
// 		superuser: command.split(" ")[0] === "sudo",
// 		name: command.split(" ")[0] === "sudo" ? command.split(" ")[1] : command.split(" ")[0],
// 		parameters: command.split(" ").slice(command.split(" ")[0] === "sudo" ? 2 : 1)
// 	};
// 	let closestMatch = null;
// 	let minDistance = Infinity;

// 	for (const key in dict) {
// 		if (dict.hasOwnProperty(key)) {
// 			const item = dict[key];

// 			if (item.name.toLowerCase() == cmd.name.toLowerCase()) {
// 				return item.function(cmd.parameters)
// 			}

// 			const distance = levenshteinDistance(item.name.toLowerCase(), cmd.name.toLowerCase());
// 			if (distance < minDistance) {
// 				minDistance = distance;
// 				closestMatch = item.name;
// 			}
// 		}
// 	}

// 	if (closestMatch && minDistance < 4) {
// 		return [`command not found. Did you mean "${closestMatch}"?`];
// 	} else {
// 		return [`command "${cmd.name}" not found.`];
// 	}
// }

import dict from "./default";

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0),
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1
        );
      }
    }
  }

  return dp[m][n];
}

export async function runCommand(command: string) {
  const cmd = {
    superuser: command.split(" ")[0] === "sudo",
    name: command.split(" ")[0] === "sudo" ? command.split(" ")[1] : command.split(" ")[0],
    parameters: command.split(" ").slice(command.split(" ")[0] === "sudo" ? 2 : 1)
  };
  let closestMatch = null;
  let minDistance = Infinity;

  for (const key in dict) {
    if (dict.hasOwnProperty(key)) {
      const item = dict[key];

      if (item.name.toLowerCase() == cmd.name.toLowerCase()) {
        const result = item.function(cmd.parameters);
        if (result instanceof Promise) {
          return await result;
        } else {
          return result;
        }
      }

      const distance = levenshteinDistance(item.name.toLowerCase(), cmd.name.toLowerCase());
      if (distance < minDistance) {
        minDistance = distance;
        closestMatch = item.name;
      }
    }
  }

  if (closestMatch && minDistance < 4) {
    return [`command not found. did you mean "${closestMatch}"?`];
  } else {
    return [`command "${cmd.name}" not found.`];
  }
}
