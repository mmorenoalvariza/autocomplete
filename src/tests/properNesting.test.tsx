const nestingChars = ["(", ")", "[", "]", "{", "}"];

const isValidPair = (charA: string, charB: string) => {
  return (
    (charA === "(" && charB === ")") ||
    (charB === "(" && charA === ")") ||
    (charA === "[" && charB === "]") ||
    (charB === "[" && charA === "]") ||
    (charA === "{" && charB === "}") ||
    (charB === "{" && charA === "}")
  );
};

const getProperNesting = (s: string, dontFix = false): string | false => {
  if (s.length === 0) {
    return s;
  }
  if (s.length === 1 && !nestingChars.includes(s)) {
    return s;
  }

  const splitted = s.split("");
  const stack = [splitted[0]];
  let response = [splitted[0]];
  let currIndex = 1;

  while (currIndex < s.length) {
    const currChar = splitted[currIndex];
    if (!nestingChars.includes(currChar)) {
    } else if (
      (stack[0] === "(" && currChar === ")") ||
      (stack[0] === "[" && currChar === "]") ||
      (stack[0] === "{" && currChar === "}")
    ) {
      stack.shift();
    } else {
      stack.unshift(currChar);
    }
    response.push(currChar);
    currIndex++;
  }

  if (stack.length === 0) {
    return response.join("");
  }
  if (dontFix) {
    return false;
  }

  let newResponse = s;
  for (let i = stack.length - 1; i >= 0; i--) {
    switch (stack[i]) {
      case "}": {
        newResponse = "{" + newResponse;
        break;
      }
      case "{":
        newResponse = newResponse + "}";
        break;
      case "]": {
        newResponse = "[" + newResponse;
        break;
      }
      case "[":
        newResponse = newResponse + "]";
        break;
      case ")": {
        newResponse = "(" + newResponse;
        break;
      }
      case "(":
        newResponse = newResponse + ")";
        break;
    }
  }
  if (newResponse.includes(s)) {
    return getProperNesting(newResponse, true);
  }
  return false;
};
describe("Nest", () => {
  it("nests", () => {
    expect(getProperNesting("")).toBe("");
    expect(getProperNesting("a")).toBe("a");
    expect(getProperNesting("[")).toBe("[]");
    expect(getProperNesting("(a)")).toBe("(a)");
    expect(getProperNesting("([hi])")).toBe("([hi])");
    expect(getProperNesting("()[]")).toBe("()[]");
    expect(getProperNesting("[()]")).toBe("[()]");
    expect(getProperNesting("(()())")).toBe("(()())");
    expect(getProperNesting("([{}{}]())")).toBe("([{}{}]())");
    expect(getProperNesting("([:{}{}]())")).toBe("([:{}{}]())");
    expect(getProperNesting("[]-()")).toBe("[]-()");
    expect(getProperNesting("{ [] nice to see you [] }")).toBe(
      "{ [] nice to see you [] }"
    );
    expect(getProperNesting("]-(")).toBe("[]-()"); //Stack: (]
    expect(getProperNesting("a()]-(")).toBe("[a()]-()");
    expect(getProperNesting("]]-((")).toBe("[[]]-(())"); //Stack: ((]]
    expect(getProperNesting("} { [()] (()v()) } ])")).toBe(
      "([{} { [()] (()v()) } ])" // Stack: )]}
    );
    expect(getProperNesting("[]-(")).toBe("[]-()");
    expect(getProperNesting("([{]]}")).toBe(false);
  });
});
