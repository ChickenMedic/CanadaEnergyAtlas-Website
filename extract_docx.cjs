const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const docDir = path.join(__dirname, "src/ExpandedExplainers");
const files = fs.readdirSync(docDir).filter(f => f.endsWith(".docx"));

async function processDocs() {
  let contentMap = {};
  
  for (const file of files) {
    const filePath = path.join(docDir, file);
    const result = await mammoth.convertToHtml({path: filePath});
    let html = result.value;
    
    // Convert to JSX-friendly format
    // Replace class="xxx" with className="xxx"
    html = html.replace(/class=/g, "className=");
    
    // Replace strong with strong
    // Remove empty paragraphs
    html = html.replace(/<p><\/p>/g, "");
    
    // Format headers into timeline cards if applicable, or just let them be headers.
    // The user's prompt suggested to format them nicely.
    // We'll wrap h2/h3 elements and their following p elements in a timeline-card div if possible.
    // For simplicity, let's just make h1 -> h2, and wrap h2/h3 in nice divs.
    
    html = html.replace(/<h1>(.*?)<\/h1>/g, "<h2>$1</h2>");
    html = html.replace(/<h2>(.*?)<\/h2>/g, "<div className=\"timeline-card\"><h3>$1</h3></div>");
    
    // We will clean up the timeline cards in a second pass:
    // Move the closing </div> of timeline-card to after the next paragraphs
    const parts = html.split("<div className=\"timeline-card\">");
    let formattedHtml = parts[0];
    for (let i = 1; i < parts.length; i++) {
        let section = parts[i];
        let endH3 = section.indexOf("</h3></div>");
        if (endH3 !== -1) {
            let title = section.substring(0, endH3 + 5); // include </h3>
            let rest = section.substring(endH3 + 11);
            
            // find the end of the paragraphs for this section
            // we'll just group everything until the next timeline card
            formattedHtml += `<div className="timeline-card">\n${title}\n${rest}\n</div>\n`;
        } else {
            formattedHtml += `<div className="timeline-card">${section}`;
        }
    }
    
    const key = file.replace(".docx", "").toLowerCase();
    contentMap[key] = `<>\n${formattedHtml}\n</>`;
  }
  
  fs.writeFileSync("extracted_jsx.json", JSON.stringify(contentMap, null, 2));
  console.log("Extraction complete!");
}

processDocs().catch(console.error);
