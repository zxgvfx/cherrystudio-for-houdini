import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { a as htmlDecodeTree, i as xmlDecodeTree, n as EntityDecoder, r as fromCodePoint, t as DecodingMode } from "./decode-uCeDNj3-.js";
var CharCodes;
(function(CharCodes$1) {
	CharCodes$1[CharCodes$1["Tab"] = 9] = "Tab";
	CharCodes$1[CharCodes$1["NewLine"] = 10] = "NewLine";
	CharCodes$1[CharCodes$1["FormFeed"] = 12] = "FormFeed";
	CharCodes$1[CharCodes$1["CarriageReturn"] = 13] = "CarriageReturn";
	CharCodes$1[CharCodes$1["Space"] = 32] = "Space";
	CharCodes$1[CharCodes$1["ExclamationMark"] = 33] = "ExclamationMark";
	CharCodes$1[CharCodes$1["Number"] = 35] = "Number";
	CharCodes$1[CharCodes$1["Amp"] = 38] = "Amp";
	CharCodes$1[CharCodes$1["SingleQuote"] = 39] = "SingleQuote";
	CharCodes$1[CharCodes$1["DoubleQuote"] = 34] = "DoubleQuote";
	CharCodes$1[CharCodes$1["Dash"] = 45] = "Dash";
	CharCodes$1[CharCodes$1["Slash"] = 47] = "Slash";
	CharCodes$1[CharCodes$1["Zero"] = 48] = "Zero";
	CharCodes$1[CharCodes$1["Nine"] = 57] = "Nine";
	CharCodes$1[CharCodes$1["Semi"] = 59] = "Semi";
	CharCodes$1[CharCodes$1["Lt"] = 60] = "Lt";
	CharCodes$1[CharCodes$1["Eq"] = 61] = "Eq";
	CharCodes$1[CharCodes$1["Gt"] = 62] = "Gt";
	CharCodes$1[CharCodes$1["Questionmark"] = 63] = "Questionmark";
	CharCodes$1[CharCodes$1["UpperA"] = 65] = "UpperA";
	CharCodes$1[CharCodes$1["LowerA"] = 97] = "LowerA";
	CharCodes$1[CharCodes$1["UpperF"] = 70] = "UpperF";
	CharCodes$1[CharCodes$1["LowerF"] = 102] = "LowerF";
	CharCodes$1[CharCodes$1["UpperZ"] = 90] = "UpperZ";
	CharCodes$1[CharCodes$1["LowerZ"] = 122] = "LowerZ";
	CharCodes$1[CharCodes$1["LowerX"] = 120] = "LowerX";
	CharCodes$1[CharCodes$1["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
var State;
(function(State$1) {
	State$1[State$1["Text"] = 1] = "Text";
	State$1[State$1["BeforeTagName"] = 2] = "BeforeTagName";
	State$1[State$1["InTagName"] = 3] = "InTagName";
	State$1[State$1["InSelfClosingTag"] = 4] = "InSelfClosingTag";
	State$1[State$1["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
	State$1[State$1["InClosingTagName"] = 6] = "InClosingTagName";
	State$1[State$1["AfterClosingTagName"] = 7] = "AfterClosingTagName";
	State$1[State$1["BeforeAttributeName"] = 8] = "BeforeAttributeName";
	State$1[State$1["InAttributeName"] = 9] = "InAttributeName";
	State$1[State$1["AfterAttributeName"] = 10] = "AfterAttributeName";
	State$1[State$1["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
	State$1[State$1["InAttributeValueDq"] = 12] = "InAttributeValueDq";
	State$1[State$1["InAttributeValueSq"] = 13] = "InAttributeValueSq";
	State$1[State$1["InAttributeValueNq"] = 14] = "InAttributeValueNq";
	State$1[State$1["BeforeDeclaration"] = 15] = "BeforeDeclaration";
	State$1[State$1["InDeclaration"] = 16] = "InDeclaration";
	State$1[State$1["InProcessingInstruction"] = 17] = "InProcessingInstruction";
	State$1[State$1["BeforeComment"] = 18] = "BeforeComment";
	State$1[State$1["CDATASequence"] = 19] = "CDATASequence";
	State$1[State$1["InSpecialComment"] = 20] = "InSpecialComment";
	State$1[State$1["InCommentLike"] = 21] = "InCommentLike";
	State$1[State$1["BeforeSpecialS"] = 22] = "BeforeSpecialS";
	State$1[State$1["BeforeSpecialT"] = 23] = "BeforeSpecialT";
	State$1[State$1["SpecialStartSequence"] = 24] = "SpecialStartSequence";
	State$1[State$1["InSpecialTag"] = 25] = "InSpecialTag";
	State$1[State$1["InEntity"] = 26] = "InEntity";
})(State || (State = {}));
function isWhitespace(c) {
	return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
}
function isEndOfTagSection(c) {
	return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isASCIIAlpha(c) {
	return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
}
var QuoteType;
(function(QuoteType$1) {
	QuoteType$1[QuoteType$1["NoValue"] = 0] = "NoValue";
	QuoteType$1[QuoteType$1["Unquoted"] = 1] = "Unquoted";
	QuoteType$1[QuoteType$1["Single"] = 2] = "Single";
	QuoteType$1[QuoteType$1["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
var Sequences = {
	Cdata: new Uint8Array([
		67,
		68,
		65,
		84,
		65,
		91
	]),
	CdataEnd: new Uint8Array([
		93,
		93,
		62
	]),
	CommentEnd: new Uint8Array([
		45,
		45,
		62
	]),
	ScriptEnd: new Uint8Array([
		60,
		47,
		115,
		99,
		114,
		105,
		112,
		116
	]),
	StyleEnd: new Uint8Array([
		60,
		47,
		115,
		116,
		121,
		108,
		101
	]),
	TitleEnd: new Uint8Array([
		60,
		47,
		116,
		105,
		116,
		108,
		101
	]),
	TextareaEnd: new Uint8Array([
		60,
		47,
		116,
		101,
		120,
		116,
		97,
		114,
		101,
		97
	]),
	XmpEnd: new Uint8Array([
		60,
		47,
		120,
		109,
		112
	])
};
var Tokenizer = class {
	constructor({ xmlMode = false, decodeEntities = true }, cbs) {
		this.cbs = cbs;
		this.state = State.Text;
		this.buffer = "";
		this.sectionStart = 0;
		this.index = 0;
		this.entityStart = 0;
		this.baseState = State.Text;
		this.isSpecial = false;
		this.running = true;
		this.offset = 0;
		this.currentSequence = void 0;
		this.sequenceIndex = 0;
		this.xmlMode = xmlMode;
		this.decodeEntities = decodeEntities;
		this.entityDecoder = new EntityDecoder(xmlMode ? xmlDecodeTree : htmlDecodeTree, (cp, consumed) => this.emitCodePoint(cp, consumed));
	}
	reset() {
		this.state = State.Text;
		this.buffer = "";
		this.sectionStart = 0;
		this.index = 0;
		this.baseState = State.Text;
		this.currentSequence = void 0;
		this.running = true;
		this.offset = 0;
	}
	write(chunk) {
		this.offset += this.buffer.length;
		this.buffer = chunk;
		this.parse();
	}
	end() {
		if (this.running) this.finish();
	}
	pause() {
		this.running = false;
	}
	resume() {
		this.running = true;
		if (this.index < this.buffer.length + this.offset) this.parse();
	}
	stateText(c) {
		if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
			if (this.index > this.sectionStart) this.cbs.ontext(this.sectionStart, this.index);
			this.state = State.BeforeTagName;
			this.sectionStart = this.index;
		} else if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
	}
	stateSpecialStartSequence(c) {
		const isEnd = this.sequenceIndex === this.currentSequence.length;
		if (!(isEnd ? isEndOfTagSection(c) : (c | 32) === this.currentSequence[this.sequenceIndex])) this.isSpecial = false;
		else if (!isEnd) {
			this.sequenceIndex++;
			return;
		}
		this.sequenceIndex = 0;
		this.state = State.InTagName;
		this.stateInTagName(c);
	}
	stateInSpecialTag(c) {
		if (this.sequenceIndex === this.currentSequence.length) {
			if (c === CharCodes.Gt || isWhitespace(c)) {
				const endOfText = this.index - this.currentSequence.length;
				if (this.sectionStart < endOfText) {
					const actualIndex = this.index;
					this.index = endOfText;
					this.cbs.ontext(this.sectionStart, endOfText);
					this.index = actualIndex;
				}
				this.isSpecial = false;
				this.sectionStart = endOfText + 2;
				this.stateInClosingTagName(c);
				return;
			}
			this.sequenceIndex = 0;
		}
		if ((c | 32) === this.currentSequence[this.sequenceIndex]) this.sequenceIndex += 1;
		else if (this.sequenceIndex === 0) {
			if (this.currentSequence === Sequences.TitleEnd) {
				if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
			} else if (this.fastForwardTo(CharCodes.Lt)) this.sequenceIndex = 1;
		} else this.sequenceIndex = Number(c === CharCodes.Lt);
	}
	stateCDATASequence(c) {
		if (c === Sequences.Cdata[this.sequenceIndex]) {
			if (++this.sequenceIndex === Sequences.Cdata.length) {
				this.state = State.InCommentLike;
				this.currentSequence = Sequences.CdataEnd;
				this.sequenceIndex = 0;
				this.sectionStart = this.index + 1;
			}
		} else {
			this.sequenceIndex = 0;
			this.state = State.InDeclaration;
			this.stateInDeclaration(c);
		}
	}
	fastForwardTo(c) {
		while (++this.index < this.buffer.length + this.offset) if (this.buffer.charCodeAt(this.index - this.offset) === c) return true;
		this.index = this.buffer.length + this.offset - 1;
		return false;
	}
	stateInCommentLike(c) {
		if (c === this.currentSequence[this.sequenceIndex]) {
			if (++this.sequenceIndex === this.currentSequence.length) {
				if (this.currentSequence === Sequences.CdataEnd) this.cbs.oncdata(this.sectionStart, this.index, 2);
				else this.cbs.oncomment(this.sectionStart, this.index, 2);
				this.sequenceIndex = 0;
				this.sectionStart = this.index + 1;
				this.state = State.Text;
			}
		} else if (this.sequenceIndex === 0) {
			if (this.fastForwardTo(this.currentSequence[0])) this.sequenceIndex = 1;
		} else if (c !== this.currentSequence[this.sequenceIndex - 1]) this.sequenceIndex = 0;
	}
	isTagStartChar(c) {
		return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
	}
	startSpecial(sequence, offset) {
		this.isSpecial = true;
		this.currentSequence = sequence;
		this.sequenceIndex = offset;
		this.state = State.SpecialStartSequence;
	}
	stateBeforeTagName(c) {
		if (c === CharCodes.ExclamationMark) {
			this.state = State.BeforeDeclaration;
			this.sectionStart = this.index + 1;
		} else if (c === CharCodes.Questionmark) {
			this.state = State.InProcessingInstruction;
			this.sectionStart = this.index + 1;
		} else if (this.isTagStartChar(c)) {
			const lower = c | 32;
			this.sectionStart = this.index;
			if (this.xmlMode) this.state = State.InTagName;
			else if (lower === Sequences.ScriptEnd[2]) this.state = State.BeforeSpecialS;
			else if (lower === Sequences.TitleEnd[2] || lower === Sequences.XmpEnd[2]) this.state = State.BeforeSpecialT;
			else this.state = State.InTagName;
		} else if (c === CharCodes.Slash) this.state = State.BeforeClosingTagName;
		else {
			this.state = State.Text;
			this.stateText(c);
		}
	}
	stateInTagName(c) {
		if (isEndOfTagSection(c)) {
			this.cbs.onopentagname(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		}
	}
	stateBeforeClosingTagName(c) {
		if (isWhitespace(c)) {} else if (c === CharCodes.Gt) this.state = State.Text;
		else {
			this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
			this.sectionStart = this.index;
		}
	}
	stateInClosingTagName(c) {
		if (c === CharCodes.Gt || isWhitespace(c)) {
			this.cbs.onclosetag(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.state = State.AfterClosingTagName;
			this.stateAfterClosingTagName(c);
		}
	}
	stateAfterClosingTagName(c) {
		if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		}
	}
	stateBeforeAttributeName(c) {
		if (c === CharCodes.Gt) {
			this.cbs.onopentagend(this.index);
			if (this.isSpecial) {
				this.state = State.InSpecialTag;
				this.sequenceIndex = 0;
			} else this.state = State.Text;
			this.sectionStart = this.index + 1;
		} else if (c === CharCodes.Slash) this.state = State.InSelfClosingTag;
		else if (!isWhitespace(c)) {
			this.state = State.InAttributeName;
			this.sectionStart = this.index;
		}
	}
	stateInSelfClosingTag(c) {
		if (c === CharCodes.Gt) {
			this.cbs.onselfclosingtag(this.index);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
			this.isSpecial = false;
		} else if (!isWhitespace(c)) {
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		}
	}
	stateInAttributeName(c) {
		if (c === CharCodes.Eq || isEndOfTagSection(c)) {
			this.cbs.onattribname(this.sectionStart, this.index);
			this.sectionStart = this.index;
			this.state = State.AfterAttributeName;
			this.stateAfterAttributeName(c);
		}
	}
	stateAfterAttributeName(c) {
		if (c === CharCodes.Eq) this.state = State.BeforeAttributeValue;
		else if (c === CharCodes.Slash || c === CharCodes.Gt) {
			this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
			this.sectionStart = -1;
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		} else if (!isWhitespace(c)) {
			this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
			this.state = State.InAttributeName;
			this.sectionStart = this.index;
		}
	}
	stateBeforeAttributeValue(c) {
		if (c === CharCodes.DoubleQuote) {
			this.state = State.InAttributeValueDq;
			this.sectionStart = this.index + 1;
		} else if (c === CharCodes.SingleQuote) {
			this.state = State.InAttributeValueSq;
			this.sectionStart = this.index + 1;
		} else if (!isWhitespace(c)) {
			this.sectionStart = this.index;
			this.state = State.InAttributeValueNq;
			this.stateInAttributeValueNoQuotes(c);
		}
	}
	handleInAttributeValue(c, quote) {
		if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
			this.cbs.onattribdata(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
			this.state = State.BeforeAttributeName;
		} else if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
	}
	stateInAttributeValueDoubleQuotes(c) {
		this.handleInAttributeValue(c, CharCodes.DoubleQuote);
	}
	stateInAttributeValueSingleQuotes(c) {
		this.handleInAttributeValue(c, CharCodes.SingleQuote);
	}
	stateInAttributeValueNoQuotes(c) {
		if (isWhitespace(c) || c === CharCodes.Gt) {
			this.cbs.onattribdata(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.cbs.onattribend(QuoteType.Unquoted, this.index);
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		} else if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
	}
	stateBeforeDeclaration(c) {
		if (c === CharCodes.OpeningSquareBracket) {
			this.state = State.CDATASequence;
			this.sequenceIndex = 0;
		} else this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
	}
	stateInDeclaration(c) {
		if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
			this.cbs.ondeclaration(this.sectionStart, this.index);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		}
	}
	stateInProcessingInstruction(c) {
		if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
			this.cbs.onprocessinginstruction(this.sectionStart, this.index);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		}
	}
	stateBeforeComment(c) {
		if (c === CharCodes.Dash) {
			this.state = State.InCommentLike;
			this.currentSequence = Sequences.CommentEnd;
			this.sequenceIndex = 2;
			this.sectionStart = this.index + 1;
		} else this.state = State.InDeclaration;
	}
	stateInSpecialComment(c) {
		if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
			this.cbs.oncomment(this.sectionStart, this.index, 0);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		}
	}
	stateBeforeSpecialS(c) {
		const lower = c | 32;
		if (lower === Sequences.ScriptEnd[3]) this.startSpecial(Sequences.ScriptEnd, 4);
		else if (lower === Sequences.StyleEnd[3]) this.startSpecial(Sequences.StyleEnd, 4);
		else {
			this.state = State.InTagName;
			this.stateInTagName(c);
		}
	}
	stateBeforeSpecialT(c) {
		switch (c | 32) {
			case Sequences.TitleEnd[3]:
				this.startSpecial(Sequences.TitleEnd, 4);
				break;
			case Sequences.TextareaEnd[3]:
				this.startSpecial(Sequences.TextareaEnd, 4);
				break;
			case Sequences.XmpEnd[3]:
				this.startSpecial(Sequences.XmpEnd, 4);
				break;
			default:
				this.state = State.InTagName;
				this.stateInTagName(c);
		}
	}
	startEntity() {
		this.baseState = this.state;
		this.state = State.InEntity;
		this.entityStart = this.index;
		this.entityDecoder.startEntity(this.xmlMode ? DecodingMode.Strict : this.baseState === State.Text || this.baseState === State.InSpecialTag ? DecodingMode.Legacy : DecodingMode.Attribute);
	}
	stateInEntity() {
		const length = this.entityDecoder.write(this.buffer, this.index - this.offset);
		if (length >= 0) {
			this.state = this.baseState;
			if (length === 0) this.index = this.entityStart;
		} else this.index = this.offset + this.buffer.length - 1;
	}
	cleanup() {
		if (this.running && this.sectionStart !== this.index) {
			if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
				this.cbs.ontext(this.sectionStart, this.index);
				this.sectionStart = this.index;
			} else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
				this.cbs.onattribdata(this.sectionStart, this.index);
				this.sectionStart = this.index;
			}
		}
	}
	shouldContinue() {
		return this.index < this.buffer.length + this.offset && this.running;
	}
	parse() {
		while (this.shouldContinue()) {
			const c = this.buffer.charCodeAt(this.index - this.offset);
			switch (this.state) {
				case State.Text:
					this.stateText(c);
					break;
				case State.SpecialStartSequence:
					this.stateSpecialStartSequence(c);
					break;
				case State.InSpecialTag:
					this.stateInSpecialTag(c);
					break;
				case State.CDATASequence:
					this.stateCDATASequence(c);
					break;
				case State.InAttributeValueDq:
					this.stateInAttributeValueDoubleQuotes(c);
					break;
				case State.InAttributeName:
					this.stateInAttributeName(c);
					break;
				case State.InCommentLike:
					this.stateInCommentLike(c);
					break;
				case State.InSpecialComment:
					this.stateInSpecialComment(c);
					break;
				case State.BeforeAttributeName:
					this.stateBeforeAttributeName(c);
					break;
				case State.InTagName:
					this.stateInTagName(c);
					break;
				case State.InClosingTagName:
					this.stateInClosingTagName(c);
					break;
				case State.BeforeTagName:
					this.stateBeforeTagName(c);
					break;
				case State.AfterAttributeName:
					this.stateAfterAttributeName(c);
					break;
				case State.InAttributeValueSq:
					this.stateInAttributeValueSingleQuotes(c);
					break;
				case State.BeforeAttributeValue:
					this.stateBeforeAttributeValue(c);
					break;
				case State.BeforeClosingTagName:
					this.stateBeforeClosingTagName(c);
					break;
				case State.AfterClosingTagName:
					this.stateAfterClosingTagName(c);
					break;
				case State.BeforeSpecialS:
					this.stateBeforeSpecialS(c);
					break;
				case State.BeforeSpecialT:
					this.stateBeforeSpecialT(c);
					break;
				case State.InAttributeValueNq:
					this.stateInAttributeValueNoQuotes(c);
					break;
				case State.InSelfClosingTag:
					this.stateInSelfClosingTag(c);
					break;
				case State.InDeclaration:
					this.stateInDeclaration(c);
					break;
				case State.BeforeDeclaration:
					this.stateBeforeDeclaration(c);
					break;
				case State.BeforeComment:
					this.stateBeforeComment(c);
					break;
				case State.InProcessingInstruction:
					this.stateInProcessingInstruction(c);
					break;
				case State.InEntity:
					this.stateInEntity();
					break;
			}
			this.index++;
		}
		this.cleanup();
	}
	finish() {
		if (this.state === State.InEntity) {
			this.entityDecoder.end();
			this.state = this.baseState;
		}
		this.handleTrailingData();
		this.cbs.onend();
	}
	handleTrailingData() {
		const endIndex = this.buffer.length + this.offset;
		if (this.sectionStart >= endIndex) return;
		if (this.state === State.InCommentLike) if (this.currentSequence === Sequences.CdataEnd) this.cbs.oncdata(this.sectionStart, endIndex, 0);
		else this.cbs.oncomment(this.sectionStart, endIndex, 0);
		else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName) {} else this.cbs.ontext(this.sectionStart, endIndex);
	}
	emitCodePoint(cp, consumed) {
		if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
			if (this.sectionStart < this.entityStart) this.cbs.onattribdata(this.sectionStart, this.entityStart);
			this.sectionStart = this.entityStart + consumed;
			this.index = this.sectionStart - 1;
			this.cbs.onattribentity(cp);
		} else {
			if (this.sectionStart < this.entityStart) this.cbs.ontext(this.sectionStart, this.entityStart);
			this.sectionStart = this.entityStart + consumed;
			this.index = this.sectionStart - 1;
			this.cbs.ontextentity(cp, this.sectionStart);
		}
	}
};
var formTags = new Set([
	"input",
	"option",
	"optgroup",
	"select",
	"button",
	"datalist",
	"textarea"
]);
var pTag = new Set(["p"]);
var tableSectionTags = new Set(["thead", "tbody"]);
var ddtTags = new Set(["dd", "dt"]);
var rtpTags = new Set(["rt", "rp"]);
var openImpliesClose = new Map([
	["tr", new Set([
		"tr",
		"th",
		"td"
	])],
	["th", new Set(["th"])],
	["td", new Set([
		"thead",
		"th",
		"td"
	])],
	["body", new Set([
		"head",
		"link",
		"script"
	])],
	["li", new Set(["li"])],
	["p", pTag],
	["h1", pTag],
	["h2", pTag],
	["h3", pTag],
	["h4", pTag],
	["h5", pTag],
	["h6", pTag],
	["select", formTags],
	["input", formTags],
	["output", formTags],
	["button", formTags],
	["datalist", formTags],
	["textarea", formTags],
	["option", new Set(["option"])],
	["optgroup", new Set(["optgroup", "option"])],
	["dd", ddtTags],
	["dt", ddtTags],
	["address", pTag],
	["article", pTag],
	["aside", pTag],
	["blockquote", pTag],
	["details", pTag],
	["div", pTag],
	["dl", pTag],
	["fieldset", pTag],
	["figcaption", pTag],
	["figure", pTag],
	["footer", pTag],
	["form", pTag],
	["header", pTag],
	["hr", pTag],
	["main", pTag],
	["nav", pTag],
	["ol", pTag],
	["pre", pTag],
	["section", pTag],
	["table", pTag],
	["ul", pTag],
	["rt", rtpTags],
	["rp", rtpTags],
	["tbody", tableSectionTags],
	["tfoot", tableSectionTags]
]);
var voidElements = new Set([
	"area",
	"base",
	"basefont",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"img",
	"input",
	"isindex",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
var foreignContextElements = new Set(["math", "svg"]);
var htmlIntegrationElements = new Set([
	"mi",
	"mo",
	"mn",
	"ms",
	"mtext",
	"annotation-xml",
	"foreignobject",
	"desc",
	"title"
]);
var reNameEnd = /\s|\//;
var Parser = class {
	constructor(cbs, options = {}) {
		var _a, _b, _c, _d, _e, _f;
		this.options = options;
		this.startIndex = 0;
		this.endIndex = 0;
		this.openTagStart = 0;
		this.tagname = "";
		this.attribname = "";
		this.attribvalue = "";
		this.attribs = null;
		this.stack = [];
		this.buffers = [];
		this.bufferOffset = 0;
		this.writeIndex = 0;
		this.ended = false;
		this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
		this.htmlMode = !this.options.xmlMode;
		this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : this.htmlMode;
		this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : this.htmlMode;
		this.recognizeSelfClosing = (_c = options.recognizeSelfClosing) !== null && _c !== void 0 ? _c : !this.htmlMode;
		this.tokenizer = new ((_d = options.Tokenizer) !== null && _d !== void 0 ? _d : Tokenizer)(this.options, this);
		this.foreignContext = [!this.htmlMode];
		(_f = (_e = this.cbs).onparserinit) === null || _f === void 0 || _f.call(_e, this);
	}
	ontext(start, endIndex) {
		var _a, _b;
		const data = this.getSlice(start, endIndex);
		this.endIndex = endIndex - 1;
		(_b = (_a = this.cbs).ontext) === null || _b === void 0 || _b.call(_a, data);
		this.startIndex = endIndex;
	}
	ontextentity(cp, endIndex) {
		var _a, _b;
		this.endIndex = endIndex - 1;
		(_b = (_a = this.cbs).ontext) === null || _b === void 0 || _b.call(_a, fromCodePoint(cp));
		this.startIndex = endIndex;
	}
	isVoidElement(name) {
		return this.htmlMode && voidElements.has(name);
	}
	onopentagname(start, endIndex) {
		this.endIndex = endIndex;
		let name = this.getSlice(start, endIndex);
		if (this.lowerCaseTagNames) name = name.toLowerCase();
		this.emitOpenTag(name);
	}
	emitOpenTag(name) {
		var _a, _b, _c, _d;
		this.openTagStart = this.startIndex;
		this.tagname = name;
		const impliesClose = this.htmlMode && openImpliesClose.get(name);
		if (impliesClose) while (this.stack.length > 0 && impliesClose.has(this.stack[0])) {
			const element = this.stack.shift();
			(_b = (_a = this.cbs).onclosetag) === null || _b === void 0 || _b.call(_a, element, true);
		}
		if (!this.isVoidElement(name)) {
			this.stack.unshift(name);
			if (this.htmlMode) {
				if (foreignContextElements.has(name)) this.foreignContext.unshift(true);
				else if (htmlIntegrationElements.has(name)) this.foreignContext.unshift(false);
			}
		}
		(_d = (_c = this.cbs).onopentagname) === null || _d === void 0 || _d.call(_c, name);
		if (this.cbs.onopentag) this.attribs = {};
	}
	endOpenTag(isImplied) {
		var _a, _b;
		this.startIndex = this.openTagStart;
		if (this.attribs) {
			(_b = (_a = this.cbs).onopentag) === null || _b === void 0 || _b.call(_a, this.tagname, this.attribs, isImplied);
			this.attribs = null;
		}
		if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) this.cbs.onclosetag(this.tagname, true);
		this.tagname = "";
	}
	onopentagend(endIndex) {
		this.endIndex = endIndex;
		this.endOpenTag(false);
		this.startIndex = endIndex + 1;
	}
	onclosetag(start, endIndex) {
		var _a, _b, _c, _d, _e, _f, _g, _h;
		this.endIndex = endIndex;
		let name = this.getSlice(start, endIndex);
		if (this.lowerCaseTagNames) name = name.toLowerCase();
		if (this.htmlMode && (foreignContextElements.has(name) || htmlIntegrationElements.has(name))) this.foreignContext.shift();
		if (!this.isVoidElement(name)) {
			const pos = this.stack.indexOf(name);
			if (pos !== -1) for (let index = 0; index <= pos; index++) {
				const element = this.stack.shift();
				(_b = (_a = this.cbs).onclosetag) === null || _b === void 0 || _b.call(_a, element, index !== pos);
			}
			else if (this.htmlMode && name === "p") {
				this.emitOpenTag("p");
				this.closeCurrentTag(true);
			}
		} else if (this.htmlMode && name === "br") {
			(_d = (_c = this.cbs).onopentagname) === null || _d === void 0 || _d.call(_c, "br");
			(_f = (_e = this.cbs).onopentag) === null || _f === void 0 || _f.call(_e, "br", {}, true);
			(_h = (_g = this.cbs).onclosetag) === null || _h === void 0 || _h.call(_g, "br", false);
		}
		this.startIndex = endIndex + 1;
	}
	onselfclosingtag(endIndex) {
		this.endIndex = endIndex;
		if (this.recognizeSelfClosing || this.foreignContext[0]) {
			this.closeCurrentTag(false);
			this.startIndex = endIndex + 1;
		} else this.onopentagend(endIndex);
	}
	closeCurrentTag(isOpenImplied) {
		var _a, _b;
		const name = this.tagname;
		this.endOpenTag(isOpenImplied);
		if (this.stack[0] === name) {
			(_b = (_a = this.cbs).onclosetag) === null || _b === void 0 || _b.call(_a, name, !isOpenImplied);
			this.stack.shift();
		}
	}
	onattribname(start, endIndex) {
		this.startIndex = start;
		const name = this.getSlice(start, endIndex);
		this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
	}
	onattribdata(start, endIndex) {
		this.attribvalue += this.getSlice(start, endIndex);
	}
	onattribentity(cp) {
		this.attribvalue += fromCodePoint(cp);
	}
	onattribend(quote, endIndex) {
		var _a, _b;
		this.endIndex = endIndex;
		(_b = (_a = this.cbs).onattribute) === null || _b === void 0 || _b.call(_a, this.attribname, this.attribvalue, quote === QuoteType.Double ? "\"" : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
		if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) this.attribs[this.attribname] = this.attribvalue;
		this.attribvalue = "";
	}
	getInstructionName(value) {
		const index = value.search(reNameEnd);
		let name = index < 0 ? value : value.substr(0, index);
		if (this.lowerCaseTagNames) name = name.toLowerCase();
		return name;
	}
	ondeclaration(start, endIndex) {
		this.endIndex = endIndex;
		const value = this.getSlice(start, endIndex);
		if (this.cbs.onprocessinginstruction) {
			const name = this.getInstructionName(value);
			this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
		}
		this.startIndex = endIndex + 1;
	}
	onprocessinginstruction(start, endIndex) {
		this.endIndex = endIndex;
		const value = this.getSlice(start, endIndex);
		if (this.cbs.onprocessinginstruction) {
			const name = this.getInstructionName(value);
			this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
		}
		this.startIndex = endIndex + 1;
	}
	oncomment(start, endIndex, offset) {
		var _a, _b, _c, _d;
		this.endIndex = endIndex;
		(_b = (_a = this.cbs).oncomment) === null || _b === void 0 || _b.call(_a, this.getSlice(start, endIndex - offset));
		(_d = (_c = this.cbs).oncommentend) === null || _d === void 0 || _d.call(_c);
		this.startIndex = endIndex + 1;
	}
	oncdata(start, endIndex, offset) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
		this.endIndex = endIndex;
		const value = this.getSlice(start, endIndex - offset);
		if (!this.htmlMode || this.options.recognizeCDATA) {
			(_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 || _b.call(_a);
			(_d = (_c = this.cbs).ontext) === null || _d === void 0 || _d.call(_c, value);
			(_f = (_e = this.cbs).oncdataend) === null || _f === void 0 || _f.call(_e);
		} else {
			(_h = (_g = this.cbs).oncomment) === null || _h === void 0 || _h.call(_g, `[CDATA[${value}]]`);
			(_k = (_j = this.cbs).oncommentend) === null || _k === void 0 || _k.call(_j);
		}
		this.startIndex = endIndex + 1;
	}
	onend() {
		var _a, _b;
		if (this.cbs.onclosetag) {
			this.endIndex = this.startIndex;
			for (let index = 0; index < this.stack.length; index++) this.cbs.onclosetag(this.stack[index], true);
		}
		(_b = (_a = this.cbs).onend) === null || _b === void 0 || _b.call(_a);
	}
	reset() {
		var _a, _b, _c, _d;
		(_b = (_a = this.cbs).onreset) === null || _b === void 0 || _b.call(_a);
		this.tokenizer.reset();
		this.tagname = "";
		this.attribname = "";
		this.attribs = null;
		this.stack.length = 0;
		this.startIndex = 0;
		this.endIndex = 0;
		(_d = (_c = this.cbs).onparserinit) === null || _d === void 0 || _d.call(_c, this);
		this.buffers.length = 0;
		this.foreignContext.length = 0;
		this.foreignContext.unshift(!this.htmlMode);
		this.bufferOffset = 0;
		this.writeIndex = 0;
		this.ended = false;
	}
	parseComplete(data) {
		this.reset();
		this.end(data);
	}
	getSlice(start, end) {
		while (start - this.bufferOffset >= this.buffers[0].length) this.shiftBuffer();
		let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
		while (end - this.bufferOffset > this.buffers[0].length) {
			this.shiftBuffer();
			slice += this.buffers[0].slice(0, end - this.bufferOffset);
		}
		return slice;
	}
	shiftBuffer() {
		this.bufferOffset += this.buffers[0].length;
		this.writeIndex--;
		this.buffers.shift();
	}
	write(chunk) {
		var _a, _b;
		if (this.ended) {
			(_b = (_a = this.cbs).onerror) === null || _b === void 0 || _b.call(_a, /* @__PURE__ */ new Error(".write() after done!"));
			return;
		}
		this.buffers.push(chunk);
		if (this.tokenizer.running) {
			this.tokenizer.write(chunk);
			this.writeIndex++;
		}
	}
	end(chunk) {
		var _a, _b;
		if (this.ended) {
			(_b = (_a = this.cbs).onerror) === null || _b === void 0 || _b.call(_a, /* @__PURE__ */ new Error(".end() after done!"));
			return;
		}
		if (chunk) this.write(chunk);
		this.ended = true;
		this.tokenizer.end();
	}
	pause() {
		this.tokenizer.pause();
	}
	resume() {
		this.tokenizer.resume();
		while (this.tokenizer.running && this.writeIndex < this.buffers.length) this.tokenizer.write(this.buffers[this.writeIndex++]);
		if (this.ended) this.tokenizer.end();
	}
	parseChunk(chunk) {
		this.write(chunk);
	}
	done(chunk) {
		this.end(chunk);
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const HTML_PREVIEW_DEFAULT_BASE_URL = "about:srcdoc";
const HTML_PREVIEW_IFRAME_SANDBOX = "allow-scripts allow-same-origin allow-forms";
const HTML_PREVIEW_RESTRICTED_SANDBOX = "";
const HTML_PREVIEW_RESTRICTED_CSP = "default-src 'none'; img-src data: blob: file:; media-src data: blob: file:; style-src 'unsafe-inline' file:; font-src data: file:";
var escapeHtmlAttribute = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
var LEADING_DOCUMENT_PREAMBLE_REGEX = /^(?:\s*(?:<!--[\s\S]*?-->|<!doctype[^>]*>|<\?[\s\S]*?\?>))*\s*(?:<html(?:\s[^>]*)?>\s*(?:<!--[\s\S]*?-->\s*)*)?/i;
function hasHtmlElement(html, elementName) {
	let found = false;
	new Parser({ onopentag(name) {
		if (name === elementName) found = true;
	} }, { lowerCaseTags: true }).end(html);
	return found;
}
function injectHtmlPreviewHeadElement(html, element) {
	const preambleEnd = html.match(LEADING_DOCUMENT_PREAMBLE_REGEX)?.[0].length ?? 0;
	const headMatch = html.slice(preambleEnd).match(/^<head(?:\s[^>]*)?>/i);
	if (headMatch?.index !== void 0) {
		const insertAt = preambleEnd + headMatch[0].length;
		return `${html.slice(0, insertAt)}${element}${html.slice(insertAt)}`;
	}
	return `${html.slice(0, preambleEnd)}<head>${element}</head>${html.slice(preambleEnd)}`;
}
function injectHtmlPreviewBase(html, baseUrl = HTML_PREVIEW_DEFAULT_BASE_URL) {
	if (!html.trim() || hasHtmlElement(html, "base")) return html;
	return injectHtmlPreviewHeadElement(html, `<base href="${escapeHtmlAttribute(baseUrl)}">`);
}
function injectHtmlPreviewCsp(html, csp) {
	if (!html.trim()) return html;
	return injectHtmlPreviewHeadElement(html, `<meta http-equiv="Content-Security-Policy" content="${escapeHtmlAttribute(csp)}">`);
}
var HtmlPreviewFrame_default = (0, import_react.memo)(({ html, title, baseUrl = HTML_PREVIEW_DEFAULT_BASE_URL, emptyText, sandbox = HTML_PREVIEW_IFRAME_SANDBOX, csp, iframeRef }) => {
	const withBase = injectHtmlPreviewBase(html, baseUrl);
	const srcDoc = csp ? injectHtmlPreviewCsp(withBase, csp) : withBase;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.html-preview-frame",
		className: "h-full w-full overflow-hidden bg-white",
		children: html.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			ref: iframeRef,
			srcDoc,
			title,
			sandbox,
			className: "h-full w-full border-0 bg-white"
		}) : emptyText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: emptyText })
		}) : null
	});
});
export { injectHtmlPreviewHeadElement as a, HtmlPreviewFrame_default as i, HTML_PREVIEW_RESTRICTED_CSP as n, Parser as o, HTML_PREVIEW_RESTRICTED_SANDBOX as r, HTML_PREVIEW_IFRAME_SANDBOX as t };
