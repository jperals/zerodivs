export default {
  data() {
    return {
      elementHeight: null,
      elementIndex: null,
      initialMousePosition: null,
      offset: null,
      itemBeingDragged: null,
      indexMovedDown: null,
      indexMovedUp: null,
    };
  },
  methods: {
    isItemMovedDown(index) {
      return this.indexMovedDown === index;
    },
    isItemMovedUp(index) {
      return this.indexMovedUp === index;
    },
    onItemMouseDown(index, event) {
      const listItem = event.target.closest("li.draggable");
      if (listItem) {
        this.elementHeight = parseInt(
          listItem.getBoundingClientRect().height
        );
        const item = this.items[index];
        this.itemBeingDragged = item;
        this.initialMousePosition = event.y;
        this.elementIndex = index;
        if (this.mouseDown) {
          this.mouseDown();
        }
      }
    },
    async onItemMouseMove(event) {
      if (this.itemBeingDragged) {
        event.preventDefault();
        this.offset = event.y - this.initialMousePosition;
        while (
          this.elementHeight / 2 < this.offset &&
          this.elementIndex < this.items.length - 1
        ) {
          await this.swapItems(this.elementIndex, this.elementIndex + 1);
          this.initialMousePosition += this.elementHeight;
          this.offset -= this.elementHeight;
          this.indexMovedDown = null;
          this.indexMovedUp = this.elementIndex;
          this.elementIndex += 1;
        }
        while (this.offset < -this.elementHeight / 2 && 0 < this.elementIndex) {
          this.swapItems(this.elementIndex, this.elementIndex - 1);
          this.initialMousePosition -= this.elementHeight;
          this.offset += this.elementHeight;
          this.indexMovedUp = null;
          this.indexMovedDown = this.elementIndex;
          this.elementIndex -= 1;
        }
      }
    },
    onItemMouseUp() {
      this.itemBeingDragged = null;
      this.initialMousePosition = null;
      this.offset = null;
      if (this.mouseUp) {
        this.mouseUp();
      }
    },
    listItemStyle(item) {
      if (item === this.itemBeingDragged && this.offset !== null) {
        return {
          position: "relative",
          transform: `translateY(${this.offset}px)`,
          zIndex: 10,
        };
      } else {
        return {};
      }
    },
  },
};
