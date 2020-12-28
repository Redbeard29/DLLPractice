class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val){
        var newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            var oldTail = this.tail;
            oldTail.next = newNode;
            newNode.prev = oldTail;
            this.tail = newNode;
        }
        this.length ++;
        return this;
    }
    pop(){
        if(!this.head){
            return undefined;
        }
        var oldTail = this.tail;
        if(this.length === 1){
            this.head = null;
            this.tail = null;
        }
        else{
            this.tail = oldTail.prev;
            this.tail.next = null;
            oldTail.prev = null;
        }
        this.length --;
        return oldTail;
    }
    shift(){
        if(!this.head){
            return undefined;
        }
        var oldHead = this.head;
        if(this.length === 1){
            this.head = null;
            this.tail = null;
        }
        else{
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.length --;
        return oldHead;
    }
    unshift(val){
        var newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length ++;
        return this;
    }
    get(index){
        if(index < 0 || index >= this.length){
            return null;
        }
        if(index <= this.length/2){
            var counter = 0;
            var current = this.head;
            while(counter !== index){
                current = current.next;
                counter ++;
            }
        }
        else{
            var counter = this.length - 1;
            var current = this.tail;
            while(counter !== index){
                current = current.prev;
                counter --; 
            }
        }
        return current;
    }
    set(index, val){
        var foundIDX = this.get(index);
        if(foundIDX !== null){
            foundIDX.val = val;
            return true;
        }
        return false; 
    }
    insert(index, val){
        if(index < 0 || index > this.length){
            return false;
        }
        if(index === 0){
            return !!this.unshift(val);
        }
        if(index === this.length){
            return !!this.push(val);
        }
        else{
            var foundIDX = this.get(index - 1);
            var newNode = new Node(val);
            var afterNode = foundIDX.next;
            
            foundIDX.next = newNode;
            newNode.prev = foundIDX;
            newNode.next = afterNode;
            afterNode.prev = newNode;
            
            this.length ++;
            return true;
        }
    }
    remove(index){
        if(index < 0 || index >= this.length){
            return false;
        }
        if(index === 0){
            return this.shift();
        }
        if(index === this.length - 1){
            return this.pop();
        }
        else{
            var removedNode = this.get(index);
            var preIDX = removedNode.prev;
            var postIDX = removedNode.next;

            preIDX.next = postIDX;
            postIDX.prev = preIDX;
            removedNode.next = null;
            removedNode.prev = null;

            this.length --;
            return removedNode;
        }
    }
    reverse(){
        var current = this.head;
        this.head = this.tail;
        this.tail = current;
        var prev = null;
        var next = null;
        for(var x = 0; x < this.length; x++){
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return this;
    }
}

var list = new DoublyLinkedList();

list.push("Harry");
list.push("Ron");
list.push("Hermione");
list.push("Hagrid");
list.push("Dumbledore");

console.log(list);