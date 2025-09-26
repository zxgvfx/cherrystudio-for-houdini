import "./javascript-BCY82X67.js";
import "./css-BaG9qUhv.js";
import { html_default } from "./html-DfHHmRRM.js";
import "./java-BO4yrZKJ.js";
import "./xml-CSL3-zMH.js";
import "./typescript-CgET_6hC.js";
import "./tsx-DFjnZK3c.js";
import "./sql-DxD7CJQo.js";
import "./c-n66obvcd.js";
import "./regexp-DV_iYtfU.js";
import "./glsl-C7dYId-N.js";
import "./cpp-C57y3ULt.js";
import "./shellscript-DKzuORvO.js";
import "./haml-BJc7nOW0.js";
import "./jsx-HnL-S_QX.js";
import "./graphql-H0mFHl8l.js";
import "./lua-CI2w4VI0.js";
import "./yaml-Cr2c5AmT.js";
import { ruby_default } from "./ruby-BYejjgbU.js";
const lang = Object.freeze(JSON.parse("{\"displayName\":\"ERB\",\"fileTypes\":[\"erb\",\"rhtml\",\"html.erb\"],\"injections\":{\"text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)\":{\"patterns\":[{\"begin\":\"^(\\\\s*)(?=<%+#(?![^%]*%>))\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.comment.leading.erb\"}},\"end\":\"(?!\\\\G)(\\\\s*$\\\\n)?\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.comment.trailing.erb\"}},\"patterns\":[{\"include\":\"#comment\"}]},{\"begin\":\"^(\\\\s*)(?=<%(?![^%]*%>))\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.embedded.leading.erb\"}},\"end\":\"(?!\\\\G)(\\\\s*$\\\\n)?\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.embedded.trailing.erb\"}},\"patterns\":[{\"include\":\"#tags\"}]},{\"include\":\"#comment\"},{\"include\":\"#tags\"}]}},\"name\":\"erb\",\"patterns\":[{\"include\":\"text.html.basic\"}],\"repository\":{\"comment\":{\"patterns\":[{\"begin\":\"<%+#\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.begin.erb\"}},\"end\":\"%>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.end.erb\"}},\"name\":\"comment.block.erb\"}]},\"tags\":{\"patterns\":[{\"begin\":\"<%+(?!>)[-=]?(?![^%]*%>)\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.begin.erb\"}},\"contentName\":\"source.ruby\",\"end\":\"(-?%)>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.end.erb\"},\"1\":{\"name\":\"source.ruby\"}},\"name\":\"meta.embedded.block.erb\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"punctuation.definition.comment.erb\"}},\"match\":\"(#).*?(?=-?%>)\",\"name\":\"comment.line.number-sign.erb\"},{\"include\":\"source.ruby\"}]},{\"begin\":\"<%+(?!>)[-=]?\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.begin.erb\"}},\"contentName\":\"source.ruby\",\"end\":\"(-?%)>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.end.erb\"},\"1\":{\"name\":\"source.ruby\"}},\"name\":\"meta.embedded.line.erb\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"punctuation.definition.comment.erb\"}},\"match\":\"(#).*?(?=-?%>)\",\"name\":\"comment.line.number-sign.erb\"},{\"include\":\"source.ruby\"}]}]}},\"scopeName\":\"text.html.erb\",\"embeddedLangs\":[\"html\",\"ruby\"]}"));
var erb_default = [
	...html_default,
	...ruby_default,
	lang
];
export { erb_default as default };
