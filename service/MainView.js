import { VERSION } from '../constants/Version.js';
import { V } from '../util/ViewUtil.js';
import { TextEditor } from './TextEditor.js';
import { MainMenu } from './MainMenu.js';
import { PagesView } from './PagesView.js';

export class MainView {
	constructor() {
		console.log('MainView');
		this.pagesElm = null;
		this.editorTextAreaElm = null;
		this.init();
		this.second();
	}
	init() {
		const frame = V.div('frame', 'frame');
		console.log(V);
		V.append2Body(frame);
		const header = V.div('header', 'header');
		V.append(frame, header);
		this.buildTitle(header);
		this.buildMenu(header);
		const contents = V.div('Contents', 'Contents');
		V.append(frame, contents);
		this.buildPages(contents);
		this.buildEditor(contents);
		this.TextEditor.setOutputElm(this.PagesView.getFormattedElm(), this.PagesView.getJsonElm());
		const footer = V.div('footer', 'footer');
		V.append(frame, footer);
	}
	second() {
		this.mainmenu.setTextArea(this.editorTextAreaElm);
	}
	buildTitle(header) {
		const titleFrame = V.div('titleFrame', 'titleFrame');
		V.append(header, titleFrame);
		const title = V.span('title', 'title', `NaimuChaaan `);
		const v = V.span('version', 'version', ` v${VERSION}`);
		V.append(titleFrame, title);
		V.append(titleFrame, v);
	}
	buildMenu(header) {
		const menu = V.div('menu', 'menu');
		V.append(header, menu);
		this.mainmenu = new MainMenu(menu);
	}
	buildPages(contents) {
		const pages = V.div('Pages', 'Pages');
		V.append(contents, pages);
		this.pagesElm = pages;
		this.PagesView = new PagesView(this.pagesElm);
	}
	buildEditor(contents) {
		const editor = V.div('Editor', 'Editor');
		V.append(contents, editor);
		const maineditor = V.textarea('maineditor', 'maineditor');
		V.append(editor, maineditor);
		this.editorTextAreaElm = maineditor;
		this.TextEditor = new TextEditor(maineditor);
	}

	buildView() {
		V.c('');
	}
}
