import { c as __esmMin } from "./chunk-st2fFX3F.js";
var COMMENT, RULESET, DECLARATION, IMPORT, NAMESPACE, KEYFRAMES, LAYER;
var init_Enum = __esmMin((() => {
	COMMENT = "comm";
	RULESET = "rule";
	DECLARATION = "decl";
	IMPORT = "@import";
	NAMESPACE = "@namespace";
	KEYFRAMES = "@keyframes";
	LAYER = "@layer";
}));
function trim(value) {
	return value.trim();
}
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
function indexof(value, search, position$1) {
	return value.indexOf(search, position$1);
}
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
	return value.slice(begin, end);
}
function strlen(value) {
	return value.length;
}
function sizeof(value) {
	return value.length;
}
function append(value, array) {
	return array.push(value), value;
}
var abs, from;
var init_Utility = __esmMin((() => {
	abs = Math.abs;
	from = String.fromCharCode;
}));
function node(value, root, parent, type, props, children, length$1, siblings) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length: length$1,
		return: "",
		siblings
	};
}
function char() {
	return character;
}
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
function peek() {
	return charat(characters, position);
}
function caret() {
	return position;
}
function slice(begin, end) {
	return substr(characters, begin, end);
}
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
	return characters = "", value;
}
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
var line, column, length, position, character, characters;
var init_Tokenizer = __esmMin((() => {
	init_Utility();
	line = 1;
	column = 1;
	length = 0;
	position = 0;
	character = 0;
	characters = "";
}));
function compile(value) {
	return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length$1 = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character$1 = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters$1 = type;
	while (scanning) switch (previous = character$1, character$1 = next()) {
		case 40: if (previous != 108 && charat(characters$1, length$1 - 1) == 58) {
			if (indexof(characters$1 += replace(delimit(character$1), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1) ampersand = -1;
			break;
		}
		case 34:
		case 39:
		case 91:
			characters$1 += delimit(character$1);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			characters$1 += whitespace(previous);
			break;
		case 92:
			characters$1 += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
					if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters$1) && substr(characters$1, -1, void 0) !== " ") characters$1 += " ";
					break;
				default: characters$1 += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters$1) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			switch (character$1) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters$1 = replace(characters$1, /\f/g, "");
					if (property > 0 && (strlen(characters$1) - length$1 || variable === 0 && previous === 47)) append(property > 32 ? declaration(characters$1 + ";", rule, parent, length$1 - 1, declarations) : declaration(replace(characters$1, " ", "") + ";", rule, parent, length$1 - 2, declarations), declarations);
					break;
				case 59: characters$1 += ";";
				default:
					append(reference = ruleset(characters$1, root, parent, index, offset, rules, points, type, props = [], children = [], length$1, rulesets), rulesets);
					if (character$1 === 123) if (offset === 0) parse(characters$1, root, reference, reference, props, rulesets, length$1, points, children);
					else {
						switch (atrule) {
							case 99: if (charat(characters$1, 3) === 110) break;
							case 108: if (charat(characters$1, 2) === 97) break;
							default: offset = 0;
							case 100:
							case 109:
							case 115:
						}
						if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length$1, children), children), rules, children, length$1, points, rule ? props : children);
						else parse(characters$1, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters$1 = "", length$1 = pseudo;
			break;
		case 58: length$1 = 1 + strlen(characters$1), property = previous;
		default:
			if (variable < 1) {
				if (character$1 == 123) --variable;
				else if (character$1 == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters$1 += from(character$1), character$1 * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters$1 += "\f", -1);
					break;
				case 44:
					points[index++] = (strlen(characters$1) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters$1 += delimit(next());
					atrule = peek(), offset = length$1 = strlen(type = characters$1 += identifier(caret())), character$1++;
					break;
				case 45: if (previous === 45 && strlen(characters$1) == 2) variable = 0;
			}
	}
	return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length$1, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length$1, siblings);
}
function comment(value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length$1, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length$1), substr(value, length$1 + 1, -1), length$1, siblings);
}
var init_Parser = __esmMin((() => {
	init_Enum();
	init_Utility();
	init_Tokenizer();
}));
var init_Prefixer = __esmMin((() => {}));
function serialize(children, callback) {
	var output = "";
	for (var i = 0; i < children.length; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case NAMESPACE:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: if (!strlen(element.value = element.props.join(","))) return "";
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
var init_Serializer = __esmMin((() => {
	init_Enum();
	init_Utility();
}));
var init_Middleware = __esmMin((() => {}));
var init_stylis = __esmMin((() => {
	init_Enum();
	init_Utility();
	init_Parser();
	init_Prefixer();
	init_Tokenizer();
	init_Serializer();
	init_Middleware();
}));
export { init_stylis as b, serialize as c, stringify as d, compile as e };
