import React, {useState, useEffect} from "react";

const CodeflowTerminal = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [compilerReady, setCompilerReady] = useState(false);

  // Code snippet to type out - styled to be visually appealing
  const codeSnippet = [
    "//Welcome to CODEFLOW",
    'console.log("Hello, World!")',
  ].join("\n");

  // Character-by-character typing effect
  useEffect(() => {
    let currentIndex = 0;

    // Show "compiler ready" message initially
    setTimeout(() => {
      setCompilerReady(true);
    }, 800);

    // Start typing after compiler message
    setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < codeSnippet.length) {
          setDisplayedCode(codeSnippet.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setCursorVisible(false);
          clearInterval(typingInterval);
        }
      }, 50); // Faster typing speed

      return () => {
        clearInterval(typingInterval);
      };
    }, 1500);
  }, []);

  return (
    <div
      className="rounded-md overflow-hidden shadow-lg w-full max-w-md mx-auto my-4"
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(48, 186, 143, 0.3)",
      }}
    >
      {/* Terminal content - fixed height */}
      <div className="h-64 p-4 w-64 font-mono text-sm overflow-y-hidden flex flex-col bg-transparent">
        {/* Compiler initialization message */}
        {compilerReady && (
          <>
            <div className="text-gray-400">
              &gt; Session initialized at {new Date().toLocaleTimeString()}
            </div>
            <div className="text-green-400 mb-2">
              &gt; Ready for authentication...
            </div>
          </>
        )}

        {/* Code with cursor */}
        <pre className="whitespace-pre-wrap" style={{color: "#c5f467"}}>
          {displayedCode}
          <span
            className={`inline-block w-2 h-4 ml-px ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{background: "#c5f467"}}
          ></span>
        </pre>

        {/* Compilation message after typing is done */}
        {displayedCode === codeSnippet && (
          <>
            <div className="text-green-400 mt-2">&gt; Happy Coding!! 😃</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CodeflowTerminal;
