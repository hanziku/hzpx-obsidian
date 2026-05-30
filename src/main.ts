import {App,   Modal, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, MyPluginSettings, SampleSettingTab} from "./settings";
import Hzpx from 'hzpx-engine/obsidian.ts'
import * as path from 'path'
// Remember to rename these classes and interfaces!

const loadFont=(self)=>{
    const vaultPath = (self.app.vault.adapter as any).basePath;
    // 2. 拼接外部 JS 的绝对路径
	const pluginRel = self.manifest.dir; 

	const CJKBMP = require(path.join(vaultPath,pluginRel,'cjkbmp.cjs')); 
	const CJKEXT = require(path.join(vaultPath,pluginRel,'cjkext.cjs'));
	const GWCOMP = require(path.join(vaultPath,pluginRel,'gwcomp.cjs'));

	Hzpx.addFontData('cjkbmp',CJKBMP);
	Hzpx.addFontData('cjkext',CJKEXT);
	Hzpx.addFontData('gwcomp',GWCOMP);
}
export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		loadFont(this);
		await this.loadSettings();
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerMarkdownPostProcessor((element, context) => {	
			setTimeout(()=>{
				const {color ,fontSize}=window.getComputedStyle(element); 
				Hzpx.injectPinx(element,{scale:1.3}); 
			},0)
		});
			
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		// let {contentEl} = this;
		// contentEl.setText('Woah!');
	}

	onClose() {
		// const {contentEl} = this;
		// contentEl.empty();
	}
}
