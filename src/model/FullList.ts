import ListItem from './ListItem'

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    editItem(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []) { }

    get list(): ListItem[] {
        return this._list
        
    }


    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
          
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
        this.count();
       
    }

    clearList(): void {
         this._list = []
        this.save()

    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }

    editItem(): void{
        
        // const paragraph = document.getElementById("newItem").placeholder = item.item;
        // paragraph.contentEditable = true;
        
        this.save()
    }
    count(): void{


       var show = document.getElementById("showCount");
       if (show != undefined) {
        show.innerHTML =  this._list.length.toString();
      
        // show?.innerHTML = this._list.length
     
    }      
    }
  
}