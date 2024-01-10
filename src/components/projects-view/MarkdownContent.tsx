import './../../css/components/projects-view/markdown-content.css';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function rehypeInlineCodeProperty() {
  return function(tree: any) {
    visit(tree, 'element', function(node) {
      if (node.tagName === 'code') {
        node.properties.inline = !node.properties.className;
      }
      if(node.tagName === 'img'){
        node.properties.className = 'markdown-img'; 
      }

    });
  };
}


function CodeRenderer({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    
    if (inline) {
        console.log("inline");
        return <code className="inline-highlight" {...props}>{children}</code>;
    } else if (!inline && match) {
        return (
            <SyntaxHighlighter style={a11yDark} PreTag="div" language={match[1]} {...props}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        );
    } else {
        return (
            <pre className='no-highlight'>
                <code {...props}>
                    {children}
                </code>
            </pre>
        );
    }
}

export default function MarkDownContent(props: { code: string }) {
    const { code } = props;

    return (
        <div className="markdown-content-container">
            <ReactMarkdown 
                remarkPlugins={[gfm]}
                rehypePlugins={[rehypeInlineCodeProperty]}
                components={{ code: CodeRenderer }}
            >
                {code}
            </ReactMarkdown>
        </div>
    );
}