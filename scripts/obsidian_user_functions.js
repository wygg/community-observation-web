// Obsidian 用户脚本 - 放在 Templater 用户脚本目录
module.exports = {
  async getInput(prompt, defaultValue = "") {
    return await new Promise((resolve) => {
      const modal = new InputModal(app, prompt, defaultValue);
      modal.onClose = (result) => resolve(result);
      modal.open();
    });
  }
};

// 输入模态框组件
class InputModal extends SuggestModal {
  constructor(app, prompt, defaultValue) {
    super(app);
    this.prompt = prompt;
    this.defaultValue = defaultValue;
    this.result = defaultValue;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: this.prompt });
    
    const input = contentEl.createEl("input", {
      type: "text",
      value: this.defaultValue
    });
    
    input.style.width = "100%";
    input.style.padding = "8px";
    input.focus();
    input.select();
    
    const buttonContainer = contentEl.createDiv("button-container");
    
    const confirmButton = buttonContainer.createEl("button", {
      text: "确认",
      cls: "mod-cta"
    });
    
    confirmButton.onclick = () => {
      this.result = input.value;
      this.close();
    };
    
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.result = input.value;
        this.close();
      }
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}