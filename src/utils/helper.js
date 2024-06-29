const parseMarkdown = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let currentParagraph = "";
  let inSeaBlueDiv = false;

  lines.forEach((line, index) => {
    if (line.startsWith("######")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(<h6 key={index}>{line.slice(6)}</h6>);
    } else if (line.startsWith("#####")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(<h5 key={index}>{line.slice(5)}</h5>);
    } else if (line.startsWith("####")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(<h4 key={index}>{line.slice(4)}</h4>);
    } else if (line.startsWith("###")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(<h3 key={index}>{line.slice(3)}</h3>);
    } else if (line.startsWith("##")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(<h2 key={index}>{line.slice(2)}</h2>);
    } else if (line.startsWith("#")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(<h1 key={index}>{line.slice(1)}</h1>);
    } else if (/^\d+\. /.test(line)) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(<p key={index}>{line}</p>);
    } else if (line.startsWith("- ")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(
        <p key={index} style={{ listStyleType: "circle", color: "red" }}>
          {line.slice(2)}
        </p>
      );
    } else if (line.startsWith("> ")) {
      if (currentParagraph) {
        elements.push(<p key={elements.length}>{currentParagraph}</p>);
        currentParagraph = "";
      }
      elements.push(
        <div
          key={index}
          style={{ backgroundColor: "blue", padding: "10px", color: "white" }}
        >
          {line.slice(2)}
        </div>
      );
    } else if (line.startsWith("---")) {
      if (inSeaBlueDiv) {
        elements.push(
          <div
            key={index}
            style={{
              backgroundColor: "lightseagreen",
              padding: "10px",
              color: "white",
            }}
          >
            {currentParagraph}
          </div>
        );
        currentParagraph = "";
        inSeaBlueDiv = false;
      } else {
        inSeaBlueDiv = true;
      }
    } else {
      if (inSeaBlueDiv) {
        if (currentParagraph) {
          currentParagraph += ` ${line}`;
        } else {
          currentParagraph = line;
        }
      } else {
        if (currentParagraph) {
          currentParagraph += ` ${line}`;
        } else {
          currentParagraph = line;
        }
      }
    }
  });

  if (currentParagraph) {
    if (inSeaBlueDiv) {
      elements.push(
        <div
          key={elements.length}
          style={{
            backgroundColor: "lightseagreen",
            padding: "10px",
            color: "white",
          }}
        >
          {currentParagraph}
        </div>
      );
    } else {
      elements.push(<p key={elements.length}>{currentParagraph}</p>);
    }
  }

  return elements;
};

export { parseMarkdown };
