import "./javascript-BR5QA3cV.js";
import "./css-BgStUAiu.js";
import { b as html_default } from "./html-CBUa7xnh.js";
import "./java-BGqPRzHi.js";
import "./xml-DWIo78Y9.js";
import "./typescript-344sQ78i.js";
import "./tsx-CPq_nJRi.js";
import "./sql-Dpy0vCbD.js";
import "./c-CKn7N-BW.js";
import "./regexp-DBkoaGNa.js";
import "./glsl-D8tsnGIR.js";
import "./cpp-BjMKMQjv.js";
import "./shellscript-1JjjuDHh.js";
import "./haml-CtksghP3.js";
import "./jsx-D3OpTpGB.js";
import "./graphql-C_JbU6AR.js";
import "./lua-B-AaFsw9.js";
import "./yaml-CiARpG1b.js";
import { b as ruby_default } from "./ruby-B57P9R7b.js";
const lang = Object.freeze(JSON.parse("{\"displayName\":\"ERB\",\"fileTypes\":[\"erb\",\"rhtml\",\"html.erb\"],\"injections\":{\"text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)\":{\"patterns\":[{\"begin\":\"^(\\\\s*)(?=<%+#(?![^%]*%>))\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.comment.leading.erb\"}},\"end\":\"(?!\\\\G)(\\\\s*$\\\\n)?\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.comment.trailing.erb\"}},\"patterns\":[{\"include\":\"#comment\"}]},{\"begin\":\"^(\\\\s*)(?=<%(?![^%]*%>))\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.embedded.leading.erb\"}},\"end\":\"(?!\\\\G)(\\\\s*$\\\\n)?\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.embedded.trailing.erb\"}},\"patterns\":[{\"include\":\"#tags\"}]},{\"include\":\"#comment\"},{\"include\":\"#tags\"}]}},\"name\":\"erb\",\"patterns\":[{\"include\":\"text.html.basic\"}],\"repository\":{\"comment\":{\"patterns\":[{\"begin\":\"<%+#\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.begin.erb\"}},\"end\":\"%>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.end.erb\"}},\"name\":\"comment.block.erb\"}]},\"tags\":{\"patterns\":[{\"begin\":\"<%+(?!>)[-=]?(?![^%]*%>)\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.begin.erb\"}},\"contentName\":\"source.ruby\",\"end\":\"(-?%)>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.end.erb\"},\"1\":{\"name\":\"source.ruby\"}},\"name\":\"meta.embedded.block.erb\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"punctuation.definition.comment.erb\"}},\"match\":\"(#).*?(?=-?%>)\",\"name\":\"comment.line.number-sign.erb\"},{\"include\":\"source.ruby\"}]},{\"begin\":\"<%+(?!>)[-=]?\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.begin.erb\"}},\"contentName\":\"source.ruby\",\"end\":\"(-?%)>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.end.erb\"},\"1\":{\"name\":\"source.ruby\"}},\"name\":\"meta.embedded.line.erb\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"punctuation.definition.comment.erb\"}},\"match\":\"(#).*?(?=-?%>)\",\"name\":\"comment.line.number-sign.erb\"},{\"include\":\"source.ruby\"}]}]}},\"scopeName\":\"text.html.erb\",\"embeddedLangs\":[\"html\",\"ruby\"]}"));
var erb_default = [
	...html_default,
	...ruby_default,
	lang
];
export { erb_default as default };
