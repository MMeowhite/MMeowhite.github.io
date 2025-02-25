import React from 'react';
import { Button, Spinner } from 'react-bootstrap'; // 引入 Spinner
import useExecuteCode from './useExecuteCode';

const CodeBlock = ({ children, className, ...props }) => {
    const code = Array.isArray(children)
        ? children.map((child) => (typeof child === 'object' ? child.props.children : String(child))).join('')
        : String(children);

    // 判断代码的语言类型
    const language = className.includes("language-python")
        ? "python"
        : className.includes("language-r")
            ? "r"
            : "python"; // 默认是 python

    // 生成传递给后端的两个字段：r_language 和 python_language
    const languageParams = {
        python_language: language === "python" ? code : "",
        r_language: language === "r" ? code : ""
    };

    console.log(languageParams)

    const { loading, localOutput, executeCode } = useExecuteCode(code, languageParams);

    return (
        <div className="code-container">
            <pre className="code-block">
                <code className={className} {...props}>
                    {children}
                </code>
            </pre>
            <div className="execution-controls">
                <Button
                    onClick={executeCode}
                    disabled={loading}
                    className="execute-button"
                    aria-label="Run Python Code"
                >
                    {loading ? 'Running...' : 'Run Code'}
                </Button>

                {/* 显示转圈圈 */}
                {loading && (
                    <div className="spinner-container">
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}

                {/* Render the result if it exists */}
                {localOutput && (
                    <div className="output">
                        <strong>Output:</strong>
                        <pre>{localOutput}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CodeBlock;