import "./javascript-BONLpVbI.js";
import "./css-Bn7HiqCl.js";
import { b as html_default } from "./html-B69D7etl.js";
import "./java-DwAhBIJR.js";
import "./xml-CZr_DZXD.js";
import "./typescript-BV9GV7aZ.js";
import "./tsx-BT_rT7rO.js";
import "./sql-3BnwgXQM.js";
import "./c-B0ZcFDT2.js";
import "./regexp-b4Isn4uD.js";
import "./glsl-DFaCwZiq.js";
import "./cpp-BItNADCd.js";
import "./shellscript-CcsN1D_V.js";
import "./haml-CYkFAMdm.js";
import "./jsx-CKs8HnqG.js";
import "./graphql-BZgUgYkX.js";
import "./lua-DQkvOtCf.js";
import "./yaml-B8dKlX83.js";
import { b as ruby_default } from "./ruby-Ld3gzOk0.js";
const lang = Object.freeze(JSON.parse("{\"displayName\":\"ERB\",\"fileTypes\":[\"erb\",\"rhtml\",\"html.erb\"],\"injections\":{\"text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)\":{\"patterns\":[{\"begin\":\"^(\\\\s*)(?=<%+#(?![^%]*%>))\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.comment.leading.erb\"}},\"end\":\"(?!\\\\G)(\\\\s*$\\\\n)?\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.comment.trailing.erb\"}},\"patterns\":[{\"include\":\"#comment\"}]},{\"begin\":\"^(\\\\s*)(?=<%(?![^%]*%>))\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.embedded.leading.erb\"}},\"end\":\"(?!\\\\G)(\\\\s*$\\\\n)?\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.whitespace.embedded.trailing.erb\"}},\"patterns\":[{\"include\":\"#tags\"}]},{\"include\":\"#comment\"},{\"include\":\"#tags\"}]}},\"name\":\"erb\",\"patterns\":[{\"include\":\"text.html.basic\"}],\"repository\":{\"comment\":{\"patterns\":[{\"begin\":\"<%+#\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.begin.erb\"}},\"end\":\"%>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.end.erb\"}},\"name\":\"comment.block.erb\"}]},\"tags\":{\"patterns\":[{\"begin\":\"<%+(?!>)[-=]?(?![^%]*%>)\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.begin.erb\"}},\"contentName\":\"source.ruby\",\"end\":\"(-?%)>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.end.erb\"},\"1\":{\"name\":\"source.ruby\"}},\"name\":\"meta.embedded.block.erb\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"punctuation.definition.comment.erb\"}},\"match\":\"(#).*?(?=-?%>)\",\"name\":\"comment.line.number-sign.erb\"},{\"include\":\"source.ruby\"}]},{\"begin\":\"<%+(?!>)[-=]?\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.begin.erb\"}},\"contentName\":\"source.ruby\",\"end\":\"(-?%)>\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.embedded.end.erb\"},\"1\":{\"name\":\"source.ruby\"}},\"name\":\"meta.embedded.line.erb\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"punctuation.definition.comment.erb\"}},\"match\":\"(#).*?(?=-?%>)\",\"name\":\"comment.line.number-sign.erb\"},{\"include\":\"source.ruby\"}]}]}},\"scopeName\":\"text.html.erb\",\"embeddedLangs\":[\"html\",\"ruby\"]}"));
var erb_default = [
	...html_default,
	...ruby_default,
	lang
];
export { erb_default as default };
