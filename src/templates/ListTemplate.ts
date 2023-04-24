import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
    
    // let completedCount = 0;
  }
  render(fullList: FullList): void {

    this.clear();
    let completedCount = 0; // Initialize completedCount to zero
    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";
  
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.checked = item.checked;
  
      // Increment completedCount if item is checked
      if (item.checked) {
        completedCount++;
      }
  
      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
  
        // Update completedCount based on checkbox status
        if (item.checked) {
          completedCount++;
        } else {
          completedCount--;
        }
  
        let complete = document.getElementById("showCompleted");
        complete!.innerHTML = `All : ${completedCount}`;
      });
  
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
  
      li.append(check);
      li.append(label);
  
      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);
  
      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
        fullList.save();
        fullList.count();
      });
  
      const edit = document.createElement("edit") as HTMLButtonElement;
      edit.className = "edit";
      edit.textContent = "Edit";
      li.append(edit);
  
      edit.addEventListener("click", () => {
        if (item.item !== "") {
          const label = li.querySelector("label") as HTMLLabelElement;
          label.contentEditable = "true";
          label.focus();
          label.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              item.item = label.textContent || "";
              fullList.save();
              label.contentEditable = "false";
            }
          });
        } else {
          // ("#ModalDetail").val("");
        }
      });
  
      this.ul.append(li);
    });
  
    let complete = document.getElementById("showCompleted");
    complete!.innerHTML = `All : ${completedCount}`;
  }
}  