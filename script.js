//Creating a new node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

//Creating a new queue
class Queue {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  //This function will add elements (nodes) to the queue
  enqueue(value) {
    const node = new Node(value);
    if (this.start === null) {
      this.start = node;
      this.end = node;
    } else {
      this.end.next = node;
      this.end = node;
    }
    this.size++;
  }

  //This function will remove elements (nodes) from the queue
  dequeue() {
    if (this.start === null) {
      return null;
    }
    const value = this.start.value;
    this.start = this.start.next;
    this.size--;

    if (this.size === 0) {
      this.end = null;
    }
    return value;
  }

  //This function will return the size of the queue
  getSize() {
    return this.size;
  }

  //This function will check if the queue is empty or not
  isEmpty() {
    return this.size === 0;
  }

  //This function will return the first element of the queue
  showStart() {
    if (this.start) {
      return this.start.value;
    } else {
      return null;
    }
  }
}

// This function will print all elements from the queue
function printQueue(queue) {
    let current = queue.start;
    const elements = [];
    while (current) {
        elements.push(current.value);
        current = current.next;
    }
    console.log(elements);
}
