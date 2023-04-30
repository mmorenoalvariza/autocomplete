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

const recursiveNest = (s: string[]) => {
  if (s.length === 0) {
    return s;
  }
  if (s.length === 2) {
    if (isValidPair(s[0], s[1])) {
      return s;
    }
    return null;
  }
  if (s.length === 1) {
    if (nestingChars.includes(s[1])) {
      return null;
    } else return s;
  }
  if (s.length > 2) {
    return recursiveNest();
  }
};

const getNest = (s: string) => {
  const splitted = s.split("");
  if (splitted.length > 2) {
    const resp = recursiveNest(splitted);
  }
  return "";
};

const getProperNesting = (s: string) => {
  if (s.length === 0) {
    return s;
  }
  if (s.length === 1) {
    if (nestingChars.includes(s)) {
      switch (s) {
        case "(":
          return "()";
        case ")":
          return "()";
        case "{":
          return "{}";
        case "}":
          return "{}";
        case "[":
          return "[]";
        case "]":
          return "[]";
      }
    } else {
      return s;
    }
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
  console.log("stack", stack);
  console.log("res", response);
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
    expect(getProperNesting("]-(")).toBe("[]-()");
    expect(getProperNesting("[]-(")).toBe("[]-()");
  });
  it.skip("nests2", () => {
    expect(getNest("")).toBe("");
    expect(getNest("()[]")).toBe("()[]");
    expect(getNest("[()]")).toBe("[()]");
    expect(getNest("(()())")).toBe("(()())");
    expect(getNest("]-(")).toBe("[]-()");
    expect(getNest("]-(")).toBe("[]-()");
  });
});
