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
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.checked = item.checked;
      // li.append(check);

      // console.log(item.id);
      // console.log(item.checked);
      // console.log(check.type)

      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;

      console.log(label.textContent);

      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
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
          $("#ModalDetail").val("");
        }
      });









      this.ul.append(li);
    });
  }
}
